import { Directions } from "../../utils/matrix";

const parse = (input: string): string[][] => {
  const lines = input.trim().split("\n");
  return Array.from({ length: lines.length }, (_, y) =>
    Array.from({ length: lines[0].length }, (_, x) => lines[y][x])
  );
};

const isOutOfBounds = ({ x, y }: State, grid: string[][]): boolean => {
  return x < 0 || y < 0 || y >= grid.length || x >= grid[0].length;
};

type State = {
  x: number;
  y: number;
  direction: Directions;
  seen: Set<string>;
};

const move = (state: State): State => {
  const { x, y, direction } = state;
  switch (direction) {
    case Directions.Up:
      return { ...state, y: y - 1 };
    case Directions.Down:
      return { ...state, y: y + 1 };
    case Directions.Left:
      return { ...state, x: x - 1 };
    case Directions.Right:
      return { ...state, x: x + 1 };
  }
};

const solve = (input: string) => {
  const grid = parse(input);
  const state: State = {
    x: 0,
    y: 0,
    direction: Directions.Right,
    seen: new Set(),
  };
  const energized = new Set<string>();

  const step = (state: State) => {
    if (isOutOfBounds(state, grid)) return;

    const { x, y, direction, seen } = state;

    const key = `${x},${y},${direction}`;
    if (seen.has(key)) return;
    seen.add(key);

    energized.add(`${x},${y}`);

    switch (grid[y][x]) {
      case ".":
        step(move(state));
        break;
      case "|":
        switch (direction) {
          case Directions.Up:
          case Directions.Down:
            step(move(state));
            break;
          case Directions.Left:
          case Directions.Right:
            step(move({ ...state, direction: Directions.Up }));
            step(move({ ...state, direction: Directions.Down }));
            break;
        }
        break;
      case "-":
        switch (direction) {
          case Directions.Left:
          case Directions.Right:
            step(move(state));
            break;
          case Directions.Down:
          case Directions.Up:
            step(move({ ...state, direction: Directions.Left }));
            step(move({ ...state, direction: Directions.Right }));
            break;
        }
        break;
      case "/":
        switch (direction) {
          case Directions.Up:
            step(move({ ...state, direction: Directions.Right }));
            break;
          case Directions.Down:
            step(move({ ...state, direction: Directions.Left }));
            break;
          case Directions.Left:
            step(move({ ...state, direction: Directions.Down }));
            break;
          case Directions.Right:
            step(move({ ...state, direction: Directions.Up }));
            break;
        }
        break;
      case "\\":
        switch (direction) {
          case Directions.Up:
            step(move({ ...state, direction: Directions.Left }));
            break;
          case Directions.Down:
            step(move({ ...state, direction: Directions.Right }));
            break;
          case Directions.Left:
            step(move({ ...state, direction: Directions.Up }));
            break;
          case Directions.Right:
            step(move({ ...state, direction: Directions.Down }));
            break;
        }
        break;
    }
  };

  step(state);

  return energized.size;
};

export default function testing(input: string) {
  return solve(input);
}
