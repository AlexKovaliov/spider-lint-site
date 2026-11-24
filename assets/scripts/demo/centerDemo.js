const DEMO_HASH = '#demo';

const documentTop = (element) => {
  let top = 0;
  for (let current = element; current; current = current.offsetParent) {
    top += current.offsetTop;
  }

  return top;
};

const headerHeight = () => document.querySelector('.header')?.offsetHeight ?? 0;

const demoScrollTop = (video) => {
  const header = headerHeight();
  const visibleHeight = window.innerHeight - header;
  const videoTop = documentTop(video);
  const fitsOnScreen = video.offsetHeight <= visibleHeight;
  if (!fitsOnScreen) return videoTop - header;

  return videoTop - header - (visibleHeight - video.offsetHeight) / 2;
};

const centerDemo = (event) => {
  const video = document.querySelector(`${DEMO_HASH} video`);
  if (!video) return;

  event.preventDefault();
  window.scrollTo({ top: demoScrollTop(video) });
  video.focus({ preventScroll: true });
  window.history.pushState(null, '', DEMO_HASH);
};

document.querySelectorAll(`a[href="${DEMO_HASH}"]`).forEach((link) => {
  link.addEventListener('click', centerDemo);
});
