import { findDuplicates } from '../src/findDuplicates';

describe('findDuplicates', () => {
  // Test case 1: Array with duplicates
  it('1. should find duplicates in an array with duplicates', () => {
    const arr: (number | string)[] = [1, 2, 2, 3, 4, 4, 5];
    expect(findDuplicates(arr)).toEqual([2, 4]);
  });

  // Test case 2: Array with no duplicates
  it('2. should return an empty array when there are no duplicates', () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    expect(findDuplicates(arr)).toEqual([]);
  });

  // Test case 3: Empty array
  it('3. should return an empty array when the array is empty', () => {
    const arr: number[] = [];
    expect(findDuplicates(arr)).toEqual([]);
  });

  // Test case 4: Array with all identical elements
  it('4. should return the same element when all elements are identical', () => {
    const arr: number[] = [1, 1, 1, 1];
    expect(findDuplicates(arr)).toEqual([1]);
  });

  // Test case 5: Array with different data types
  it('5. should handle arrays containing different data types', () => {
    const arr: (number | string | boolean)[] = [
      1,
      'two',
      3.0,
      true,
      'two',
      3.0,
    ];
    expect(findDuplicates(arr)).toEqual(['two', 3.0]);
  });

  // Test case 6: Array with special characters
  it('6. should handle arrays containing special characters', () => {
    const arr: string[] = ['@', '#', '$', '@', '$'];
    expect(findDuplicates(arr)).toEqual(['@', '$']);
  });

  // Test case 7: Array with nested arrays
  it('7. should handle arrays containing nested arrays', () => {
    const arr: number[][] = [
      [1, 2],
      [3, 4],
      [1, 2],
      [5, 6],
    ];
    expect(findDuplicates(arr)).toEqual([[1, 2]]);
  });

  // Test case 8: Array with null and undefined
  it('8. should handle arrays containing null and undefined', () => {
    const arr: (number | null | undefined)[] = [
      null,
      1,
      2,
      null,
      undefined,
      undefined,
    ];
    expect(findDuplicates(arr)).toEqual([null, undefined]);
  });

  // Test case 9: Array with NaN
  it('9. should handle arrays containing NaN', () => {
    const arr: number[] = [NaN, 1, 2, NaN];
    expect(findDuplicates(arr)).toEqual([NaN]);
  });

  // Test case 10: Array with objects
  it('10. should handle arrays containing objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const arr: object[] = [obj1, obj2, obj1];
    expect(findDuplicates(arr)).toEqual([obj1]);
  });

  // Test case 11: Array with functions
  it('11. should handle arrays containing functions', () => {
    const func1 = (x: number) => x + 1;
    const func2 = (x: number) => x * 2;
    const arr: Array<(x: number) => number> = [func1, func2, func1];
    expect(findDuplicates(arr)).toEqual([func1]);
  });

  // Test case 12: Array with symbols
  it('12. should handle arrays containing symbols', () => {
    const sym1 = Symbol('symbol1');
    const sym2 = Symbol('symbol2');
    const arr: symbol[] = [sym1, sym2, sym1];
    expect(findDuplicates(arr)).toEqual([sym1]);
  });

  // Test case 13: Array with dates
  it('13. should handle arrays containing dates', () => {
    const date1 = new Date(2020, 0, 1);
    const date2 = new Date(2021, 0, 1);
    const arr: Date[] = [date1, date2, date1];
    expect(findDuplicates(arr)).toEqual([date1]);
  });

  // Test case 14: Array with regex
  it('14. should handle arrays containing regex', () => {
    const regex1 = /abc/;
    const regex2 = /def/;
    const arr: RegExp[] = [regex1, regex2, regex1];
    expect(findDuplicates(arr)).toEqual([regex1]);
  });

  // Test case 15: Large array
  it('15. should handle large arrays', () => {
    const arr: number[] = Array.from({ length: 10000 }, (_, i) => i % 100);
    const expected: number[] = Array.from({ length: 100 }, (_, i) => i);
    expect(findDuplicates(arr)).toEqual(expected);
  });
});
