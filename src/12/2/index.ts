const countArrangements = ([spring, groupsOfDamaged]: string[]): number => {
  const cache = new Map<string, number>();
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

  const backtrack = (index: number, candidate: string[]): number => {
    if (index === springs.length) {
      if (isValidCombination(candidate, groupSizes)) {
        return 1;
      }
      return 0;
    }
    const key = candidate.join(",");

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    let count = 0;

    if (springs[index] !== "?") {
      candidate[index] = springs[index];
      count = backtrack(index + 1, candidate);
    } else {
      candidate[index] = "#";
      count += backtrack(index + 1, candidate);

      candidate[index] = ".";
      count += backtrack(index + 1, candidate);
    }

    candidate[index] = "?";
    cache.set(key, count);
    return count;
  };

  return backtrack(0, springs);
};

export default function testing(input: string) {
  const records = input.split(/\n/).map((line) => {
    const [orignalSprings, originalGroups] = line.split(" ");
    let springs = originalGroups;
    let groups = originalGroups;

    for (let index = 0; index < 5; index++) {
      springs += "?" + orignalSprings;
      groups += "," + originalGroups;
    }

    return countArrangements([springs, groups]);
  });
  return records.reduce((acc, curr) => acc + curr, 0);
}
