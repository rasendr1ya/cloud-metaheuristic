import { referenceEntries } from '../data/references';
import { cite, contentSlide } from '../lib/slide';

interface CompareRow {
  label: string;
  da: string;
  dbo: string;
}

const compareRows: CompareRow[] = [
  {
    label: 'Inspirasi & struktur',
    da: 'Capung; static/dynamic swarm; step + position vector.',
    dbo: 'Lima perilaku; rolling/dancing global, breeding/foraging/stealing lokal.',
  },
  {
    label: 'Encoding task→VM',
    da: 'Tidak eksplisit; posisi dipetakan ke VM sebagai interpretasi.',
    dbo: 'Tidak eksplisit; pemetaan posisi kontinu tidak dirinci.',
  },
  {
    label: 'Metrik & lingkungan',
    da: 'Execution, response, migration, load; MATLAB 2013a.',
    dbo: 'WAITT, RESPT, LB, THRPT, RELE, RELY, CT; Python 3.6.5.',
  },
  {
    label: 'Kelebihan & kekurangan',
    da: 'Ringkas dan adaptif; encoding/fitness/satuan belum jelas.',
    dbo: 'Eksplorasi/eksploitasi terpisah; aturan banyak, waktu paling lambat.',
  },
  {
    label: 'Kecocokan dataset',
    da: '10–500 task, 5–40 VM; belum ada dataset nyata.',
    dbo: '100–500 request; belum ada dataset nyata.',
  },
];

const compareMarkup = compareRows
  .map(
    (row) => `
      <div class="syn-compare__row" role="row">
        <div class="syn-compare__label" role="rowheader">${row.label}</div>
        <div class="syn-compare__cell syn-compare__cell--da" role="cell">${row.da}</div>
        <div class="syn-compare__cell syn-compare__cell--dbo" role="cell">${row.dbo}</div>
      </div>
    `,
  )
  .join('');

const comparisonSlide = contentSlide({
  id: 'synthesis-compare',
  section: 'Sintesis',
  className: 'slide--syn slide--syn-compare',
  kicker: 'Sintesis · 01',
  title: 'DA vs DBO: beda cara mencari',
  lede:
    'Model pencarian, metrik, dan lingkungan eksperimennya berbeda.',
  body: `
    <div class="syn-compare" role="table" aria-label="Perbandingan Dragonfly Algorithm dan Dung Beetle Optimization">
      <div class="syn-compare__head" role="row">
        <span role="columnheader">Aspek</span>
        <span class="syn-compare__head-cell syn-compare__head-cell--da" role="columnheader">Dragonfly Algorithm</span>
        <span class="syn-compare__head-cell syn-compare__head-cell--dbo" role="columnheader">Dung Beetle Optimization</span>
      </div>
      ${compareMarkup}
    </div>

    <div class="syn-note syn-note--compare">
      <strong>Aturan baca.</strong> Jangan membandingkan angka lintas paper:
      metrik, dataset, dan lingkungan eksperimennya tidak setara.
      Dataset tugas dan spesifikasi datacenter belum ditetapkan.
    </div>
  `,
  footer: `
    <span>Fakta paper: ${cite('Amini et al. 2018')} · ${cite('Karim et al. 2024')}.</span>
    <span>Perbandingan struktur dan bukti, bukan pemenang universal.</span>
  `,
  notes:
    'Bandingkan pada sumbu yang adil: inspirasi, cara update, encoding, metrik, ' +
    'dan kecocokan dataset. Jangan menyandingkan angka DA dan DBO. Keduanya ' +
    'tidak menjelaskan encoding task ke VM; ini pekerjaan simulator.',
});

const critiqueSlide = contentSlide({
  id: 'synthesis-critique',
  section: 'Sintesis',
  className: 'slide--syn slide--syn-critique',
  kicker: 'Sintesis · 02',
  title: 'Analisis kritis: bukti dan celah paper',
  lede:
    'Catatan ini soal keterbacaan bukti, bukan tuduhan. Badge membedakan fakta yang dicek langsung dari celah yang tidak dijelaskan paper.',
  body: `
    <div class="syn-critique">
      <article class="syn-crit-card syn-crit-card--da">
        <header class="syn-crit-card__head">
          <div>
            <p class="syn-crit-card__label">Paper tugas · DA</p>
            <h3>Amini et al. 2018</h3>
          </div>
          <span class="syn-badge syn-badge--fact">4 temuan</span>
        </header>
        <ul class="syn-crit-list">
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>Tabel 1:</strong> kolom 10, 20, dan 40 task identik untuk semua jumlah VM: <span class="syn-mono">0.27 / 0.5 / 0.31</span>.</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>500 task &lt; 200 task:</strong> VMs 5 <span class="syn-mono">1.59 → 1.4</span>; VMs 20 <span class="syn-mono">1.15 → 0.96</span>; VMs 40 <span class="syn-mono">0.94 → 0.75</span>.</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>Satuan waktu:</strong> teks menyebut “about 0.3 milliseconds”; tabel memuat <span class="syn-mono">0.27–2.07</span>; figur berlabel <span class="syn-mono">mS</span>.</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--gap">Gap</span>
            <span><strong>Encoding &amp; fitness:</strong> penugasan task→VM dan fungsi objektif tidak dijelaskan eksplisit.</span>
          </li>
        </ul>
        <p class="syn-crit-card__note">
          Rumus (1)–(7) di PDF berupa gambar; bentuknya diverifikasi ke ${cite('Mirjalili 2015')}.
        </p>
      </article>

      <article class="syn-crit-card syn-crit-card--dbo">
        <header class="syn-crit-card__head">
          <div>
            <p class="syn-crit-card__label">Paper tugas · DBO</p>
            <h3>Karim et al. 2024</h3>
          </div>
          <span class="syn-badge syn-badge--fact">5 temuan</span>
        </header>
        <ul class="syn-crit-list">
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>Abstrak vs rumus:</strong> abstrak menulis “maximize the makespan”; Eq. (22) eksplisit memakai <span class="syn-mono">min</span>.</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>Parameter ML:</strong> learning rate 0.01, ReLU, epoch 50, dropout 0.5, batch 5 tidak muncul di persamaan DBO.</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>Algorithm 1:</strong> satu update generik; tidak identik dengan Eq. (2)–(8); tidak ada partisi subpopulasi.</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--fact">Fakta</span>
            <span><strong>Computational time:</strong> paling lambat di Tabel 8: <span class="syn-mono">2634 ms</span> (100 request), <span class="syn-mono">1090 ms</span> (500 request).</span>
          </li>
          <li>
            <span class="syn-badge syn-badge--gap">Gap</span>
            <span><strong>Encoding:</strong> pemetaan posisi kontinu ke task→VM tidak dijelaskan.</span>
          </li>
        </ul>
        <p class="syn-crit-card__note">
          Rasio subpopulasi tidak tetap; contoh 6/6/7/11 bukan aturan umum DBO.
        </p>
      </article>
    </div>

    <div class="syn-note syn-note--critique">
      <strong>Nada baca.</strong> Ini indikasi keterbatasan transparansi dan konsistensi,
      bukan tuduhan kesalahan sengaja. Semua angka berasal dari tabel paper.
    </div>
  `,
  footer: `
    <span>Sumber: ${cite('Amini et al. 2018', 'Tabel 1–3')} · ${cite('Karim et al. 2024', 'Tabel 2–8')}.</span>
    <span>Fakta = dicek di PDF; Gap = tidak dirinci paper.</span>
  `,
  notes:
    'Sampaikan dengan nada netral. DA: kolom task 10/20/40 identik, hasil 500 ' +
    'task lebih rendah dari 200, satuan waktu tidak konsisten. DBO: abstrak ' +
    'maximize bertentangan dengan Eq. 22 min, parameter ML tidak relevan, ' +
    'Algorithm 1 tidak identik dengan lima persamaan, dan CT paling lambat. ' +
    'Bedakan fakta tabel dari interpretasi encoding.',
});

const planSlide = contentSlide({
  id: 'synthesis-plan',
  section: 'Sintesis',
  className: 'slide--syn slide--syn-plan',
  kicker: 'Sintesis · 03',
  title: 'Rencana simulator: dari paper ke eksperimen sendiri',
  lede:
    'Semua isi slide ini adalah rencana, bukan hasil. Simulator akan memakai encoding dan metrik yang didefinisikan eksplisit.',
  body: `
    <div class="syn-plan-flag">
      <strong>Rencana implementasi.</strong>
      Belum ada hasil simulasi. Dataset dan spesifikasi datacenter menunggu keputusan tugas minggu 3.
    </div>

    <div class="syn-plan-grid">
      <div class="syn-plan-card syn-plan-card--span-2 syn-plan-card--objective">
        <p class="syn-plan-card__label">Objektif minimal</p>
        <ul class="syn-plan-list">
          <li><strong>Makespan</strong><span>Minimalkan waktu selesai seluruh task.</span></li>
          <li><strong>Load balance</strong><span>Minimalkan simpangan beban VM. Definisi operasional: usulan kami.</span></li>
        </ul>
        <p class="syn-plan-card__foot">Energi dan SLA menjadi metrik pemantauan bila model tersedia.</p>
      </div>

      <div class="syn-plan-card syn-plan-card--span-2 syn-plan-card--encoding">
        <p class="syn-plan-card__label">Encoding usulan · bukan dari paper</p>
        <div class="syn-encoding">
          <code>solusi = [v₁, v₂, …, vₙ]</code>
          <code>vᵢ ∈ {1, …, m}</code>
        </div>
        <p class="syn-plan-card__text">
          Panjang vektor = jumlah task; nilai = indeks VM. Satu task tepat satu VM.
          Pelanggaran kapasitas ditangani dengan penalti atau repair.
        </p>
      </div>

      <div class="syn-plan-card syn-plan-card--span-2 syn-plan-card--params">
        <p class="syn-plan-card__label">Parameter yang dituning</p>
        <ul class="syn-plan-list syn-plan-list--tight">
          <li><strong>DA</strong><span>s, a, c, f, e, w, radius tetangga.</span></li>
          <li><strong>DBO</strong><span>k, b, θ, S, proporsi peran.</span></li>
          <li><strong>Umum</strong><span>populasi, iterasi, seed; tuning terpisah.</span></li>
        </ul>
      </div>

      <div class="syn-plan-card syn-plan-card--span-3">
        <p class="syn-plan-card__label">Metrik evaluasi</p>
        <div class="syn-metric-chips">
          <span>makespan</span>
          <span>load balance</span>
          <span>energi*</span>
          <span>runtime</span>
          <span>konvergensi</span>
          <span>SLA*</span>
        </div>
        <p class="syn-plan-card__foot">*Bila model dan deadline tersedia. Definisi metrik ditulis sebelum eksperimen.</p>
      </div>

      <div class="syn-plan-card syn-plan-card--span-3 syn-plan-card--waiting">
        <p class="syn-plan-card__label">Masih menunggu keputusan</p>
        <ul class="syn-wait-list">
          <li>Dataset task dari tugas minggu 3.</li>
          <li>Spesifikasi datacenter: jumlah host/VM, MIPS, RAM, model energi, deadline/SLA.</li>
          <li>Jumlah run dan skema tuning final.</li>
        </ul>
        <p class="syn-plan-card__foot">Tidak ada angka yang dikarang untuk mengisi bagian ini.</p>
      </div>
    </div>
  `,
  footer: `
    <span>Status: rencana · belum ada hasil simulasi.</span>
    <span>Encoding vektor integer adalah usulan kami, bukan encoding paper.</span>
  `,
  notes:
    'Tegaskan slide ini rencana. Dua objektif minimum: makespan dan load balance. ' +
    'Encoding vektor integer panjang n_task berisi indeks VM adalah usulan kami. ' +
    'Parameter DA dan DBO akan dituning terpisah. Dataset dan spesifikasi ' +
    'datacenter masih menunggu tugas minggu 3; jangan mengisi angka.',
});

const conclusionSlide = contentSlide({
  id: 'synthesis-conclusion',
  section: 'Penutup',
  className: 'slide--syn slide--syn-conclusion',
  kicker: 'Penutup · 04',
  title: 'Lima takeaway',
  lede:
    'DA dan DBO bukan dua versi algoritma yang sama. Perbedaan struktur pencarian dan kualitas bukti menentukan cara membacanya.',
  body: `
    <ol class="syn-takeaways">
      <li class="syn-takeaway">
        <span class="syn-takeaway__num">01</span>
        <p><strong>DA</strong> memakai step dan position vector dengan lima perilaku berbobot; <strong>DBO</strong> memisahkan peran global dan lokal secara eksplisit.</p>
      </li>
      <li class="syn-takeaway">
        <span class="syn-takeaway__num">02</span>
        <p>Kedua paper <strong>tidak merinci encoding task→VM</strong>; definisi encoding adalah keputusan implementasi simulator.</p>
      </li>
      <li class="syn-takeaway">
        <span class="syn-takeaway__num">03</span>
        <p>Metrik dan lingkungan eksperimen berbeda. <strong>Angka DA dan DBO tidak sebanding</strong> tanpa benchmark yang sama.</p>
      </li>
      <li class="syn-takeaway">
        <span class="syn-takeaway__num">04</span>
        <p>Kualitas bukti perlu dibaca kritis: ada inkonsistensi dan detail yang tidak dijelaskan, sehingga klaim paper tidak otomatis berlaku umum.</p>
      </li>
      <li class="syn-takeaway syn-takeaway--wide">
        <span class="syn-takeaway__num">05</span>
        <p><strong>Langkah berikutnya:</strong> simulator dengan dua objektif, seed tetap, dan dataset/spesifikasi datacenter dari tugas minggu 3.</p>
      </li>
    </ol>
  `,
  footer: `
    <span>Kesimpulan berasal dari pembacaan paper, bukan hasil eksperimen baru.</span>
    <span>Rencana simulator dibahas di slide sebelumnya.</span>
  `,
  notes:
    'Tutup dengan lima takeaway. Jangan memilih pemenang universal. Tekankan ' +
    'encoding task ke VM belum dijelaskan kedua paper, angka lintas paper tidak ' +
    'sebanding, dan langkah berikutnya adalah simulator dengan dataset minggu 3.',
});

const referencesMarkup = referenceEntries
  .map(
    (reference) => `
      <article class="syn-ref">
        <header class="syn-ref__head">
          <span class="syn-ref__role">${reference.role}</span>
          <span class="syn-ref__year">${reference.year}</span>
        </header>
        <p class="syn-ref__authors">${reference.authors}</p>
        <h3 class="syn-ref__title">${reference.title}</h3>
        <p class="syn-ref__venue">${reference.venue}</p>
        <p class="syn-ref__doi">
          <span>DOI</span>
          <a href="${reference.url}" target="_blank" rel="noreferrer">${reference.doi}</a>
        </p>
      </article>
    `,
  )
  .join('');

const referencesSlide = contentSlide({
  id: 'synthesis-references',
  section: 'Penutup',
  className: 'slide--syn slide--syn-references',
  kicker: 'Referensi · 05',
  title: 'Referensi',
  lede:
    'Dua paper tugas dan dua sumber asli algoritma. DOI dan URL dicek ulang sebelum dicantumkan.',
  body: `
    <div class="syn-refs">
      ${referencesMarkup}
    </div>

    <div class="syn-note syn-note--refs">
      <strong>Verifikasi akses.</strong> DOI diarahkan ke doi.org dan dicek pada 4 November 2026.
      Full text: Amini et al. (PDF Atlantis Press), Karim et al. (PLOS ONE), Mirjalili (Springer),
      Xue &amp; Shen (Springer).
    </div>
  `,
  footer: `
    <span>Semua sumber yang dipakai di deck tercantum di slide ini.</span>
    <span>Tidak ada sumber pendukung tambahan yang diklaim.</span>
  `,
  notes:
    'Bacakan hanya sumber utama bila waktu mepet. Empat entri: dua paper tugas ' +
    'dan dua sumber asli. DOI sudah dicek. Tidak ada sumber pendukung tambahan ' +
    'yang dipakai di slide ini.',
});

export const synthesisSlides: string[] = [
  comparisonSlide,
  critiqueSlide,
  planSlide,
  conclusionSlide,
  referencesSlide,
];
