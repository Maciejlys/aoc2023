import { EngineSchematic } from "..";

export default function part1(input: string) {
  const schematic = new EngineSchematic(input);
  schematic.calculateSumOfNumbersAdjacentToSymbol();
  return schematic.getSumOfNumbersAdjacentToSymbol();
}
