const capacity: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const findPossibleMatchesId = (line: string): number => {
  const id = Number(line.split(":").shift()?.split(" ").at(-1));
  const result = line
    .split(":")
    .pop()
    ?.split(";")
    .map((game) =>
      game
        .trim()
        .split(",")
        .some((set) => {
          const [amount, color] = set.trim().split(" ");
          return Number(amount) > capacity[color];
        })
    );

  return result?.some((result) => result) ? 0 : id;
};

export default function testing(input: string) {
  return input.split("\n").reduce((acc, curr) => acc + findPossibleMatchesId(curr), 0);
}
