import { randomWeighted } from '../src/randomWeighted';

/**
 * Unit tests for the randomWeighted function.
 */
describe('randomWeighted', () => {
  // Test case 1: Normal usage with equal weights
  it('1. should return element from items array with equal weights', () => {
    const items = ['apple', 'banana', 'cherry'];
    const weights = [1, 1, 1];
    const result = randomWeighted(items, weights);
    expect(items).toContain(result);
  });

  // Test case 2: Different weights
  it('2. should respect different weights', () => {
    const items = ['rare', 'common'];
    const weights = [1, 99];
    const results = new Map<string, number>();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const result = randomWeighted(items, weights);
      results.set(result, (results.get(result) || 0) + 1);
    }

    // 'common' should appear much more frequently than 'rare'
    expect(results.get('common')! / iterations).toBeGreaterThan(0.9);
  });

  // Test case 3: Single item
  it('3. should return the only item when array has one element', () => {
    const items = [42];
    const weights = [5];
    const result = randomWeighted(items, weights);
    expect(result).toBe(42);
  });

  // Test case 4: Object array
  it('4. should work with object arrays', () => {
    const items = [{ type: 'A' }, { type: 'B' }];
    const weights = [1, 1];
    const result = randomWeighted(items, weights);
    expect(items).toContain(result);
  });

  // Test case 5: Fractional weights
  it('5. should handle fractional weights correctly', () => {
    const items = [1, 2, 3];
    const weights = [0.5, 0.3, 0.2];
    const result = randomWeighted(items, weights);
    expect(items).toContain(result);
  });

  // Test case 6: Very different weight magnitudes
  it('6. should handle very different weight magnitudes', () => {
    const items = ['A', 'B'];
    const weights = [1, 1000];
    const results = new Map<string, number>();
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const result = randomWeighted(items, weights);
      results.set(result, (results.get(result) || 0) + 1);
    }

    // 'B' should appear approximately 1000 times more often than 'A'
    const ratioB = results.get('B')! / iterations;
    expect(ratioB).toBeGreaterThan(0.95);
  });

  // Test case 7: Zero weight with positive weights
  it('7. should never select item with zero weight', () => {
    const items = ['never', 'always'];
    const weights = [0, 1];
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomWeighted(items, weights));
    }

    expect(results.has('never')).toBe(false);
    expect(results.has('always')).toBe(true);
  });

  // Test case 8: Large number of items
  it('8. should handle large arrays efficiently', () => {
    const items = Array.from({ length: 100 }, (_, i) => i);
    const weights = Array.from({ length: 100 }, () => 1);

    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      randomWeighted(items, weights);
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 9: Randomness verification
  it('9. should produce different values over multiple calls', () => {
    const items = [1, 2, 3, 4, 5];
    const weights = [1, 1, 1, 1, 1];
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomWeighted(items, weights));
    }

    expect(results.size).toBeGreaterThan(3);
  });

  // Test case 10: Distribution accuracy check
  it('10. should match expected distribution closely', () => {
    const items = ['A', 'B', 'C'];
    const weights = [10, 20, 70]; // 10%, 20%, 70%
    const results = new Map<string, number>();
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const result = randomWeighted(items, weights);
      results.set(result, (results.get(result) || 0) + 1);
    }

    // Check distribution (±5%)
    expect(results.get('A')! / iterations).toBeGreaterThan(0.05);
    expect(results.get('A')! / iterations).toBeLessThan(0.15);
    expect(results.get('B')! / iterations).toBeGreaterThan(0.15);
    expect(results.get('B')! / iterations).toBeLessThan(0.25);
    expect(results.get('C')! / iterations).toBeGreaterThan(0.65);
    expect(results.get('C')! / iterations).toBeLessThan(0.75);
  });

  // Error Test case 11: TypeError for non-array items
  it('11. should throw TypeError when items is not an array', () => {
    expect(() => randomWeighted('not array' as any, [1])).toThrow(TypeError);
    expect(() => randomWeighted('not array' as any, [1])).toThrow(
      'items must be an array, got string',
    );
  });

  // Error Test case 12: TypeError for non-array weights
  it('12. should throw TypeError when weights is not an array', () => {
    expect(() => randomWeighted([1], 'not array' as any)).toThrow(TypeError);
    expect(() => randomWeighted([1], 'not array' as any)).toThrow(
      'weights must be an array, got string',
    );
  });

  // Error Test case 13: Error for empty items
  it('13. should throw Error when items array is empty', () => {
    expect(() => randomWeighted([], [])).toThrow(Error);
    expect(() => randomWeighted([], [])).toThrow('items array cannot be empty');
  });

  // Error Test case 14: Error for mismatched lengths
  it('14. should throw Error when arrays have different lengths', () => {
    expect(() => randomWeighted([1, 2], [1])).toThrow(Error);
    expect(() => randomWeighted([1, 2], [1])).toThrow(
      'items and weights arrays must have the same length',
    );
  });

  // Error Test case 15: Error for non-number weight
  it('15. should throw Error when weight is not a number', () => {
    expect(() => randomWeighted([1, 2], [1, 'two' as any])).toThrow(Error);
    expect(() => randomWeighted([1, 2], [1, 'two' as any])).toThrow(
      'All weights must be numbers',
    );
  });

  // Error Test case 15b: Error for NaN weight
  it('15b. should throw Error when weight is NaN', () => {
    expect(() => randomWeighted([1, 2], [1, NaN])).toThrow(Error);
    expect(() => randomWeighted([1, 2], [1, NaN])).toThrow('Weight at index');
  });

  // Error Test case 16: Error for negative weight
  it('16. should throw Error when weight is negative', () => {
    expect(() => randomWeighted([1, 2], [1, -1])).toThrow(Error);
    expect(() => randomWeighted([1, 2], [1, -1])).toThrow(
      'All weights must be non-negative',
    );
  });

  // Error Test case 17: Error for all zero weights
  it('17. should throw Error when all weights are zero', () => {
    expect(() => randomWeighted([1, 2, 3], [0, 0, 0])).toThrow(Error);
    expect(() => randomWeighted([1, 2, 3], [0, 0, 0])).toThrow(
      'Sum of weights must be greater than zero',
    );
  });
});
