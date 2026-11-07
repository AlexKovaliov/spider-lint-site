const WEB = {
  center: 300,
  radius: 300,
  spokes: 14,
  rings: 7,
};

const createPoint = ({ angle, distance }) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const offsetX = cos * distance;
  const offsetY = sin * distance;
  const x = WEB.center + offsetX;
  const y = WEB.center + offsetY;
  const xText = x.toFixed(1);
  const yText = y.toFixed(1);

  return `${xText} ${yText}`;
};

const createAngles = () =>
  Array.from({ length: WEB.spokes }, (_, index) => {
    const share = index / WEB.spokes;
    const turn = Math.PI * 2;
    return share * turn;
  });

const createSpoke = (angle) => {
  const start = `${WEB.center} ${WEB.center}`;
  const end = createPoint({ angle, distance: WEB.radius });

  return `M${start}L${end}`;
};

const createSpokes = (angles) => angles.map(createSpoke);

const createRing = ({ angles, ring }) => {
  const step = WEB.radius / WEB.rings;
  const distance = step * ring;
  const points = angles.map((angle) => createPoint({ angle, distance }));
  const joined = points.join('L');

  return `M${joined}Z`;
};

const createRings = (angles) =>
  Array.from({ length: WEB.rings }, (_, index) => {
    const ring = index + 1;

    return createRing({ angles, ring });
  });

const createSegments = () => {
  const angles = createAngles();
  const spokes = createSpokes(angles);
  const rings = createRings(angles);

  return [...spokes, ...rings];
};

const createPathData = () => {
  const segments = createSegments();

  return segments.join('');
};

const createPath = () => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const pathData = createPathData();

  path.setAttribute('d', pathData);

  return path;
};

const drawWeb = (web) => {
  const path = createPath();

  web.append(path);
};

document.querySelectorAll('.stage__web').forEach(drawWeb);
