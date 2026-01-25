import { randomInt } from '../src/randomInt';

/**
 * Unit tests for the randomInt function.
 */
describe('randomInt', () => {
  // Test case 1: Normal usage
  it('1. should generate random integer within range', () => {
    const result = randomInt(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test case 2: Single value range
  it('2. should return the same value when min equals max', () => {
    const result = randomInt(5, 5);
    expect(result).toBe(5);
  });

  // Test case 3: Negative range
  it('3. should handle negative ranges correctly', () => {
    const result = randomInt(-10, -5);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(-5);
  });

  // Test case 4: Range crossing zero
  it('4. should handle ranges crossing zero', () => {
    const result = randomInt(-5, 5);
    expect(result).toBeGreaterThanOrEqual(-5);
    expect(result).toBeLessThanOrEqual(5);
  });

  // Test case 5: Large positive range
  it('5. should handle large positive ranges', () => {
    const result = randomInt(1000, 5000);
    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThanOrEqual(5000);
  });

  // Test case 6: Randomness verification
  it('6. should produce different values over multiple calls', () => {
    const results = new Set<number>();
    for (let i = 0; i < 100; i++) {
      results.add(randomInt(1, 100));
    }
    // Should have at least 50 unique values out of 100 calls (very high probability)
    expect(results.size).toBeGreaterThan(50);
  });

  // Test case 7: Zero range
  it('7. should handle zero in range', () => {
    const result = randomInt(0, 10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  // Test case 8: Boundary values - maximum safe integer
  it('8. should handle maximum safe integer values', () => {
    const max = Number.MAX_SAFE_INTEGER;
    const result = randomInt(max - 10, max);
    expect(result).toBeGreaterThanOrEqual(max - 10);
    expect(result).toBeLessThanOrEqual(max);
  });

  // Test case 9: Boundary values - minimum safe integer
  it('9. should handle minimum safe integer values', () => {
    const min = Number.MIN_SAFE_INTEGER;
    const result = randomInt(min, min + 10);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(min + 10);
  });

  // Test case 10: Distribution check
  it('10. should have relatively even distribution', () => {
    const counts = new Map<number, number>();
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
      const value = randomInt(1, 5);
      counts.set(value, (counts.get(value) || 0) + 1);
    }

    // Each value should appear roughly 20% of the time (±10%)
    for (const count of counts.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.1);
      expect(percentage).toBeLessThan(0.3);
    }
  });

  // Error Test case 11: TypeError for non-number min
  it('11. should throw TypeError when min is not a number', () => {
    expect(() => randomInt('5' as any, 10)).toThrow(TypeError);
    expect(() => randomInt('5' as any, 10)).toThrow(
      'min must be a number, got string',
    );
  });

  // Error Test case 12: TypeError for non-number max
  it('12. should throw TypeError when max is not a number', () => {
    expect(() => randomInt(5, '10' as any)).toThrow(TypeError);
    expect(() => randomInt(5, '10' as any)).toThrow(
      'max must be a number, got string',
    );
  });

  // Error Test case 13: Error for NaN min
  it('13. should throw Error when min is NaN', () => {
    expect(() => randomInt(NaN, 10)).toThrow(Error);
    expect(() => randomInt(NaN, 10)).toThrow(
      'min must be a valid number, not NaN',
    );
  });

  // Error Test case 14: Error for NaN max
  it('14. should throw Error when max is NaN', () => {
    expect(() => randomInt(5, NaN)).toThrow(Error);
    expect(() => randomInt(5, NaN)).toThrow(
      'max must be a valid number, not NaN',
    );
  });

  // Error Test case 15: Error for non-safe integer min
  it('15. should throw Error when min is not a safe integer', () => {
    expect(() => randomInt(Number.MAX_SAFE_INTEGER + 1, 10)).toThrow(Error);
    expect(() => randomInt(Number.MAX_SAFE_INTEGER + 1, 10)).toThrow(
      'min must be a safe integer',
    );
  });

  // Error Test case 16: Error for non-safe integer max
  it('16. should throw Error when max is not a safe integer', () => {
    expect(() => randomInt(5, Number.MAX_SAFE_INTEGER + 1)).toThrow(Error);
    expect(() => randomInt(5, Number.MAX_SAFE_INTEGER + 1)).toThrow(
      'max must be a safe integer',
    );
  });

  // Error Test case 17: Error when min > max
  it('17. should throw Error when min is greater than max', () => {
    expect(() => randomInt(10, 5)).toThrow(Error);
    expect(() => randomInt(10, 5)).toThrow(
      'min must be less than or equal to max',
    );
  });
});
