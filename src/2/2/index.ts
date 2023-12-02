const getPowerOfCubes = (line: string): number => {
  const maxes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  line
    .split(":")
    .pop()
    ?.split(";")
    .forEach((game) =>
      game
        .trim()
        .split(",")
        .forEach((set) => {
          const [amount, color] = set.trim().split(" ");
          maxes[color] = Math.max(maxes[color], Number(amount));
        })
    );

  return Object.values(maxes).reduce((acc, curr) => acc * curr, 1);
};

export default function testing(input: string) {
  return input.split("\n").reduce((acc, curr) => acc + getPowerOfCubes(curr), 0);
}
