import { dboChartData } from '../data/dbo';
import { cite, contentSlide } from '../lib/slide';
import { paperChartMarkup } from '../widgets/paper-chart-markup';

type FormulaSource = 'paper' | 'xue';

interface Formula {
  eq: string;
  label: string;
  latex: string;
  source: FormulaSource;
}

const sourceLabel = (source: FormulaSource): string =>
  source === 'paper' ? 'Paper tugas' : 'Xue & Shen 2022';

const sourceBadge = (source: FormulaSource): string =>
  `<span class="dbo-source dbo-source--${source}">${sourceLabel(source)}</span>`;

const formulaRow = (formula: Formula): string => `
  <div class="dbo-formula">
    <div class="dbo-formula__head">
      <span class="dbo-eq">${formula.eq}</span>
      <span class="dbo-formula__name">${formula.label}</span>
      ${sourceBadge(formula.source)}
    </div>
    <div class="dbo-formula__math" data-katex="${formula.latex}"></div>
  </div>
`;

const rollingFormula: Formula = {
  eq: 'Eq. (2)',
  label: 'Rolling',
  latex:
    '\\begin{aligned} x_i(t+1) &= x_i(t) + \\alpha k\\,x_i(t-1) + b\\,\\Delta x \\\\ \\Delta x &= |x_i(t) - X^W| \\end{aligned}',
  source: 'xue',
};

const dancingFormula: Formula = {
  eq: 'Eq. (3)',
  label: 'Dancing',
  latex:
    'x_i(t+1) = x_i(t) + \\tan(\\theta)\\,|x_i(t) - x_i(t-1)|',
  source: 'xue',
};

const breedingBoundsFormula: Formula = {
  eq: 'Eq. (4)',
  label: 'Breeding bounds',
  latex:
    '\\begin{aligned} Lb^* &= \\max\\!\\big(X^*(1-R),\\, Lb\\big) \\\\ Ub^* &= \\min\\!\\big(X^*(1+R),\\, Ub\\big) \\end{aligned}',
  source: 'xue',
};

const breedingPositionFormula: Formula = {
  eq: 'Eq. (5)',
  label: 'Breeding position',
  latex:
    'B_i(t+1) = X^* + b_1\\big(B_i(t)-Lb^*\\big) + b_2\\big(B_i(t)-Ub^*\\big)',
  source: 'xue',
};

const foragingBoundsFormula: Formula = {
  eq: 'Eq. (6)',
  label: 'Foraging bounds',
  latex:
    '\\begin{aligned} Lb^b &= \\max\\!\\big(X^b(1-R),\\, Lb\\big) \\\\ Ub^b &= \\min\\!\\big(X^b(1+R),\\, Ub\\big) \\end{aligned}',
  source: 'xue',
};

const foragingPositionFormula: Formula = {
  eq: 'Eq. (7)',
  label: 'Foraging position',
  latex:
    'x_i(t+1) = x_i(t) + C_1\\big(x_i(t)-Lb^b\\big) + C_2\\big(x_i(t)-Ub^b\\big)',
  source: 'xue',
};

const stealingFormula: Formula = {
  eq: 'Eq. (8)',
  label: 'Stealing',
  latex:
    'x_i(t+1) = X^b + S g\\big(|x_i(t)-X^*| + |x_i(t)-X^b|\\big)',
  source: 'xue',
};

const executionTimeFormula: Formula = {
  eq: 'Eq. (1)',
  label: 'Execution time',
  latex:
    'ET(Cl_i, vm_j) = \\frac{Cl_i}{\\mathrm{total\\_MIPS}(vm_j)}',
  source: 'paper',
};

const vmLoadFormula: Formula = {
  eq: 'Eq. (9)',
  label: 'VM load',
  latex: 'l^{vm} = \\sum l^k',
  source: 'paper',
};

const hostLoadFormula: Formula = {
  eq: 'Eq. (10)',
  label: 'Host load',
  latex: 'l^h = l^{vm} \\big/ \\sum h_j',
  source: 'paper',
};

const vmCapacityFormula: Formula = {
  eq: 'Eq. (11)',
  label: 'VM capacity',
  latex: 'pr^{vm} = pr^{no} \\times pr^{mips}',
  source: 'paper',
};

const totalCapacityFormula: Formula = {
  eq: 'Eq. (12)',
  label: 'Total capacity',
  latex: 'tot_{pr}^{vm} = \\sum pr^{vm}',
  source: 'paper',
};

const taskSizeFormula: Formula = {
  eq: 'Eq. (13)',
  label: 'Task size',
  latex: 't_n^{size} = t_n^{mips} \\times t^p',
  source: 'paper',
};

const taskPriorityFormula: Formula = {
  eq: 'Eq. (14)',
  label: 'Task priority',
  latex: 't^{pr} = t_n^{size} \\big/ pr^{vm}',
  source: 'paper',
};

const vmPriorityFormula: Formula = {
  eq: 'Eq. (15)',
  label: 'VM priority',
  latex:
    'vm^{pr} = \\frac{high^{unit\\ elect\\ cost}}{d_i^{unit\\ elect\\ cost}}',
  source: 'paper',
};

const makespanFormula: Formula = {
  eq: 'Eq. (16)',
  label: 'Makespan',
  latex: 'ms^n = avail^k + e^n',
  source: 'paper',
};

const vmEnergyFormula: Formula = {
  eq: 'Eq. (17)',
  label: 'Energy per VM',
  latex:
    'e_{con}(vm^k) = \\int_0^k \\Big(e_{con}^{com}(vm^k t) + e_{con}^{idle}(vm^k t)\\Big)\\,dt',
  source: 'paper',
};

const totalEnergyFormula: Formula = {
  eq: 'Eq. (18)',
  label: 'Total energy',
  latex: 'e_{con} = \\sum e_{con}(vm^k)',
  source: 'paper',
};

const activeTimeFormula: Formula = {
  eq: 'Eq. (19)',
  label: 'Active time',
  latex:
    'ACT = \\frac{1}{r}\\sum_{m=1}^{r} \\frac{violation\\ time_{h_j}}{ACT_{h_j}}',
  source: 'paper',
};

const degradationFormula: Formula = {
  eq: 'Eq. (20)',
  label: 'Performance degradation',
  latex:
    'Per_{dg} = \\frac{1}{k}\\sum_{b=1}^{k} \\frac{Per_{dg}^{r}}{tot_r^{vm}}',
  source: 'paper',
};

const slaFormula: Formula = {
  eq: 'Eq. (21)',
  label: 'SLA violation',
  latex: 'sla_{violation} = ACT * Per_{dg}',
  source: 'paper',
};

const fitnessFormula: Formula = {
  eq: 'Eq. (22)',
  label: 'Fitness',
  latex:
    'f(x) = \\min \\sum \\big(ms^n(x),\\, e_{con}(x),\\, sla_{violation}(x)\\big)',
  source: 'paper',
};

const behaviorSlide = contentSlide({
  id: 'dbo-behavior',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-behavior',
  kicker: 'Dung Beetle Optimization · 01',
  title: 'Lima perilaku, dua fase pencarian',
  lede:
    'DBO membagi perilaku kumbang kotoran menjadi eksplorasi global dan eksploitasi lokal. Setiap peran punya aturan gerak berbeda.',
  body: `
    <div class="dbo-scope-note">
      <strong>DBO asli.</strong> Global search: rolling + dancing.
      Local search: breeding + foraging + stealing.
    </div>

    <div class="dbo-behavior-grid">
      <article class="dbo-behavior-card dbo-behavior-card--global">
        <span class="dbo-behavior-card__scope">Global</span>
        <span class="dbo-behavior-card__index">01</span>
        <h3>Rolling</h3>
        <p>Menggelindingkan bola kotoran mengikuti isyarat alam untuk membuka arah baru.</p>
        <span class="dbo-behavior-card__eq">Eq. (2)</span>
      </article>
      <article class="dbo-behavior-card dbo-behavior-card--global">
        <span class="dbo-behavior-card__scope">Global</span>
        <span class="dbo-behavior-card__index">02</span>
        <h3>Dancing</h3>
        <p>Menari untuk mengubah arah saat jalur rolling terhalang.</p>
        <span class="dbo-behavior-card__eq">Eq. (3)</span>
      </article>
      <article class="dbo-behavior-card dbo-behavior-card--local">
        <span class="dbo-behavior-card__scope">Local</span>
        <span class="dbo-behavior-card__index">03</span>
        <h3>Breeding</h3>
        <p>Meletakkan telur di area aman di sekitar optimum lokal.</p>
        <span class="dbo-behavior-card__eq">Eq. (4)–(5)</span>
      </article>
      <article class="dbo-behavior-card dbo-behavior-card--local">
        <span class="dbo-behavior-card__scope">Local</span>
        <span class="dbo-behavior-card__index">04</span>
        <h3>Foraging</h3>
        <p>Kumbang kecil mencari area makan terbaik di sekitar kandidat kuat.</p>
        <span class="dbo-behavior-card__eq">Eq. (6)–(7)</span>
      </article>
      <article class="dbo-behavior-card dbo-behavior-card--local">
        <span class="dbo-behavior-card__scope">Local</span>
        <span class="dbo-behavior-card__index">05</span>
        <h3>Stealing</h3>
        <p>Mengambil bola dari kumbang lain untuk mengeksploitasi area terbaik.</p>
        <span class="dbo-behavior-card__eq">Eq. (8)</span>
      </article>
    </div>

    <div class="dbo-note">
      <strong>Rasio subpopulasi.</strong> Paper tugas tidak menetapkan rasio tetap.
      Contoh Xue &amp; Shen (N=30 → 6/6/7/11) bukan aturan umum DBO.
    </div>
  `,
  footer: `
    <span>Lima perilaku: ${cite('Karim et al. 2024')} · ${cite('Xue & Shen 2022')}.</span>
    <span>Paparan perilaku, bukan hasil eksperimen.</span>
  `,
  notes:
    'Bedakan dua fase: rolling/dancing mengeksplorasi arah dan area baru; ' +
    'breeding/foraging/stealing memperbaiki area lokal. Jangan mengklaim rasio ' +
    'subpopulasi tetap; paper tugas tidak menetapkannya.',
});

const globalSlide = contentSlide({
  id: 'dbo-global',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-global',
  kicker: 'Dung Beetle Optimization · 02',
  title: 'Global search: rolling dan dancing',
  lede:
    'Rolling memakai arah deviasi dan posisi terburuk; dancing mengubah arah lewat fungsi tangen saat gerak terhalang.',
  body: `
    <div class="dbo-formula-layout">
      <div class="dbo-formula-stack">
        ${formulaRow(rollingFormula)}
        ${formulaRow(dancingFormula)}
      </div>

      <aside class="dbo-side">
        <div class="dbo-key">
          <p class="dbo-key__label">Glosarium simbol</p>
          <dl>
            <div><dt>α</dt><dd>arah deviasi: −1 atau 1</dd></div>
            <div><dt>k</dt><dd>koefisien defleksi (0, 0.2]</dd></div>
            <div><dt>b</dt><dd>konstanta (0, 1)</dd></div>
            <div><dt>θ</dt><dd>sudut dancing [0, π]</dd></div>
            <div><dt>Δx</dt><dd>selisih terhadap posisi terburuk</dd></div>
            <div><dt>X^W</dt><dd>posisi global terburuk</dd></div>
          </dl>
        </div>

        <div class="dbo-verify">
          <p class="dbo-verify__label">Verifikasi sumber</p>
          <ul>
            <li>Eq. (2)–(8) identik dengan <strong>Xue &amp; Shen 2022</strong>.</li>
            <li>θ = 0 atau π/2: posisi tidak diperbarui.</li>
            <li>Paper tugas menampilkan rumus sebagai gambar.</li>
          </ul>
        </div>
      </aside>
    </div>
  `,
  footer: `
    <span>Eq. (2)–(3): ${cite('Xue & Shen 2022')}; dipakai ${cite('Karim et al. 2024')}.</span>
    <span>Badge sumber menandai bentuk rumus, bukan klaim hasil.</span>
  `,
  notes:
    'Rolling adalah gerak utama global. Tekankan Δx memakai posisi terburuk X^W. ' +
    'Dancing bukan perilaku terpisah dari rolling; ia mengubah arah saat gerak ' +
    'terhalang. θ = 0 atau π/2 membuat posisi tidak berubah.',
});

const localSlide = contentSlide({
  id: 'dbo-local',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-local',
  kicker: 'Dung Beetle Optimization · 03',
  title: 'Local search: breeding, foraging, stealing',
  lede:
    'Tiga perilaku lokal memakai batas area yang menyempit lewat R = 1 − t/Tmax, lalu memperbarui posisi di sekitar kandidat terbaik.',
  body: `
    <div class="dbo-formula-layout">
      <div class="dbo-formula-stack dbo-formula-stack--dense">
        ${formulaRow(breedingBoundsFormula)}
        ${formulaRow(breedingPositionFormula)}
        ${formulaRow(foragingBoundsFormula)}
        ${formulaRow(foragingPositionFormula)}
        ${formulaRow(stealingFormula)}
      </div>

      <aside class="dbo-side">
        <div class="dbo-callout">
          <span class="dbo-callout__label">Faktor penyempitan</span>
          <strong>R = 1 − t / Tmax</strong>
          <p>Area breeding dan foraging mengecil seiring iterasi.</p>
        </div>

        <div class="dbo-key">
          <p class="dbo-key__label">Glosarium simbol</p>
          <dl>
            <div><dt>X*</dt><dd>optimum lokal saat ini</dd></div>
            <div><dt>X^b</dt><dd>optimum global saat ini</dd></div>
            <div><dt>Lb, Ub</dt><dd>batas ruang pencarian</dd></div>
            <div><dt>Lb*, Ub*</dt><dd>batas area breeding</dd></div>
            <div><dt>Lb^b, Ub^b</dt><dd>batas area foraging</dd></div>
            <div><dt>B_i</dt><dd>posisi bola telur</dd></div>
            <div><dt>b1, b2</dt><dd>vektor acak 1 × D</dd></div>
            <div><dt>C1, C2</dt><dd>acak normal dan (0,1)</dd></div>
            <div><dt>S</dt><dd>konstanta stealing</dd></div>
            <div><dt>g</dt><dd>vektor acak uniform</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  `,
  footer: `
    <span>Eq. (4)–(8): ${cite('Xue & Shen 2022')}; dipakai ${cite('Karim et al. 2024')}.</span>
    <span>R menyempitkan area lokal, bukan mengubah bobot perilaku.</span>
  `,
  notes:
    'Breeding memakai X* dan batas Lb*/Ub*; foraging memakai X^b dan batas ' +
    'Lb^b/Ub^b; stealing memakai X^b, S, dan g. Semua adalah local search. ' +
    'R = 1 - t/Tmax membuat area mengecil, jadi eksploitasi makin fokus.',
});

const systemSlide = contentSlide({
  id: 'dbo-system',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-system',
  kicker: 'Dung Beetle Optimization · 04',
  title: 'Model sistem cloud di paper',
  lede:
    'Model sistem paper; encoding task→VM tidak dirinci penulis.',
  body: `
    <div class="dbo-system-grid">
      <div class="dbo-system-left">
        <div class="dbo-cloud-chain" aria-label="Hierarki sumber daya cloud">
          <div class="dbo-cloud-chain__node">
            <span>Datacenter</span>
            <p>Tempat host dan VM berada.</p>
          </div>
          <div class="dbo-cloud-chain__node">
            <span>Host</span>
            <p>Mesin fisik dengan beberapa VM.</p>
          </div>
          <div class="dbo-cloud-chain__node">
            <span>VM</span>
            <p>Kapasitas CPU, MIPS, memori, dan biaya.</p>
          </div>
          <div class="dbo-cloud-chain__node">
            <span>Task</span>
            <p>Cloudlet dengan panjang dalam MI.</p>
          </div>
        </div>

        <div class="dbo-model-note">
          <strong>Alur paper.</strong> request → task manager → scheduler →
          penugasan ke VM → evaluasi metrik.
        </div>
      </div>

      <div class="dbo-formula-stack dbo-formula-stack--dense">
        ${formulaRow(executionTimeFormula)}
        ${formulaRow(vmLoadFormula)}
        ${formulaRow(hostLoadFormula)}
        ${formulaRow(vmCapacityFormula)}
        ${formulaRow(totalCapacityFormula)}
      </div>
    </div>

    <div class="dbo-key dbo-key--wide">
      <p class="dbo-key__label">Glosarium model</p>
      <dl>
        <div><dt>Cl_i</dt><dd>panjang task dalam MI</dd></div>
        <div><dt>total_MIPS</dt><dd>kapasitas total VM</dd></div>
        <div><dt>l^vm, l^h</dt><dd>beban VM dan host</dd></div>
        <div><dt>pr^vm</dt><dd>kapasitas proses VM</dd></div>
        <div><dt>pr^no</dt><dd>jumlah komponen proses</dd></div>
        <div><dt>pr^mips</dt><dd>MIPS per komponen</dd></div>
        <div><dt>tot_pr^vm</dt><dd>total kapasitas VM</dd></div>
        <div><dt>h_j</dt><dd>host ke-j</dd></div>
      </dl>
    </div>
  `,
  footer: `
    <span>Eq. (1), (9)–(12): ${cite('Karim et al. 2024')}.</span>
    <span>Diagram dibuat ulang; bukan salinan Fig. 1.</span>
  `,
  notes:
    'Slide ini bukan perilaku DBO. Fungsinya menyiapkan kosakata model: ET, ' +
    'beban VM/host, dan kapasitas. Tegaskan encoding task ke VM tidak ' +
    'dijelaskan eksplisit, jadi pemetaan DBO ke VM adalah interpretasi.',
});

const prioritySlide = contentSlide({
  id: 'dbo-priority',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-priority',
  kicker: 'Dung Beetle Optimization · 05',
  title: 'Prioritas, makespan, energi, SLA, fitness',
  lede:
    'Paper memakai prioritas untuk mengurutkan task dan VM, lalu mengevaluasi jadwal lewat makespan, energi, SLA, dan satu fitness gabungan.',
  body: `
    <div class="dbo-tabs" data-tab-group>
      <div class="dbo-tabs__nav" role="tablist" aria-label="Rumus prioritas dan fitness">
        <button class="dbo-tabs__button is-active" id="dbo-tab-priority-btn" role="tab" aria-selected="true" aria-controls="dbo-tab-priority" data-tab-target="dbo-tab-priority">Task/VM</button>
        <button class="dbo-tabs__button" id="dbo-tab-makespan-btn" role="tab" aria-selected="false" aria-controls="dbo-tab-makespan" data-tab-target="dbo-tab-makespan" tabindex="-1">Makespan</button>
        <button class="dbo-tabs__button" id="dbo-tab-energy-btn" role="tab" aria-selected="false" aria-controls="dbo-tab-energy" data-tab-target="dbo-tab-energy" tabindex="-1">Energi</button>
        <button class="dbo-tabs__button" id="dbo-tab-sla-btn" role="tab" aria-selected="false" aria-controls="dbo-tab-sla" data-tab-target="dbo-tab-sla" tabindex="-1">SLA</button>
        <button class="dbo-tabs__button" id="dbo-tab-fitness-btn" role="tab" aria-selected="false" aria-controls="dbo-tab-fitness" data-tab-target="dbo-tab-fitness" tabindex="-1">Fitness</button>
      </div>

      <div class="dbo-tabs__panels">
        <div class="dbo-tab-panel" data-tab-panel id="dbo-tab-priority" role="tabpanel" aria-labelledby="dbo-tab-priority-btn">
          <div class="dbo-tab-grid">
            <div class="dbo-formula-stack">
              ${formulaRow(taskSizeFormula)}
              ${formulaRow(taskPriorityFormula)}
              ${formulaRow(vmPriorityFormula)}
            </div>
            <aside class="dbo-side">
              <div class="dbo-key">
                <p class="dbo-key__label">Glosarium prioritas</p>
                <dl>
                  <div><dt>t_n^size</dt><dd>ukuran task</dd></div>
                  <div><dt>t_n^mips</dt><dd>MIPS task</dd></div>
                  <div><dt>t^p</dt><dd>faktor ukuran; tidak dirinci</dd></div>
                  <div><dt>t^pr</dt><dd>prioritas task</dd></div>
                  <div><dt>vm^pr</dt><dd>prioritas VM</dd></div>
                  <div><dt>d_i</dt><dd>biaya listrik datacenter</dd></div>
                </dl>
              </div>
              <div class="dbo-warning">
                <strong>Catatan.</strong> Simbol <span class="dbo-inline-math">t^p</span>
                tidak didefinisikan eksplisit di paper.
              </div>
            </aside>
          </div>
        </div>

        <div class="dbo-tab-panel" data-tab-panel id="dbo-tab-makespan" role="tabpanel" aria-labelledby="dbo-tab-makespan-btn" hidden>
          <div class="dbo-tab-grid dbo-tab-grid--wide-left">
            <div class="dbo-formula-stack">
              ${formulaRow(makespanFormula)}
            </div>
            <aside class="dbo-side">
              <div class="dbo-key">
                <p class="dbo-key__label">Glosarium makespan</p>
                <dl>
                  <div><dt>ms^n</dt><dd>makespan n task</dd></div>
                  <div><dt>avail^k</dt><dd>ketersediaan k VM</dd></div>
                  <div><dt>e^n</dt><dd>waktu eksekusi task</dd></div>
                </dl>
              </div>
            </aside>
          </div>
          <div class="dbo-explain-row">
            <span><strong>ms^n</strong> waktu selesai keseluruhan</span>
            <span><strong>avail^k</strong> kapan VM mulai tersedia</span>
            <span><strong>e^n</strong> lama task dieksekusi</span>
          </div>
        </div>

        <div class="dbo-tab-panel" data-tab-panel id="dbo-tab-energy" role="tabpanel" aria-labelledby="dbo-tab-energy-btn" hidden>
          <div class="dbo-tab-grid dbo-tab-grid--wide-left">
            <div class="dbo-formula-stack">
              ${formulaRow(vmEnergyFormula)}
              ${formulaRow(totalEnergyFormula)}
            </div>
            <aside class="dbo-side">
              <div class="dbo-key">
                <p class="dbo-key__label">Glosarium energi</p>
                <dl>
                  <div><dt>e_con</dt><dd>energi konsumsi</dd></div>
                  <div><dt>e_com</dt><dd>energi komputasi</dd></div>
                  <div><dt>e_idle</dt><dd>energi idle</dd></div>
                  <div><dt>vm^k</dt><dd>VM ke-k</dd></div>
                </dl>
              </div>
            </aside>
          </div>
          <div class="dbo-explain-row">
            <span><strong>Komputasi</strong> energi saat memproses task</span>
            <span><strong>Idle</strong> energi saat VM menganggur</span>
            <span><strong>Total</strong> penjumlahan seluruh VM</span>
          </div>
        </div>

        <div class="dbo-tab-panel" data-tab-panel id="dbo-tab-sla" role="tabpanel" aria-labelledby="dbo-tab-sla-btn" hidden>
          <div class="dbo-tab-grid">
            <div class="dbo-formula-stack dbo-formula-stack--dense">
              ${formulaRow(activeTimeFormula)}
              ${formulaRow(degradationFormula)}
              ${formulaRow(slaFormula)}
            </div>
            <aside class="dbo-side">
              <div class="dbo-key">
                <p class="dbo-key__label">Glosarium SLA</p>
                <dl>
                  <div><dt>ACT</dt><dd>active time degradasi</dd></div>
                  <div><dt>Per_dg</dt><dd>performance degradation</dd></div>
                  <div><dt>h_j</dt><dd>host ke-j</dd></div>
                  <div><dt>sla_violation</dt><dd>tingkat pelanggaran SLA</dd></div>
                </dl>
              </div>
            </aside>
          </div>
          <div class="dbo-explain-row">
            <span><strong>ACT</strong> rata-rata waktu degradasi</span>
            <span><strong>Per_dg</strong> rata-rata penurunan performa</span>
            <span><strong>SLA</strong> hasil kali keduanya</span>
          </div>
        </div>

        <div class="dbo-tab-panel" data-tab-panel id="dbo-tab-fitness" role="tabpanel" aria-labelledby="dbo-tab-fitness-btn" hidden>
          <div class="dbo-tab-grid dbo-tab-grid--wide-left">
            <div class="dbo-formula-stack">
              ${formulaRow(fitnessFormula)}
            </div>
            <aside class="dbo-side">
              <div class="dbo-key">
                <p class="dbo-key__label">Glosarium fitness</p>
                <dl>
                  <div><dt>f(x)</dt><dd>fitness gabungan</dd></div>
                  <div><dt>ms^n</dt><dd>makespan</dd></div>
                  <div><dt>e_con</dt><dd>energi</dd></div>
                  <div><dt>sla_violation</dt><dd>pelanggaran SLA</dd></div>
                </dl>
              </div>
            </aside>
          </div>
          <div class="dbo-warning dbo-warning--strong">
            <strong>Kontradiksi abstrak.</strong> Abstrak menulis “maximize the
            makespan”; Eq. (22) eksplisit memakai <span class="dbo-inline-math">min</span>.
            Konteks paper dan tujuan penjadwalan juga menyiratkan minimisasi.
          </div>
          <div class="dbo-ml-note">
            <strong>Parameter ML.</strong> learning rate, ReLU, epoch, dropout,
            dan batch size di bagian eksperimen tidak relevan dengan DBO murni.
          </div>
        </div>
      </div>
    </div>
  `,
  footer: `
    <span>Eq. (13)–(22): ${cite('Karim et al. 2024')}.</span>
    <span>Gunakan tab untuk berpindah kelompok rumus.</span>
  `,
  notes:
    'Slide ini punya lima tab. Mulai dari prioritas task/VM, lalu makespan, ' +
    'energi, SLA, dan fitness. Jangan membaca semua rumus. Tekankan Eq. (22) ' +
    'memakai min, meskipun abstrak menulis maximize. Parameter ML di bagian ' +
    'eksperimen tidak relevan dengan DBO murni.',
});

const flowSlide = contentSlide({
  id: 'dbo-flow',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-flow',
  kicker: 'Dung Beetle Optimization · 06',
  title: 'Flowchart DBO dan beda dengan paper',
  lede:
    'Alur Algorithm 1 sederhana; detail subpopulasi dan lima perilaku tidak dimuat.',
  body: `
    <div class="dbo-flow-layout">
      <ol class="dbo-flow-list">
        <li>
          <span class="dbo-flow-list__num">01</span>
          <div>
            <strong>Inisialisasi</strong>
            <p>Sebar N kumbang, evaluasi fitness, simpan x_best.</p>
          </div>
        </li>
        <li>
          <span class="dbo-flow-list__num">02</span>
          <div>
            <strong>Loop iterasi</strong>
            <p>Untuk t = 1 sampai Tmax.</p>
          </div>
        </li>
        <li>
          <span class="dbo-flow-list__num">03</span>
          <div>
            <strong>Update posisi</strong>
            <p>Algorithm 1 memakai satu rumus generik untuk semua kumbang.</p>
          </div>
        </li>
        <li>
          <span class="dbo-flow-list__num">04</span>
          <div>
            <strong>Boundary check</strong>
            <p>Posisi di luar ruang pencarian dikembalikan ke batas.</p>
          </div>
        </li>
        <li>
          <span class="dbo-flow-list__num">05</span>
          <div>
            <strong>Evaluasi fitness</strong>
            <p>Hitung f(x_i) untuk posisi baru.</p>
          </div>
        </li>
        <li>
          <span class="dbo-flow-list__num">06</span>
          <div>
            <strong>Update x_best</strong>
            <p>Simpan posisi dengan fitness terbaik.</p>
          </div>
        </li>
        <li>
          <span class="dbo-flow-list__num">07</span>
          <div>
            <strong>Terminasi</strong>
            <p>Berhenti di Tmax dan keluarkan x_best.</p>
          </div>
        </li>
      </ol>

      <aside class="dbo-flow-aside">
        <div class="dbo-compare-card dbo-compare-card--paper">
          <header class="dbo-compare-card__head">
            <span class="dbo-compare-card__tag">Paper tugas</span>
            <strong>Algorithm 1</strong>
          </header>
          <ul>
            <li><strong>Partisi:</strong> tidak ada pembagian subpopulasi.</li>
            <li><strong>Update:</strong> satu rumus generik untuk semua kumbang.</li>
            <li><strong>Simbol:</strong> ∅ dan σ; PDF terbaca ∅, ekstraksi teks rusak.</li>
          </ul>
          <div class="dbo-mini-formula" data-katex="x_i(t+1) = x_i(t) + \\varnothing\\,(x_{best}(t)-x_i(t)) + \\sigma\\,(x_{rand}(t)-x_i(t))"></div>
        </div>

        <div class="dbo-compare-card dbo-compare-card--xue">
          <header class="dbo-compare-card__head">
            <span class="dbo-compare-card__tag">DBO asli</span>
            <strong>Xue &amp; Shen 2022</strong>
          </header>
          <ul>
            <li><strong>Partisi:</strong> populasi dibagi per perilaku.</li>
            <li><strong>Update:</strong> Eq. (2)–(8) berbeda per perilaku.</li>
            <li><strong>Fokus:</strong> rolling/dancing global; breeding/foraging/stealing lokal.</li>
          </ul>
        </div>

        <div class="dbo-flow-warning">
          <strong>Beda kunci.</strong> Algorithm 1 paper tidak identik dengan
          Eq. (2)–(8). Encoding update kontinu ke penugasan task→VM juga tidak
          dijelaskan paper.
        </div>
      </aside>
    </div>
  `,
  footer: `
    <span>Algorithm 1: ${cite('Karim et al. 2024')}; perilaku: ${cite('Xue & Shen 2022')}.</span>
    <span>Encoding task→VM tidak eksplisit; pemetaan adalah interpretasi.</span>
  `,
  notes:
    'Ini slide pembeda penting. Algorithm 1 di paper hanya punya satu update ' +
    'generik, tanpa partisi subpopulasi. DBO asli membagi populasi per perilaku ' +
    'dan memakai Eq. (2)-(8). Simbol pertama di PDF adalah ∅, bukan rho. ' +
    'Encoding dari ruang kontinu ke penugasan task ke VM tidak dijelaskan.',
});

const resultsSlide = contentSlide({
  id: 'dbo-results',
  section: 'Dung Beetle Optimization',
  className: 'slide--dbo slide--dbo-results',
  kicker: 'Dung Beetle Optimization · 07',
  title: 'Hasil paper DBO: EASA-MORU vs pembanding',
  lede:
    'Grafik Tabel 2–8; pilih metrik dan request.',
  body: `
    ${paperChartMarkup(dboChartData)}

    <div class="paper-caveat">
      <strong>Batas data.</strong>
      Semua sel yang ditampilkan tersedia di tabel/teks paper; tidak ada interpolasi.
      Tabel PLOS berupa gambar, jadi angka dicek ke tabel dan teks yang terbaca.
      CT EASA-MORU tidak monoton (2634 ms → 1090 ms); nilai ditampilkan apa adanya.
    </div>
  `,
  footer: `
    <span>Sumber: ${cite('Karim et al. 2024', 'Tabel 2–8')}.</span>
    <span>EASA-MORU = metode DBO di paper; enam pembanding sesuai paper.</span>
  `,
  notes:
    'Tegaskan bahwa EASA-MORU adalah nama metode DBO di paper ini. Pilih ' +
    'metrik dan jumlah request; semua pembanding berasal dari tabel yang sama. ' +
    'Tidak ada angka yang diinterpolasi. CT EASA-MORU memang tidak monoton; ' +
    'jangan memperbaikinya secara visual.',
});

const swarmLabDboSlide = contentSlide({
  id: 'swarm-lab-dbo', section: 'Dung Beetle Optimization', className: 'slide--dbo slide--swarm-lab',
  kicker: 'Dung Beetle Optimization · SwarmLab', title: 'SwarmLab DBO: lima fase gerak',
  lede: 'Amati bagaimana rolling, dancing, breeding, foraging, dan stealing membagi ruang pencarian.',
  body: `<div class="lab-layout"><div class="lab-canvas-wrap"><canvas class="lab-canvas lab-canvas--dbo" data-swarm-lab-dbo aria-label="SwarmLab DBO: ilustrasi gerak populasi"></canvas><span class="lab-badge">Ilustrasi model gerak, bukan hasil paper.</span></div><aside class="lab-controls" data-lab-dbo-controls><div class="lab-actions"><button type="button" data-lab-action="toggle">Pause</button><button type="button" data-lab-action="step">Step</button><button type="button" data-lab-action="reset">Reset</button></div><label>k <input data-lab-weight="k" type="range" min="0" max="0.2" step="0.01" value="0.1" /></label><label>b <input data-lab-weight="b" type="range" min="0" max="1" step="0.01" value="0.3" /></label><label>θ <input data-lab-weight="theta" type="range" min="0" max="3.14" step="0.01" value="1.57" /></label><label>S <input data-lab-weight="S" type="range" min="0" max="1" step="0.01" value="0.5" /></label><p class="lab-selected" data-lab-phase>Fase aktif: rolling</p></aside></div>`,
  footer: `<span>Sumber gerak: ${cite('Xue & Shen 2022')}.</span><span>Fase aktif ditandai di panel kontrol.</span>`,
  notes: 'Tekankan bahwa pembagian fase dan nilai slider adalah visualisasi; paper tugas tidak menetapkan rasio subpopulasi.',
});

export const dboSlides: string[] = [
  behaviorSlide,
  globalSlide,
  localSlide,
  systemSlide,
  prioritySlide,
  flowSlide,
  swarmLabDboSlide,
  resultsSlide,
];
