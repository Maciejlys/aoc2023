import { findHeatLoss } from "..";

export default function testing(input: string) {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  return findHeatLoss(grid, 3, 0);
}
