import { describe, expect, test } from "vitest";
import fs from "fs";
import testing from ".";

describe("19/1", () => {
  test("should pass with example input", () => {
    const input = fs.readFileSync(`${__dirname}/../example.txt`, {
      encoding: "utf-8",
    });
    const output = 19114;

    const result = testing(input);

    expect(result).toStrictEqual(output);
  });

  test.skip("should log the result", () => {
    const input = fs.readFileSync(`${__dirname}/../input.txt`, {
      encoding: "utf-8",
    });

    const result = testing(input);
    console.log(result);
  });

  test("should pass after refactor", () => {
    const input = fs.readFileSync(`${__dirname}/../input.txt`, {
      encoding: "utf-8",
    });
    const output = 374873;

    const result = testing(input);

    expect(result).toStrictEqual(output);
  });
});
