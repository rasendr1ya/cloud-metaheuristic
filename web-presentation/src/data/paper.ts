export interface PaperSeries {
  label: string;
  values: number[];
  emphasis?: boolean;
  dashed?: boolean;
}

export interface PaperVariant {
  key: string;
  label: string;
  xLabels: string[];
  series: PaperSeries[];
}

export interface PaperMetric {
  id: string;
  label: string;
  table: string;
  unit: string;
  note: string;
  yAxisLabel: string;
  variants: PaperVariant[];
}

export interface PaperChartData {
  kind: 'da' | 'dbo';
  chartType: 'line' | 'bar';
  variantLabel: string;
  xAxisLabel: string;
  metrics: PaperMetric[];
}
