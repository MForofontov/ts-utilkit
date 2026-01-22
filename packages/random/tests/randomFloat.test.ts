import { randomFloat } from '../src/randomFloat';

/**
 * Unit tests for the randomFloat function.
 */
describe('randomFloat', () => {
  // Test case 1: Normal usage with default decimals
  it('1. should generate random float within range with default 2 decimals', () => {
    const result = randomFloat(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThan(10);
    expect(result.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
  });

  // Test case 2: Custom decimal precision
  it('2. should respect custom decimal precision', () => {
    const result = randomFloat(1, 10, 4);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThan(10);
    const decimals = result.toString().split('.')[1]?.length || 0;
    expect(decimals).toBeLessThanOrEqual(4);
  });

  // Test case 3: Zero decimals
  it('3. should return integer when decimals is 0', () => {
    const result = randomFloat(1, 10, 0);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThan(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test case 4: Negative range
  it('4. should handle negative ranges correctly', () => {
    const result = randomFloat(-10, -5);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThan(-5);
  });

  // Test case 5: Range crossing zero
  it('5. should handle ranges crossing zero', () => {
    const result = randomFloat(-5, 5);
    expect(result).toBeGreaterThanOrEqual(-5);
    expect(result).toBeLessThan(5);
  });

  // Test case 6: Very small range
  it('6. should handle very small ranges', () => {
    const result = randomFloat(0, 0.01, 5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(0.01);
  });

  // Test case 7: Randomness verification
  it('7. should produce different values over multiple calls', () => {
    const results = new Set<number>();
    for (let i = 0; i < 100; i++) {
      results.add(randomFloat(0, 100, 2));
    }
    expect(results.size).toBeGreaterThan(90);
  });

  // Test case 8: High precision
  it('8. should handle high precision (10 decimals)', () => {
    const result = randomFloat(0, 1, 10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1);
    const decimals = result.toString().split('.')[1]?.length || 0;
    expect(decimals).toBeLessThanOrEqual(10);
  });

  // Test case 9: Large positive range
  it('9. should handle large positive ranges', () => {
    const result = randomFloat(1000, 5000, 3);
    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThan(5000);
  });

  // Test case 10: Distribution check
  it('10. should have relatively even distribution', () => {
    let lowCount = 0;
    let highCount = 0;
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const value = randomFloat(0, 10, 2);
      if (value < 5) {
        lowCount++;
      } else {
        highCount++;
      }
    }

    // Should be roughly 50/50 split (±15%)
    expect(lowCount).toBeGreaterThan(350);
    expect(lowCount).toBeLessThan(650);
  });

  // Error Test case 11: TypeError for non-number min
  it('11. should throw TypeError when min is not a number', () => {
    expect(() => randomFloat('5' as any, 10)).toThrow(TypeError);
    expect(() => randomFloat('5' as any, 10)).toThrow(
      'min must be a number, got string',
    );
  });

  // Error Test case 12: TypeError for non-number max
  it('12. should throw TypeError when max is not a number', () => {
    expect(() => randomFloat(5, '10' as any)).toThrow(TypeError);
    expect(() => randomFloat(5, '10' as any)).toThrow(
      'max must be a number, got string',
    );
  });

  // Error Test case 13: TypeError for non-number decimals
  it('13. should throw TypeError when decimals is not a number', () => {
    expect(() => randomFloat(5, 10, '2' as any)).toThrow(TypeError);
    expect(() => randomFloat(5, 10, '2' as any)).toThrow(
      'decimals must be a number, got string',
    );
  });

  // Error Test case 14: Error for NaN min
  it('14. should throw Error when min is NaN', () => {
    expect(() => randomFloat(NaN, 10)).toThrow(Error);
    expect(() => randomFloat(NaN, 10)).toThrow(
      'min must be a valid number, not NaN',
    );
  });

  // Error Test case 15: Error for NaN max
  it('15. should throw Error when max is NaN', () => {
    expect(() => randomFloat(5, NaN)).toThrow(Error);
    expect(() => randomFloat(5, NaN)).toThrow(
      'max must be a valid number, not NaN',
    );
  });

  // Error Test case 16: Error for NaN decimals
  it('16. should throw Error when decimals is NaN', () => {
    expect(() => randomFloat(5, 10, NaN)).toThrow(Error);
    expect(() => randomFloat(5, 10, NaN)).toThrow(
      'decimals must be a valid number, not NaN',
    );
  });

  // Error Test case 17: Error when min >= max
  it('17. should throw Error when min is greater than or equal to max', () => {
    expect(() => randomFloat(10, 10)).toThrow(Error);
    expect(() => randomFloat(10, 10)).toThrow('min must be less than max');
    expect(() => randomFloat(10, 5)).toThrow('min must be less than max');
  });

  // Error Test case 18: Error for negative decimals
  it('18. should throw Error when decimals is negative', () => {
    expect(() => randomFloat(5, 10, -1)).toThrow(Error);
    expect(() => randomFloat(5, 10, -1)).toThrow(
      'decimals must be non-negative',
    );
  });

  // Error Test case 19: Error for non-integer decimals
  it('19. should throw Error when decimals is not an integer', () => {
    expect(() => randomFloat(5, 10, 2.5)).toThrow(Error);
    expect(() => randomFloat(5, 10, 2.5)).toThrow(
      'decimals must be an integer',
    );
  });
});
