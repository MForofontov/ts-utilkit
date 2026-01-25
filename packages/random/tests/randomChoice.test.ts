import { randomChoice } from '../src/randomChoice';

/**
 * Unit tests for the randomChoice function.
 */
describe('randomChoice', () => {
  // Test case 1: Normal usage with number array
  it('1. should return an element from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomChoice(array);
    expect(array).toContain(result);
  });

  // Test case 2: String array
  it('2. should work with string arrays', () => {
    const array = ['apple', 'banana', 'cherry'];
    const result = randomChoice(array);
    expect(array).toContain(result);
  });

  // Test case 3: Object array
  it('3. should work with object arrays', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = randomChoice(array);
    expect(array).toContain(result);
  });

  // Test case 4: Single element array
  it('4. should return the only element from single-element array', () => {
    const array = [42];
    const result = randomChoice(array);
    expect(result).toBe(42);
  });

  // Test case 5: Mixed type array
  it('5. should work with mixed type arrays', () => {
    const array = [1, 'two', { three: 3 }, null, true];
    const result = randomChoice(array);
    expect(array).toContain(result);
  });

  // Test case 6: Array with duplicates
  it('6. should work with arrays containing duplicates', () => {
    const array = [1, 1, 2, 2, 3];
    const result = randomChoice(array);
    expect(array).toContain(result);
  });

  // Test case 7: Randomness verification
  it('7. should produce different values over multiple calls', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomChoice(array));
    }

    // Should see at least 7 unique values out of 10 possible
    expect(results.size).toBeGreaterThan(7);
  });

  // Test case 8: Boolean array
  it('8. should work with boolean arrays', () => {
    const array = [true, false];
    const result = randomChoice(array);
    expect(typeof result).toBe('boolean');
  });

  // Test case 9: Array with null/undefined
  it('9. should handle arrays containing null or undefined', () => {
    const array = [null, undefined, 1, 'test'];
    const result = randomChoice(array);
    expect(array).toContain(result);
  });

  // Test case 10: Distribution check
  it('10. should have relatively even distribution', () => {
    const array = [1, 2, 3, 4, 5];
    const counts = new Map<number, number>();
    const iterations = 5000;

    for (let i = 0; i < iterations; i++) {
      const value = randomChoice(array);
      counts.set(value, (counts.get(value) || 0) + 1);
    }

    // Each value should appear roughly 20% of the time (±8%)
    for (const count of counts.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.12);
      expect(percentage).toBeLessThan(0.28);
    }
  });

  // Error Test case 11: TypeError for non-array input
  it('11. should throw TypeError when input is not an array', () => {
    expect(() => randomChoice('not an array' as any)).toThrow(TypeError);
    expect(() => randomChoice('not an array' as any)).toThrow(
      'array must be an array, got string',
    );
  });

  // Error Test case 12: TypeError for null input
  it('12. should throw TypeError when input is null', () => {
    expect(() => randomChoice(null as any)).toThrow(TypeError);
    expect(() => randomChoice(null as any)).toThrow(
      'array must be an array, got object',
    );
  });

  // Error Test case 13: Error for empty array
  it('13. should throw Error when array is empty', () => {
    expect(() => randomChoice([])).toThrow(Error);
    expect(() => randomChoice([])).toThrow('array cannot be empty');
  });
});
