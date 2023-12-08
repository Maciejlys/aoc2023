export const lcm = (a: number, b: number): number => {
  return b === 0 ? a : lcm(b, a % b);
};

export const lcmFromArray = (arr: number[]) => {
  return arr.reduce((acc, curr) => (acc * curr) / lcm(acc, curr), arr[0]);
};
