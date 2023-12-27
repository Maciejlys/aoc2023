import { describe, expect, test } from "vitest";
import { hash } from "./hasing";

describe("hash", () => {
  test("should pass with example input", () => {
    expect(hash("HASH")).toStrictEqual(52);
  });
});
