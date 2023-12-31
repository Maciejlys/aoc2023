import { Directions, offsets } from "../../utils/matrix";
import { Graph, Node } from "../graph";

const buildGraph = (parsed: string[][], graph: Graph) => {
  for (let i = 0; i < parsed.length; i++) {
    for (let j = 0; j < parsed[i].length; j++) {
      const vertex: Node = {
        position: {
          x: i,
          y: j,
        },
        value: +parsed[i][j],
      };
      if (
        i + offsets[Directions.Down].x < parsed.length &&
        j + offsets[Directions.Down].y < parsed[i].length
      ) {
        const left: Node = {
          position: {
            x: i + offsets[Directions.Down].x,
            y: j + offsets[Directions.Down].y,
          },
          value:
            +parsed[i + offsets[Directions.Down].x][
              j + offsets[Directions.Down].y
            ],
        };
        graph.addEdge(vertex, left);
      }
      if (
        i + offsets[Directions.Right].x < parsed.length &&
        j + offsets[Directions.Right].y < parsed[i].length
      ) {
        const right: Node = {
          position: {
            x: i + offsets[Directions.Right].x,
            y: j + offsets[Directions.Right].y,
          },
          value:
            +parsed[i + offsets[Directions.Right].x][
              j + offsets[Directions.Right].y
            ],
        };
        graph.addEdge(vertex, right);
      }
    }
  }
};

export default function testing(input: string) {
  const parsed = input.split(/\n/).map((line) => line.split(""));
  const graph = new Graph();
  buildGraph(parsed, graph);
  // graph.printGraph();
  console.log("testing");

  return 0;
}
