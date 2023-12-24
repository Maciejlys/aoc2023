import { Reflection } from "../reflection";

export default function testing(input: string) {
  return input
    .split(/\n\n/)
    .map((island) => new Reflection(island).findReflections())
    .reduce((acc, curr) => acc + curr, 0);
}
