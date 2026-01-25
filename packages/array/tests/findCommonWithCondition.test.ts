import { findCommonWithCondition } from '../src/findCommonWithCondition';

describe('findCommonWithCondition', () => {
  // Test case 1: Find common elements when condition matches
  it('1. should find common elements with a valid condition', () => {
    const arr1: number[] = [1, 2, 3, 4, 5];
    const arr2: number[] = [4, 5, 6, 7, 8];
    const condition = (x: number) => x > 3;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([4, 5]);
  });

  // Test case 2: Return empty array when one input array is empty
  it('2. should return an empty array when one array is empty', () => {
    const arr1: number[] = [];
    const arr2: number[] = [1, 2, 3];
    const condition = (x: number) => x > 1;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([]);
  });

  // Test case 3: Return empty array when both inputs are empty
  it('3. should return an empty array when both arrays are empty', () => {
    const arr1: number[] = [];
    const arr2: number[] = [];
    const condition = (x: number) => x > 1;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([]);
  });

  // Test case 4: Return empty array when no elements satisfy condition
  it('4. should return an empty array when there are no common elements', () => {
    const arr1: number[] = [1, 2, 3];
    const arr2: number[] = [4, 5, 6];
    const condition = (x: number) => x > 1;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([]);
  });

  // Test case 5: Return filtered common elements when all elements overlap
  it('5. should return all elements when all elements are common', () => {
    const arr1: number[] = [1, 2, 3];
    const arr2: number[] = [1, 2, 3];
    const condition = (x: number) => x > 1;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([2, 3]);
  });

  // Test case 6: Return all common elements when condition always returns true
  it('6. should return all common elements when condition always returns true', () => {
    const arr1: number[] = [1, 2, 3];
    const arr2: number[] = [2, 3, 4];
    const condition = (_x: number) => true;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([2, 3]);
  });

  // Test case 7: Return empty array when condition always returns false
  it('7. should return an empty array when condition always returns false', () => {
    const arr1: number[] = [1, 2, 3];
    const arr2: number[] = [2, 3, 4];
    const condition = (_x: number) => false;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([]);
  });

  // Test case 8: Support heterogeneous data types
  it('8. should handle arrays containing different data types', () => {
    const arr1: (number | string | boolean)[] = [1, 'two', 3.0, true];
    const arr2: (number | string | boolean)[] = ['two', 3.0, false];
    const condition = (x: unknown) => typeof x === 'number';
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([3.0]);
  });

  // Test case 9: Handle special character strings
  it('9. should handle arrays containing special characters', () => {
    const arr1: string[] = ['@', '#', '$'];
    const arr2: string[] = ['$', '%', '&'];
    const condition = (x: string) => x === '$';
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual(['$']);
  });

  // Test case 10: Support nested arrays
  it('10. should handle arrays containing nested arrays', () => {
    const arr1: number[][] = [
      [1, 2],
      [3, 4],
    ];
    const arr2: number[][] = [
      [3, 4],
      [5, 6],
    ];
    const condition = (x: number[]) => x.length === 2;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([[3, 4]]);
  });

  // Test case 11: Filter out null while keeping valid overlaps
  it('11. should handle arrays containing null and undefined', () => {
    const arr1: (number | null | undefined)[] = [null, 1, 2];
    const arr2: (number | null | undefined)[] = [null, 2, 3];
    const condition = (x: unknown) => x !== null;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([2]);
  });

  // Test case 12: Ignore NaN values that fail the predicate
  it('12. should handle arrays containing NaN', () => {
    const arr1: number[] = [NaN, 1, 2];
    const arr2: number[] = [NaN, 2, 3];
    const condition = (x: unknown) => typeof x === 'number' && !isNaN(x);
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([2]);
  });

  // Test case 13: Work with objects using the predicate
  it('13. should handle arrays containing objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const arr1: object[] = [obj1, obj2];
    const arr2: object[] = [obj2, { c: 3 }];
    const condition = (x: unknown) =>
      typeof x === 'object' && x !== null && 'b' in x;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([obj2]);
  });

  // Test case 14: Work with functions stored in arrays
  it('14. should handle arrays containing functions', () => {
    const func1 = (x: number) => x + 1;
    const func2 = (x: number) => x * 2;
    const arr1: Array<(x: number) => number> = [func1, func2];
    const arr2: Array<(x: number) => number> = [func2, (x: number) => x - 1];
    const condition = (x: unknown) =>
      typeof x === 'function' && (x as (n: number) => number)(2) === 4;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([func2]);
  });

  // Test case 15: Handle symbols
  it('15. should handle arrays containing symbols', () => {
    const sym1 = Symbol('symbol1');
    const sym2 = Symbol('symbol2');
    const arr1: symbol[] = [sym1, sym2];
    const arr2: symbol[] = [sym2, Symbol('symbol3')];
    const condition = (x: symbol) => x.toString().includes('symbol2');
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([sym2]);
  });

  // Test case 16: Handle Date objects
  it('16. should handle arrays containing dates', () => {
    const date1 = new Date(2020, 0, 1);
    const date2 = new Date(2021, 0, 1);
    const arr1: Date[] = [date1, date2];
    const arr2: Date[] = [date2, new Date(2022, 0, 1)];
    const condition = (x: Date) => x.getFullYear() === 2021;
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([date2]);
  });

  // Test case 17: Handle regular expressions
  it('17. should handle arrays containing regex', () => {
    const regex1 = /abc/;
    const regex2 = /def/;
    const arr1: RegExp[] = [regex1, regex2];
    const arr2: RegExp[] = [regex2, /ghi/];
    const condition = (x: RegExp) => x.source.includes('def');
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual([regex2]);
  });

  // Test case 18: Handle large arrays efficiently
  it('18. should handle large arrays', () => {
    const arr1: number[] = Array.from({ length: 10000 }, (_, i) => i);
    const arr2: number[] = Array.from({ length: 10000 }, (_, i) => i + 5000);
    const condition = (x: number) => x % 2 === 0;
    const expected: number[] = Array.from(
      { length: 2500 },
      (_, i) => i * 2 + 5000,
    );
    expect(findCommonWithCondition(arr1, arr2, condition)).toEqual(expected);
  });

  // Test case 19: Throw when the first argument is not an array
  it('19. should throw TypeError when the first argument is not an array', () => {
    const arr1 = null as unknown as number[];
    const arr2: number[] = [1, 2];
    const condition = (value: number) => value > 0;
    expect(() => findCommonWithCondition(arr1, arr2, condition)).toThrow(
      TypeError,
    );
    expect(() => findCommonWithCondition(arr1, arr2, condition)).toThrow(
      "Cannot read properties of null (reading 'filter')",
    );
  });

  // Test case 20: Throw when the second argument is not an array
  it('20. should throw TypeError when the second argument is not an array', () => {
    const arr1: number[] = [1, 2, 3];
    const arr2 = null as unknown as number[];
    const condition = (value: number) => value > 0;
    expect(() => findCommonWithCondition(arr1, arr2, condition)).toThrow(
      TypeError,
    );
    expect(() => findCommonWithCondition(arr1, arr2, condition)).toThrow(
      "Cannot read properties of null (reading 'some')",
    );
  });

  // Test case 21: Throw when the condition argument is not callable
  it('21. should throw TypeError when the condition argument is not a function', () => {
    const arr1: number[] = [1, 2, 3];
    const arr2: number[] = [2, 3, 4];
    const condition = null as unknown as (value: number) => boolean;
    expect(() => findCommonWithCondition(arr1, arr2, condition)).toThrow(
      TypeError,
    );
    expect(() => findCommonWithCondition(arr1, arr2, condition)).toThrow(
      'object null is not a function',
    );
  });
});
