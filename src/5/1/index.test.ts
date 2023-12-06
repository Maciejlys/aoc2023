import { describe, expect, test } from "vitest";
import fs from "fs";
import testing, { mapSeed, mapSeedMultipleMaps } from ".";

describe("5/1", () => {
  test("should pass with example input", () => {
    const input = fs.readFileSync(`${__dirname}/../example.txt`, { encoding: "utf-8" });
    const output = 35;

    const result = testing(input);

    expect(result).toStrictEqual(output);
  });

  test("should log the result", () => {
    const input = fs.readFileSync(`${__dirname}/../input.txt`, { encoding: "utf-8" });

    const result = testing(input);
    console.log(result);
  });

  describe("mapValue", () => {
    test("should pass", () => {
      const seed = 98;
      const map: [number, number, number] = [50, 98, 2];

      expect(mapSeed(seed, map)).toStrictEqual(50);
    });

    test("should pass", () => {
      const seed = 99;
      const map: [number, number, number] = [50, 98, 2];

      expect(mapSeed(seed, map)).toStrictEqual(51);
    });

    test("should pass", () => {
      const seed = 53;
      const map: [number, number, number] = [52, 50, 48];

      expect(mapSeed(seed, map)).toStrictEqual(55);
    });

    test("should pass", () => {
      const seed = 500;
      const map: [number, number, number] = [52, 50, 48];

      expect(mapSeed(seed, map)).toStrictEqual(500);
    });

    test("should pass", () => {
      const seed = 53;
      const map: [number, number, number] = [49, 53, 8];

      expect(mapSeed(seed, map)).toStrictEqual(49);
    });
  });

  describe("mapValueMultiple", () => {
    test("should pass", () => {
      const seed = 79;
      const map: Array<[number, number, number]> = [
        [50, 98, 2],
        [52, 50, 48],
      ];

      expect(mapSeedMultipleMaps(seed, map)).toStrictEqual(81);
    });

    test("should pass", () => {
      const seed = 53;
      const map: Array<[number, number, number]> = [
        [49, 53, 8],
        [0, 11, 42],
        [42, 0, 7],
        [57, 7, 4],
      ];

      expect(mapSeedMultipleMaps(seed, map)).toStrictEqual(49);
    });

    test("should pass", () => {
      const seed = 14;
      const map: Array<[number, number, number]> = [
        [50, 98, 2],
        [52, 50, 48],
      ];

      expect(mapSeedMultipleMaps(seed, map)).toStrictEqual(14);
    });

    test("should pass", () => {
      const seed = 55;
      const map: Array<[number, number, number]> = [
        [50, 98, 2],
        [52, 50, 48],
      ];

      expect(mapSeedMultipleMaps(seed, map)).toStrictEqual(57);
    });

    test("should pass", () => {
      const seed = 13;
      const map: Array<[number, number, number]> = [
        [50, 98, 2],
        [52, 50, 48],
      ];

      expect(mapSeedMultipleMaps(seed, map)).toStrictEqual(13);
    });
  });
});
