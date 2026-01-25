import { randomShuffle } from '../src/randomShuffle';

/**
 * Unit tests for the randomShuffle function.
 */
describe('randomShuffle', () => {
  // Test case 1: Returns array
  it('1. should return an array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = randomShuffle(arr);

    expect(Array.isArray(result)).toBe(true);
  });

  // Test case 2: Same length as input
  it('2. should return array with same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = randomShuffle(arr);

    expect(result.length).toBe(arr.length);
  });

  // Test case 3: Contains same elements
  it('3. should contain all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = randomShuffle(arr);

    expect(result.sort()).toEqual(arr.sort());
  });

  // Test case 4: Does not modify original (default)
  it('4. should not modify original array by default', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    randomShuffle(arr);

    expect(arr).toEqual(original);
  });

  // Test case 5: Modifies original when inPlace=true
  it('5. should modify original array when inPlace is true', () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    const result = randomShuffle(arr, true);

    expect(result).toBe(arr); // Same reference
    // Highly unlikely to be in same order after shuffle
    // Check at least one difference in 100 shuffles
    let different = false;
    for (let i = 0; i < 100; i++) {
      const test = [1, 2, 3, 4, 5];
      randomShuffle(test, true);
      if (JSON.stringify(test) !== JSON.stringify(original)) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });

  // Test case 6: Produces different orders
  it('6. should produce different orders over multiple calls', () => {
    const arr = [1, 2, 3, 4, 5];
    const orders = new Set<string>();

    for (let i = 0; i < 100; i++) {
      orders.add(JSON.stringify(randomShuffle(arr)));
    }

    // Should have many different orderings
    expect(orders.size).toBeGreaterThan(50);
  });

  // Test case 7: Works with strings
  it('7. should work with string arrays', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const result = randomShuffle(arr);

    expect(result.length).toBe(4);
    expect(result.sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  // Test case 8: Works with single element
  it('8. should work with single element array', () => {
    const arr = [42];
    const result = randomShuffle(arr);

    expect(result).toEqual([42]);
  });

  // Test case 9: Works with two elements
  it('9. should work with two element array', () => {
    const arr = [1, 2];
    const result = randomShuffle(arr);

    expect(result.length).toBe(2);
    expect(result.sort()).toEqual([1, 2]);
  });

  // Test case 10: Works with objects
  it('10. should work with object arrays', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = randomShuffle(arr);

    expect(result.length).toBe(3);
    expect(result.map((o) => o.id).sort()).toEqual([1, 2, 3]);
  });

  // Test case 11: Large array performance
  it('11. should handle large arrays efficiently', () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i);
    const startTime = performance.now();
    const result = randomShuffle(arr);
    const endTime = performance.now();

    expect(result.length).toBe(1000);
    expect(endTime - startTime).toBeLessThan(100);
  });

  // Error Test case 12: TypeError for non-array
  it('12. should throw TypeError when input is not an array', () => {
    expect(() => randomShuffle('not array' as any)).toThrow(TypeError);
    expect(() => randomShuffle('not array' as any)).toThrow(
      'array must be an array',
    );
  });

  // Error Test case 13: TypeError for non-boolean inPlace
  it('13. should throw TypeError when inPlace is not a boolean', () => {
    expect(() => randomShuffle([1, 2, 3], 'true' as any)).toThrow(TypeError);
    expect(() => randomShuffle([1, 2, 3], 'true' as any)).toThrow(
      'inPlace must be a boolean',
    );
  });

  // Error Test case 14: Error for empty array
  it('14. should throw Error when array is empty', () => {
    expect(() => randomShuffle([])).toThrow(Error);
    expect(() => randomShuffle([])).toThrow('array cannot be empty');
  });
});
