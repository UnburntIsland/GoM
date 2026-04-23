
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.milestone-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach(btn => btn.classList.toggle('active', btn === button));
      cards.forEach(card => {
        const state = card.dataset.state;
        const show = filter === 'all' || filter === state;
        card.style.display = show ? '' : 'none';
      });
    });
  });
});
