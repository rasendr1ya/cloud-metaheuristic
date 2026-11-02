import type { RevealApi } from 'reveal.js';
import { renderShortcutGrid } from '../data/shortcuts';

const THEME_KEY = 'soka-theme';
const LIGHT_THEME_COLOR = '#f5f7fa';
const DARK_THEME_COLOR = '#0b1220';

type Theme = 'light' | 'dark';

const isEditable = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
};

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage can be unavailable in private browsing contexts.
  }

  return null;
};

export const setupDeckUi = (deck: RevealApi): void => {
  const root = document.documentElement;
  const themeButton = document.querySelector<HTMLButtonElement>(
    '[data-action="theme"]',
  );
  const sectionLabel = document.querySelector<HTMLElement>('[data-section-label]');
  const helpOverlay = document.querySelector<HTMLElement>('[data-help-overlay]');
  const helpPanel = helpOverlay?.querySelector<HTMLElement>('.help-panel');
  const helpGrid = helpOverlay?.querySelector<HTMLElement>('[data-shortcut-grid]');

  if (helpGrid) helpGrid.innerHTML = renderShortcutGrid();

  let lastFocusedElement: HTMLElement | null = null;

  const applyTheme = (theme: Theme, persist: boolean): void => {
    root.dataset.theme = theme;

    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch {
        // Ignore storage failures; the theme still applies for this session.
      }
    }

    if (themeButton) {
      const dark = theme === 'dark';
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute(
        'aria-label',
        dark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap',
      );
      themeButton.title = dark ? 'Tema terang (T)' : 'Tema gelap (T)';
    }

    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (themeColor) {
      themeColor.content = theme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
    }
  };

  const initialTheme =
    readStoredTheme() ?? (root.dataset.theme === 'dark' ? 'dark' : 'light');

  applyTheme(initialTheme, false);

  const toggleTheme = (): void => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  };

  const goToSlide = (slideId: string): void => {
    const slides = deck.getSlides();
    const index = slides.findIndex((slide) => slide.dataset.slideId === slideId);

    if (index >= 0) deck.slide(index);
  };

  const openHelp = (): void => {
    if (!helpOverlay) return;

    lastFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    helpOverlay.hidden = false;
    helpPanel?.focus();
  };

  const closeHelp = (): void => {
    if (!helpOverlay || helpOverlay.hidden) return;

    helpOverlay.hidden = true;
    lastFocusedElement?.focus();
  };

  const updateSectionLabel = (): void => {
    const section = deck.getCurrentSlide().dataset.section ?? 'Pembuka';
    if (sectionLabel) sectionLabel.textContent = section;
  };

  deck.on('ready', updateSectionLabel);
  deck.on('slidechanged', updateSectionLabel);

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target === helpOverlay) {
      closeHelp();
      return;
    }

    const goToTarget = event.target.closest<HTMLElement>('[data-goto]');
    if (goToTarget) {
      const slideId = goToTarget.dataset.goto;
      if (slideId) {
        event.preventDefault();
        closeHelp();
        goToSlide(slideId);
      }
      return;
    }

    const actionTarget = event.target.closest<HTMLElement>('[data-action]');
    if (!actionTarget) return;

    switch (actionTarget.dataset.action) {
      case 'map':
        goToSlide('map');
        break;
      case 'overview':
        deck.toggleOverview();
        break;
      case 'theme':
        toggleTheme();
        break;
      case 'help':
        openHelp();
        break;
      case 'close-help':
        closeHelp();
        break;
    }
  });

  document.addEventListener(
    'keydown',
    (event) => {
      if (isEditable(event.target)) return;

      if (event.key === 'Escape' && helpOverlay && !helpOverlay.hidden) {
        event.preventDefault();
        event.stopPropagation();
        closeHelp();
        return;
      }

      if (event.key === '?') {
        event.preventDefault();
        if (helpOverlay?.hidden) openHelp();
        else closeHelp();
        return;
      }

      if (
        event.key.toLowerCase() === 't' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        toggleTheme();
      }
    },
    true,
  );
};
