import { isInRange } from '../src/isInRange';

/**
 * Unit tests for the isInRange function.
 */
describe('isInRange', () => {
  // Test case 1: Inclusive range (default)
  it('1. should return true for values within inclusive range', () => {
    expect(isInRange(5, 1, 10)).toBe(true);
    expect(isInRange(1, 1, 10)).toBe(true);
    expect(isInRange(10, 1, 10)).toBe(true);
    expect(isInRange(0, -5, 5)).toBe(true);
    expect(isInRange(3.14, 3, 4)).toBe(true);
  });

  // Test case 2: Values outside inclusive range
  it('2. should return false for values outside inclusive range', () => {
    expect(isInRange(0, 1, 10)).toBe(false);
    expect(isInRange(11, 1, 10)).toBe(false);
    expect(isInRange(-1, 0, 5)).toBe(false);
    expect(isInRange(6, 0, 5)).toBe(false);
  });

  // Test case 3: Exclusive range
  it('3. should handle exclusive range correctly', () => {
    expect(isInRange(5, 1, 10, false)).toBe(true);
    expect(isInRange(1, 1, 10, false)).toBe(false);
    expect(isInRange(10, 1, 10, false)).toBe(false);
    expect(isInRange(1.1, 1, 10, false)).toBe(true);
    expect(isInRange(9.9, 1, 10, false)).toBe(true);
  });

  // Test case 4: Performance with various ranges
  it('4. should validate ranges efficiently', () => {
    const tests = [
      { value: 5, min: 1, max: 10, inclusive: true },
      { value: 1, min: 1, max: 10, inclusive: false },
      { value: 3.14, min: 3, max: 4, inclusive: true },
      { value: 0, min: 1, max: 10, inclusive: true },
    ];

    const startTime = performance.now();
    const results = tests.map((test) =>
      isInRange(test.value, test.min, test.max, test.inclusive),
    );
    const endTime = performance.now();

    expect(results).toEqual([true, false, true, false]);
    expect(endTime - startTime).toBeLessThan(10);
  });

  // Test case 5: TypeError for invalid input types
  it('5. should throw TypeError for invalid input types', () => {
    const invalidInputs = ['string', null, undefined, [], {}, true];

    invalidInputs.forEach((input) => {
      expect(() => isInRange(input as unknown as number, 1, 10)).toThrow(
        TypeError,
      );
      expect(() => isInRange(5, input as unknown as number, 10)).toThrow(
        TypeError,
      );
      expect(() => isInRange(5, 1, input as unknown as number)).toThrow(
        TypeError,
      );
    });

    expect(() => isInRange(5, 1, 10, 'invalid' as unknown as boolean)).toThrow(
      TypeError,
    );
  });

  // Test case 6: Error for NaN values
  it('6. should throw Error for NaN values', () => {
    expect(() => isInRange(NaN, 1, 10)).toThrow(Error);
    expect(() => isInRange(5, NaN, 10)).toThrow(Error);
    expect(() => isInRange(5, 1, NaN)).toThrow(Error);
  });

  // Test case 7: Error for min > max
  it('7. should throw Error when min is greater than max', () => {
    expect(() => isInRange(5, 10, 1)).toThrow(Error);
    expect(() => isInRange(5, 10, 1)).toThrow(
      'min (10) must be less than or equal to max (1)',
    );
  });
});
