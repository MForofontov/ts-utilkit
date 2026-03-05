import { mapRange } from '../src/arithmeticFunctions/mapRange';

describe('mapRange', () => {
  // Test case 1: Map midpoint of one range to midpoint of another
  it('1. should map the midpoint of the input range to the midpoint of the output range', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
  });

  // Test case 2: Map minimum of input to minimum of output
  it('2. should map inMin to outMin', () => {
    expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
  });

  // Test case 3: Map maximum of input to maximum of output
  it('3. should map inMax to outMax', () => {
    expect(mapRange(10, 0, 10, 0, 100)).toBe(100);
  });

  // Test case 4: Temperature conversion C to F (0°C = 32°F, 100°C = 212°F)
  it('4. should correctly map Celsius to Fahrenheit range', () => {
    expect(mapRange(0, 0, 100, 32, 212)).toBeCloseTo(32);
    expect(mapRange(100, 0, 100, 32, 212)).toBeCloseTo(212);
    expect(mapRange(50, 0, 100, 32, 212)).toBeCloseTo(122);
  });

  // Test case 5: Reversed output range (inversion)
  it('5. should invert the value when the output range is reversed', () => {
    expect(mapRange(3, 0, 10, 10, 0)).toBeCloseTo(7);
    expect(mapRange(0, 0, 10, 10, 0)).toBe(10);
    expect(mapRange(10, 0, 10, 10, 0)).toBe(0);
  });

  // Test case 6: Negative input range
  it('6. should handle negative input ranges', () => {
    expect(mapRange(-5, -10, 0, 0, 100)).toBeCloseTo(50);
  });

  // Test case 7: Value outside input range (extrapolation, not clamped)
  it('7. should extrapolate when value is outside the input range', () => {
    expect(mapRange(15, 0, 10, 0, 100)).toBeCloseTo(150);
    expect(mapRange(-5, 0, 10, 0, 100)).toBeCloseTo(-50);
  });

  // Test case 8: Same input and output range — identity
  it('8. should return value unchanged when input and output ranges are the same', () => {
    expect(mapRange(7, 0, 10, 0, 10)).toBe(7);
  });

  // Test case 9: Degenerate input range (inMin === inMax) → NaN
  it('9. should return NaN when inMin equals inMax', () => {
    expect(mapRange(5, 3, 3, 0, 10)).toBeNaN();
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  // Test case 10: Throws when value is NaN
  it('10. should throw when value is NaN', () => {
    expect(() => mapRange(NaN, 0, 10, 0, 100)).toThrow(Error);
    expect(() => mapRange(NaN, 0, 10, 0, 100)).toThrow(
      'value must be a valid number, not NaN',
    );
  });

  // Test case 11: Throws when inMin is NaN
  it('11. should throw when inMin is NaN', () => {
    expect(() => mapRange(5, NaN, 10, 0, 100)).toThrow(Error);
    expect(() => mapRange(5, NaN, 10, 0, 100)).toThrow(
      'inMin must be a valid number, not NaN',
    );
  });

  // Test case 12: Throws when inMax is NaN
  it('12. should throw when inMax is NaN', () => {
    expect(() => mapRange(5, 0, NaN, 0, 100)).toThrow(Error);
    expect(() => mapRange(5, 0, NaN, 0, 100)).toThrow(
      'inMax must be a valid number, not NaN',
    );
  });

  // Test case 13: Throws when outMin is NaN
  it('13. should throw when outMin is NaN', () => {
    expect(() => mapRange(5, 0, 10, NaN, 100)).toThrow(Error);
    expect(() => mapRange(5, 0, 10, NaN, 100)).toThrow(
      'outMin must be a valid number, not NaN',
    );
  });

  // Test case 14: Throws when outMax is NaN
  it('14. should throw when outMax is NaN', () => {
    expect(() => mapRange(5, 0, 10, 0, NaN)).toThrow(Error);
    expect(() => mapRange(5, 0, 10, 0, NaN)).toThrow(
      'outMax must be a valid number, not NaN',
    );
  });
});
