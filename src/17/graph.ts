import { Position } from "../utils/matrix";

export interface Node {
  position: Position;
  value: number;
}

export class Graph {
  adjacencyList: Map<string, Node[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  createKey(position: Position) {
    return `${position.x}-${position.y}`;
  }

  private addVertex(vertex: Node) {
    const key = this.createKey(vertex.position);
    if (!this.adjacencyList.has(key)) {
      this.adjacencyList.set(key, []);
    }
  }

  addEdge(vertex1: Node, vertex2: Node) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacencyList.get(this.createKey(vertex1.position))?.push(vertex2);
  }

  printGraph() {
    for (const [vertex, neighbors] of this.adjacencyList) {
      console.log(`${vertex} -> ${JSON.stringify(neighbors)}`);
    }
  }
}
