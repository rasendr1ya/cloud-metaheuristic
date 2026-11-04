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
import './styles/context.css';
import './styles/da.css';
import './styles/deck-ui.css';

import { shellSlides } from './slides/shell';
import { setupDeckUi } from './ui/deck-ui';

const revealElement = document.querySelector<HTMLElement>('.reveal');
const slidesElement = document.querySelector<HTMLElement>('.slides');

if (!revealElement || !slidesElement) {
  throw new Error('Reveal.js root elements are missing from index.html');
}

slidesElement.innerHTML = shellSlides.join('\n');

document.querySelectorAll<HTMLElement>('[data-katex]').forEach((node) => {
  katex.render(node.dataset.katex ?? '', node, {
    displayMode: true,
    throwOnError: false,
    output: 'html',
  });
});

const deck = new Reveal(revealElement, {
  hash: true,
  history: true,
  controls: true,
  progress: true,
  slideNumber: 'c/t',
  center: false,
  transition: 'fade',
  backgroundTransition: 'fade',
  width: 1280,
  height: 720,
  margin: 0.045,
  plugins: [Notes],
});

setupDeckUi(deck);
void deck.initialize();
