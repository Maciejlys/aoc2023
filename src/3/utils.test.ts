import { describe, expect, it } from "vitest";
import { isNumber, isSymbol } from "./utils";

describe("", () => {
  describe("isSymbol", () => {
    it("should return false", () => {
      const input = "4";
      const output = false;

      const result = isSymbol(input);

      expect(result).toStrictEqual(output);
    });

    it("should return false", () => {
      const input = ".";
      const output = false;

      const result = isSymbol(input);

      expect(result).toStrictEqual(output);
    });

    it("should return true", () => {
      const input = "$";
      const output = true;

      const result = isSymbol(input);

      expect(result).toStrictEqual(output);
    });

    it("should return true", () => {
      const input = "#";
      const output = true;

      const result = isSymbol(input);

      expect(result).toStrictEqual(output);
    });
  });

  describe("isNumber", () => {
    it("should return false", () => {
      const input = "a";
      const output = false;

      const result = isNumber(input);

      expect(result).toStrictEqual(output);
    });

    it("should return false", () => {
      const input = ".";
      const output = false;

      const result = isNumber(input);

      expect(result).toStrictEqual(output);
    });

    it("should return true", () => {
      const input = "2";
      const output = true;

      const result = isNumber(input);

      expect(result).toStrictEqual(output);
    });

    it("should return true", () => {
      const input = "3";
      const output = true;

      const result = isNumber(input);

      expect(result).toStrictEqual(output);
    });
  });
});
