import { describe, expect, test } from "vitest";
import { Directions } from "../utils/matrix";
import { isConnected } from "./utils";

describe("isConnected", () => {
  test("should pass", () => {
    expect(isConnected("-", Directions.Right)).toBe(true);
  });

  test("should pass", () => {
    expect(isConnected("-", Directions.Up)).toBe(false);
  });

  test("should pass", () => {
    expect(isConnected("|", Directions.Down)).toBe(true);
  });

  test("should pass", () => {
    expect(isConnected("|", Directions.Right)).toBe(false);
  });

  test("should pass", () => {
    expect(isConnected(".", Directions.Up)).toBe(false);
  });

  test("should pass", () => {
    expect(isConnected("-", Directions.Right)).toBe(true);
  });

  test("should pass", () => {
    expect(isConnected("-", Directions.Left)).toBe(true);
  });

  test("should pass", () => {
    expect(isConnected("-", Directions.Up)).toBe(false);
  });
});
