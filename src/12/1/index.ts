const countArrangements = ([spring, groupsOfDamaged]: string[]): number => {
  let count = 0;
  const springs = spring.split("");
  const groupSizes = groupsOfDamaged.split(",").map(Number);

  const isValidCombination = (candidate: string[], groupSizes: number[]): boolean => {
    const groups = candidate
      .join("")
      .split(/\.+/)
      .filter((symbol) => symbol != "");
    if (groups.length !== groupSizes.length) {
      return false;
    }

    for (let index = 0; index < groupSizes.length; index++) {
      if (groupSizes[index] != groups[index].length) {
        return false;
      }
    }

    return true;
  };

  const backtrack = (index: number, candidate: string[]): void => {
    if (index === springs.length) {
      if (isValidCombination(candidate, groupSizes)) {
        count++;
      }
      return;
    }

    if (springs[index] !== "?") {
      backtrack(index + 1, candidate);
    } else {
      candidate[index] = "#";
      backtrack(index + 1, candidate);

      candidate[index] = ".";
      backtrack(index + 1, candidate);

      candidate[index] = "?";
    }
  };

  backtrack(0, springs);

  return count;
};

export default function testing(input: string) {
  const records = input.split(/\n/).map((line) => countArrangements(line.split(/\s+/)));
  return records.reduce((acc, curr) => acc + curr, 0);
}
