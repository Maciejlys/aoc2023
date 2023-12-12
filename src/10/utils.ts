import { Directions } from "../utils/matrix";

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
