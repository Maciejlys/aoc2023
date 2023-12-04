export const parseCardsData = (input: string) =>
  input.split("\n").map((line) =>
    line
      .split(/:|\|/)
      .splice(1)
      .map((numbers) => numbers.trim().split(/\s+/).map(Number))
  );

export const times = (arrA: number[], arrB: number[]) =>
  arrB.filter((n) => arrA.includes(n)).length;
