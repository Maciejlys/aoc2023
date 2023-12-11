export enum Directions {
  Up,
  Down,
  Left,
  Right,
}

export interface Position {
  x: number;
  y: number;
}

export const opposingDirection: Record<Directions, Directions> = {
  [Directions.Right]: Directions.Left,
  [Directions.Left]: Directions.Right,
  [Directions.Up]: Directions.Down,
  [Directions.Down]: Directions.Up,
};

export const offsets: Record<Directions, Position> = {
  [Directions.Up]: { x: -1, y: 0 },
  [Directions.Down]: { x: 1, y: 0 },
  [Directions.Left]: { x: 0, y: -1 },
  [Directions.Right]: { x: 0, y: 1 },
};

export const connectedTo: Record<string, Directions[]> = {
  "|": [Directions.Up, Directions.Down],
  "-": [Directions.Left, Directions.Right],
  L: [Directions.Up, Directions.Right],
  J: [Directions.Up, Directions.Left],
  "7": [Directions.Left, Directions.Down],
  F: [Directions.Right, Directions.Down],
};

export const isConnected = (target: string, direction: Directions): boolean => {
  if (target === ".") return false;
  if (target === "S") return true;
  else {
    return connectedTo[target].some((dir) => dir === direction);
  }
};
