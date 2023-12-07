const dictionary: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const validWords = Object.keys(dictionary);

const isValidWord = (word: string) => validWords.includes(word);

const findFirstNumber = (line: string): string => {
  let word = "";
  for (let index = 0; index < line.length; index++) {
    word += line[index];

    if (isValidWord(word)) return dictionary[word];
  }
  if (Number(line.at(0))) return line.at(0)!;
  return findFirstNumber(line.substring(1));
};

const findLastNumber = (line: string): string => {
  let word = "";
  for (let index = line.length - 1; index >= 0; index--) {
    word = line[index] + word;

    if (isValidWord(word)) return dictionary[word];
  }
  if (Number(line.at(-1))) return line.at(-1)!;
  return findLastNumber(line.substring(0, line.length - 1));
};

const part2 = (input: string) =>
  input
    .split("\n")
    .reduce((acc, curr) => acc + Number(findFirstNumber(curr) + findLastNumber(curr)), 0);

export default part2;
