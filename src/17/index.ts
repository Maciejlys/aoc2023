type State = {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  straight: number;
  heat: number;
  start: boolean;
};

const delta: [number, number][] = [
  [-1, 0], // N
  [0, 1], // E
  [0, -1], // W
  [1, 0], // S
];

const getStateKey = ({ x: r, y: c, dirX: dr, dirY: dc, straight: ss }: State) =>
  `${r}:${c}:${dr}:${dc}:${ss}`;

const pushToQueue = (
  states: State[],
  x: number,
  y: number,
  dirX: number,
  dirY: number,
  straight: number,
  heat: number,
) => {
  const s = { x, y, dirX, dirY, straight, heat, start: false };
  for (let i = states.length - 1; 0 <= i; i--) {
    if (states[i].heat <= s.heat) {
      states.splice(i + 1, 0, s);
      return;
    }
  }
  if (states.length === 0) {
    states.push(s);
    return;
  }
  states.unshift(s);
};

export const findHeatLoss = (
  gird: number[][],
  maxStraightSteps: number,
  minStepsBeforeTurn: number,
) => {
  const [targetX, targetY] = [gird.length - 1, gird[0].length - 1];
  const inBound = (x: number, y: number) =>
    0 <= x && x <= targetX && 0 <= y && y <= targetY;
  const start: State = {
    x: 0,
    y: 0,
    dirX: 0,
    dirY: 0,
    straight: 0,
    heat: 0,
    start: true,
  };
  const toVisit: State[] = [start];
  const seen = new Set<string>();
  while (toVisit.length) {
    const state = toVisit.shift()!;
    const { x, y, dirX, dirY, straight, heat, start } = state;
    if (x === targetX && y === targetY && minStepsBeforeTurn <= straight) {
      return heat;
    }
    const key = getStateKey(state);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    if (!start && straight < maxStraightSteps) {
      const nr = x + dirX;
      const nc = y + dirY;
      if (inBound(nr, nc)) {
        pushToQueue(
          toVisit,
          nr,
          nc,
          dirX,
          dirY,
          straight + 1,
          heat + gird[nr][nc],
        );
      }
    }

    if (start || minStepsBeforeTurn <= straight) {
      for (const [ndr, ndc] of delta) {
        if (
          (ndr === dirX && ndc === dirY) ||
          (ndr === dirX * -1 && ndc === dirY * -1)
        ) {
          continue;
        }
        const nr = x + ndr;
        const nc = y + ndc;
        if (inBound(nr, nc)) {
          pushToQueue(toVisit, nr, nc, ndr, ndc, 1, heat + gird[nr][nc]);
        }
      }
    }
  }
  return -1;
};
