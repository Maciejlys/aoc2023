import { Position } from "../utils/matrix";

export class Galaxy {
  private originalMap: string[][];
  private galaxiesPositions: Position[] = [];

  constructor(input: string) {
    this.originalMap = input.split(/\n/).map((line) => line.split(""));
  }

  private copyAllDotRows(arr: any[][]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].every((element) => element === ".")) {
        const rowToCopy = [...arr[i]];
        arr.splice(i + 1, 0, rowToCopy);
        i++; // Skip the copied row
      }
    }
  }

  private copyAllDotColumns(arr: any[][]): void {
    let duplicateCols = [];
    let numCols = arr[0].length;

    for (let i = 0; i < numCols; i++) {
      if (arr.every((row) => row[i] === ".")) {
        duplicateCols.push(i);
      }
    }

    for (let i = duplicateCols.length - 1; i >= 0; i--) {
      let idx = duplicateCols[i];
      for (let row of arr) {
        row.splice(idx + 1, 0, ".");
      }
    }
  }

  expandTheGalaxy() {
    this.copyAllDotRows(this.originalMap);
    this.copyAllDotColumns(this.originalMap);
    return this;
  }

  extractGalaxiesPosition() {
    for (let i = 0; i < this.originalMap.length; i++) {
      for (let j = 0; j < this.originalMap[i].length; j++) {
        if (this.originalMap[i][j] === "#") {
          this.galaxiesPositions.push({ x: i, y: j });
        }
      }
    }
    return this;
  }

  private manhattanDistance(pos1: Position, pos2: Position) {
    return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);
  }

  getGalaxiesDistancesSum() {
    let sum = 0;
    const queue = [...this.galaxiesPositions];

    while (queue.length > 1) {
      const pos1 = queue.pop()!;

      queue.forEach((pos2) => {
        sum += this.manhattanDistance(pos1, pos2);
      });
    }
    return sum;
  }
}
