import { transpose } from "../../utils/matrix";

export default function testing(input: string) {
  const map = transpose(input.split("\n").map((line) => line.split("")));
  map.forEach((line) => line.unshift("#"));

  let sum = 0;
  for (let index = 0; index < map.length; index++) {
    const col = map[index];
    let rocksAmount = 0;
    for (let j = col.length - 1; j >= 0; j--) {
      if (col[j] === "#") {
        for (let amount = 0; amount < rocksAmount; amount++) {
          sum += col.length - 1 - j - amount;
        }
        rocksAmount = 0;
      } else if (col[j] === "O") {
        rocksAmount++;
      }
    }
  }

  return sum;
}
