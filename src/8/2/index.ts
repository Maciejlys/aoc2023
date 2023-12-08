import { lcmFromArray } from "../../utils/lcm";

class Node {
  value: string;
  left: Node | null;
  right: Node | null;

  constructor(value: string, left: Node | null = null, right: Node | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Graph {
  root: Node[] = [];

  build(input: Record<string, { left: string; right: string }>) {
    const createdNodes: Record<string, Node> = {};

    Object.keys(input).forEach((value) => {
      if (!createdNodes[value]) {
        createdNodes[value] = new Node(value);
      }
    });

    Object.keys(input).forEach((value) => {
      const parentNode = createdNodes[value];
      const leftValue = input[value].left;
      const rightValue = input[value].right;

      if (leftValue) {
        parentNode.left = createdNodes[leftValue];
      }

      if (rightValue) {
        parentNode.right = createdNodes[rightValue];
      }
    });

    Object.keys(input)
      .filter((key) => key.endsWith("A"))
      .forEach((value) => {
        this.root.push(createdNodes[value]);
      });

    return this;
  }

  findLCM(directions: string[]) {
    let stepsForAll: number[] = [];
    this.root.forEach((root) => {
      let currentNode = root;
      let steps = 0;

      while (!currentNode.value.endsWith("Z")) {
        directions.forEach((dir) => {
          if (currentNode.left && currentNode.right) {
            if (dir === "L") {
              currentNode = currentNode.left;
            } else {
              currentNode = currentNode.right;
            }
          }

          steps++;
        });
      }
      stepsForAll.push(steps);
    });

    return lcmFromArray(stepsForAll);
  }
}

export default function testing(input: string) {
  const parsed = input
    .split(/\n\n|\n/)
    .map((line) => line.replace("(", "").replace(")", "").split(/=/));

  const turns = parsed.shift()![0].split("");
  const nodes: Record<string, { left: string; right: string }> = {};

  parsed.forEach((line) => {
    const value = line.shift()?.trim()!;
    const [left, right] = line.pop()!.split(",");

    nodes[value] = { left: left.trim(), right: right.trim() };
  });

  return new Graph().build(nodes).findLCM(turns);
}
