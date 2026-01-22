import { flattenArrayDepth } from '../src/flattenArrayDepth';

describe('flattenArrayDepth', () => {
  // Test case 1: Normal nested array of numbers
  it('1. should flatten a normal nested array of numbers to the specified depth', () => {
    const arr = [1, [2, [3, 4], 5], 6];
    expect(flattenArrayDepth<number>(arr, 2)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  // Test case 2: Deeply nested array of numbers
  it('2. should flatten a deeply nested array of numbers to the specified depth', () => {
    const arr = [1, [2, [3, [4, [5]]]]];
    expect(flattenArrayDepth<number>(arr, 3)).toEqual([1, 2, 3, 4, [5]]);
  });

  // Test case 3: Array containing a mix of numbers and strings
  it('3. should flatten an array containing a mix of numbers and strings to the specified depth', () => {
    const arr = [1, ['a', [2, 'b']], 3];
    expect(flattenArrayDepth<number | string>(arr, 2)).toEqual([
      1,
      'a',
      2,
      'b',
      3,
    ]);
  });

  // Test case 4: Array containing special characters
  it('4. should flatten an array containing special characters to the specified depth', () => {
    const arr = ['@', ['#', ['$']], '%'];
    expect(flattenArrayDepth<string | number>(arr, 2)).toEqual([
      '@',
      '#',
      '$',
      '%',
    ]);
  });

  // Test case 5: Array containing nested arrays of different lengths
  it('5. should flatten an array containing nested arrays of different lengths to the specified depth', () => {
    const arr = [1, [2, [3, 4, [5, 6]]], 7];
    expect(flattenArrayDepth<number>(arr, 2)).toEqual([1, 2, 3, 4, [5, 6], 7]);
  });

  // Test case 6: Array containing null and undefined
  it('6. should flatten an array containing null and undefined to the specified depth', () => {
    const arr = [1, [null, [2, undefined]], 3];
    expect(flattenArrayDepth<number | null | undefined>(arr, 2)).toEqual([
      1,
      null,
      2,
      undefined,
      3,
    ]);
  });

  // Test case 7: Array containing NaN
  it('7. should flatten an array containing NaN to the specified depth', () => {
    const arr = [1, [NaN, [2, NaN]], 3];
    expect(flattenArrayDepth<number>(arr, 2)).toEqual([1, NaN, 2, NaN, 3]);
  });

  // Test case 8: Array containing objects
  it('8. should flatten an array containing objects to the specified depth', () => {
    const obj1: { a: number } = { a: 1 };
    const obj2: { b: number } = { b: 2 };
    const arr: (number | object | (number | object)[])[] = [
      1,
      [obj1, [2, obj2]],
      3,
    ];
    expect(flattenArrayDepth<number | object>(arr, 2)).toEqual([
      1,
      obj1,
      2,
      obj2,
      3,
    ]);
  });

  // Test case 9: Array containing functions
  it('9. should flatten an array containing functions to the specified depth', () => {
    const func1: () => number = () => 1;
    const func2: () => number = () => 2;
    const arr = [1, [func1, [2, func2]], 3];
    expect(flattenArrayDepth<number | (() => number)>(arr, 2)).toEqual([
      1,
      func1,
      2,
      func2,
      3,
    ]);
  });

  // Test case 10: Array containing symbols
  it('10. should flatten an array containing symbols to the specified depth', () => {
    const sym1: symbol = Symbol('symbol1');
    const sym2: symbol = Symbol('symbol2');
    const arr = [1, [sym1, [2, sym2]], 3];
    expect(flattenArrayDepth<number | symbol>(arr, 2)).toEqual([
      1,
      sym1,
      2,
      sym2,
      3,
    ]);
  });

  // Test case 11: Array containing dates
  it('11. should flatten an array containing dates to the specified depth', () => {
    const date1: Date = new Date(2020, 0, 1);
    const date2: Date = new Date(2021, 0, 1);
    const arr = [1, [date1, [2, date2]], 3];
    expect(flattenArrayDepth<number | Date>(arr, 2)).toEqual([
      1,
      date1,
      2,
      date2,
      3,
    ]);
  });

  // Test case 12: Array containing regex
  it('12. should flatten an array containing regex to the specified depth', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const arr = [1, [regex1, [2, regex2]], 3];
    expect(flattenArrayDepth<number | RegExp>(arr, 2)).toEqual([
      1,
      regex1,
      2,
      regex2,
      3,
    ]);
  });

  // Test case 13: Empty array
  it('13. should return an empty array when the input array is empty', () => {
    const arr: number[] = [];
    expect(flattenArrayDepth<number>(arr, 2)).toEqual([]);
  });

  // Test case 14: Large nested array
  it('14. should flatten a large nested array to the specified depth', () => {
    const arr: (number | (number | number[])[])[] = Array.from(
      { length: 1000 },
      (_, i) => [i, [i + 1]],
    );
    const expected: number[] = Array.from(
      { length: 2000 },
      (_, i) => Math.floor(i / 2) + (i % 2),
    );
    expect(flattenArrayDepth<number>(arr, 2)).toEqual(expected);
  });

  // Test case 15: Depth 0
  it('15. should return the original array when depth is 0', () => {
    const arr = [1, [2, [3, 4], 5], 6];
    expect(flattenArrayDepth<number>(arr, 0)).toEqual(arr);
  });

  // Test case 16: Depth 1
  it('16. should flatten the array by one level when depth is 1', () => {
    const arr = [1, [2, [3, 4], 5], 6];
    expect(flattenArrayDepth<number>(arr, 1)).toEqual([1, 2, [3, 4], 5, 6]);
  });

  // Test case 17: Depth greater than the nesting level
  it('17. should flatten the array completely when depth is greater than the nesting level', () => {
    const arr = [1, [2, [3, 4], 5], 6];
    expect(flattenArrayDepth<number>(arr, 10)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
