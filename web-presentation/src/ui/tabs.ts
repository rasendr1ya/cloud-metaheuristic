const activateTab = (group: HTMLElement, targetId: string): void => {
  group.querySelectorAll<HTMLButtonElement>('[data-tab-target]').forEach((button) => {
    const selected = button.dataset.tabTarget === targetId;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  group.querySelectorAll<HTMLElement>('[data-tab-panel]').forEach((panel) => {
    panel.hidden = panel.id !== targetId;
  });
};

const setupTabGroup = (group: HTMLElement): void => {
  const buttons = [
    ...group.querySelectorAll<HTMLButtonElement>('[data-tab-target]'),
  ];

  if (buttons.length === 0) return;

  const initial =
    buttons.find((button) => button.getAttribute('aria-selected') === 'true') ??
    buttons[0];

  if (initial.dataset.tabTarget) activateTab(group, initial.dataset.tabTarget);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.tabTarget) activateTab(group, button.dataset.tabTarget);
    });
  });

  group.addEventListener('keydown', (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    if (!event.target.matches('[data-tab-target]')) return;

    const currentIndex = buttons.indexOf(event.target);
    if (currentIndex < 0) return;

    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = buttons.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    const next = buttons[nextIndex];
    if (next.dataset.tabTarget) {
      activateTab(group, next.dataset.tabTarget);
      next.focus();
    }
  });
};

export const setupTabs = (): void => {
  document.querySelectorAll<HTMLElement>('[data-tab-group]').forEach(setupTabGroup);
};
