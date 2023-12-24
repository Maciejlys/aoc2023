import { transpose } from "../utils/matrix";

export class Reflection {
  map: string[][];
  rows: string[][] = [];
  colums: string[][] = [];

  constructor(input: string) {
    this.map = input.split(/\n/).map((line) => line.split(""));
    this.rows = this.map;
    this.colums = transpose(this.map);
  }

  private checkIfReflection(array: string[][], index: number) {
    let offset = 1;
    while (array[index] || array[index + offset]) {
      if (
        array[index] &&
        array[index + offset] &&
        JSON.stringify(array[index]) != JSON.stringify(array[index + offset])
      ) {
        return false;
      }

      index--;
      offset += 2;
    }

    return true;
  }

  private getReflectionIndex(array: string[][]) {
    for (let index = 0; index < array.length; index++) {
      if (JSON.stringify(array[index]) === JSON.stringify(array[index + 1])) {
        if (this.checkIfReflection(array, index)) {
          return index;
        }
      }
    }
    return 0;
  }

  findReflections(): number {
    let result = {
      horizontal: 0,
      vertical: 0,
    };

    result.horizontal = this.getReflectionIndex(this.rows);
    result.vertical = this.getReflectionIndex(this.colums);

    return result.horizontal ? (result.horizontal + 1) * 100 : result.vertical + 1;
  }
}
