import getFirstAndLastNumbers from "../../utils/getFirstAndLastNumber";

const part1 = (input: string) =>
  input.split("\n").reduce((acc, curr) => acc + getFirstAndLastNumbers(curr), 0);

export default part1;
