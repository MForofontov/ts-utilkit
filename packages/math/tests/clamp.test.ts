import { clamp } from '../src/arithmeticFunctions/clamp';

describe('clamp', () => {
  // Test case 1: Value within range is returned unchanged
  it('1. should return the value unchanged when it is within [min, max]', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  // Test case 2: Value below min is clamped to min
  it('2. should return min when value is below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  // Test case 3: Value above max is clamped to max
  it('3. should return max when value is above max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  // Test case 4: Value exactly at min
  it('4. should return min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  // Test case 5: Value exactly at max
  it('5. should return max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  // Test case 6: min equals max — always returns that value
  it('6. should return min (=== max) when min equals max', () => {
    expect(clamp(7, 3, 3)).toBe(3);
    expect(clamp(-1, 3, 3)).toBe(3);
    expect(clamp(99, 3, 3)).toBe(3);
  });

  // Test case 7: Negative range
  it('7. should clamp correctly within a negative range', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  // Test case 8: Floating-point values
  it('8. should handle floating-point values', () => {
    expect(clamp(0.5, 0, 1)).toBeCloseTo(0.5);
    expect(clamp(-0.1, 0, 1)).toBeCloseTo(0);
    expect(clamp(1.1, 0, 1)).toBeCloseTo(1);
  });

  // Test case 9: Large numbers
  it('9. should handle large numbers', () => {
    expect(clamp(1e10, 0, 1e9)).toBe(1e9);
    expect(clamp(-1e10, -1e9, 0)).toBe(-1e9);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 10: Throws when n is NaN
  it('10. should throw when n is NaN', () => {
    expect(() => clamp(NaN, 0, 10)).toThrow(Error);
  });

  // Test case 11: Throws when min is NaN
  it('11. should throw when min is NaN', () => {
    expect(() => clamp(5, NaN, 10)).toThrow(Error);
  });

  // Test case 12: Throws when max is NaN
  it('12. should throw when max is NaN', () => {
    expect(() => clamp(5, 0, NaN)).toThrow(Error);
  });

  // Test case 13: Throws when min > max
  it('13. should throw when min is greater than max', () => {
    expect(() => clamp(5, 10, 0)).toThrow(Error);
    expect(() => clamp(5, 10, 0)).toThrow(
      'min must be less than or equal to max, got min=10 max=0',
    );
  });
});
