import type { PaperChartData } from '../data/paper';

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export const paperChartMarkup = (data: PaperChartData): string => {
  const metric = data.metrics[0];
  const variant = metric.variants[0];

  const metricButtons = data.metrics
    .map(
      (item, index) => `
        <button
          type="button"
          class="paper-chart__btn"
          data-paper-metric="${escapeHtml(item.id)}"
          aria-pressed="${index === 0}"
        >${escapeHtml(item.label)}</button>
      `,
    )
    .join('');

  const variantButtons = metric.variants
    .map(
      (item, index) => `
        <button
          type="button"
          class="paper-chart__btn"
          data-paper-variant="${escapeHtml(item.key)}"
          aria-pressed="${index === 0}"
        >${escapeHtml(item.label)}</button>
      `,
    )
    .join('');

  return `
    <div
      class="paper-chart paper-chart--${data.kind}"
      data-paper-chart="${data.kind}"
      data-metric="${escapeHtml(metric.id)}"
      data-variant="${escapeHtml(variant.key)}"
    >
      <div class="paper-chart__toolbar">
        <div class="paper-chart__group" role="group" aria-label="Pilih metrik">
          <span class="paper-chart__group-label">Metrik</span>
          ${metricButtons}
        </div>
        <div
          class="paper-chart__group"
          role="group"
          aria-label="Pilih ${escapeHtml(data.variantLabel)}"
        >
          <span class="paper-chart__group-label">${escapeHtml(data.variantLabel)}</span>
          ${variantButtons}
        </div>
      </div>

      <div class="paper-chart__plot">
        <canvas
          class="paper-chart__canvas"
          data-paper-canvas
          role="img"
          aria-label="${escapeHtml(metric.label)} dari ${escapeHtml(metric.table)}"
        ></canvas>
        <p class="paper-chart__loading" data-paper-loading>Memuat grafik…</p>
      </div>

      <div class="paper-chart__meta">
        <span class="paper-chart__source" data-paper-source>${escapeHtml(metric.table)}</span>
        <span class="paper-chart__unit" data-paper-unit>${escapeHtml(metric.unit)}</span>
      </div>
      <p class="paper-chart__note" data-paper-note>${escapeHtml(metric.note)}</p>
    </div>
  `;
};
