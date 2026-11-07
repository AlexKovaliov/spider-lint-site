const REVEAL_THRESHOLD = 0.15;

const revealEntry = ({ entry, observer }) => {
  if (!entry.isIntersecting) return;

  const target = entry.target;

  target.classList.add('reveal--visible');
  observer.unobserve(target);
};

const handleEntries = ({ entries, observer }) => {
  entries.forEach((entry) => revealEntry({ entry, observer }));
};

const createObserver = () => {
  const options = { threshold: REVEAL_THRESHOLD };

  return new IntersectionObserver((entries, observer) => {
    handleEntries({ entries, observer });
  }, options);
};

const observeReveals = (observer) => {
  const elements = document.querySelectorAll('.reveal');

  elements.forEach((element) => observer.observe(element));
};

const revealOnScroll = () => {
  const observer = createObserver();

  observeReveals(observer);
};

revealOnScroll();
