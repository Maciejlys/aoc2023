const moveO = (
  dish: string[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
) => {
  dish[fromRow][fromCol] = ".";
  dish[toRow][toCol] = "O";
};

const tiltNorth = (dish: string[][]): void => {
  for (let row = 0; row < dish.length; ++row) {
    for (let col = 0; col < dish[0].length; ++col) {
      if (dish[row][col] !== "O") continue;
      let move;
      for (move = row - 1; move >= 0; --move) if (dish[move][col] !== ".") break;
      if (move + 1 !== row) moveO(dish, row, col, move + 1, col);
    }
  }
};

const tiltSouth = (dish: string[][]) => {
  for (let row = dish.length - 1; row >= 0; --row) {
    for (let col = 0; col < dish[0].length; ++col) {
      if (dish[row][col] !== "O") continue;
      let move;
      for (move = row + 1; move < dish.length; ++move) if (dish[move][col] !== ".") break;
      if (move - 1 !== row) moveO(dish, row, col, move - 1, col);
    }
  }
};

const tiltWest = (dish: string[][]) => {
  for (let col = 0; col < dish[0].length; ++col) {
    for (let row = 0; row < dish.length; ++row) {
      if (dish[row][col] !== "O") continue;
      let move;
      for (move = col - 1; move >= 0; --move) if (dish[row][move] !== ".") break;
      if (move + 1 !== col) moveO(dish, row, col, row, move + 1);
    }
  }
};

const tiltEast = (dish: string[][]) => {
  for (let col = dish[0].length - 1; col >= 0; --col) {
    for (let row = 0; row < dish.length; ++row) {
      if (dish[row][col] !== "O") continue;
      let move;
      for (move = col + 1; move < dish[0].length; ++move) if (dish[row][move] !== ".") break;
      if (move - 1 !== col) moveO(dish, row, col, row, move - 1);
    }
  }
};

const cycle = (dish: string[][]) => {
  tiltNorth(dish);
  tiltWest(dish);
  tiltSouth(dish);
  tiltEast(dish);
};

const countLoad = (dish: string[][]): number => {
  let res = 0;
  for (let row = 0; row < dish.length; ++row) {
    for (let col = 0; col < dish[0].length; ++col) {
      if (dish[row][col] === "O") res += dish.length - row;
    }
  }
  return res;
};

export default function testing(input: string) {
  let map = input.split("\n").map((line) => line.split(""));

  const cycleIndicators = new Map<string, number>();
  const indicatorBuilder: Array<string> = [];

  for (let i = 1; i < 1000000; ++i) {
    cycle(map);
    const indicatorPart = countLoad(map);
    indicatorBuilder.push(indicatorPart.toString());
    if (indicatorBuilder.length > 8) indicatorBuilder.shift();
    const indicator = indicatorBuilder.join();
    const lastIndexSpotted = cycleIndicators.get(indicator);
    if (lastIndexSpotted === undefined) {
      cycleIndicators.set(indicator, i);
    } else {
      const cycleLength = i - lastIndexSpotted;
      const stepsLeft = (1000000000 - i) % cycleLength;
      for (let j = 0; j < stepsLeft; ++j) {
        cycle(map);
      }
      break;
    }
  }

  return countLoad(map);
}
