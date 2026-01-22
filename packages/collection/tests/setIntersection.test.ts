import { setIntersection } from '../src/setIntersection';

describe('setIntersection', () => {
  it('1. should return intersection of two sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 4]);
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set([2, 3]));
  });

  it('2. should return empty set when no common elements', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([3, 4]);
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set());
  });

  it('3. should handle intersection of multiple sets', () => {
    const set1 = new Set([1, 2, 3, 4]);
    const set2 = new Set([2, 3, 4, 5]);
    const set3 = new Set([3, 4, 5, 6]);
    const result = setIntersection(set1, set2, set3);
    expect(result).toEqual(new Set([3, 4]));
  });

  it('4. should return empty set when one set is empty', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set<number>();
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set());
  });

  it('5. should work with string values', () => {
    const set1 = new Set(['apple', 'banana', 'cherry']);
    const set2 = new Set(['banana', 'cherry', 'date']);
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set(['banana', 'cherry']));
  });

  it('6. should work with object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const set1 = new Set([obj1, obj2]);
    const set2 = new Set([obj2]);
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set([obj2]));
  });

  it('7. should not modify original sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 4]);
    const originalSet1 = new Set(set1);
    setIntersection(set1, set2);
    expect(set1).toEqual(originalSet1);
  });

  it('8. should handle identical sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('9. should handle single common element', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);
    const result = setIntersection(set1, set2);
    expect(result).toEqual(new Set([3]));
  });

  it('10. should throw Error when fewer than two sets provided', () => {
    const set1 = new Set([1, 2, 3]);
    expect(() => setIntersection(set1)).toThrow(
      'At least two sets are required',
    );
  });

  it('11. should throw TypeError when first argument is not a Set', () => {
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    const validSet = new Set([4, 5, 6]);
    expect(() => setIntersection(invalidSet, validSet)).toThrow(TypeError);
  });

  it('12. should throw TypeError when second argument is not a Set', () => {
    const validSet = new Set([1, 2, 3]);
    const invalidSet = 'not a set' as unknown as Set<number>;
    expect(() => setIntersection(validSet, invalidSet)).toThrow(TypeError);
  });
});
