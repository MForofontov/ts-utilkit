import { setDifference } from '../src/setDifference';

describe('setDifference', () => {
  it('1. should return difference between two sets', () => {
    const set1 = new Set([1, 2, 3, 4]);
    const set2 = new Set([3, 4, 5]);
    const result = setDifference(set1, set2);
    expect(result).toEqual(new Set([1, 2]));
  });

  it('2. should handle multiple sets to subtract', () => {
    const set1 = new Set([1, 2, 3, 4, 5]);
    const set2 = new Set([2, 3]);
    const set3 = new Set([4]);
    const result = setDifference(set1, set2, set3);
    expect(result).toEqual(new Set([1, 5]));
  });

  it('3. should return empty set when all elements removed', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3, 4]);
    const result = setDifference(set1, set2);
    expect(result).toEqual(new Set());
  });

  it('4. should return first set when no overlap', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([4, 5, 6]);
    const result = setDifference(set1, set2);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('5. should work with string values', () => {
    const set1 = new Set(['a', 'b', 'c']);
    const set2 = new Set(['b', 'c']);
    const result = setDifference(set1, set2);
    expect(result).toEqual(new Set(['a']));
  });

  it('6. should not modify original sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3]);
    const original = new Set(set1);
    setDifference(set1, set2);
    expect(set1).toEqual(original);
  });

  it('7. should throw Error when fewer than two sets provided', () => {
    const set1 = new Set([1, 2, 3]);
    expect(() => setDifference(set1)).toThrow('At least two sets are required');
  });

  it('8. should throw TypeError when first argument is not a Set', () => {
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    const validSet = new Set([4, 5, 6]);
    expect(() => setDifference(invalidSet, validSet)).toThrow(TypeError);
  });

  it('9. should throw TypeError when second argument is not a Set', () => {
    const validSet = new Set([1, 2, 3]);
    const invalidSet = 'not a set' as unknown as Set<number>;
    expect(() => setDifference(validSet, invalidSet)).toThrow(TypeError);
  });
});
