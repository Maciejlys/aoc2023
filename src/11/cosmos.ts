import { Position } from "../utils/matrix";

export class Cosmos {
  private originalMap: string[][];
  private galaxiesPositions: Position[] = [];

  constructor(input: string) {
    this.originalMap = input.split(/\n/).map((line) => line.split(""));
  }

  extractGalaxiesPositionAfterExpansion(multiplier = 2) {
    let emptyRows = this.originalMap.map((row) => row.every((symbol) => symbol === "."));
    let emptyCols = this.originalMap[0].map((_, colIndex) =>
      this.originalMap.every((row) => row[colIndex] === ".")
    );

    for (let i = 0; i < this.originalMap.length; i++) {
      for (let j = 0; j < this.originalMap[i].length; j++) {
        if (this.originalMap[i][j] === "#") {
          let expandableRowsPassed = emptyRows.slice(0, i).filter(Boolean).length;
          let expandableColsPassed = emptyCols.slice(0, j).filter(Boolean).length;

          this.galaxiesPositions.push({
            x: i + expandableRowsPassed * (multiplier - 1),
            y: j + expandableColsPassed * (multiplier - 1),
          });
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
