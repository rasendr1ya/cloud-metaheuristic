export interface Shortcut {
  keys: string[];
  label: string;
}

export const shortcuts: Shortcut[] = [
  { keys: ['→', 'Space'], label: 'Slide berikutnya' },
  { keys: ['←'], label: 'Slide sebelumnya' },
  { keys: ['Esc'], label: 'Overview semua slide' },
  { keys: ['S'], label: 'Buka speaker notes' },
  { keys: ['F'], label: 'Fullscreen' },
  { keys: ['B'], label: 'Pause / blackout' },
  { keys: ['T'], label: 'Ganti light / dark' },
  { keys: ['?'], label: 'Buka panduan ini' },
];

export const renderShortcutGrid = (): string =>
  shortcuts
    .map(
      (shortcut) => `
        <div class="shortcut">
          <span class="shortcut__keys">
            ${shortcut.keys.map((key) => `<kbd>${key}</kbd>`).join('')}
          </span>
          <span class="shortcut__label">${shortcut.label}</span>
        </div>
      `,
    )
    .join('');
