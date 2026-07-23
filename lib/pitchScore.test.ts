import { describe, expect, it } from "vitest";
import {
  PITCH_RUBRIC_AXES,
  PITCH_RUBRIC_MAX_SCORE,
  PITCH_RUBRIC_WEIGHTS,
} from "./pitchScore";

describe("pitchScore rubric integrity", () => {
  it("8軸の満点配点が合計100点（採点ログの前提）", () => {
    const sum = PITCH_RUBRIC_AXES.reduce(
      (total, axis) => total + PITCH_RUBRIC_WEIGHTS[axis],
      0,
    );
    expect(sum).toBe(100);
    expect(PITCH_RUBRIC_MAX_SCORE).toBe(100);
  });

  it("各軸に正の配点がある", () => {
    for (const axis of PITCH_RUBRIC_AXES) {
      expect(PITCH_RUBRIC_WEIGHTS[axis]).toBeGreaterThan(0);
    }
  });
});
