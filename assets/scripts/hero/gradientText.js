const GRADIENT_STOPS = [
  [102, 188, 126],
  [63, 184, 173],
  [112, 160, 255],
];

const mixChannel = ({ from, to, share }) => {
  const delta = to - from;
  const offset = delta * share;
  const mixed = from + offset;

  return Math.round(mixed);
};

const segmentAt = (progress) => {
  const lastStopIndex = GRADIENT_STOPS.length - 1;
  const lastSegmentIndex = GRADIENT_STOPS.length - 2;
  const scaled = progress * lastStopIndex;
  const floored = Math.floor(scaled);
  const index = Math.min(floored, lastSegmentIndex);

  return {
    from: GRADIENT_STOPS[index],
    to: GRADIENT_STOPS[index + 1],
    share: scaled - index,
  };
};

const mixChannels = ({ from, to, share }) =>
  from.map((channel, position) =>
    mixChannel({
      from: channel,
      to: to[position],
      share,
    }),
  );

const toRgb = (channels) => `rgb(${channels.join(' ')})`;

const colorAt = (progress) => toRgb(mixChannels(segmentAt(progress)));

const createSpan = () => document.createElement('span');

const createLetter = ({ letter, progress }) => {
  if (letter === ' ') return document.createTextNode(' ');

  const span = createSpan();
  span.className = 'gradient-text__letter';
  span.textContent = letter;
  span.style.color = colorAt(progress);

  return span;
};

const createSpokenText = (text) => {
  const spoken = createSpan();
  spoken.className = 'visually-hidden';
  spoken.textContent = text;

  return spoken;
};

const createLettersContainer = () => {
  const letters = createSpan();
  letters.className = 'gradient-text__letters';
  letters.setAttribute('aria-hidden', 'true');

  return letters;
};

const createLetterNodes = (text) => {
  const characters = [...text];
  const lastIndex = Math.max(characters.length - 1, 1);

  return characters.map((letter, index) =>
    createLetter({
      letter,
      progress: index / lastIndex,
    }),
  );
};

const createLetters = (text) => {
  const letters = createLettersContainer();
  letters.append(...createLetterNodes(text));

  return letters;
};

const paintGradientText = (element) => {
  const text = element.textContent.trim();

  element.replaceChildren(createSpokenText(text), createLetters(text));
};

document.querySelectorAll('.gradient-text').forEach(paintGradientText);
