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

export const transpose = <T>(array: T[][]) => array[0].map((_, c) => array.map((r) => r[c]));
