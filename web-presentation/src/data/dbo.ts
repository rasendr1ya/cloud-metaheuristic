import type {
  PaperChartData,
  PaperMetric,
  PaperVariant,
} from './paper';

const DBO_REQUESTS = [100, 200, 300, 400, 500] as const;
const DBO_ALGORITHMS = [
  'KH-LBRS',
  'IDS-ARS',
  'HPSOM-GARS',
  'HMEE-RARS',
  'FFA-RSMSO',
  'EASA-MORU',
] as const;

type DboAlgorithm = (typeof DBO_ALGORITHMS)[number];
type DboRows = number[][];

const dboVariants = (rows: DboRows): PaperVariant[] =>
  DBO_REQUESTS.map((requests, rowIndex) => ({
    key: String(requests),
    label: `${requests} request`,
    xLabels: [...DBO_ALGORITHMS],
    series: DBO_ALGORITHMS.map((algorithm: DboAlgorithm, algorithmIndex) => ({
      label: algorithm,
      values: [rows[rowIndex][algorithmIndex]],
      emphasis: algorithm === 'EASA-MORU',
    })),
  }));

const metric = (
  id: string,
  label: string,
  table: string,
  unit: string,
  note: string,
  yAxisLabel: string,
  rows: DboRows,
): PaperMetric => ({
  id,
  label,
  table,
  unit,
  note,
  yAxisLabel,
  variants: dboVariants(rows),
});

const waitt: DboRows = [
  [560, 445, 287, 239, 167, 115],
  [721, 603, 483, 320, 231, 191],
  [930, 852, 708, 567, 497, 446],
  [1174, 963, 880, 763, 707, 639],
  [1507, 1405, 1202, 1100, 1050, 999],
];

const respt: DboRows = [
  [552, 423, 273, 288, 193, 145],
  [754, 587, 459, 382, 306, 241],
  [894, 817, 680, 701, 631, 563],
  [1165, 1002, 908, 852, 776, 724],
  [1602, 1359, 1149, 1136, 1098, 1046],
];

const lb: DboRows = [
  [0.003, 0.006, 0.006, 0.013, 0.028, 0.061],
  [0.004, 0.007, 0.012, 0.025, 0.047, 0.082],
  [0.013, 0.014, 0.018, 0.04, 0.061, 0.095],
  [0.017, 0.023, 0.03, 0.051, 0.07, 0.098],
  [0.032, 0.038, 0.042, 0.065, 0.082, 0.116],
];

const thrpt: DboRows = [
  [860, 938, 1053, 1067, 1178, 1247],
  [613, 677, 799, 828, 1139, 1204],
  [421, 508, 595, 706, 841, 901],
  [199, 307, 374, 454, 747, 810],
  [154, 176, 202, 239, 311, 380],
];

const rele: DboRows = [
  [0.209, 0.126, 0.102, 0.097, 0.076, 0.038],
  [0.16, 0.091, 0.064, 0.066, 0.053, 0.032],
  [0.151, 0.089, 0.035, 0.048, 0.025, 0.011],
  [0.135, 0.082, 0.058, 0.055, 0.039, 0.017],
  [0.122, 0.098, 0.065, 0.057, 0.046, 0.029],
];

const rely: DboRows = [
  [0.703, 0.754, 0.796, 0.787, 0.827, 0.935],
  [0.767, 0.826, 0.878, 0.858, 0.897, 0.928],
  [0.765, 0.825, 0.932, 0.81, 0.945, 0.968],
  [0.718, 0.814, 0.837, 0.806, 0.893, 0.92],
  [0.731, 0.828, 0.832, 0.76, 0.848, 0.91],
];

const ct: DboRows = [
  [856, 1118, 1482, 1867, 2249, 2634],
  [247, 495, 738, 969, 1227, 1610],
  [197, 238, 349, 615, 899, 1185],
  [569, 813, 1109, 1367, 1632, 1962],
  [260, 304, 377, 369, 743, 1090],
];

const dboMetrics: PaperMetric[] = [
  metric(
    'waitt',
    'WAITT',
    'Tabel 2 · WAITT',
    'ms',
    'Tabel 2. Waiting time; nilai dari tabel, tanpa interpolasi.',
    'WAITT (ms)',
    waitt,
  ),
  metric(
    'respt',
    'RESPT',
    'Tabel 3 · RESPT',
    'ms',
    'Tabel 3. Response time; nilai dari tabel, tanpa interpolasi.',
    'RESPT (ms)',
    respt,
  ),
  metric(
    'lb',
    'LB',
    'Tabel 4 · LB',
    'ms (sesuai tabel)',
    'Tabel 4. Satuan ditulis “milliseconds” di tabel; nilai mengikuti paper.',
    'LB (ms, sesuai tabel)',
    lb,
  ),
  metric(
    'thrpt',
    'THRPT',
    'Tabel 5 · THRPT',
    'ms (sesuai tabel)',
    'Tabel 5. Satuan ditulis “milliseconds” di tabel; nilai mengikuti paper.',
    'THRPT (ms, sesuai tabel)',
    thrpt,
  ),
  metric(
    'rele',
    'RELE',
    'Tabel 6 · RELE',
    'rasio',
    'Tabel 6. Relative error; nilai berupa rasio tanpa satuan.',
    'RELE (rasio)',
    rele,
  ),
  metric(
    'rely',
    'RELY',
    'Tabel 7 · RELY',
    'rasio',
    'Tabel 7. Reliability; nilai berupa rasio tanpa satuan.',
    'RELY (rasio)',
    rely,
  ),
  metric(
    'ct',
    'CT',
    'Tabel 8 · CT',
    'ms',
    'Tabel 8. CT EASA-MORU tidak monoton (2634 ms → 1090 ms); ditampilkan apa adanya.',
    'CT (ms)',
    ct,
  ),
];

export const dboChartData: PaperChartData = {
  kind: 'dbo',
  chartType: 'bar',
  variantLabel: 'Jumlah request',
  xAxisLabel: 'Algoritma pembanding',
  metrics: dboMetrics,
};
