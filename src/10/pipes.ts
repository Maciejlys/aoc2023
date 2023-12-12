import { connectedTo, isConnected } from "./utils";
import { offsets, opposingDirection, Directions, Position } from "../utils/matrix";

export class Pipes {
  private map: string[][];
  private orignal: string[][];
  private turnsMap: string[][];
  private animalPos: Position;
  private loopDirection: Directions;
  private loopPositions: Position[] = [];

  constructor(private input: string) {
    this.convertToMap();
    this.findLoopDirection();
    this.travelThroughLoop();
  }

  private convertToMap() {
    this.orignal = this.input.split(/\n/).map((line) => line.split(""));
    this.turnsMap = this.input.split(/\n/).map((line) => line.split(""));
    this.map = this.input.split(/\n/).map((line, i) =>
      line.split("").map((symbol, j) => {
        if (symbol === "S") {
          this.animalPos = {
            x: i,
            y: j,
          };
        }
        return symbol;
      })
    );
    this.loopPositions.push(this.animalPos);
  }

  isValid(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.map.length && y < this.map[x].length;
  }

  private findLoopDirection() {
    const dir = Object.keys(offsets).find((direction) => {
      const offset: Position = offsets[direction];
      const opposing: Directions = opposingDirection[direction];

      if (this.animalPos.x + offset.x >= this.map.length) return false;
      if (this.animalPos.y + offset.y >= this.map[this.animalPos.x].length) return false;

      return isConnected(
        this.map[this.animalPos.x + offset.x][this.animalPos.y + offset.y],
        opposing
      );
    });
    if (dir) {
      this.loopDirection = dir;
    }
  }

  private travelThroughLoop() {
    let nextPosI = this.animalPos.x + offsets[this.loopDirection].x;
    let nextPosJ = this.animalPos.y + offsets[this.loopDirection].y;
    let next = this.map[nextPosI][nextPosJ];
    this.turnsMap[this.animalPos.x][this.animalPos.y] = `${connectedTo[this.loopDirection]}`;

    while (next != "S" || !isConnected(next, this.loopDirection)) {
      this.loopPositions.push({
        x: nextPosI,
        y: nextPosJ,
      });
      this.turnsMap[nextPosI][nextPosJ] = `${this.loopDirection}`;
      this.loopDirection = connectedTo[next].find(
        (dir) => opposingDirection[dir] != this.loopDirection
      )!;
      nextPosI = nextPosI + offsets[this.loopDirection].x;
      nextPosJ = nextPosJ + offsets[this.loopDirection].y;
      next = this.map[nextPosI][nextPosJ];
    }

    this.loopPositions.forEach((position) => {
      this.map[position.x][position.y] = "1";
    });
  }

  private floodEdges() {
    const floodFill = (position: Position, visited: Set<string>) => {
      if (position.x < 0 || position.x > this.map.length - 1) return;
      if (position.y < 0 || position.y > this.map[position.x].length - 1) return;
      if (this.map[position.x][position.y] === "1") return;

      const key = `${position.x}_${position.y}`;

      if (visited.has(key)) return;
      visited.add(key);

      this.map[position.x][position.y] = "0";

      Object.values(offsets).forEach((a) => {
        floodFill({ x: position.x + a.x, y: position.y + a.y }, visited);
      });
    };
    const visited = new Set<string>();

    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (i === 0 || j === 0 || i === this.map.length - 1 || j === this.map[i].length - 1) {
          floodFill({ x: i, y: j }, visited);
        }
      }
    }
  }

  floodTheMap() {
    return 0;
  }

  getFurthestStepsFromAnimal() {
    return this.loopPositions.length / 2;
  }
}
