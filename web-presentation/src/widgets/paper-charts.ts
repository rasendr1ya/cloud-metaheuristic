import type { Chart as ChartInstance, ChartConfiguration } from 'chart.js';
import type { RevealApi } from 'reveal.js';
import { daChartData } from '../data/da';
import { dboChartData } from '../data/dbo';
import type { PaperChartData, PaperMetric, PaperVariant } from '../data/paper';

type ChartConstructor = typeof import('chart.js/auto')['default'];

interface ChartState {
  chart: ChartInstance | null;
  renderId: number;
}

interface ThemeColors {
  ink: string;
  inkSoft: string;
  muted: string;
  mutedStrong: string;
  line: string;
  lineStrong: string;
  surface: string;
  cyan: string;
  amber: string;
  fontFamily: string;
}

const dataByKind: Record<'da' | 'dbo', PaperChartData> = {
  da: daChartData,
  dbo: dboChartData,
};

const chartStates = new WeakMap<HTMLElement, ChartState>();
const chartRoots = new Set<HTMLElement>();
let chartConstructorPromise: Promise<ChartConstructor> | null = null;

const loadChartConstructor = (): Promise<ChartConstructor> => {
  chartConstructorPromise ??= import('chart.js/auto').then((module) => module.default);
  return chartConstructorPromise;
};

const getState = (root: HTMLElement): ChartState => {
  let state = chartStates.get(root);

  if (!state) {
    state = { chart: null, renderId: 0 };
    chartStates.set(root, state);
  }

  return state;
};

const getChartData = (root: HTMLElement): PaperChartData | null => {
  const kind = root.dataset.paperChart;
  if (kind !== 'da' && kind !== 'dbo') return null;
  return dataByKind[kind];
};

const getMetric = (data: PaperChartData, metricId: string | undefined): PaperMetric =>
  data.metrics.find((metric) => metric.id === metricId) ?? data.metrics[0];

const getVariant = (
  metric: PaperMetric,
  variantKey: string | undefined,
): PaperVariant =>
  metric.variants.find((variant) => variant.key === variantKey) ?? metric.variants[0];

const readThemeColors = (): ThemeColors => {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string): string =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    ink: read('--ink', '#101828'),
    inkSoft: read('--ink-soft', '#344054'),
    muted: read('--muted', '#667085'),
    mutedStrong: read('--muted-strong', '#475467'),
    line: read('--line', '#d0d5dd'),
    lineStrong: read('--line-strong', '#98a2b3'),
    surface: read('--surface', '#ffffff'),
    cyan: read('--cyan', '#0e7490'),
    amber: read('--amber', '#b45309'),
    fontFamily:
      getComputedStyle(document.body).fontFamily ||
      "'Inter Variable', 'Inter', sans-serif",
  };
};

const numberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 3,
});

const formatValue = (value: number): string => numberFormatter.format(value);

const unitSuffix = (unit: string): string =>
  unit.startsWith('nilai tabel') ? '' : ` ${unit}`;

const tickFont = (colors: ThemeColors) => ({
  family: colors.fontFamily,
  size: 10,
});

const titleFont = (colors: ThemeColors) => ({
  family: colors.fontFamily,
  size: 10,
  weight: 500 as const,
});

const baseOptions = (colors: ThemeColors) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 180 },
  plugins: {
    tooltip: {
      backgroundColor: colors.surface,
      titleColor: colors.ink,
      bodyColor: colors.inkSoft,
      borderColor: colors.line,
      borderWidth: 1,
      padding: 9,
      displayColors: true,
    },
  },
});

const buildLineConfig = (
  metric: PaperMetric,
  variant: PaperVariant,
  data: PaperChartData,
  colors: ThemeColors,
): ChartConfiguration<'line'> => ({
  type: 'line',
  data: {
    labels: variant.xLabels,
    datasets: variant.series.map((series) => ({
      label: series.label,
      data: series.values,
      borderColor: series.emphasis ? colors.cyan : colors.mutedStrong,
      backgroundColor: series.emphasis ? colors.cyan : colors.mutedStrong,
      borderWidth: series.emphasis ? 2.8 : 1.7,
      borderDash: series.dashed ? [5, 4] : undefined,
      pointRadius: series.emphasis ? 3.4 : 2.2,
      pointHoverRadius: 5,
      pointBackgroundColor: series.emphasis ? colors.cyan : colors.mutedStrong,
      pointBorderColor: colors.surface,
      pointBorderWidth: 1,
      tension: 0.24,
    })),
  },
  options: {
    ...baseOptions(colors),
    interaction: { mode: 'index', intersect: false },
    plugins: {
      ...baseOptions(colors).plugins,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: colors.inkSoft,
          boxWidth: 9,
          boxHeight: 9,
          usePointStyle: true,
          font: { family: colors.fontFamily, size: 10 },
        },
      },
      tooltip: {
        ...baseOptions(colors).plugins.tooltip,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${formatValue(context.parsed.y ?? 0)}${unitSuffix(metric.unit)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: colors.line },
        ticks: {
          color: colors.muted,
          font: tickFont(colors),
          maxRotation: 0,
          autoSkip: false,
        },
        title: {
          display: true,
          text: data.xAxisLabel,
          color: colors.muted,
          font: titleFont(colors),
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: colors.line },
        ticks: {
          color: colors.muted,
          font: tickFont(colors),
          callback: (value) => formatValue(Number(value)),
        },
        title: {
          display: true,
          text: metric.yAxisLabel,
          color: colors.muted,
          font: titleFont(colors),
        },
      },
    },
  },
});

const buildBarConfig = (
  metric: PaperMetric,
  variant: PaperVariant,
  data: PaperChartData,
  colors: ThemeColors,
): ChartConfiguration<'bar'> => ({
  type: 'bar',
  data: {
    labels: variant.xLabels,
    datasets: [
      {
        label: metric.label,
        data: variant.series.map((series) => series.values[0]),
        backgroundColor: variant.series.map((series) =>
          series.emphasis ? colors.amber : colors.lineStrong,
        ),
        borderColor: variant.series.map((series) =>
          series.emphasis ? colors.amber : colors.muted,
        ),
        borderWidth: 1,
        borderRadius: 5,
        maxBarThickness: 42,
      },
    ],
  },
  options: {
    ...baseOptions(colors),
    interaction: { mode: 'nearest', intersect: true },
    plugins: {
      ...baseOptions(colors).plugins,
      legend: { display: false },
      tooltip: {
        ...baseOptions(colors).plugins.tooltip,
        callbacks: {
          label: (context) =>
            `${context.label}: ${formatValue(context.parsed.y ?? 0)}${unitSuffix(metric.unit)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: colors.muted,
          font: tickFont(colors),
          maxRotation: 0,
          autoSkip: false,
        },
        title: {
          display: true,
          text: data.xAxisLabel,
          color: colors.muted,
          font: titleFont(colors),
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: colors.line },
        ticks: {
          color: colors.muted,
          font: tickFont(colors),
          callback: (value) => formatValue(Number(value)),
        },
        title: {
          display: true,
          text: metric.yAxisLabel,
          color: colors.muted,
          font: titleFont(colors),
        },
      },
    },
  },
});

const updateControls = (
  root: HTMLElement,
  metric: PaperMetric,
  variant: PaperVariant,
): void => {
  root.dataset.metric = metric.id;
  root.dataset.variant = variant.key;

  root.querySelectorAll<HTMLElement>('[data-paper-metric]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.paperMetric === metric.id),
    );
  });

  root.querySelectorAll<HTMLElement>('[data-paper-variant]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.paperVariant === variant.key),
    );
  });

  const source = root.querySelector<HTMLElement>('[data-paper-source]');
  if (source) source.textContent = metric.table;

  const unit = root.querySelector<HTMLElement>('[data-paper-unit]');
  if (unit) unit.textContent = metric.unit;

  const note = root.querySelector<HTMLElement>('[data-paper-note]');
  if (note) note.textContent = metric.note;

  const canvas = root.querySelector<HTMLCanvasElement>('[data-paper-canvas]');
  if (canvas) {
    canvas.setAttribute(
      'aria-label',
      `${metric.label} dari ${metric.table}, ${variant.label}`,
    );
  }
};

const renderChart = async (root: HTMLElement): Promise<void> => {
  const data = getChartData(root);
  if (!data) return;

  const state = getState(root);
  const renderId = ++state.renderId;
  const metric = getMetric(data, root.dataset.metric);
  const variant = getVariant(metric, root.dataset.variant);
  const canvas = root.querySelector<HTMLCanvasElement>('[data-paper-canvas]');
  const loading = root.querySelector<HTMLElement>('[data-paper-loading]');

  updateControls(root, metric, variant);

  if (!canvas) return;

  try {
    const Chart = await loadChartConstructor();

    if (renderId !== state.renderId) return;

    const colors = readThemeColors();
    state.chart?.destroy();

    if (data.chartType === 'line') {
      state.chart = new Chart(canvas, buildLineConfig(metric, variant, data, colors));
    } else {
      state.chart = new Chart(canvas, buildBarConfig(metric, variant, data, colors));
    }

    if (loading) loading.hidden = true;
  } catch (error) {
    console.error('PaperCharts failed to render', error);
    if (loading) {
      loading.hidden = false;
      loading.textContent = 'Grafik gagal dimuat.';
    }
  }
};

const activateVisibleCharts = (deck: RevealApi): void => {
  const currentSlide = deck.getCurrentSlide();
  if (!currentSlide) return;

  currentSlide.querySelectorAll<HTMLElement>('[data-paper-chart]').forEach((root) => {
    if (chartRoots.has(root)) return;
    chartRoots.add(root);
    void renderChart(root);
  });
};

export const setupPaperCharts = (deck: RevealApi): void => {
  deck.on('ready', () => activateVisibleCharts(deck));
  deck.on('slidechanged', () => activateVisibleCharts(deck));

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const control = event.target.closest<HTMLElement>(
      '[data-paper-metric], [data-paper-variant]',
    );
    if (!control) return;

    const root = control.closest<HTMLElement>('[data-paper-chart]');
    if (!root) return;

    if (control.dataset.paperMetric) {
      root.dataset.metric = control.dataset.paperMetric;
    }

    if (control.dataset.paperVariant) {
      root.dataset.variant = control.dataset.paperVariant;
    }

    void renderChart(root);
  });

  new MutationObserver(() => {
    chartRoots.forEach((root) => {
      if (getState(root).chart) void renderChart(root);
    });
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
};
