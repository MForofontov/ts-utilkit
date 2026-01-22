import { isDisjoint } from '../src/isDisjoint';

describe('isDisjoint', () => {
  it('1. should return true when sets have no common elements', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([4, 5, 6]);
    const result = isDisjoint(set1, set2);
    expect(result).toBe(true);
  });

  it('2. should return false when sets have common elements', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    const result = isDisjoint(set1, set2);
    expect(result).toBe(false);
  });

  it('3. should return true for two empty sets', () => {
    const set1 = new Set<number>();
    const set2 = new Set<number>();
    const result = isDisjoint(set1, set2);
    expect(result).toBe(true);
  });

  it('4. should return true when one set is empty', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set<number>();
    const result = isDisjoint(set1, set2);
    expect(result).toBe(true);
  });

  it('5. should return false when sets are identical', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    const result = isDisjoint(set1, set2);
    expect(result).toBe(false);
  });

  it('6. should work with string values', () => {
    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['c', 'd']);
    const result = isDisjoint(set1, set2);
    expect(result).toBe(true);
  });

  it('7. should optimize by checking smaller set', () => {
    const set1 = new Set([1]);
    const set2 = new Set([2, 3, 4, 5, 6]);
    const result = isDisjoint(set1, set2);
    expect(result).toBe(true);
  });

  it('8. should throw TypeError when first argument is not a Set', () => {
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    const validSet = new Set([4, 5, 6]);
    expect(() => isDisjoint(invalidSet, validSet)).toThrow(TypeError);
  });

  it('9. should throw TypeError when second argument is not a Set', () => {
    const validSet = new Set([1, 2, 3]);
    const invalidSet = 'not a set' as unknown as Set<number>;
    expect(() => isDisjoint(validSet, invalidSet)).toThrow(TypeError);
  });
});
