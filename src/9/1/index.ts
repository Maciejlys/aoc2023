export const extrapolateLastValue = (history: number[]) => {
  const expanded = [history];

  while (expanded.at(-1)!.some((n) => n !== 0)) {
    const last = expanded.at(-1)!;
    const next = last.slice(1).map((v, i) => v - last[i]);

    expanded.push(next);
  }

  expanded.at(-1)!.push(0);

  for (let i = expanded.length - 2; i >= 0; i--) {
    expanded[i].push(expanded[i].at(-1)! + expanded[i + 1].at(-1)!);
  }

  history.push(expanded[0].at(-1)!);

  return history;
};

export default function testing(input: string) {
  const histories: number[][] = input.split(/\n/).map((line) => line.split(/\s+/).map(Number));
  return histories.map(extrapolateLastValue).reduce((acc, curr) => acc + curr.at(-1)!, 0);
}
