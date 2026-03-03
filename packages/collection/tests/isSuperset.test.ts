import { isSuperset } from '../src/isSuperset';

describe('isSuperset', () => {
  it('1. should return true when first set is superset of second', () => {
    const superset = new Set([1, 2, 3, 4]);
    const subset = new Set([1, 2]);
    const result = isSuperset(superset, subset);
    expect(result).toBe(true);
  });

  it('2. should return false when first set is not superset', () => {
    const superset = new Set([1, 2, 3]);
    const subset = new Set([1, 5]);
    const result = isSuperset(superset, subset);
    expect(result).toBe(false);
  });

  it('3. should return true for any set as superset of empty set', () => {
    const superset = new Set([1, 2, 3]);
    const subset = new Set<number>();
    const result = isSuperset(superset, subset);
    expect(result).toBe(true);
  });

  it('4. should return true when sets are identical', () => {
    const set = new Set([1, 2, 3]);
    const result = isSuperset(set, set);
    expect(result).toBe(true);
  });

  it('5. should return false when superset is smaller', () => {
    const superset = new Set([1, 2, 3]);
    const subset = new Set([1, 2, 3, 4, 5]);
    const result = isSuperset(superset, subset);
    expect(result).toBe(false);
  });

  it('6. should work with string values', () => {
    const superset = new Set(['a', 'b', 'c', 'd']);
    const subset = new Set(['a', 'b']);
    const result = isSuperset(superset, subset);
    expect(result).toBe(true);
  });

  it('7. should handle single element subset', () => {
    const superset = new Set([1, 2, 3]);
    const subset = new Set([2]);
    const result = isSuperset(superset, subset);
    expect(result).toBe(true);
  });

});
