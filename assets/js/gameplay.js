
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-tab-button]');
  const panels = document.querySelectorAll('[data-tab-panel]');
  if (!buttons.length || !panels.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.tabButton;
      buttons.forEach(btn => btn.classList.toggle('active', btn === button));
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tabPanel === target));
    });
  });
});
