/**
 * Returns first and last numbers in given string or -1
 * @param {string} line
 * @return {number}
 */
const getFirstAndLastNumbers = (line: string) => {
  const numbers = line.replace(/[^0-9]/g, "").split("");
  return Number(numbers[0] + numbers.at(-1)) || -1;
};

export default getFirstAndLastNumbers;
