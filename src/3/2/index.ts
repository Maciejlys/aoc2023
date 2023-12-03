import { EngineSchematic } from "../engine-schematic";

export default function part2(input: string) {
  const schematic = new EngineSchematic(input);
  schematic.calculateSumOfGearRatios();
  return schematic.getSumOfGearRatios();
}
