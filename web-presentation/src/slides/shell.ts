import { renderShortcutGrid } from '../data/shortcuts';
import { contentSlide, sectionDivider } from '../lib/slide';
import { contextSlides } from './context';
import { daSlides } from './da';
import { dboSlides } from './dbo';
import { synthesisSlides } from './synthesis';

const titleSlide = `
  <section
    id="title"
    data-slide-id="title"
    data-section="Pembuka"
    class="title-slide slide slide--title center"
  >
    <div class="title-slide__grid" aria-hidden="true"></div>
    <p class="eyebrow">SOKA · Metaheuristic Cloud Task Scheduling</p>
    <h1>
      Dragonfly Algorithm
      <span class="title-slide__amp">&amp;</span>
      Dung Beetle Optimization
    </h1>
    <p class="title-slide__subtitle">
      Dua pendekatan metaheuristik untuk penjadwalan task dan keseimbangan beban
      di lingkungan cloud.
    </p>
    <div class="title-slide__meta">
      <span class="badge badge--cyan">DA · 2018</span>
      <span class="badge badge--amber">DBO · 2024</span>
      <span class="title-slide__course">Strategi Optimasi Komputasi Awan</span>
    </div>
    <p class="slide-hint">
      Tekan <kbd>→</kbd> atau <kbd>Space</kbd> untuk mulai.
      <a href="#/1" data-goto="map">Lihat peta presentasi</a>
    </p>
    <aside class="notes">
      Pembuka: sebutkan topik, dua algoritma, dan bahwa fokus presentasi adalah
      langkah algoritma serta alasan pemetaannya ke cloud task scheduling.
      Setelah ini, buka peta presentasi untuk memberi gambaran alur.
    </aside>
  </section>
`;

interface AgendaItem {
  number: string;
  title: string;
  description: string;
  meta: string;
  target: string;
  href: string;
  accent: 'cyan' | 'amber' | 'neutral';
  wide?: boolean;
}

const agendaItems: AgendaItem[] = [
  {
    number: '01',
    title: 'Konteks & masalah',
    description: 'Cloud task scheduling, NP-hard, dan posisi metaheuristik.',
    meta: 'Fondasi',
    target: 'section-context',
    href: '#/3',
    accent: 'cyan',
  },
  {
    number: '02',
    title: 'Dragonfly Algorithm',
    description: 'Lima perilaku, rumus, pemetaan ke VM, dan hasil paper.',
    meta: 'Algoritma 1',
    target: 'section-da',
    href: '#/7',
    accent: 'cyan',
  },
  {
    number: '03',
    title: 'Dung Beetle Optimization',
    description: 'Global/local search, prioritas task, fitness, dan hasil paper.',
    meta: 'Algoritma 2',
    target: 'section-dbo',
    href: '#/16',
    accent: 'amber',
  },
  {
    number: '04',
    title: 'Sintesis',
    description: 'Perbandingan DA vs DBO, kritik paper, dan rencana simulator.',
    meta: 'Diskusi',
    target: 'synthesis-compare',
    href: '#/25',
    accent: 'neutral',
  },
  {
    number: '05',
    title: 'Referensi & penutup',
    description: 'Kesimpulan, daftar sumber, dan catatan verifikasi angka.',
    meta: 'Penutup',
    target: 'synthesis-conclusion',
    href: '#/28',
    accent: 'neutral',
    wide: true,
  },
];

const agendaGrid = `
  <div class="agenda-grid">
    ${agendaItems
      .map(
        (item) => `
          <a
            class="agenda-card agenda-card--${item.accent}${item.wide ? ' agenda-card--wide' : ''}"
            href="${item.href}"
            data-goto="${item.target}"
          >
            <span class="agenda-card__num">${item.number}</span>
            <span class="agenda-card__title">${item.title}</span>
            <span class="agenda-card__desc">${item.description}</span>
            <span class="agenda-card__meta">${item.meta}</span>
          </a>
        `,
      )
      .join('')}
  </div>
`;

const mapSlide = contentSlide({
  id: 'map',
  section: 'Peta presentasi',
  kicker: 'Peta presentasi',
  title: 'Lima bagian, satu alur',
  lede:
    'Struktur modular: setiap bagian bisa dipadatkan atau dilewati saat waktu presentasi terbatas.',
  body: agendaGrid,
  footer: `
    <span>Pilih kartu untuk lompat ke bagian.</span>
    <span><kbd>Esc</kbd> overview · <kbd>?</kbd> panduan navigasi</span>
  `,
  notes:
    'Beri gambaran 5 bagian dalam 20–30 detik. Tekankan bahwa DA dan DBO ' +
    'dibahas dengan pola yang sama: inspirasi, perilaku, rumus, pemetaan ke ' +
    'cloud, lalu hasil paper. Kartu bisa diklik untuk lompat saat tanya-jawab.',
});

const contextDivider = sectionDivider({
  id: 'section-context',
  number: '01',
  section: 'Konteks',
  title: 'Konteks & masalah',
  lede:
    'Mengapa penjadwalan task di cloud sulit, dan mengapa metaheuristik masuk akal untuk masalah ini.',
  topics: [
    'Cloud task scheduling',
    'NP-hard',
    'Heuristic vs metaheuristik',
    'Metrik & batasan',
    'DA vs DBO',
  ],
  accent: 'cyan',
  notes:
    'Bagian ini membangun kosakata bersama: task, VM, makespan, load balance. ' +
    'Tanpa ini, perbedaan DA dan DBO akan terasa seperti daftar rumus.',
});

const daDivider = sectionDivider({
  id: 'section-da',
  number: '02',
  section: 'Dragonfly Algorithm',
  title: 'Dragonfly Algorithm',
  lede:
    'Kawanan capung sebagai model pencarian: lima perilaku, vektor langkah, dan pemetaan ke VM.',
  topics: ['Inspirasi biologis', 'Lima perilaku', 'Rumus & Lévy flight', 'Pemetaan ke VM', 'Flowchart', 'Hasil paper'],
  accent: 'cyan',
  notes:
    'Transisi ke algoritma pertama. Ingatkan bahwa paper DA memakai istilah ' +
    '"integrity" untuk cohesion, dan rumus di paper berupa gambar.',
});

const dboDivider = sectionDivider({
  id: 'section-dbo',
  number: '03',
  section: 'Dung Beetle Optimization',
  title: 'Dung Beetle Optimization',
  lede:
    'Lima perilaku kumbang kotoran yang membagi pencarian menjadi eksplorasi global dan eksploitasi lokal.',
  topics: ['Lima perilaku', 'Global vs local search', 'Model sistem', 'Prioritas, SLA & fitness', 'Flowchart', 'Hasil paper'],
  accent: 'amber',
  notes:
    'Transisi ke algoritma kedua. Kontras utama: DBO punya pembagian peran ' +
    'eksplisit dan fitness multiobjektif, sedangkan DA lebih bergantung pada ' +
    'bobot perilaku dan radius tetangga.',
});

const presenterGuide = contentSlide({
  id: 'presenter-guide',
  section: 'Panduan',
  kicker: 'Panduan presenter',
  title: 'Menjalankan presentasi',
  lede:
    'Semua navigasi tersedia lewat keyboard. Tombol di kanan atas adalah jalan pintas untuk fungsi yang sama.',
  body: `
    <div class="shortcut-grid">
      ${renderShortcutGrid()}
    </div>
    <div class="callout callout--cyan">
      <strong>Speaker notes.</strong> Tekan <kbd>S</kbd> untuk membuka jendela
      presenter notes. Izinkan pop-up bila browser meminta. Notes tiap slide
      berisi cue singkat, bukan teks lengkap.
    </div>
  `,
  footer: `
    <span>Tombol kanan atas: peta · overview · tema · panduan.</span>
    <span>Pengaturan tema disimpan di browser.</span>
  `,
  notes:
    'Slide ini bisa dipindah ke appendix saat presentasi. Gunakan untuk ' +
    'menjelaskan kontrol ke audiens atau saat latihan.',
});

export const shellSlides: string[] = [
  titleSlide,
  mapSlide,
  contextDivider,
  ...contextSlides,
  daDivider,
  ...daSlides,
  dboDivider,
  ...dboSlides,
  ...synthesisSlides,
  presenterGuide,
];
