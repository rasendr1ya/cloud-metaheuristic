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
import './styles/dbo.css';
import './styles/synthesis.css';
import './styles/paper-charts.css';
import './styles/deck-ui.css';

import { shellSlides } from './slides/shell';
import { setupDeckUi } from './ui/deck-ui';
import { setupPaperCharts } from './widgets/paper-charts';
import { setupTabs } from './ui/tabs';
import { setupDaBiology } from './widgets/da-biology';
import { setupSwarmLabDa } from './widgets/swarm-lab-da';
import { setupSwarmLabDbo } from './widgets/swarm-lab-dbo';

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

document.querySelectorAll<HTMLElement>('.slide--dbo .dbo-key').forEach((key) => {
  const reveal = document.createElement('div'); reveal.className = 'symbol-reveal'; reveal.textContent = 'Klik simbol untuk melihat arti.'; key.prepend(reveal);
  key.querySelectorAll<HTMLElement>('dt').forEach((term) => { const button = document.createElement('button'); button.type = 'button'; button.textContent = term.textContent ?? ''; term.replaceChildren(button); button.addEventListener('click', () => { reveal.textContent = `${button.textContent}: ${term.parentElement?.querySelector('dd')?.textContent ?? ''}`; }); });
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

setupTabs();
setupDeckUi(deck);
setupPaperCharts(deck);
setupDaBiology(deck);
setupSwarmLabDa(deck);
setupSwarmLabDbo(deck);
const symbolMeanings: Record<string, string> = {
  X_i: 'posisi capung i dalam ruang pencarian.', X_j: 'posisi tetangga j.', V_j: 'vektor kecepatan tetangga j.',
  N: 'jumlah tetangga dalam radius.', 'X+': 'food: kandidat terbaik.', 'X-': 'enemy: kandidat terburuk.',
  weights: 'bobot separation, alignment, cohesion, food, dan enemy.', w: 'bobot inertia pada step vector.',
  delta: 'perubahan posisi pada iterasi t.', t: 'indeks iterasi.',
};
document.querySelectorAll<HTMLButtonElement>('[data-symbol]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.closest<HTMLElement>('[data-slide-id="da-formulas"]')?.querySelector<HTMLElement>('[data-symbol-reveal]');
    if (panel) panel.textContent = `${button.textContent}: ${symbolMeanings[button.dataset.symbol ?? ''] ?? ''}`;
  });
});
void deck.initialize();
