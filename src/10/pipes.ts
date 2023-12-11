import {
  Directions,
  Position,
  connectedTo,
  isConnected,
  offsets,
  opposingDirection,
} from "./utils";
import fs from "fs";

export class Pipes {
  private map: string[][];
  private orignal: string[][];
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

  private findLoopDirection() {
    const dir = Object.keys(offsets).find((direction) => {
      const offset: Position = offsets[direction];
      const opposing: Directions = opposingDirection[direction];
      if (offset) {
        return isConnected(
          this.map[this.animalPos.x + offset.x][this.animalPos.y + offset.y],
          opposing
        );
      }
    });
    if (dir) {
      this.loopDirection = dir;
    }
  }

  private travelThroughLoop() {
    let nextPosI = this.animalPos.x + offsets[this.loopDirection].x;
    let nextPosJ = this.animalPos.y + offsets[this.loopDirection].y;
    let next = this.map[nextPosI][nextPosJ];

    while (next != "S" || !isConnected(next, this.loopDirection)) {
      this.loopPositions.push({
        x: nextPosI,
        y: nextPosJ,
      });
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
    const visited = new Set<string>();

    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (i === 0 || j === 0 || i === this.map.length - 1 || j === this.map[i].length - 1) {
          this.floodFill({ x: i, y: j }, visited);
        }
      }
    }
  }

  private floodFill(position: Position, visited: Set<string>) {
    if (position.x < 0 || position.x > this.map.length - 1) return;
    if (position.y < 0 || position.y > this.map[position.x].length - 1) return;
    if (this.map[position.x][position.y] === "1") return;

    const key = `${position.x}_${position.y}`;

    if (visited.has(key)) return;
    visited.add(key);
    this.map[position.x][position.y] = "0";

    Object.values(offsets).forEach((a) => {
      this.floodFill({ x: position.x + a.x, y: position.y + a.y }, visited);
    });
  }

  floodTheMap() {
    this.floodEdges();
    let count = 0;

    for (let i = 0; i < this.map.length; i++) {
      let flag = false;
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] === "1") {
          if (this.orignal[i][j] != "S") {
            if (
              connectedTo[this.orignal[i][j]].some(
                (dir) => dir === Directions.Down || dir === Directions.Up
              )
            ) {
              flag = !flag;
            }
          }
        } else if (this.map[i][j] != "0" && flag) {
          count++;
        }
      }
    }

    var file = fs.createWriteStream(`${__dirname}/output.txt`);
    this.orignal.forEach(function (v) {
      file.write(v.join(", ") + "\n");
    });
    file.end();

    return count;
  }

  getFurthestStepsFromAnimal() {
    return this.loopPositions.length / 2;
  }
}
