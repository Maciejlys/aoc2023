import { isNumber, isSymbol } from "./utils";

type NumberInfo = {
  number: number;
  i: number;
  j: number[];
  isSymbolAdjacent: boolean;
  gearPos?: { i: number; j: number };
};

const adjacentOffsets = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

export class EngineSchematic {
  private schematic: string[][] = [];
  private numbersPositions: NumberInfo[] = [];
  private sumOfNumbersAdjacentToSymbol = 0;
  private sumOfGearRatios = 0;

  constructor(input: string) {
    this.schematic = input.split("\n").map((line) => line.split(""));
    this.extractNumberPos();
    this.checkIfSymbolAdjacent();
  }

  private extractNumberPos() {
    this.schematic.forEach((line, i) => {
      for (let j = 0; j < line.length; j++) {
        const pos: number[] = [];
        let number = "";
        while (isNumber(line[j])) {
          number += line[j];
          pos.push(j);
          j++;
        }

        if (pos.length) {
          this.numbersPositions.push({
            number: Number(number),
            i: i,
            j: pos,
            isSymbolAdjacent: false,
          });
        }
      }
    });
  }

  private isInBoundary(pos1: number, pos2: number) {
    return (
      pos1 >= 0 && pos1 < this.schematic.length && pos2 >= 0 && pos2 < this.schematic[pos1].length
    );
  }

  private checkIfSymbolAdjacent() {
    this.numbersPositions.forEach((numberPos) => {
      adjacentOffsets.forEach((pos) => {
        const [ioffset, joffset] = pos;
        numberPos.j.forEach((jpos) => {
          const pos1 = numberPos.i + ioffset;
          const pos2 = jpos + joffset;

          if (this.isInBoundary(pos1, pos2) && isSymbol(this.schematic[pos1][pos2])) {
            numberPos.isSymbolAdjacent = true;

            if (this.schematic[pos1][pos2] === "*") {
              numberPos.gearPos = {
                i: pos1,
                j: pos2,
              };
            }
          }
        });
      });
    });
  }

  calculateSumOfGearRatios() {
    const gears = this.numbersPositions.filter((numberPos) => numberPos.gearPos);
    gears.forEach((numberPos, i) => {
      for (let j = i + 1; j < gears.length; j++) {
        const secondNumber = gears[j];
        if (
          numberPos.gearPos?.i === secondNumber.gearPos?.i &&
          numberPos.gearPos?.j === secondNumber.gearPos?.j
        ) {
          this.sumOfGearRatios += numberPos.number * secondNumber.number;
        }
      }
    });
  }

  calculateSumOfNumbersAdjacentToSymbol() {
    this.sumOfNumbersAdjacentToSymbol = this.numbersPositions
      .filter((pos) => pos.isSymbolAdjacent)
      .reduce((acc, curr) => acc + curr.number, 0);
  }

  log() {
    console.log(this.numbersPositions);
  }

  getSumOfNumbersAdjacentToSymbol() {
    return this.sumOfNumbersAdjacentToSymbol;
  }

  getSumOfGearRatios() {
    return this.sumOfGearRatios;
  }
}
