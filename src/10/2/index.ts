import { Pipes } from "../pipes";

// part 2 was done using paint XDDD so this doesn't work
// I am going to fix this no I have real input with output

export default function testing(input: string) {
  return new Pipes(input).floodTheMap();
}
