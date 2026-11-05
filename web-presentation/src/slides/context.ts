import { cite, contentSlide } from '../lib/slide';

const schedulingSlide = contentSlide({
  id: 'context-scheduling',
  section: 'Konteks',
  className: 'slide--context',
  kicker: 'Konteks · 01',
  title: 'Dari task ke VM: apa yang dijadwalkan?',
  lede:
    'Scheduler memetakan setiap task ke VM. Kualitas jadwal dinilai dari waktu, keseimbangan beban, energi, dan kepatuhan SLA.',
  body: `
    <div class="context-flow" aria-label="Hierarki sumber daya cloud">
      <div class="context-flow__step">
        <span class="context-flow__label">Datacenter</span>
        <span class="context-flow__desc">Fasilitas fisik yang menampung host dan sumber daya.</span>
      </div>
      <div class="context-flow__step">
        <span class="context-flow__label">Host</span>
        <span class="context-flow__desc">Mesin fisik yang menjalankan satu atau beberapa VM.</span>
      </div>
      <div class="context-flow__step">
        <span class="context-flow__label">VM</span>
        <span class="context-flow__desc">Unit komputasi virtual dengan kapasitas pemrosesan.</span>
      </div>
      <div class="context-flow__step">
        <span class="context-flow__label">Task</span>
        <span class="context-flow__desc">Pekerjaan yang harus dieksekusi pada salah satu VM.</span>
      </div>
    </div>

    <div class="metric-grid">
      <article class="metric-card">
        <h3 class="metric-card__name">Makespan</h3>
        <p>Waktu selesai task terakhir; semakin kecil semakin baik.</p>
      </article>
      <article class="metric-card">
        <h3 class="metric-card__name">Response time</h3>
        <p>Waktu tunggu ditambah waktu eksekusi yang dialami task.</p>
      </article>
      <article class="metric-card">
        <h3 class="metric-card__name">Load balance</h3>
        <p>Pemerataan beban antar-VM; semakin merata semakin baik.</p>
      </article>
      <article class="metric-card">
        <h3 class="metric-card__name">Energy</h3>
        <p>Daya yang dikonsumsi host dan VM saat menjalankan task.</p>
      </article>
      <article class="metric-card">
        <h3 class="metric-card__name">SLA</h3>
        <p>Kesepakatan layanan; pelanggaran terjadi saat target tidak terpenuhi.</p>
      </article>
    </div>

    <div class="context-takeaway">
      <strong>Inti</strong>
      <span>Scheduler memilih penugasan task→VM; metrik menentukan apa yang dianggap jadwal bagus.</span>
    </div>
  `,
  footer: `
    <span>Definisi umum untuk konteks, bukan hasil pengukuran paper.</span>
    <span>Model sistem DBO: ${cite('Karim et al. 2024', 'Eq. (1), (9)–(12)')}</span>
  `,
  notes:
    'Bangun kosakata dasar: task, VM, host, datacenter. Tekankan bahwa makespan ' +
    'berbeda dari response time: makespan melihat keseluruhan jadwal, response ' +
    'time melihat pengalaman tiap task. Metrik lain akan muncul lagi di hasil paper.',
});

const metaheuristicsSlide = contentSlide({
  id: 'context-metaheuristics',
  section: 'Konteks',
  className: 'slide--context',
  kicker: 'Konteks · 02',
  title: 'Mengapa metaheuristik?',
  lede:
    'Ruang solusi m^n membuat pencarian eksak mahal; metaheuristik menukar jaminan optimal dengan solusi layak.',
  body: `
    <div class="context-split">
      <article class="panel panel--cyan">
        <p class="panel__label">NP-hard</p>
        <h3>Solusi optimal sulit dijamin cepat</h3>
        <p>
          Penjadwalan pada mesin paralel termasuk NP-hard. Waktu pencarian eksak
          tumbuh cepat saat jumlah task, VM, dan constraint bertambah.
        </p>
        <div class="growth">
          <div class="growth__item">
            <span>4 VM · 10 task</span>
            <strong>≈ 10<sup>6</sup></strong>
            <small>kemungkinan penugasan</small>
          </div>
          <div class="growth__item">
            <span>4 VM · 20 task</span>
            <strong>≈ 10<sup>12</sup></strong>
            <small>kemungkinan penugasan</small>
          </div>
        </div>
        <p class="panel__note">Ilustrasi kombinatorial m^n, bukan data paper.</p>
      </article>

      <article class="panel">
        <p class="panel__label">Posisi pendekatan</p>
        <h3>Heuristik vs metaheuristik</h3>
        <table class="compare-table">
          <thead>
            <tr>
              <th scope="col">Aspek</th>
              <th scope="col">Heuristik</th>
              <th scope="col">Metaheuristik</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aturan</td>
              <td>Spesifik masalah</td>
              <td>Kerangka pencarian umum</td>
            </tr>
            <tr>
              <td>Jaminan</td>
              <td>Tidak ada optimalitas</td>
              <td>Tidak ada optimalitas</td>
            </tr>
            <tr>
              <td>Tujuan</td>
              <td>Cepat dan layak</td>
              <td>Hampir optimal dengan waktu wajar</td>
            </tr>
            <tr>
              <td>Perilaku</td>
              <td>Satu aturan konstruktif</td>
              <td>Iterasi populasi dan perbaikan solusi</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>

    <div class="concept-strip">
      <div class="concept-chip concept-chip--cyan">
        <strong>Exploration</strong>
        <span>Jelajahi area solusi baru.</span>
      </div>
      <div class="concept-chip concept-chip--amber">
        <strong>Exploitation</strong>
        <span>Perbaiki kandidat di sekitar solusi terbaik.</span>
      </div>
      <p>Metaheuristik mengatur keseimbangan keduanya lewat iterasi dan populasi.</p>
    </div>

  `,
  footer: `
    <span>NP-hard: sifat umum penjadwalan pada mesin paralel.</span>
    <span>Angka 4^n adalah ilustrasi kombinatorial, bukan data paper.</span>
  `,
  notes:
    'Jangan masuk ke rumus dulu. Cukup tanamkan intuisi: ruang solusi meledak, ' +
    'pencarian eksak mahal, metaheuristik menukar jaminan optimal dengan biaya ' +
    'komputasi yang wajar. Exploration/exploitation akan dipakai lagi saat ' +
    'membandingkan DA dan DBO.',
});

const algorithmOverviewSlide = contentSlide({
  id: 'context-compare',
  section: 'Konteks',
  className: 'slide--context',
  kicker: 'Konteks · 03',
  title: 'DA dan DBO: dua strategi, satu tujuan',
  lede:
    'Keduanya mencari penugasan task ke VM, dengan model dan metrik berbeda.',
  body: `
    <div class="algo-compare">
      <article class="algo-card algo-card--cyan">
        <header class="algo-card__head">
          <div>
            <p class="algo-card__label">Algoritma 1 · 2018</p>
            <h3>Dragonfly Algorithm</h3>
          </div>
          <span class="badge badge--cyan">DA</span>
        </header>
        <p class="algo-card__source">
          ${cite('Amini et al. 2018')} · load balancing dan resource allocation
        </p>
        <ul class="algo-list">
          <li>
            <strong>Inspirasi</strong>
            <span>Kawanan capung; gerak kolektif di ruang solusi.</span>
          </li>
          <li>
            <strong>Lima perilaku</strong>
            <span>Separation, alignment, cohesion (paper: “integrity”), food attraction, enemy distraction.</span>
          </li>
          <li>
            <strong>Pencarian</strong>
            <span>Step vector dan position vector; Lévy flight saat tanpa tetangga ${cite('Mirjalili 2015')}.</span>
          </li>
          <li>
            <strong>Fokus metrik</strong>
            <span>Execution time, response time, migrated tasks, load balance.</span>
          </li>
        </ul>
      </article>

      <article class="algo-card algo-card--amber">
        <header class="algo-card__head">
          <div>
            <p class="algo-card__label">Algoritma 2 · 2024</p>
            <h3>Dung Beetle Optimization</h3>
          </div>
          <span class="badge badge--amber">DBO</span>
        </header>
        <p class="algo-card__source">
          ${cite('Karim et al. 2024')} · EASA-MORU
        </p>
        <ul class="algo-list">
          <li>
            <strong>Inspirasi</strong>
            <span>Kumbang kotoran; pembagian peran global dan local search.</span>
          </li>
          <li>
            <strong>Lima perilaku</strong>
            <span>Rolling, dancing, breeding, foraging, stealing.</span>
          </li>
          <li>
            <strong>Pencarian</strong>
            <span>Global: rolling dan dancing. Local: breeding, foraging, stealing.</span>
          </li>
          <li>
            <strong>Fokus metrik</strong>
            <span>Fitness Eq. (22): makespan, energi, SLA. Metrik uji: WAITT, RESPT, LB, THRPT, RELE, RELY, CT.</span>
          </li>
        </ul>
      </article>
    </div>

    <div class="verify-note">
      <strong>Catatan verifikasi.</strong> Kedua paper tidak merinci encoding solusi
      task→VM secara eksplisit ${cite('Amini et al. 2018')} ${cite('Karim et al. 2024')}.
      Rasio subpopulasi DBO juga tidak ditetapkan paper.
    </div>

  `,
  footer: `
    <span>Sumber: ${cite('Amini et al. 2018')} · ${cite('Karim et al. 2024')}.</span>
    <span>Lévy: ${cite('Mirjalili 2015')}, tidak eksplisit di paper tugas.</span>
  `,
  notes:
    'Ini peta pembanding, bukan kesimpulan pemenang. Sebutkan tiga sumbu: model ' +
    'perilaku, strategi pencarian, dan metrik. Ingatkan bahwa keduanya tidak ' +
    'menjelaskan encoding task→VM secara eksplisit, jadi perbandingan harus ' +
    'dibaca sebagai perbandingan desain algoritma, bukan reproduksi hasil.',
});

export const contextSlides: string[] = [
  schedulingSlide,
  metaheuristicsSlide,
  algorithmOverviewSlide,
];
