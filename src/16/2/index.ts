import { Directions } from "../../utils/matrix";

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

const solve = (grid: string[][], state: State) => {
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
  const grid = input.split("\n").map((line) => line.split(""));
  const energized: number[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i === 0) {
        energized.push(solve(grid, { x: j, y: i, direction: Directions.Down, seen: new Set() }));
      } else if (i === grid.length - 1) {
        energized.push(solve(grid, { x: j, y: i, direction: Directions.Up, seen: new Set() }));
      }
      if (j === 0) {
        energized.push(solve(grid, { x: j, y: i, direction: Directions.Right, seen: new Set() }));
      } else if (j === grid[i].length - 1) {
        energized.push(solve(grid, { x: j, y: i, direction: Directions.Left, seen: new Set() }));
      }
    }
  }

  return energized.reduce((acc, curr) => Math.max(curr, acc), 0);
}
