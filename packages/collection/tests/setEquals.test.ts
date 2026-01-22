import { setEquals } from '../src/setEquals';

describe('setEquals', () => {
  it('1. should return true for equal sets', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 2, 1]);
    const result = setEquals(set1, set2);
    expect(result).toBe(true);
  });

  it('2. should return false for sets with different sizes', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2]);
    const result = setEquals(set1, set2);
    expect(result).toBe(false);
  });

  it('3. should return false for sets with different elements', () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 4]);
    const result = setEquals(set1, set2);
    expect(result).toBe(false);
  });

  it('4. should return true for two empty sets', () => {
    const set1 = new Set<number>();
    const set2 = new Set<number>();
    const result = setEquals(set1, set2);
    expect(result).toBe(true);
  });

  it('5. should return true for same set reference', () => {
    const set = new Set([1, 2, 3]);
    const result = setEquals(set, set);
    expect(result).toBe(true);
  });

  it('6. should work with string values', () => {
    const set1 = new Set(['a', 'b', 'c']);
    const set2 = new Set(['c', 'b', 'a']);
    const result = setEquals(set1, set2);
    expect(result).toBe(true);
  });

  it('7. should ignore insertion order', () => {
    const set1 = new Set([3, 1, 2]);
    const set2 = new Set([1, 2, 3]);
    const result = setEquals(set1, set2);
    expect(result).toBe(true);
  });

  it('8. should work with object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const set1 = new Set([obj1, obj2]);
    const set2 = new Set([obj1, obj2]);
    const result = setEquals(set1, set2);
    expect(result).toBe(true);
  });

  it('9. should return false for different object references', () => {
    const set1 = new Set([{ id: 1 }]);
    const set2 = new Set([{ id: 1 }]);
    const result = setEquals(set1, set2);
    expect(result).toBe(false);
  });

  it('10. should throw TypeError when first argument is not a Set', () => {
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    const validSet = new Set([1, 2, 3]);
    expect(() => setEquals(invalidSet, validSet)).toThrow(TypeError);
  });

  it('11. should throw TypeError when second argument is not a Set', () => {
    const validSet = new Set([1, 2, 3]);
    const invalidSet = 'not a set' as unknown as Set<number>;
    expect(() => setEquals(validSet, invalidSet)).toThrow(TypeError);
  });
});
