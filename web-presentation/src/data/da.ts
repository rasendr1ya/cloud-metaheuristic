import type {
  PaperChartData,
  PaperMetric,
  PaperSeries,
  PaperVariant,
} from './paper';

const DA_TASKS = [10, 20, 40, 100, 200, 500] as const;
const DA_VMS = [5, 20, 40] as const;
const DA_ALGORITHMS = ['DA', 'ACO', 'ACO-PSO'] as const;

type DaAlgorithm = (typeof DA_ALGORITHMS)[number];
type DaVm = (typeof DA_VMS)[number];
type DaValues = Record<DaAlgorithm, number[]>;
type DaTable = Record<DaVm, DaValues>;

const daSeries = (values: DaValues): PaperSeries[] =>
  DA_ALGORITHMS.map((algorithm) => ({
    label: algorithm,
    values: values[algorithm],
    emphasis: algorithm === 'DA',
    dashed: algorithm === 'ACO-PSO',
  }));

const daVariants = (table: DaTable): PaperVariant[] =>
  DA_VMS.map((vm) => ({
    key: String(vm),
    label: `VM ${vm}`,
    xLabels: DA_TASKS.map(String),
    series: daSeries(table[vm]),
  }));

const executionTime: DaTable = {
  5: {
    DA: [0.27, 0.5, 0.31, 1.36, 1.59, 1.4],
    ACO: [0.45, 0.75, 0.81, 1.54, 1.84, 1.9],
    'ACO-PSO': [0.54, 0.87, 0.98, 1.63, 1.96, 2.07],
  },
  20: {
    DA: [0.27, 0.5, 0.31, 0.92, 1.15, 0.96],
    ACO: [0.45, 0.75, 0.81, 1.1, 1.4, 1.46],
    'ACO-PSO': [0.54, 0.87, 0.98, 1.19, 1.52, 1.63],
  },
  40: {
    DA: [0.27, 0.5, 0.31, 0.71, 0.94, 0.75],
    ACO: [0.45, 0.75, 0.81, 0.89, 1.19, 1.25],
    'ACO-PSO': [0.54, 0.87, 0.98, 0.98, 1.31, 1.42],
  },
};

const responseTime: DaTable = {
  5: {
    DA: [0.44, 0.54, 0.81, 1.79, 1.89, 2.16],
    ACO: [1.02, 1.75, 2.81, 2.37, 3.1, 4.16],
    'ACO-PSO': [1.24, 2.87, 4.98, 2.59, 4.22, 6.33],
  },
  20: {
    DA: [0.44, 0.54, 0.81, 1.16, 1.26, 1.53],
    ACO: [1.02, 1.75, 2.81, 1.74, 2.47, 3.53],
    'ACO-PSO': [1.24, 2.87, 4.98, 1.96, 3.59, 5.7],
  },
  40: {
    DA: [0.44, 0.54, 0.81, 1, 1.1, 1.37],
    ACO: [1.02, 1.75, 2.81, 1.58, 2.31, 3.37],
    'ACO-PSO': [1.24, 2.87, 4.98, 1.8, 3.43, 5.54],
  },
};

const migratedTasks: DaTable = {
  5: {
    DA: [1, 1, 2, 4, 5, 9],
    ACO: [2, 2, 3, 7, 10, 19],
    'ACO-PSO': [3, 3, 4, 10, 13, 28],
  },
  20: {
    DA: [0, 1, 1, 2, 4, 6],
    ACO: [1, 2, 2, 5, 7, 15],
    'ACO-PSO': [2, 3, 3, 8, 10, 17],
  },
  40: {
    DA: [0, 0, 1, 1, 2, 5],
    ACO: [1, 2, 2, 4, 5, 12],
    'ACO-PSO': [2, 2, 3, 7, 8, 15],
  },
};

const daMetrics: PaperMetric[] = [
  {
    id: 'execution',
    label: 'Execution time',
    table: 'Tabel 1 · Execution time',
    unit: 'nilai tabel (satuan paper tidak konsisten)',
    note:
      'Tabel 1. Teks menyebut “about 0.3 milliseconds”, tabel memuat 0.27–2.07, ' +
      'dan figur berlabel mS. Nilai ditampilkan apa adanya tanpa konversi.',
    yAxisLabel: 'Execution time (nilai tabel)',
    variants: daVariants(executionTime),
  },
  {
    id: 'response',
    label: 'Response time',
    table: 'Tabel 2 · Response time',
    unit: 'nilai tabel (satuan tidak dinyatakan per tabel)',
    note: 'Tabel 2. Tabel tidak menulis satuan eksplisit; nilai tidak dikonversi.',
    yAxisLabel: 'Response time (nilai tabel)',
    variants: daVariants(responseTime),
  },
  {
    id: 'migration',
    label: 'Migrated tasks',
    table: 'Tabel 3 · Jumlah task termigrasi',
    unit: 'task',
    note: 'Tabel 3. Nilai adalah jumlah task yang dimigrasi, bukan waktu.',
    yAxisLabel: 'Jumlah task termigrasi',
    variants: daVariants(migratedTasks),
  },
];

export const daChartData: PaperChartData = {
  kind: 'da',
  chartType: 'line',
  variantLabel: 'Jumlah VM',
  xAxisLabel: 'Jumlah task',
  metrics: daMetrics,
};
