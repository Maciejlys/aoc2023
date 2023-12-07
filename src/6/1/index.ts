const parseInput = (input: string) => input.split(/\n/).map((line) => line.split(/:|\s+/));

const checkForWin = (speed: number, timeLeft: number, distance: number) =>
  speed * timeLeft > distance;

export default function testing(input: string) {
  const parsed = parseInput(input);
  const distances = parsed.pop()?.splice(2).map(Number)!;
  const times = parsed.pop()?.splice(2).map(Number);
  let result = 1;

  times?.forEach((time, i) => {
    const distanceToPass = distances[i];
    let counter = 0;

    for (let index = 0; index < time; index++) {
      if (checkForWin(index, time - index, distanceToPass)) {
        counter++;
      }
    }

    result *= counter;
  });

  return result;
}
