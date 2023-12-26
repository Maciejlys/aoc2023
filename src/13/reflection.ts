import { transpose } from "../utils/matrix";

export class Reflection {
  map: string[];
  allVersions: string[][] = [];

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

  private isPowerOfTwo(num: number): boolean {
    return num > 0 && (num & (num - 1)) === 0;
  }

  findReflections(withSmudges = false): number {
    let sum = 0;
    for (const patternInput of this.map) {
      const lines = patternInput.split("\n");
      const rowNumbers = lines.map((line) => parseInt(line, 2));
      const colNumbers = this.transposeArray(lines).map((line) => parseInt(line, 2));

      const rowSymmetryIndex = withSmudges
        ? this.findPointOfSymmetryWithSmudge(rowNumbers)
        : this.findPointOfSymmetry(rowNumbers);
      if (rowSymmetryIndex >= 0) {
        sum += 100 * rowSymmetryIndex;
      } else {
        const colSymmetryIndex = withSmudges
          ? this.findPointOfSymmetryWithSmudge(colNumbers)
          : this.findPointOfSymmetry(colNumbers);
        sum += colSymmetryIndex;
      }
    }

    return sum;
  }

  private findPointOfSymmetryWithSmudge(arr: number[]): number {
    for (let i = 0; i < arr.length - 1; i++) {
      let left = i;
      let right = i + 1;
      let foundMirror = true;
      let hasSmudge = false;
      while (left >= 0 && right < arr.length) {
        if (arr[left] != arr[right]) {
          let mask = arr[left] ^ arr[right];
          let isOneOff = this.isPowerOfTwo(mask);
          if (hasSmudge) {
            foundMirror = false;
            break;
          }

          if (!isOneOff) {
            foundMirror = false;
            break;
          }

          hasSmudge = true;
        }

        left--;
        right++;
      }

      if (foundMirror && hasSmudge) {
        return i + 1;
      }
    }
    return -1;
  }
}
