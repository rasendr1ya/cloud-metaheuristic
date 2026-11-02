import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import katex from 'katex';

import 'reveal.js/reveal.css';
import 'katex/dist/katex.min.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';

import './styles/theme.css';
import './styles/slides.css';

const deck = new Reveal(document.querySelector('.reveal')!, {
  hash: true,
  history: true,
  controls: true,
  progress: true,
  slideNumber: 'c/t',
  center: true,
  transition: 'fade',
  width: 1280,
  height: 720,
  margin: 0.045,
  plugins: [Notes],
});

deck.initialize();

document.querySelectorAll<HTMLElement>('[data-katex]').forEach((node) => {
  katex.render(node.dataset.katex ?? '', node, {
    displayMode: true,
    throwOnError: false,
    output: 'html',
  });
});
