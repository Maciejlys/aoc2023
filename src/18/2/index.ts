import { calculateLagoonArea, lineToInstructions } from "..";

export default function testing(input: string) {
  const parsed = input.trim().split("\n").map(lineToInstructions);
  return calculateLagoonArea(parsed, 1);
}
