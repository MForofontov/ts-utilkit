import { arrayToSet } from '../src/arrayToSet';

describe('arrayToSet', () => {
  it('1. should remove duplicates from array', () => {
    const array = [1, 2, 2, 3, 3, 3];
    const result = arrayToSet(array);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('2. should work with string arrays', () => {
    const array = ['apple', 'banana', 'apple', 'cherry'];
    const result = arrayToSet(array);
    expect(result).toEqual(new Set(['apple', 'banana', 'cherry']));
  });

  it('3. should handle empty array', () => {
    const array: number[] = [];
    const result = arrayToSet(array);
    expect(result).toEqual(new Set());
  });

  it('4. should preserve insertion order of first occurrence', () => {
    const array = [3, 1, 2, 1, 3];
    const result = arrayToSet(array);
    const resultArray = Array.from(result);
    expect(resultArray).toEqual([3, 1, 2]);
  });

  it('5. should work with object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const array = [obj1, obj2, obj1];
    const result = arrayToSet(array);
    expect(result).toEqual(new Set([obj1, obj2]));
  });

  it('6. should handle array with no duplicates', () => {
    const array = [1, 2, 3, 4];
    const result = arrayToSet(array);
    expect(result).toEqual(new Set([1, 2, 3, 4]));
  });

  it('7. should throw TypeError when argument is not an array', () => {
    const invalidArray = 'not an array' as unknown as number[];
    expect(() => arrayToSet(invalidArray)).toThrow(TypeError);
  });
});
