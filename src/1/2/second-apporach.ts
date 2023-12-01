import getFirstAndLastNumbers from "../../utils/getFirstAndLastNumber";

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

const convertStringToNumber = (str: string) => {
  for (let [key, entry] of Object.entries(dictionary)) {
    str = str.replace(key, entry);
  }

  return str;
};

const containsValidWord = (word: string) => {
  for (let key of Object.keys(dictionary)) {
    if (word.includes(key)) return true;
  }
  return false;
};

const geFirstAndLast = (line: string) => {
  let l = 0;
  let r = line.length;
  const size = 5;

  while (l < r) {
    let leftSplit = line.substring(l, size);
    let rightSplit = line.substring(line.length - r, line.length);

    if (!containsValidWord(leftSplit)) {
      l++;
    } else {
      line = line.replace(leftSplit, convertStringToNumber(leftSplit));
    }
    if (!containsValidWord(rightSplit)) {
      r--;
    } else {
      line = line.replace(rightSplit, convertStringToNumber(rightSplit));
    }
  }

  return getFirstAndLastNumbers(line);
};

function part2(input: string) {
  return input.split("\n").reduce((acc, curr) => acc + geFirstAndLast(curr), 0);
}
