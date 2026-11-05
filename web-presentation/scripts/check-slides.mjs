import { createServer } from 'vite';

const server = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

const decode = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&nbsp;', ' ');

const visibleText = (html) =>
  decode(
    html
      .replace(/<aside class="notes">[\s\S]*?<\/aside>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

try {
  const { shellSlides } = await server.ssrLoadModule('/src/slides/shell.ts');
  const errors = [];
  const ids = new Set();

  shellSlides.forEach((slide, index) => {
    const label = `slide ${index}`;
    const sectionCount = (slide.match(/<section\b/g) ?? []).length;

    if (sectionCount !== 1) {
      errors.push(`${label}: expected exactly one section, found ${sectionCount}`);
    }

    if (/<section\b[^>]*>\s*<section\b/.test(slide)) {
      errors.push(`${label}: nested section is not allowed`);
    }

    const id = slide.match(/\bid="([^"]+)"/)?.[1];
    if (!id) errors.push(`${label}: missing id`);
    else if (ids.has(id)) errors.push(`${label}: duplicate id "${id}"`);
    else ids.add(id);

    if (!/\bdata-slide-id="[^"]+"/.test(slide)) {
      errors.push(`${label}: missing data-slide-id`);
    }

    const text = visibleText(slide);
    if (text.length < 24) {
      errors.push(`${label}${id ? ` (${id})` : ''}: content looks empty`);
    }
  });

  if (shellSlides.length !== 30) {
    errors.push(`expected 30 slides, found ${shellSlides.length}`);
  }

  if (errors.length > 0) {
    console.error(`Slide check failed with ${errors.length} problem(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Slide check passed: ${shellSlides.length} slides, all have content.`);
  }
} finally {
  await server.close();
}
