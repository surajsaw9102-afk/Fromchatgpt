import { describe, expect, it } from "vitest";
import { formatDuration } from "./model";

describe("formatDuration", () => {
  it("formats millisecond durations as minutes and seconds", () => {
    expect(formatDuration(185000)).toBe("3:05");
  });
});
