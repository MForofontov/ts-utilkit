import { calculateCorrelation } from '../src/statisticsFunctions/relationships/calculateCorrelation';

describe('calculateCorrelation', () => {
  // Test case 1: Perfect positive correlation → 1
  it('1. should return 1 for perfectly correlated arrays', () => {
    expect(calculateCorrelation([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])).toBeCloseTo(
      1,
    );
  });

  // Test case 2: Perfect negative correlation → -1
  it('2. should return -1 for perfectly inversely correlated arrays', () => {
    expect(calculateCorrelation([1, 2, 3, 4, 5], [10, 8, 6, 4, 2])).toBeCloseTo(
      -1,
    );
  });

  // Test case 3: Identical arrays — perfect self-correlation → 1
  it('3. should return 1 when both arrays are identical', () => {
    expect(calculateCorrelation([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBeCloseTo(
      1,
    );
  });

  // Test case 4: Constant y → NaN (undefined correlation)
  it('4. should return NaN when y is constant (zero std dev)', () => {
    expect(calculateCorrelation([1, 2, 3], [5, 5, 5])).toBeNaN();
  });

  // Test case 5: Constant x → NaN
  it('5. should return NaN when x is constant (zero std dev)', () => {
    expect(calculateCorrelation([4, 4, 4], [1, 2, 3])).toBeNaN();
  });

  // Test case 6: Partial positive correlation
  it('6. should return a value in (0, 1) for a partial positive correlation', () => {
    const r = calculateCorrelation([1, 2, 3, 4, 5], [1, 3, 2, 5, 4]);
    expect(r).toBeGreaterThan(0);
    expect(r).toBeLessThan(1);
  });

  // Test case 7: Result is always in [-1, 1] for non-degenerate data
  it('7. should always return a value in [-1, 1] for valid non-constant arrays', () => {
    const r = calculateCorrelation([10, 20, 15, 25, 30], [5, 15, 10, 20, 25]);
    expect(r).toBeGreaterThanOrEqual(-1);
    expect(r).toBeLessThanOrEqual(1);
  });

  // Test case 8: Negative values
  it('8. should handle arrays with negative values', () => {
    const r = calculateCorrelation([-3, -2, -1, 0, 1], [3, 2, 1, 0, -1]);
    expect(r).toBeCloseTo(-1);
  });

  // Test case 9: Single-element arrays → NaN (std dev is 0 for single element)
  it('9. should return NaN for single-element arrays', () => {
    expect(calculateCorrelation([5], [10])).toBeNaN();
  });

  // Test case 10: Empty arrays → NaN
  it('10. should return NaN for empty arrays', () => {
    expect(calculateCorrelation([], [])).toBeNaN();
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 11: Throws when arrays have different lengths
  it('11. should throw when x and y have different lengths', () => {
    expect(() => calculateCorrelation([1, 2, 3], [1, 2])).toThrow(Error);
    expect(() => calculateCorrelation([1, 2, 3], [1, 2])).toThrow(
      'x and y must have the same length, got x.length=3 y.length=2',
    );
  });
});
