const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const stopVideosForReducedMotion = () => {
  if (!isReducedMotion()) return;

  document.querySelectorAll('video').forEach((video) => {
    video.removeAttribute('autoplay');
    video.pause();
  });
};

stopVideosForReducedMotion();
