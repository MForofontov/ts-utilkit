import { lerp } from '../src/arithmeticFunctions/lerp';

describe('lerp', () => {
  // Test case 1: t = 0 returns a
  it('1. should return a when t is 0', () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(-5, 5, 0)).toBe(-5);
  });

  // Test case 2: t = 1 returns b
  it('2. should return b when t is 1', () => {
    expect(lerp(0, 10, 1)).toBe(10);
    expect(lerp(-5, 5, 1)).toBe(5);
  });

  // Test case 3: t = 0.5 returns midpoint
  it('3. should return the midpoint when t is 0.5', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });

  // Test case 4: t = 0.25 and t = 0.75
  it('4. should interpolate at quarter and three-quarter positions', () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(lerp(0, 100, 0.75)).toBe(75);
  });

  // Test case 5: Negative values
  it('5. should interpolate between negative values', () => {
    expect(lerp(-10, -2, 0.5)).toBeCloseTo(-6);
  });

  // Test case 6: a equals b — always returns a (or b)
  it('6. should return a when a equals b regardless of t', () => {
    expect(lerp(7, 7, 0)).toBe(7);
    expect(lerp(7, 7, 0.5)).toBe(7);
    expect(lerp(7, 7, 1)).toBe(7);
  });

  // Test case 7: Extrapolation with t outside [0, 1]
  it('7. should extrapolate when t is outside [0, 1]', () => {
    expect(lerp(0, 10, 1.5)).toBe(15);
    expect(lerp(0, 10, -0.5)).toBe(-5);
  });

  // Test case 8: Floating-point range
  it('8. should handle floating-point values', () => {
    expect(lerp(0.0, 1.0, 0.3)).toBeCloseTo(0.3);
    expect(lerp(1.5, 2.5, 0.5)).toBeCloseTo(2.0);
  });

  // Test case 9: Large values
  it('9. should handle large values', () => {
    expect(lerp(0, 1e9, 0.5)).toBe(5e8);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 10: Throws when a is NaN
  it('10. should throw when a is NaN', () => {
    expect(() => lerp(NaN, 10, 0.5)).toThrow(Error);
    expect(() => lerp(NaN, 10, 0.5)).toThrow('a must be a valid number, not NaN');
  });

  // Test case 11: Throws when b is NaN
  it('11. should throw when b is NaN', () => {
    expect(() => lerp(0, NaN, 0.5)).toThrow(Error);
    expect(() => lerp(0, NaN, 0.5)).toThrow('b must be a valid number, not NaN');
  });

  // Test case 12: Throws when t is NaN
  it('12. should throw when t is NaN', () => {
    expect(() => lerp(0, 10, NaN)).toThrow(Error);
    expect(() => lerp(0, 10, NaN)).toThrow('t must be a valid number, not NaN');
  });
});
