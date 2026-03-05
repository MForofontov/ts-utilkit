import { calculateZScore } from '../src/statisticsFunctions/dispersion/calculateZScore';

describe('calculateZScore', () => {
  // Test case 1: Value equal to the mean → z = 0
  it('1. should return 0 when value equals the mean', () => {
    expect(calculateZScore(5, 5, 2)).toBe(0);
  });

  // Test case 2: One standard deviation above the mean → z = 1
  it('2. should return 1 when value is one stdDev above the mean', () => {
    expect(calculateZScore(7, 5, 2)).toBe(1);
  });

  // Test case 3: One standard deviation below the mean → z = -1
  it('3. should return -1 when value is one stdDev below the mean', () => {
    expect(calculateZScore(3, 5, 2)).toBe(-1);
  });

  // Test case 4: Two standard deviations above the mean → z = 2
  it('4. should return 2 for a value two stdDevs above the mean', () => {
    expect(calculateZScore(9, 5, 2)).toBe(2);
  });

  // Test case 5: Two standard deviations below the mean → z = -2
  it('5. should return -2 for a value two stdDevs below the mean', () => {
    expect(calculateZScore(1, 5, 2)).toBe(-2);
  });

  // Test case 6: Large standard deviation
  it('6. should return correct z-score for a large standard deviation', () => {
    expect(calculateZScore(110, 100, 15)).toBeCloseTo(0.667);
  });

  // Test case 7: Negative mean
  it('7. should handle a negative mean correctly', () => {
    expect(calculateZScore(-3, -5, 2)).toBe(1);
  });

  // Test case 8: Floating-point precision
  it('8. should handle floating-point values', () => {
    expect(calculateZScore(2.5, 2.0, 0.5)).toBeCloseTo(1.0);
  });

  // Test case 9: Zero standard deviation → NaN (degenerate)
  it('9. should return NaN when stdDev is 0', () => {
    expect(calculateZScore(5, 5, 0)).toBeNaN();
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 10: Throws when value is NaN
  it('10. should throw when value is NaN', () => {
    expect(() => calculateZScore(NaN, 5, 2)).toThrow(Error);
    expect(() => calculateZScore(NaN, 5, 2)).toThrow(
      'value must be a valid number, not NaN',
    );
  });

  // Test case 11: Throws when mean is NaN
  it('11. should throw when mean is NaN', () => {
    expect(() => calculateZScore(5, NaN, 2)).toThrow(Error);
    expect(() => calculateZScore(5, NaN, 2)).toThrow(
      'mean must be a valid number, not NaN',
    );
  });

  // Test case 12: Throws when stdDev is NaN
  it('12. should throw when stdDev is NaN', () => {
    expect(() => calculateZScore(5, 5, NaN)).toThrow(Error);
    expect(() => calculateZScore(5, 5, NaN)).toThrow(
      'stdDev must be a valid number, not NaN',
    );
  });

  // Test case 13: Throws when stdDev is negative
  it('13. should throw when stdDev is negative', () => {
    expect(() => calculateZScore(5, 5, -1)).toThrow(Error);
    expect(() => calculateZScore(5, 5, -1)).toThrow(
      'stdDev must be non-negative, got -1',
    );
  });
});
