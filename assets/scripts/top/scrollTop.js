const SHOW_AFTER_PIXELS = 600;

const toggleScrollTop = (button) => {
  button.classList.toggle('to-top--shown', window.scrollY > SHOW_AFTER_PIXELS);
};

document.querySelectorAll('.to-top').forEach((button) => {
  toggleScrollTop(button);
  window.addEventListener('scroll', () => toggleScrollTop(button), { passive: true });
});
