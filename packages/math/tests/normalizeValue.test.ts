import { normalizeValue } from '../src/arithmeticFunctions/normalizeValue';

describe('normalizeValue', () => {
  // Test case 1: Midpoint of the range → 0.5
  it('1. should return 0.5 for the midpoint of a range', () => {
    expect(normalizeValue(5, 0, 10)).toBe(0.5);
  });

  // Test case 2: Value at min → 0
  it('2. should return 0 when value equals min', () => {
    expect(normalizeValue(0, 0, 10)).toBe(0);
  });

  // Test case 3: Value at max → 1
  it('3. should return 1 when value equals max', () => {
    expect(normalizeValue(10, 0, 10)).toBe(1);
  });

  // Test case 4: Quarter position
  it('4. should return 0.25 for a value at one-quarter of the range', () => {
    expect(normalizeValue(25, 0, 100)).toBeCloseTo(0.25);
  });

  // Test case 5: Negative range
  it('5. should normalize within a negative range', () => {
    expect(normalizeValue(-5, -10, 0)).toBeCloseTo(0.5);
    expect(normalizeValue(-10, -10, 0)).toBe(0);
    expect(normalizeValue(0, -10, 0)).toBe(1);
  });

  // Test case 6: Value outside range (not clamped)
  it('6. should return values outside [0, 1] when value is outside [min, max]', () => {
    expect(normalizeValue(15, 0, 10)).toBeCloseTo(1.5);
    expect(normalizeValue(-5, 0, 10)).toBeCloseTo(-0.5);
  });

  // Test case 7: Floating-point range
  it('7. should handle floating-point ranges', () => {
    expect(normalizeValue(0.5, 0, 1)).toBeCloseTo(0.5);
    expect(normalizeValue(0.75, 0, 1)).toBeCloseTo(0.75);
  });

  // Test case 8: Degenerate range (min === max) → NaN
  it('8. should return NaN when min equals max', () => {
    expect(normalizeValue(5, 5, 5)).toBeNaN();
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 9: Throws when value is NaN
  it('9. should throw when value is NaN', () => {
    expect(() => normalizeValue(NaN, 0, 10)).toThrow(Error);
    expect(() => normalizeValue(NaN, 0, 10)).toThrow(
      'value must be a valid number, not NaN',
    );
  });

  // Test case 10: Throws when min is NaN
  it('10. should throw when min is NaN', () => {
    expect(() => normalizeValue(5, NaN, 10)).toThrow(Error);
    expect(() => normalizeValue(5, NaN, 10)).toThrow(
      'min must be a valid number, not NaN',
    );
  });

  // Test case 11: Throws when max is NaN
  it('11. should throw when max is NaN', () => {
    expect(() => normalizeValue(5, 0, NaN)).toThrow(Error);
    expect(() => normalizeValue(5, 0, NaN)).toThrow(
      'max must be a valid number, not NaN',
    );
  });
});
