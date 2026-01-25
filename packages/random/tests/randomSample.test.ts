import { randomSample } from '../src/randomSample';

/**
 * Unit tests for the randomSample function.
 */
describe('randomSample', () => {
  // Test case 1: Normal usage
  it('1. should return requested number of unique elements', () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomSample(array, 3);
    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3); // All unique
    result.forEach((item) => expect(array).toContain(item));
  });

  // Test case 2: Sample all elements
  it('2. should return all elements when count equals array length', () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomSample(array, 5);
    expect(result).toHaveLength(5);
    expect(new Set(result).size).toBe(5);
  });

  // Test case 3: Sample one element
  it('3. should return single element when count is 1', () => {
    const array = ['apple', 'banana', 'cherry'];
    const result = randomSample(array, 1);
    expect(result).toHaveLength(1);
    expect(array).toContain(result[0]);
  });

  // Test case 4: String array
  it('4. should work with string arrays', () => {
    const array = ['red', 'green', 'blue', 'yellow'];
    const result = randomSample(array, 2);
    expect(result).toHaveLength(2);
    result.forEach((item) => expect(array).toContain(item));
  });

  // Test case 5: Object array
  it('5. should work with object arrays', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = randomSample(array, 2);
    expect(result).toHaveLength(2);
    result.forEach((item) => expect(array).toContain(item));
  });

  // Test case 6: Uniqueness verification
  it('6. should never return duplicate elements', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (let i = 0; i < 100; i++) {
      const result = randomSample(array, 5);
      expect(new Set(result).size).toBe(5);
    }
  });

  // Test case 7: Randomness verification
  it('7. should produce different samples over multiple calls', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const samples = new Set<string>();

    for (let i = 0; i < 50; i++) {
      const result = randomSample(array, 3);
      samples.add(result.sort().join(','));
    }

    // Should see many different combinations
    expect(samples.size).toBeGreaterThan(20);
  });

  // Test case 8: Original array unchanged
  it('8. should not modify the original array', () => {
    const array = [1, 2, 3, 4, 5];
    const original = [...array];
    randomSample(array, 3);
    expect(array).toEqual(original);
  });

  // Test case 9: Large array performance
  it('9. should handle large arrays efficiently', () => {
    const array = Array.from({ length: 10000 }, (_, i) => i);

    const startTime = performance.now();
    randomSample(array, 100);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 10: Zero count
  it('10. should return empty array when count is 0', () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomSample(array, 0);
    expect(result).toEqual([]);
  });

  // Test case 11: Distribution check
  it('11. should have relatively even selection probability', () => {
    const array = [1, 2, 3, 4, 5];
    const counts = new Map<number, number>();
    const iterations = 5000;

    for (let i = 0; i < iterations; i++) {
      const sample = randomSample(array, 2);
      sample.forEach((item) => {
        counts.set(item, (counts.get(item) || 0) + 1);
      });
    }

    // Each element should appear in roughly 40% of samples (2 out of 5)
    // Allow ±10% variance
    for (const count of counts.values()) {
      const percentage = count / iterations;
      expect(percentage).toBeGreaterThan(0.3);
      expect(percentage).toBeLessThan(0.5);
    }
  });

  // Error Test case 12: TypeError for non-array input
  it('12. should throw TypeError when array is not an array', () => {
    expect(() => randomSample('not array' as any, 2)).toThrow(TypeError);
    expect(() => randomSample('not array' as any, 2)).toThrow(
      'array must be an array, got string',
    );
  });

  // Error Test case 13: TypeError for non-number count
  it('13. should throw TypeError when count is not a number', () => {
    expect(() => randomSample([1, 2, 3], '2' as any)).toThrow(TypeError);
    expect(() => randomSample([1, 2, 3], '2' as any)).toThrow(
      'count must be a number, got string',
    );
  });

  // Error Test case 14: Error for empty array
  it('14. should throw Error when array is empty', () => {
    expect(() => randomSample([], 1)).toThrow(Error);
    expect(() => randomSample([], 1)).toThrow('array cannot be empty');
  });

  // Error Test case 15: Error for NaN count
  it('15. should throw Error when count is NaN', () => {
    expect(() => randomSample([1, 2, 3], NaN)).toThrow(Error);
    expect(() => randomSample([1, 2, 3], NaN)).toThrow(
      'count must be a valid number, not NaN',
    );
  });

  // Error Test case 16: Error for non-integer count
  it('16. should throw Error when count is not an integer', () => {
    expect(() => randomSample([1, 2, 3], 2.5)).toThrow(Error);
    expect(() => randomSample([1, 2, 3], 2.5)).toThrow(
      'count must be an integer',
    );
  });

  // Error Test case 17: Error for negative count
  it('17. should throw Error when count is negative', () => {
    expect(() => randomSample([1, 2, 3], -1)).toThrow(Error);
    expect(() => randomSample([1, 2, 3], -1)).toThrow(
      'count must be non-negative',
    );
  });

  // Error Test case 18: Error when count exceeds array length
  it('18. should throw Error when count exceeds array length', () => {
    expect(() => randomSample([1, 2, 3], 5)).toThrow(Error);
    expect(() => randomSample([1, 2, 3], 5)).toThrow(
      'count cannot exceed array length',
    );
  });
});
