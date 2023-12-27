export const hash = (input: string) =>
  input.split("").reduce((acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256, 0);
