import { hash } from "../hasing";

export default function testing(input: string) {
  return input
    .split(",")
    .map(hash)
    .reduce((acc, curr) => acc + curr);
}
