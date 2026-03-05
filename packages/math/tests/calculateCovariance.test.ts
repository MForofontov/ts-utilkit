import { calculateCovariance } from '../src/statisticsFunctions/relationships/calculateCovariance';

describe('calculateCovariance', () => {
  // Test case 1: Perfectly linear positive relationship
  it('1. should return positive covariance when variables increase together', () => {
    expect(calculateCovariance([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])).toBe(4);
  });

  // Test case 2: Perfectly linear negative relationship
  it('2. should return negative covariance when variables move in opposite directions', () => {
    expect(calculateCovariance([1, 2, 3, 4, 5], [10, 8, 6, 4, 2])).toBe(-4);
  });

  // Test case 3: Constant y — covariance is 0
  it('3. should return 0 when y is constant (no variability)', () => {
    expect(calculateCovariance([1, 2, 3], [3, 3, 3])).toBe(0);
  });

  // Test case 4: Identical arrays — covariance equals variance
  it('4. should equal the variance when both arrays are identical', () => {
    // cov(x, x) = var(x) = 2 for [1,2,3,4,5]
    expect(calculateCovariance([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(2);
  });

  // Test case 5: Single-element arrays → 0
  it('5. should return 0 for single-element arrays', () => {
    expect(calculateCovariance([5], [10])).toBe(0);
  });

  // Test case 6: Negative values in both arrays
  it('6. should handle negative values', () => {
    expect(calculateCovariance([-2, -1, 0, 1, 2], [-4, -2, 0, 2, 4])).toBe(4);
  });

  // Test case 7: Mixed positive and negative values
  it('7. should compute covariance for mixed positive/negative arrays', () => {
    const result = calculateCovariance([1, 2, 3], [-1, 0, 1]);
    expect(result).toBeCloseTo(0.667);
  });

  // Test case 8: Floating-point values
  it('8. should handle floating-point values', () => {
    const result = calculateCovariance([1.5, 2.5, 3.5], [2.5, 3.5, 4.5]);
    expect(result).toBeCloseTo(0.667);
  });

  // Test case 9: Empty arrays → NaN
  it('9. should return NaN for empty arrays', () => {
    expect(calculateCovariance([], [])).toBeNaN();
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 10: Throws when arrays have different lengths
  it('10. should throw when x and y have different lengths', () => {
    expect(() => calculateCovariance([1, 2, 3], [1, 2])).toThrow(Error);
    expect(() => calculateCovariance([1, 2, 3], [1, 2])).toThrow(
      'x and y must have the same length, got x.length=3 y.length=2',
    );
  });
});
