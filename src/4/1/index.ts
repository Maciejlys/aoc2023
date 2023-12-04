import { parseCardsData, times } from "../utils";

const getScore = ([winning, numbers]: number[][]) => {
  const occurencesAmount = times(winning, numbers);
  return occurencesAmount != 0 ? 2 ** (occurencesAmount - 1) : 0;
};

const calculateWinningCards = (input: string): number =>
  parseCardsData(input).reduce((acc, curr) => acc + getScore(curr), 0);

const part1 = (input: string) => calculateWinningCards(input);

export default part1;
