// import { Reflection } from "../reflection";

// export default function testing(input: string) {
//   return input
//     .split(/\n\n/)
//     .map((island) => new Reflection(island).findReflections())
//     .reduce((acc, curr) => acc + curr, 0);
// }

import * as fs from "fs";
const patternInputs = fs
  .readFileSync(`${__dirname}/../input.txt`, {
    encoding: "utf8",
  })
  .replace(/\./g, "0")
  .replace(/#/g, "1")
  .split(/\ns*\n/);

function transposeArray(arr: string[]): string[] {
  return arr[0]
    .split("")
    .map((_, colIndex) => arr.map((row) => row[colIndex]))
    .map((row) => row.join(""));
}

var sum = 0;
for (const patternInput of patternInputs) {
  const lines = patternInput.split("\n");
  const rowNumbers = lines.map((line) => parseInt(line, 2));
  const colNumbers = transposeArray(lines).map((line) => parseInt(line, 2));

  var rowSymmetryIndex = findPointOfSymmetry(rowNumbers);
  if (rowSymmetryIndex >= 0) {
    sum += 100 * rowSymmetryIndex;
  } else {
    var colSymmetryIndex = findPointOfSymmetry(colNumbers);
    sum += colSymmetryIndex;
  }
}

function findPointOfSymmetry(arr: number[]): number {
  for (var i = 0; i < arr.length - 1; i++) {
    var left = i;
    var right = i + 1;
    var foundMirror = true;
    while (left >= 0 && right < arr.length) {
      if (arr[left] != arr[right]) {
        foundMirror = false;
        break;
      }

      left--;
      right++;
    }

    if (foundMirror) {
      return i + 1;
    }
  }
  return -1;
}

console.log(sum);

export default function testing(input: string) {
  return sum;
}
