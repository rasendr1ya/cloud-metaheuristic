import { daChartData } from '../data/da';
import { cite, contentSlide } from '../lib/slide';
import { paperChartMarkup } from '../widgets/paper-chart-markup';

type FormulaSource = 'paper' | 'mirjalili';

interface Formula {
  label: string;
  latex: string;
  source: FormulaSource;
}

const sourceLabel = (source: FormulaSource): string =>
  source === 'paper' ? 'Paper tugas' : 'Mirjalili 2015';

const sourceBadge = (source: FormulaSource): string =>
  `<span class="formula-source formula-source--${source}">${sourceLabel(source)}</span>`;

const formulaRow = (formula: Formula): string => `
  <div class="formula-row">
    <div class="formula-row__head">
      <span class="formula-row__label">${formula.label}</span>
      ${sourceBadge(formula.source)}
    </div>
    <div class="formula-row__math" data-katex="${formula.latex}"></div>
  </div>
`;

const behaviorFormulas: Formula[] = [
  {
    label: 'Separation',
    latex: 'S_i = -\\sum_{j=1}^{N}(X_i - X_j)',
    source: 'paper',
  },
  {
    label: 'Alignment',
    latex: 'A_i = \\frac{\\sum_{j=1}^{N} V_j}{N}',
    source: 'paper',
  },
  {
    label: 'Cohesion',
    latex: 'C_i = \\frac{\\sum_{j=1}^{N} X_j}{N} - X_i',
    source: 'paper',
  },
  {
    label: 'Food attraction',
    latex: 'F_i = X^{+} - X_i',
    source: 'paper',
  },
  {
    label: 'Enemy distraction',
    latex: 'E_i = X^{-} + X_i',
    source: 'paper',
  },
];

const updateFormulas: Formula[] = [
  {
    label: 'Step vector',
    latex: '\\Delta X_{t+1} = (sS_i + aA_i + cC_i + fF_i + eE_i) + w\\Delta X_t',
    source: 'paper',
  },
  {
    label: 'Position',
    latex: 'X_{t+1} = X_t + \\Delta X_{t+1}',
    source: 'paper',
  },
];

const biologySlide = contentSlide({
  id: 'da-biology',
  section: 'Dragonfly Algorithm',
  className: 'slide--da',
  kicker: 'Dragonfly Algorithm · 01',
  title: 'Kawanan capung sebagai model pencarian',
  lede:
    'DA memakai gerak kolektif capung untuk menyeimbangkan eksplorasi area baru dan eksploitasi area yang menjanjikan.',
  body: `
    <div class="biology-grid">
      <article class="biology-panel biology-panel--static">
        <header class="biology-panel__head">
          <span class="biology-panel__label">Static swarm</span>
          <span class="biology-panel__tag">eksplorasi lokal</span>
        </header>
        <div class="swarm-map swarm-map--static" aria-hidden="true">
          <span class="swarm-map__food">food</span>
          <span class="swarm-dot" style="left: 18%; top: 58%"></span>
          <span class="swarm-dot" style="left: 30%; top: 36%"></span>
          <span class="swarm-dot" style="left: 42%; top: 66%"></span>
          <span class="swarm-dot" style="left: 54%; top: 42%"></span>
          <span class="swarm-dot" style="left: 66%; top: 61%"></span>
          <span class="swarm-dot" style="left: 44%; top: 48%"></span>
        </div>
        <p>Kelompok kecil bergerak lokal di sekitar sumber makanan.</p>
      </article>

      <article class="biology-panel biology-panel--dynamic">
        <header class="biology-panel__head">
          <span class="biology-panel__label">Dynamic swarm</span>
          <span class="biology-panel__tag">migrasi global</span>
        </header>
        <div class="swarm-map swarm-map--dynamic" aria-hidden="true">
          <span class="swarm-map__enemy">enemy</span>
          <span class="swarm-dot" style="left: 12%; top: 24%"></span>
          <span class="swarm-dot" style="left: 24%; top: 68%"></span>
          <span class="swarm-dot" style="left: 34%; top: 18%"></span>
          <span class="swarm-dot" style="left: 44%; top: 52%"></span>
          <span class="swarm-dot" style="left: 56%; top: 28%"></span>
          <span class="swarm-dot" style="left: 64%; top: 70%"></span>
          <span class="swarm-dot" style="left: 76%; top: 38%"></span>
          <span class="swarm-dot" style="left: 84%; top: 58%"></span>
        </div>
        <p>Kelompok besar menempuh jarak jauh untuk mencari area solusi baru.</p>
      </article>
    </div>

    <div class="biology-note">
      <strong>Konteks.</strong> Static/dynamic swarm adalah konsep DA asli
      ${cite('Mirjalili 2015')}. Paper tugas memakai DA untuk load balancing dan
      resource allocation di cloud.
    </div>
  `,
  footer: `
    <span>Diagram dibuat ulang; bukan figur paper.</span>
    <span>Konsep swarm: ${cite('Mirjalili 2015')}.</span>
  `,
  notes:
    'Static swarm cocok untuk eksplorasi lokal di sekitar food; dynamic swarm ' +
    'untuk migrasi global. Jangan klaim paper tugas membahas static/dynamic ' +
    'secara eksplisit; ini konsep DA asli yang dipakai untuk menjelaskan perilaku.',
});

const behaviorSlide = contentSlide({
  id: 'da-behaviors',
  section: 'Dragonfly Algorithm',
  className: 'slide--da',
  kicker: 'Dragonfly Algorithm · 02',
  title: 'Lima perilaku yang membentuk langkah',
  lede:
    'Setiap capung menghitung lima vektor perilaku terhadap tetangga, food, dan enemy. Kelima vektor digabung dengan bobot untuk menentukan langkah.',
  body: `
    <div class="behavior-grid">
      <article class="behavior-card">
        <span class="behavior-card__index">S</span>
        <h3>Separation</h3>
        <p>Menjauh dari tetangga agar tidak bertumpuk.</p>
        <span class="behavior-card__formula">S_i</span>
      </article>
      <article class="behavior-card">
        <span class="behavior-card__index">A</span>
        <h3>Alignment</h3>
        <p>Menyelaraskan kecepatan dengan tetangga.</p>
        <span class="behavior-card__formula">A_i</span>
      </article>
      <article class="behavior-card">
        <span class="behavior-card__index">C</span>
        <h3>Cohesion</h3>
        <p>Menjaga kelompok tetap berdekatan.</p>
        <span class="behavior-card__formula">C_i</span>
      </article>
      <article class="behavior-card behavior-card--food">
        <span class="behavior-card__index">F</span>
        <h3>Food attraction</h3>
        <p>Tertarik ke sumber makanan terbaik.</p>
        <span class="behavior-card__formula">F_i</span>
      </article>
      <article class="behavior-card behavior-card--enemy">
        <span class="behavior-card__index">E</span>
        <h3>Enemy distraction</h3>
        <p>Menjauh dari musuh yang berbahaya.</p>
        <span class="behavior-card__formula">E_i</span>
      </article>
    </div>

    <div class="behavior-note">
      <span>Cohesion disebut <strong>“integrity”</strong> di paper tugas.</span>
      <span>Food = kandidat terbaik; enemy = kandidat terburuk.</span>
    </div>
  `,
  footer: `
    <span>Lima perilaku: ${cite('Paper tugas')} · verifikasi ${cite('Mirjalili 2015')}.</span>
    <span>Bobot perilaku: s, a, c, f, e; bobot langkah: w.</span>
  `,
  notes:
    'Tekankan bahwa lima perilaku ini bukan lima algoritma terpisah. Semua ' +
    'dihitung, lalu digabung dalam satu step vector. Cohesion di paper tugas ' +
    'disebut integrity; alignment memakai vektor kecepatan V_j.',
});

const formulaSlide = contentSlide({
  id: 'da-formulas',
  section: 'Dragonfly Algorithm',
  className: 'slide--da slide--formulas',
  kicker: 'Dragonfly Algorithm · 03',
  title: 'Rumus perilaku dan update posisi',
  lede:
    'Lima vektor digabung dengan bobot, lalu posisi diperbarui.',
  body: `
    <div class="formula-layout">
      <div class="formula-stack">
        <div class="formula-grid">
          ${behaviorFormulas.map(formulaRow).join('')}
        </div>
        ${updateFormulas.map(formulaRow).join('')}
      </div>

      <aside class="formula-side">
        <div class="symbol-key">
          <p class="symbol-key__label">Glosarium simbol</p>
          <dl>
            <div><dt>X_i</dt><dd>posisi capung i</dd></div>
            <div><dt>X_j</dt><dd>posisi tetangga j</dd></div>
            <div><dt>V_j</dt><dd>vektor kecepatan tetangga</dd></div>
            <div><dt>N</dt><dd>jumlah tetangga</dd></div>
            <div><dt>X⁺</dt><dd>food / kandidat terbaik</dd></div>
            <div><dt>X⁻</dt><dd>enemy / kandidat terburuk</dd></div>
            <div><dt>s,a,c,f,e</dt><dd>bobot lima perilaku</dd></div>
            <div><dt>w</dt><dd>bobot inertia langkah</dd></div>
            <div><dt>ΔX_t</dt><dd>step vector iterasi t</dd></div>
            <div><dt>t</dt><dd>indeks iterasi</dd></div>
          </dl>
        </div>

        <div class="verification-box">
          <p class="verification-box__label">Temuan verifikasi</p>
          <ul>
            <li>Cohesion = <strong>“integrity”</strong> di paper tugas.</li>
            <li>Alignment memakai <strong>V_j</strong>, bukan posisi.</li>
            <li><strong>E_i = X⁻ + X_i</strong>, bukan X⁻ − X_i.</li>
          </ul>
        </div>
      </aside>
    </div>
  `,
  footer: `
    <span>Bentuk rumus: ${cite('Paper tugas')}; verifikasi ke ${cite('Mirjalili 2015')}.</span>
    <span>Lévy flight dan cabang tanpa tetangga dibahas slide berikutnya.</span>
  `,
  notes:
    'Jangan buru-buru ke Lévy. Pastikan audiens melihat bahwa S, A, C, F, E ' +
    'adalah vektor, bukan skalar. Alignment memakai V_j; enemy memakai tanda +. ' +
    'Paper tugas menampilkan rumus sebagai gambar, jadi bentuknya diverifikasi ' +
    'ke Mirjalili 2015.',
});

const levySlide = contentSlide({
  id: 'da-levy',
  section: 'Dragonfly Algorithm',
  className: 'slide--da slide--levy',
  kicker: 'Dragonfly Algorithm · 04',
  title: 'Saat tidak ada tetangga: Lévy flight',
  lede:
    'Paper tugas memakai cabang CN ≥ 1. Jika tidak ada tetangga, DA asli memakai Lévy flight untuk keluar dari area sempit.',
  body: `
    <div class="levy-layout">
      <div class="branch-flow">
        <div class="branch-node">
          <span class="branch-node__label">Hitung tetangga</span>
          <strong>CN = jumlah tetangga dalam radius</strong>
        </div>
        <div class="branch-node branch-node--decision">
          <span class="branch-node__label">Keputusan</span>
          <strong>CN ≥ 1?</strong>
        </div>
        <div class="branch-split">
          <div class="branch-node branch-node--yes">
            <span class="branch-node__label">Ya</span>
            <strong>Update ΔX dan X</strong>
            <p>Gabungkan S, A, C, F, E dengan bobot.</p>
          </div>
          <div class="branch-node branch-node--no">
            <span class="branch-node__label">Tidak</span>
            <strong>Lévy flight</strong>
            <p>Langkah acak berekor berat untuk eksplorasi.</p>
          </div>
        </div>
        <div class="branch-node branch-node--last">
          <span class="branch-node__label">Lanjut</span>
          <strong>Iterasi berikutnya</strong>
        </div>
      </div>

      <aside class="levy-side">
        <div class="levy-formula">
          <div class="levy-formula__head">
            <span>Lévy flight</span>
            ${sourceBadge('mirjalili')}
          </div>
          <div class="formula-row__math" data-katex="X_{t+1} = X_t + \\mathrm{Levy}(d) \\times X_t"></div>
        </div>

        <div class="levy-notes">
          <p><strong>Lévy flight</strong> adalah langkah acak dengan ekor distribusi berat: sebagian besar langkah kecil, sesekali langkah jauh.</p>
          <p>Paper tugas <strong>tidak menulis rumus Lévy secara eksplisit</strong>; flowchart hanya menunjukkan cabang <strong>CN ≥ 1?</strong>.</p>
          <p>Karena itu slide menandai bentuk rumus sebagai ${cite('Mirjalili 2015')}.</p>
        </div>
      </aside>
    </div>
  `,
  footer: `
    <span>Cabang CN ≥ 1? mengikuti flowchart ${cite('Paper tugas', 'Fig. 1')}.</span>
    <span>Rumus Lévy: ${cite('Mirjalili 2015')}; tidak eksplisit di paper tugas.</span>
  `,
  notes:
    'Jelaskan Lévy flight sebagai mekanisme eksplorasi saat capung tidak punya ' +
    'tetangga. Ini penting untuk menghindari stagnasi. Tandai jelas bahwa paper ' +
    'tugas tidak menulis rumus Lévy; kita meminjam bentuk dari Mirjalili 2015.',
});

const mappingSlide = contentSlide({
  id: 'da-mapping',
  section: 'Dragonfly Algorithm',
  className: 'slide--da slide--mapping',
  kicker: 'Dragonfly Algorithm · 05',
  title: 'Memetakan capung ke VM dan task',
  lede:
    'Paper memetakan posisi capung ke VM, food ke VM berbeban rendah, dan enemy ke VM yang tidak cocok. Encoding task→VM tidak dijelaskan eksplisit.',
  body: `
    <div class="interpretation-banner">
      <strong>Interpretasi paper.</strong>
      <span>Pemetaan ini membaca Fig. 1 dan deskripsi paper; bukan encoding formal yang dirinci penulis.</span>
    </div>

    <div class="mapping-grid">
      <article class="mapping-card mapping-card--cyan">
        <span class="mapping-card__role">Capung / posisi</span>
        <strong>VM</strong>
        <p>Setiap posisi capung merepresentasikan pilihan VM dalam ruang solusi.</p>
      </article>
      <article class="mapping-card mapping-card--green">
        <span class="mapping-card__role">Food</span>
        <strong>VM beban rendah</strong>
        <p>VM yang cocok untuk task prioritas tinggi dan beban rendah.</p>
      </article>
      <article class="mapping-card mapping-card--red">
        <span class="mapping-card__role">Enemy</span>
        <strong>VM tidak cocok</strong>
        <p>VM yang dikeluarkan dari daftar pilihan karena tidak sesuai.</p>
      </article>
    </div>

    <div class="paper-pipeline">
      <p class="paper-pipeline__label">Alur sistem ${cite('Paper tugas', 'Fig. 1')}</p>
      <div class="paper-pipeline__steps">
        <span>Inisialisasi datacenter, host, VM</span>
        <span>Request → task</span>
        <span>Tentukan jumlah VM &amp; task</span>
        <span>DA: penjadwalan + load balance</span>
        <span>Evaluasi metrik</span>
      </div>
    </div>

    <div class="mapping-note">
      <strong>Catatan.</strong> Encoding solusi task→VM dan fitness function tidak
      dijelaskan eksplisit di paper tugas. Detail ini perlu diputuskan saat
      implementasi simulator.
    </div>
  `,
  footer: `
    <span>Pemetaan: interpretasi ${cite('Paper tugas', 'Fig. 1 dan deskripsi sistem')}.</span>
    <span>Diagram dibuat ulang; bukan salinan figur paper.</span>
  `,
  notes:
    'Pemetaan capung=VM, food=VM beban rendah, enemy=VM tidak cocok adalah ' +
    'interpretasi dari paper. Jangan mengklaim paper menjelaskan encoding ' +
    'task→VM secara formal. Ini akan menjadi pekerjaan penting di simulator.',
});

const flowSlide = contentSlide({
  id: 'da-flow',
  section: 'Dragonfly Algorithm',
  className: 'slide--da slide--flow',
  kicker: 'Dragonfly Algorithm · 06',
  title: 'Alur DA dari inisialisasi ke evaluasi',
  lede:
    'Flowchart ini merekonstruksi alur paper secara sederhana. Versi interaktif penuh dapat menyusul tanpa mengubah urutan langkah.',
  body: `
    <div class="paper-flow">
      <ol class="flow-list">
        <li>
          <span class="flow-list__num">01</span>
          <div>
            <strong>Inisialisasi</strong>
            <p>Siapkan datacenter, host, VM, posisi capung, dan step vector.</p>
          </div>
        </li>
        <li>
          <span class="flow-list__num">02</span>
          <div>
            <strong>Request → task</strong>
            <p>Request dipecah menjadi task yang harus dijadwalkan.</p>
          </div>
        </li>
        <li>
          <span class="flow-list__num">03</span>
          <div>
            <strong>Tentukan populasi</strong>
            <p>Tetapkan jumlah VM, task, radius tetangga, dan bobot perilaku.</p>
          </div>
        </li>
        <li>
          <span class="flow-list__num">04</span>
          <div>
            <strong>Jalankan DA</strong>
            <p>Hitung S, A, C, F, E → update ΔX → update X.</p>
          </div>
        </li>
        <li>
          <span class="flow-list__num">05</span>
          <div>
            <strong>Evaluasi</strong>
            <p>Ukur execution time, response time, migration, dan load balance.</p>
          </div>
        </li>
        <li>
          <span class="flow-list__num">06</span>
          <div>
            <strong>Iterasi / selesai</strong>
            <p>Ulangi sampai kriteria berhenti, lalu keluarkan jadwal.</p>
          </div>
        </li>
      </ol>

      <aside class="flow-aside">
        <div class="flow-aside__box">
          <p class="flow-aside__label">Di dalam langkah 04</p>
          <div class="flow-aside__branch">
            <span>CN ≥ 1?</span>
            <div>
              <strong>Ya</strong>
              <p>Update ΔX dan X dari lima perilaku.</p>
            </div>
            <div>
              <strong>Tidak</strong>
              <p>Lévy flight ${cite('Mirjalili 2015')}.</p>
            </div>
          </div>
        </div>

        <div class="flow-aside__box flow-aside__box--note">
          <p class="flow-aside__label">Catatan</p>
          <p>Encoding task→VM tidak eksplisit di paper. Flowchart ini rekonstruksi alur, bukan reproduksi Fig. 1.</p>
        </div>
      </aside>
    </div>
  `,
  footer: `
    <span>Alur sistem: ${cite('Paper tugas', 'Fig. 1')}.</span>
    <span>Versi interaktif penuh menyusul; struktur langkah tetap.</span>
  `,
  notes:
    'Gunakan slide ini sebagai peta alur, bukan pembahasan rumus lagi. ' +
    'Jika waktu mepet, cukup tunjuk langkah 04 dan cabang CN >= 1?. Versi ' +
    'interaktif penuh akan menambahkan panel detail per langkah.',
});

const resultsSlide = contentSlide({
  id: 'da-results',
  section: 'Dragonfly Algorithm',
  className: 'slide--da slide--da-results',
  kicker: 'Dragonfly Algorithm · 07',
  title: 'Hasil paper DA: angka tabel dan catatannya',
  lede:
    'Grafik Tabel 1–3; pilih metrik dan VM, tanpa interpolasi.',
  body: `
    ${paperChartMarkup(daChartData)}

    <div class="paper-caveat paper-caveat--da">
      <strong>Catatan kejanggalan DA.</strong>
      <ul>
        <li>Tabel 1: kolom task 10/20/40 identik (<strong>0.27 / 0.5 / 0.31</strong>) di semua jumlah VM.</li>
        <li>Hasil 500 task lebih kecil dari 200 task: VMs 5 <strong>1.59 → 1.4</strong>; VMs 20 <strong>1.15 → 0.96</strong>; VMs 40 <strong>0.94 → 0.75</strong>.</li>
        <li>Satuan execution time tidak konsisten: teks “about 0.3 milliseconds”, tabel <strong>0.27–2.07</strong>, figur berlabel <strong>mS</strong>.</li>
      </ul>
    </div>
  `,
  footer: `
    <span>Sumber: ${cite('Amini et al. 2018', 'Tabel 1–3')}.</span>
    <span>Tabel 4 ringkasan tidak dipakai di grafik; fokus pada Tabel 1–3.</span>
  `,
  notes:
    'Buka dengan peringatan: grafik Tabel 1 tidak boleh dibaca sebagai hasil ' +
    'wajar tanpa catatan. Tunjukkan kolom 10/20/40 yang identik, hasil 500 ' +
    'task yang lebih rendah dari 200, dan satuan waktu yang tidak konsisten. ' +
    'Grafik hanya memakai Tabel 1–3; Tabel 4 tidak ditampilkan.',
});

export const daSlides: string[] = [
  biologySlide,
  behaviorSlide,
  formulaSlide,
  levySlide,
  mappingSlide,
  flowSlide,
  resultsSlide,
];
