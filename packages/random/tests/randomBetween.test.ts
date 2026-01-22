import { randomBetween } from '../src/randomBetween';

/**
 * Unit tests for the randomBetween function.
 */
describe('randomBetween', () => {
  // Test case 1: Returns integer by default
  it('1. should return an integer by default', () => {
    const result = randomBetween(1, 10);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test case 2: Integer within range
  it('2. should return integer within range', () => {
    const result = randomBetween(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  // Test case 3: Float within range
  it('3. should return float within range when integer=false', () => {
    const result = randomBetween(0, 1, false);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1);
  });

  // Test case 4: Min equals max (integer)
  it('4. should return exact value when min equals max', () => {
    const result = randomBetween(5, 5);
    expect(result).toBe(5);
  });

  // Test case 5: Integer distribution
  it('5. should produce varied integers', () => {
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomBetween(1, 10));
    }

    expect(results.size).toBeGreaterThan(5);
  });

  // Test case 6: Float distribution
  it('6. should produce varied floats', () => {
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomBetween(0, 10, false));
    }

    expect(results.size).toBeGreaterThan(90);
  });

  // Test case 7: Negative range
  it('7. should work with negative range', () => {
    const result = randomBetween(-10, -1);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(-1);
  });

  // Test case 8: Range crossing zero
  it('8. should work with range crossing zero', () => {
    const result = randomBetween(-5, 5);
    expect(result).toBeGreaterThanOrEqual(-5);
    expect(result).toBeLessThanOrEqual(5);
  });

  // Test case 9: Large range
  it('9. should handle large ranges', () => {
    const result = randomBetween(0, 1000000);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1000000);
  });

  // Test case 10: Dice roll simulation
  it('10. should simulate dice roll (1-6)', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomBetween(1, 6);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  // Test case 11: Small float range
  it('11. should work with small float range', () => {
    const result = randomBetween(0.1, 0.9, false);
    expect(result).toBeGreaterThanOrEqual(0.1);
    expect(result).toBeLessThan(0.9);
  });

  // Error Test case 12: TypeError for non-number min
  it('12. should throw TypeError when min is not a number', () => {
    expect(() => randomBetween('1' as any, 10)).toThrow(TypeError);
    expect(() => randomBetween('1' as any, 10)).toThrow('min must be a number');
  });

  // Error Test case 13: TypeError for non-number max
  it('13. should throw TypeError when max is not a number', () => {
    expect(() => randomBetween(1, '10' as any)).toThrow(TypeError);
    expect(() => randomBetween(1, '10' as any)).toThrow('max must be a number');
  });

  // Error Test case 14: TypeError for non-boolean integer
  it('14. should throw TypeError when integer is not a boolean', () => {
    expect(() => randomBetween(1, 10, 'true' as any)).toThrow(TypeError);
    expect(() => randomBetween(1, 10, 'true' as any)).toThrow(
      'integer must be a boolean',
    );
  });

  // Error Test case 15: Error for NaN min
  it('15. should throw Error when min is NaN', () => {
    expect(() => randomBetween(NaN, 10)).toThrow(Error);
    expect(() => randomBetween(NaN, 10)).toThrow(
      'min must be a valid number, not NaN',
    );
  });

  // Error Test case 16: Error for NaN max
  it('16. should throw Error when max is NaN', () => {
    expect(() => randomBetween(1, NaN)).toThrow(Error);
    expect(() => randomBetween(1, NaN)).toThrow(
      'max must be a valid number, not NaN',
    );
  });

  // Error Test case 17: Error for non-safe integer min
  it('17. should throw Error when min is not a safe integer (integer mode)', () => {
    expect(() => randomBetween(1.5, 10)).toThrow(Error);
    expect(() => randomBetween(1.5, 10)).toThrow('min must be a safe integer');
  });

  // Error Test case 18: Error for non-safe integer max
  it('18. should throw Error when max is not a safe integer (integer mode)', () => {
    expect(() => randomBetween(1, 10.5)).toThrow(Error);
    expect(() => randomBetween(1, 10.5)).toThrow('max must be a safe integer');
  });

  // Error Test case 19: Error when min > max (integer mode)
  it('19. should throw Error when min > max in integer mode', () => {
    expect(() => randomBetween(10, 5)).toThrow(Error);
    expect(() => randomBetween(10, 5)).toThrow(
      'min must be less than or equal to max',
    );
  });

  // Error Test case 20: Error when min >= max (float mode)
  it('20. should throw Error when min >= max in float mode', () => {
    expect(() => randomBetween(10, 5, false)).toThrow(Error);
    expect(() => randomBetween(10, 5, false)).toThrow(
      'min must be less than max',
    );
  });
});
