
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.milestone-card');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach(btn => btn.classList.toggle('active', btn === button));
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.state === filter;
        card.hidden = !show;
      });
    });
  });
});
