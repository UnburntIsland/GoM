
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-tab-button]');
  const panels = document.querySelectorAll('[data-tab-panel]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tabButton;
      buttons.forEach(btn => {
        const active = btn === button;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tabPanel === target));
    });
  });
});
