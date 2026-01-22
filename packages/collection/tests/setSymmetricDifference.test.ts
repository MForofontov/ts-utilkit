import { setSymmetricDifference } from '../src/setSymmetricDifference';

describe('setSymmetricDifference', () => {
  it('1. should return symmetric difference of two sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    const result = setSymmetricDifference(set1, set2);
    expect(result).toEqual(new Set([1, 2, 4, 5]));
  });

  it('2. should return union when no overlap', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([3, 4]);
    const result = setSymmetricDifference(set1, set2);
    expect(result).toEqual(new Set([1, 2, 3, 4]));
  });

  it('3. should return empty set when sets are identical', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    const result = setSymmetricDifference(set1, set2);
    expect(result).toEqual(new Set());
  });

  it('4. should handle empty first set', () => {
    const set1 = new Set<number>();
    const set2 = new Set([1, 2, 3]);
    const result = setSymmetricDifference(set1, set2);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('5. should handle empty second set', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set<number>();
    const result = setSymmetricDifference(set1, set2);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('6. should be commutative', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    const result1 = setSymmetricDifference(set1, set2);
    const result2 = setSymmetricDifference(set2, set1);
    expect(result1).toEqual(result2);
  });

  it('7. should work with string values', () => {
    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['b', 'c']);
    const result = setSymmetricDifference(set1, set2);
    expect(result).toEqual(new Set(['a', 'c']));
  });

  it('8. should not modify original sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    const original1 = new Set(set1);
    const original2 = new Set(set2);
    setSymmetricDifference(set1, set2);
    expect(set1).toEqual(original1);
    expect(set2).toEqual(original2);
  });

  it('9. should throw TypeError when first argument is not a Set', () => {
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    const validSet = new Set([4, 5, 6]);
    expect(() => setSymmetricDifference(invalidSet, validSet)).toThrow(
      TypeError,
    );
  });

  it('10. should throw TypeError when second argument is not a Set', () => {
    const validSet = new Set([1, 2, 3]);
    const invalidSet = 'not a set' as unknown as Set<number>;
    expect(() => setSymmetricDifference(validSet, invalidSet)).toThrow(
      TypeError,
    );
  });
});
