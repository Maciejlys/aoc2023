import { extrapolateLastValue } from "../1";

export default function testing(input: string) {
  const histories: number[][] = input
    .split(/\n/)
    .map((line) => line.split(/\s+/).reverse().map(Number));
  histories.map(extrapolateLastValue);
  return histories.reduce((acc, curr) => acc + curr.at(-1)!, 0);
}
