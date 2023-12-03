import { describe, expect, test } from "vitest";
import fs from "fs";
import testing from ".";

describe("3/2", () => {
  test("should pass with example input", () => {
    const input = fs.readFileSync(`${__dirname}/example.txt`, { encoding: "utf-8" });
    const output = 467835;

    const result = testing(input);

    expect(result).toStrictEqual(output);
  });

  test("should log the result", () => {
    const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: "utf-8" });

    const result = testing(input);
    console.log(result);
  });
});