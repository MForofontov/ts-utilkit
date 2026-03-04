import { isSubset } from '../src/isSubset';

describe('isSubset', () => {
  it('1. should return true when first set is subset of second', () => {
    const subset = new Set([1, 2]);
    const superset = new Set([1, 2, 3, 4]);
    const result = isSubset(subset, superset);
    expect(result).toBe(true);
  });

  it('2. should return false when first set is not subset', () => {
    const subset = new Set([1, 5]);
    const superset = new Set([1, 2, 3, 4]);
    const result = isSubset(subset, superset);
    expect(result).toBe(false);
  });

  it('3. should return true for empty set as subset', () => {
    const subset = new Set<number>();
    const superset = new Set([1, 2, 3]);
    const result = isSubset(subset, superset);
    expect(result).toBe(true);
  });

  it('4. should return true when sets are identical', () => {
    const set = new Set([1, 2, 3]);
    const result = isSubset(set, set);
    expect(result).toBe(true);
  });

  it('5. should return false when subset is larger', () => {
    const subset = new Set([1, 2, 3, 4, 5]);
    const superset = new Set([1, 2, 3]);
    const result = isSubset(subset, superset);
    expect(result).toBe(false);
  });

  it('6. should work with string values', () => {
    const subset = new Set(['a', 'b']);
    const superset = new Set(['a', 'b', 'c', 'd']);
    const result = isSubset(subset, superset);
    expect(result).toBe(true);
  });

  it('7. should handle single element subset', () => {
    const subset = new Set([2]);
    const superset = new Set([1, 2, 3]);
    const result = isSubset(subset, superset);
    expect(result).toBe(true);
  });
});
