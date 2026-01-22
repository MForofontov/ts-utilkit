import { randomSubset } from '../src/randomSubset';

/**
 * Unit tests for the randomSubset function.
 */
describe('randomSubset', () => {
  // Test case 1: Returns array
  it('1. should return an array', () => {
    const result = randomSubset([1, 2, 3, 4, 5]);
    expect(Array.isArray(result)).toBe(true);
  });

  // Test case 2: Size within min-max range
  it('2. should return subset with size in specified range', () => {
    const result = randomSubset([1, 2, 3, 4, 5], 2, 4);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);
  });

  // Test case 3: Default minSize of 1
  it('3. should use minSize=1 by default', () => {
    const result = randomSubset([1, 2, 3, 4, 5]);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  // Test case 4: Default maxSize of array.length
  it('4. should use maxSize=array.length by default', () => {
    const result = randomSubset([1, 2, 3, 4, 5]);
    expect(result.length).toBeLessThanOrEqual(5);
  });

  // Test case 5: No duplicates by default
  it('5. should not contain duplicates by default', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomSubset([1, 2, 3, 4, 5], 3, 5);
      const unique = new Set(result);
      expect(unique.size).toBe(result.length);
    }
  });

  // Test case 6: Allows duplicates when enabled
  it('6. should allow duplicates when allowDuplicates=true', () => {
    const result = randomSubset([1, 2, 3], 5, 10, true);
    expect(result.length).toBeGreaterThanOrEqual(5);
    // With duplicates allowed, it's possible to have duplicates
    // Just verify it doesn't throw
  });

  // Test case 7: All elements from source
  it('7. should only contain elements from source array', () => {
    const source = [1, 2, 3, 4, 5];
    const result = randomSubset(source, 2, 4);

    result.forEach((item) => {
      expect(source).toContain(item);
    });
  });

  // Test case 8: Fixed size (minSize === maxSize)
  it('8. should return exact size when min equals max', () => {
    const result = randomSubset([1, 2, 3, 4, 5], 3, 3);
    expect(result.length).toBe(3);
  });

  // Test case 9: Full array possible
  it('9. should sometimes return full array', () => {
    let gotFullArray = false;

    for (let i = 0; i < 100; i++) {
      const result = randomSubset([1, 2, 3], 1, 3);
      if (result.length === 3) {
        gotFullArray = true;
        break;
      }
    }

    expect(gotFullArray).toBe(true);
  });

  // Test case 10: Varied subset sizes
  it('10. should produce varied subset sizes', () => {
    const sizes = new Set<number>();

    for (let i = 0; i < 100; i++) {
      sizes.add(randomSubset([1, 2, 3, 4, 5], 1, 5).length);
    }

    expect(sizes.size).toBeGreaterThan(3);
  });

  // Test case 11: Works with strings
  it('11. should work with string arrays', () => {
    const result = randomSubset(['a', 'b', 'c', 'd'], 2, 3);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(3);
    result.forEach((item) => {
      expect(['a', 'b', 'c', 'd']).toContain(item);
    });
  });

  // Test case 12: Works with objects
  it('12. should work with object arrays', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = randomSubset(items, 1, 2);

    result.forEach((item) => {
      expect(items).toContainEqual(item);
    });
  });

  // Test case 13: With duplicates creates longer subsets
  it('13. should create subsets larger than source with duplicates', () => {
    const result = randomSubset([1, 2], 5, 8, true);
    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThanOrEqual(8);
  });

  // Error Test case 14: TypeError for non-array
  it('14. should throw TypeError when array is not an array', () => {
    expect(() => randomSubset('not array' as any)).toThrow(TypeError);
    expect(() => randomSubset('not array' as any)).toThrow(
      'array must be an array',
    );
  });

  // Error Test case 15: TypeError for non-number minSize
  it('15. should throw TypeError when minSize is not a number', () => {
    expect(() => randomSubset([1, 2, 3], '2' as any)).toThrow(TypeError);
    expect(() => randomSubset([1, 2, 3], '2' as any)).toThrow(
      'minSize must be a number',
    );
  });

  // Error Test case 16: TypeError for non-number maxSize
  it('16. should throw TypeError when maxSize is not a number', () => {
    expect(() => randomSubset([1, 2, 3], 1, '3' as any)).toThrow(TypeError);
    expect(() => randomSubset([1, 2, 3], 1, '3' as any)).toThrow(
      'maxSize must be a number',
    );
  });

  // Error Test case 17: TypeError for non-boolean allowDuplicates
  it('17. should throw TypeError when allowDuplicates is not a boolean', () => {
    expect(() => randomSubset([1, 2, 3], 1, 3, 'true' as any)).toThrow(
      TypeError,
    );
    expect(() => randomSubset([1, 2, 3], 1, 3, 'true' as any)).toThrow(
      'allowDuplicates must be a boolean',
    );
  });

  // Error Test case 18: Error for empty array
  it('18. should throw Error when array is empty', () => {
    expect(() => randomSubset([])).toThrow(Error);
    expect(() => randomSubset([])).toThrow('array cannot be empty');
  });

  // Error Test case 19: Error for NaN minSize
  it('19. should throw Error when minSize is NaN', () => {
    expect(() => randomSubset([1, 2, 3], NaN)).toThrow(Error);
    expect(() => randomSubset([1, 2, 3], NaN)).toThrow(
      'minSize must be a valid number, not NaN',
    );
  });

  // Error Test case 20: Error for non-integer minSize
  it('20. should throw Error when minSize is not an integer', () => {
    expect(() => randomSubset([1, 2, 3], 2.5)).toThrow(Error);
    expect(() => randomSubset([1, 2, 3], 2.5)).toThrow(
      'minSize must be an integer',
    );
  });

  // Error Test case 21: Error for minSize < 1
  it('21. should throw Error when minSize is less than 1', () => {
    expect(() => randomSubset([1, 2, 3], 0)).toThrow(Error);
    expect(() => randomSubset([1, 2, 3], 0)).toThrow(
      'minSize must be at least 1',
    );
  });

  // Error Test case 22: Error for non-integer maxSize
  it('22. should throw Error when maxSize is not an integer', () => {
    expect(() => randomSubset([1, 2, 3], 1, 2.5)).toThrow(Error);
    expect(() => randomSubset([1, 2, 3], 1, 2.5)).toThrow(
      'maxSize must be an integer',
    );
  });

  // Error Test case 23: Error for maxSize < minSize
  it('23. should throw Error when maxSize < minSize', () => {
    expect(() => randomSubset([1, 2, 3], 3, 1)).toThrow(Error);
    expect(() => randomSubset([1, 2, 3], 3, 1)).toThrow(
      'maxSize must be greater than or equal to minSize',
    );
  });

  // Error Test case 24: Error for maxSize > array.length without duplicates
  it('24. should throw Error when maxSize > array.length and no duplicates', () => {
    expect(() => randomSubset([1, 2], 1, 5, false)).toThrow(Error);
    expect(() => randomSubset([1, 2], 1, 5, false)).toThrow(
      'maxSize cannot exceed array length when duplicates are not allowed',
    );
  });
});
