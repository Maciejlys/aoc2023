import { describe, expect, test } from "vitest";
import fs from "fs";
import testing, { getSeedRanges } from ".";

describe("5/2", () => {
  test.skip("should pass with example input", () => {
    const input = fs.readFileSync(`${__dirname}/../example.txt`, { encoding: "utf-8" });
    const output = 46;

    const result = testing(input);

    expect(result).toStrictEqual(output);
  });

  test.skip("should log the result", () => {
    const input = fs.readFileSync(`${__dirname}/../input.txt`, { encoding: "utf-8" });

    const result = testing(input);
    console.log(result);
  });

  describe("getSeedRanges", () => {
    test("should log the result", () => {
      const input = [1, 2, 3, 4];
      const result = getSeedRanges(input);
      expect(result).toStrictEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    test("should log the result", () => {
      const input = [1, 2, 3, 4, 5, 6];
      const result = getSeedRanges(input);
      expect(result).toStrictEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });
  });
});
