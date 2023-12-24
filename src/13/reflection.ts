import { transpose } from "../utils/matrix";

export class Reflection {
  map: string[];

  constructor(input: string) {
    this.map = input
      .replace(/\./g, "0")
      .replace(/#/g, "1")
      .split(/\ns*\n/);
  }

  private transposeArray(arr: string[]): string[] {
    return arr[0]
      .split("")
      .map((_, colIndex) => arr.map((row) => row[colIndex]))
      .map((row) => row.join(""));
  }

  private findPointOfSymmetry(arr: number[]): number {
    for (let i = 0; i < arr.length - 1; i++) {
      let left = i;
      let right = i + 1;
      let foundMirror = true;
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

  findReflections(): number {
    let sum = 0;
    for (const patternInput of this.map) {
      const lines = patternInput.split("\n");
      const rowNumbers = lines.map((line) => parseInt(line, 2));
      const colNumbers = this.transposeArray(lines).map((line) => parseInt(line, 2));

      const rowSymmetryIndex = this.findPointOfSymmetry(rowNumbers);
      if (rowSymmetryIndex >= 0) {
        sum += 100 * rowSymmetryIndex;
      } else {
        const colSymmetryIndex = this.findPointOfSymmetry(colNumbers);
        sum += colSymmetryIndex;
      }
    }

    return sum;
  }
}
