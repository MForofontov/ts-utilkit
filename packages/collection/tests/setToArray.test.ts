import { setToArray } from '../src/setToArray';

describe('setToArray', () => {
  it('1. should convert set to array', () => {
    const set = new Set([1, 2, 3]);
    const result = setToArray(set);
    expect(result).toEqual([1, 2, 3]);
  });

  it('2. should work with string sets', () => {
    const set = new Set(['apple', 'banana', 'cherry']);
    const result = setToArray(set);
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  it('3. should handle empty set', () => {
    const set = new Set<number>();
    const result = setToArray(set);
    expect(result).toEqual([]);
  });

  it('4. should preserve insertion order', () => {
    const set = new Set([3, 1, 2]);
    const result = setToArray(set);
    expect(result).toEqual([3, 1, 2]);
  });

  it('5. should work with object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const set = new Set([obj1, obj2]);
    const result = setToArray(set);
    expect(result).toEqual([obj1, obj2]);
  });

  it('6. should create new array instance', () => {
    const set = new Set([1, 2, 3]);
    const result1 = setToArray(set);
    const result2 = setToArray(set);
    expect(result1).not.toBe(result2);
    expect(result1).toEqual(result2);
  });

  it('7. should throw TypeError when argument is not a Set', () => {
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    expect(() => setToArray(invalidSet)).toThrow(TypeError);
  });
});
