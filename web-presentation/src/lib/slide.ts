export type Accent = 'cyan' | 'amber' | 'neutral';

export interface ContentSlideOptions {
  id: string;
  section: string;
  sectionLabel?: string;
  kicker?: string;
  title: string;
  lede?: string;
  body: string;
  footer?: string;
  notes?: string;
  className?: string;
  accent?: Accent;
}

export interface SectionDividerOptions {
  id: string;
  number: string;
  section: string;
  title: string;
  lede: string;
  topics: string[];
  notes?: string;
  accent?: Accent;
}

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const accentClass = (accent: Accent | undefined): string =>
  accent ? ` slide--accent-${accent}` : '';

export const renderNotes = (notes?: string): string =>
  notes ? `<aside class="notes">${notes}</aside>` : '';

export const cite = (label: string, title?: string): string =>
  `<span class="cite"${title ? ` title="${escapeHtml(title)}"` : ''}>${escapeHtml(label)}</span>`;

export const contentSlide = (options: ContentSlideOptions): string => {
  const label = options.sectionLabel ?? options.section;

  return `
    <section
      id="${escapeHtml(options.id)}"
      data-slide-id="${escapeHtml(options.id)}"
      data-section="${escapeHtml(label)}"
      class="slide slide--content${accentClass(options.accent)}${options.className ? ` ${options.className}` : ''}"
    >
      <div class="slide__inner">
        <header class="slide__header">
          <p class="eyebrow">${escapeHtml(options.kicker ?? label)}</p>
          <h2 class="slide__title">${options.title}</h2>
          ${options.lede ? `<p class="slide__lede">${options.lede}</p>` : ''}
        </header>
        <div class="slide__body">${options.body}</div>
        ${
          options.footer
            ? `<footer class="slide__footer">${options.footer}</footer>`
            : ''
        }
      </div>
      ${renderNotes(options.notes)}
    </section>
  `;
};

export const sectionDivider = (options: SectionDividerOptions): string => `
  <section
    id="${escapeHtml(options.id)}"
    data-slide-id="${escapeHtml(options.id)}"
    data-section="${escapeHtml(options.section)}"
    class="slide slide--section${accentClass(options.accent)}"
  >
    <div class="section-divider">
      <div class="section-divider__number" aria-hidden="true">${escapeHtml(
        options.number,
      )}</div>
      <div class="section-divider__copy">
        <p class="eyebrow">Bagian ${escapeHtml(options.number)}</p>
        <h2>${options.title}</h2>
        <p class="section-divider__lede">${options.lede}</p>
        <ul class="section-divider__topics">
          ${options.topics.map((topic) => `<li>${topic}</li>`).join('')}
        </ul>
        <a class="text-link" href="#/1" data-goto="map">
          Kembali ke peta presentasi
        </a>
      </div>
    </div>
    ${renderNotes(options.notes)}
  </section>
`;
