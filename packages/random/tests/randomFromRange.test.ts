import { randomFromRange } from '../src/randomFromRange';

/**
 * Unit tests for the randomFromRange function.
 */
describe('randomFromRange', () => {
  // Test case 1: Returns number
  it('1. should return a number', () => {
    const result = randomFromRange(0, 10);
    expect(typeof result).toBe('number');
  });

  // Test case 2: Returns value from range
  it('2. should return value from the specified range', () => {
    const result = randomFromRange(0, 10, 2);
    expect([0, 2, 4, 6, 8, 10]).toContain(result);
  });

  // Test case 3: Default step of 1
  it('3. should use step=1 by default', () => {
    const result = randomFromRange(1, 5);
    expect([1, 2, 3, 4, 5]).toContain(result);
  });

  // Test case 4: Works with decimal steps
  it('4. should work with decimal steps', () => {
    const result = randomFromRange(0, 2, 0.5);
    expect([0, 0.5, 1, 1.5, 2]).toContain(result);
  });

  // Test case 5: Single value when min === max
  it('5. should return exact value when min equals max', () => {
    const result = randomFromRange(5, 5);
    expect(result).toBe(5);
  });

  // Test case 6: Distribution test
  it('6. should produce varied results', () => {
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomFromRange(0, 10, 2));
    }

    expect(results.size).toBeGreaterThan(3);
  });

  // Test case 7: Even numbers only
  it('7. should generate only even numbers with step=2', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomFromRange(2, 10, 2);
      expect(result % 2).toBe(0);
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  // Test case 8: Multiples of 5
  it('8. should generate multiples of 5 with appropriate range', () => {
    const result = randomFromRange(0, 20, 5);
    expect([0, 5, 10, 15, 20]).toContain(result);
  });

  // Test case 9: Negative range
  it('9. should work with negative ranges', () => {
    const result = randomFromRange(-10, -2, 2);
    expect([-10, -8, -6, -4, -2]).toContain(result);
  });

  // Test case 10: Range crossing zero
  it('10. should work with ranges crossing zero', () => {
    const result = randomFromRange(-4, 4, 2);
    expect([-4, -2, 0, 2, 4]).toContain(result);
  });

  // Test case 11: Small decimal range
  it('11. should work with small decimal ranges', () => {
    const result = randomFromRange(0, 0.3, 0.1);
    const validValues = [0, 0.1, 0.2, 0.3];
    // Account for floating point precision
    const matches = validValues.some((v) => Math.abs(result - v) < 0.0001);
    expect(matches).toBe(true);
  });

  // Test case 12: Large step relative to range
  it('12. should work when step equals range', () => {
    const result = randomFromRange(1, 10, 9);
    expect([1, 10]).toContain(result);
  });

  // Error Test case 13: TypeError for non-number min
  it('13. should throw TypeError when min is not a number', () => {
    expect(() => randomFromRange('0' as any, 10)).toThrow(TypeError);
    expect(() => randomFromRange('0' as any, 10)).toThrow(
      'min must be a number',
    );
  });

  // Error Test case 14: TypeError for non-number max
  it('14. should throw TypeError when max is not a number', () => {
    expect(() => randomFromRange(0, '10' as any)).toThrow(TypeError);
    expect(() => randomFromRange(0, '10' as any)).toThrow(
      'max must be a number',
    );
  });

  // Error Test case 15: TypeError for non-number step
  it('15. should throw TypeError when step is not a number', () => {
    expect(() => randomFromRange(0, 10, '1' as any)).toThrow(TypeError);
    expect(() => randomFromRange(0, 10, '1' as any)).toThrow(
      'step must be a number',
    );
  });

  // Error Test case 16: Error for NaN min
  it('16. should throw Error when min is NaN', () => {
    expect(() => randomFromRange(NaN, 10)).toThrow(Error);
    expect(() => randomFromRange(NaN, 10)).toThrow(
      'min must be a valid number, not NaN',
    );
  });

  // Error Test case 17: Error for NaN max
  it('17. should throw Error when max is NaN', () => {
    expect(() => randomFromRange(0, NaN)).toThrow(Error);
    expect(() => randomFromRange(0, NaN)).toThrow(
      'max must be a valid number, not NaN',
    );
  });

  // Error Test case 18: Error for NaN step
  it('18. should throw Error when step is NaN', () => {
    expect(() => randomFromRange(0, 10, NaN)).toThrow(Error);
    expect(() => randomFromRange(0, 10, NaN)).toThrow(
      'step must be a valid number, not NaN',
    );
  });

  // Error Test case 19: Error when min > max
  it('19. should throw Error when min > max', () => {
    expect(() => randomFromRange(10, 5)).toThrow(Error);
    expect(() => randomFromRange(10, 5)).toThrow(
      'min must be less than or equal to max',
    );
  });

  // Error Test case 20: Error when step <= 0
  it('20. should throw Error when step is zero', () => {
    expect(() => randomFromRange(0, 10, 0)).toThrow(Error);
    expect(() => randomFromRange(0, 10, 0)).toThrow(
      'step must be greater than 0',
    );
  });

  // Error Test case 21: Error when step is negative
  it('21. should throw Error when step is negative', () => {
    expect(() => randomFromRange(0, 10, -1)).toThrow(Error);
    expect(() => randomFromRange(0, 10, -1)).toThrow(
      'step must be greater than 0',
    );
  });

  // Error Test case 22: Valid when step >= range (returns min)
  it('22. should return min when step is larger than range', () => {
    const result = randomFromRange(0, 1, 10);
    expect(result).toBe(0);
  });
});
