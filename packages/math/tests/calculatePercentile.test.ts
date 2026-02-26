import { calculatePercentile } from '../src/statisticsFunctions/dispersion/calculatePercentile';

describe('calculatePercentile', () => {
  // Test case 1: 50th percentile (median) of odd-length array
  it('1. should return the median for the 50th percentile of an odd-length array', () => {
    expect(calculatePercentile([1, 2, 3, 4, 5], 50)).toBe(3);
  });

  // Test case 2: 50th percentile of an even-length array (interpolated)
  it('2. should interpolate for the 50th percentile of an even-length array', () => {
    expect(calculatePercentile([1, 2, 3, 4], 50)).toBe(2.5);
  });

  // Test case 3: 0th percentile returns the minimum
  it('3. should return the minimum value for the 0th percentile', () => {
    expect(calculatePercentile([10, 20, 30, 40, 50], 0)).toBe(10);
  });

  // Test case 4: 100th percentile returns the maximum
  it('4. should return the maximum value for the 100th percentile', () => {
    expect(calculatePercentile([10, 20, 30, 40, 50], 100)).toBe(50);
  });

  // Test case 5: 25th and 75th percentiles
  it('5. should compute Q1 and Q3 correctly', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(calculatePercentile(arr, 25)).toBeCloseTo(3.25);
    expect(calculatePercentile(arr, 75)).toBeCloseTo(7.75);
  });

  // Test case 6: Unsorted input — internally sorted
  it('6. should produce correct results for an unsorted input array', () => {
    expect(calculatePercentile([5, 1, 3, 2, 4], 50)).toBe(3);
  });

  // Test case 7: Single-element array — every percentile returns that element
  it('7. should return the single element for any percentile in a 1-element array', () => {
    expect(calculatePercentile([42], 0)).toBe(42);
    expect(calculatePercentile([42], 50)).toBe(42);
    expect(calculatePercentile([42], 100)).toBe(42);
  });

  // Test case 8: Two-element array
  it('8. should interpolate correctly for a two-element array', () => {
    expect(calculatePercentile([0, 100], 0)).toBe(0);
    expect(calculatePercentile([0, 100], 50)).toBe(50);
    expect(calculatePercentile([0, 100], 100)).toBe(100);
  });

  // Test case 9: Negative values
  it('9. should handle arrays with negative values', () => {
    expect(calculatePercentile([-10, -5, 0, 5, 10], 50)).toBe(0);
    expect(calculatePercentile([-10, -5, 0, 5, 10], 0)).toBe(-10);
  });

  // Test case 10: Floating-point values
  it('10. should handle floating-point values', () => {
    expect(calculatePercentile([1.5, 2.5, 3.5, 4.5], 50)).toBeCloseTo(3);
  });

  // Test case 11: Empty array → NaN
  it('11. should return NaN for an empty array', () => {
    expect(calculatePercentile([], 50)).toBeNaN();
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 12: Throws when p is NaN
  it('12. should throw when p is NaN', () => {
    expect(() => calculatePercentile([1, 2, 3], NaN)).toThrow(Error);
    expect(() => calculatePercentile([1, 2, 3], NaN)).toThrow(
      'p must be a valid number, not NaN',
    );
  });

  // Test case 13: Throws when p < 0
  it('13. should throw when p is less than 0', () => {
    expect(() => calculatePercentile([1, 2, 3], -1)).toThrow(Error);
    expect(() => calculatePercentile([1, 2, 3], -1)).toThrow(
      'p must be in the range [0, 100], got -1',
    );
  });

  // Test case 14: Throws when p > 100
  it('14. should throw when p is greater than 100', () => {
    expect(() => calculatePercentile([1, 2, 3], 101)).toThrow(Error);
    expect(() => calculatePercentile([1, 2, 3], 101)).toThrow(
      'p must be in the range [0, 100], got 101',
    );
  });
});
