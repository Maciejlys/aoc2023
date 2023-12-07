const parseInput = (input: string) => input.split(/\n/).map((line) => line.split(/:|\s+/));

const checkForWin = (speed: number, timeLeft: number, distance: number) =>
  speed * timeLeft > distance;

export default function testing(input: string) {
  const parsed = parseInput(input);
  const distance = Number(parsed.pop()?.splice(2).join(""));
  const time = Number(parsed.pop()?.splice(2).join(""));
  let result = 1;

  let counter = 0;

  for (let index = 0; index < time; index++) {
    if (checkForWin(index, time - index, distance)) {
      counter++;
    }
  }

  result *= counter;

  return result;
}
