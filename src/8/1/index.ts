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
  root: Node | null;

  build(input: Record<string, { left: string; right: string }>, rootNodeValue: string) {
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

    this.root = createdNodes[rootNodeValue];

    return this;
  }

  getAmountOfStepsToTarget(turns: string[], target: string) {
    let currentNode = this.root;
    let steps = 0;
    while (true) {
      for (let index = 0; index < turns.length; index++) {
        if (currentNode?.value === target) {
          return steps;
        }
        const turn = turns[index];
        if (turn === "L") {
          currentNode = currentNode?.left!;
        } else {
          currentNode = currentNode?.right!;
        }
        steps++;
      }
    }
  }
}

export default function testing(input: string) {
  const parsed = input
    .split(/\n\n|\n/)
    .map((line) => line.replace("(", "").replace(")", "").split(/=/));

  const [turns] = parsed.shift()!;
  const nodes: Record<string, { left: string; right: string }> = {};

  parsed.forEach((line) => {
    const value = line.shift()?.trim()!;
    const [left, right] = line.pop()!.split(",");

    nodes[value] = { left: left.trim(), right: right.trim() };
  });

  return new Graph().build(nodes, "AAA").getAmountOfStepsToTarget(turns.split(""), "ZZZ");
}
