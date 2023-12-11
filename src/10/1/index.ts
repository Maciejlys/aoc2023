import { Pipes } from "../pipes";

export default function testing(input: string) {
  return new Pipes(input).getFurthestStepsFromAnimal();
}
