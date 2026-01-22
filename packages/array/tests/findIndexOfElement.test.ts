import { findIndexOfElement } from '../src/findIndexOfElement';

describe('findIndexOfElement', () => {
  // Test case 1: Array containing the element
  it('1. should return the index of the element if it is present in the array', () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    expect(findIndexOfElement(arr, 3)).toBe(2);
  });

  // Test case 2: Array not containing the element
  it('2. should return -1 if the element is not present in the array', () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    expect(findIndexOfElement(arr, 6)).toBe(-1);
  });

  // Test case 3: Empty array
  it('3. should return -1 if the array is empty', () => {
    const arr: number[] = [];
    expect(findIndexOfElement(arr, 1)).toBe(-1);
  });

  // Test case 4: Array containing multiple occurrences of the element
  it('4. should return the index of the first occurrence of the element', () => {
    const arr: number[] = [1, 2, 3, 2, 1];
    expect(findIndexOfElement(arr, 2)).toBe(1);
  });

  // Test case 5: Array containing different data types
  it('5. should handle arrays containing different data types', () => {
    const arr: (number | string | boolean)[] = [1, 'two', 3.0, true];
    expect(findIndexOfElement(arr, 'two')).toBe(1);
    expect(findIndexOfElement(arr, 3.0)).toBe(2);
    expect(findIndexOfElement(arr, true)).toBe(3);
  });

  // Test case 6: Array containing special characters
  it('6. should handle arrays containing special characters', () => {
    const arr: string[] = ['@', '#', '$'];
    expect(findIndexOfElement(arr, '#')).toBe(1);
  });

  // Test case 7: Array containing nested arrays
  it('7. should handle arrays containing nested arrays', () => {
    const arr: number[][] = [
      [1, 2],
      [3, 4],
    ];
    expect(findIndexOfElement(arr, [3, 4])).toBe(1);
  });

  // Test case 8: Array containing null and undefined
  it('8. should handle arrays containing null and undefined', () => {
    const arr: (number | null | undefined)[] = [null, 1, 2, undefined];
    expect(findIndexOfElement(arr, null)).toBe(0);
    expect(findIndexOfElement(arr, undefined)).toBe(3);
  });

  // Test case 9: Array containing NaN
  it('9. should handle arrays containing NaN', () => {
    const arr: number[] = [NaN, 1, 2];
    expect(findIndexOfElement(arr, NaN)).toBe(0);
  });

  // Test case 10: Array containing objects
  it('10. should handle arrays containing objects', () => {
    const obj1: { a: number } = { a: 1 };
    const obj2: { b: number } = { b: 2 };
    const arr: object[] = [obj1, obj2];
    expect(findIndexOfElement(arr, obj2)).toBe(1);
  });

  // Test case 11: Array containing functions
  it('11. should handle arrays containing functions', () => {
    const func1: (x: number) => number = (x: number) => x + 1;
    const func2: (x: number) => number = (x: number) => x * 2;
    const arr: Array<(x: number) => number> = [func1, func2];
    expect(findIndexOfElement(arr, func2)).toBe(1);
  });

  // Test case 12: Array containing symbols
  it('12. should handle arrays containing symbols', () => {
    const sym1: symbol = Symbol('symbol1');
    const sym2: symbol = Symbol('symbol2');
    const arr: symbol[] = [sym1, sym2];
    expect(findIndexOfElement(arr, sym2)).toBe(1);
  });

  // Test case 13: Array containing dates
  it('13. should handle arrays containing dates', () => {
    const date1: Date = new Date(2020, 0, 1);
    const date2: Date = new Date(2021, 0, 1);
    const arr: Date[] = [date1, date2];
    expect(findIndexOfElement(arr, date2)).toBe(1);
  });

  // Test case 14: Array containing regex
  it('14. should handle arrays containing regex', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const arr: RegExp[] = [regex1, regex2];
    expect(findIndexOfElement(arr, regex2)).toBe(1);
  });

  // Test case 15: Large array
  it('15. should handle large arrays', () => {
    const arr: number[] = Array.from({ length: 10000 }, (_, i) => i);
    expect(findIndexOfElement(arr, 9999)).toBe(9999);
  });

  // Test case 16: Array containing mixed types
  it('16. should handle arrays containing mixed types', () => {
    const arr: (number | string | boolean | null | undefined)[] = [
      1,
      'two',
      true,
      null,
      undefined,
    ];
    expect(findIndexOfElement(arr, 'two')).toBe(1);
    expect(findIndexOfElement(arr, true)).toBe(2);
    expect(findIndexOfElement(arr, null)).toBe(3);
    expect(findIndexOfElement(arr, undefined)).toBe(4);
  });

  // Test case 17: Array containing nested objects
  it('17. should handle arrays containing nested objects', () => {
    const obj1: { a: { b: number } } = { a: { b: 1 } };
    const obj2: { a: { b: number } } = { a: { b: 2 } };
    const arr: object[] = [obj1, obj2];
    expect(findIndexOfElement(arr, obj2)).toBe(1);
  });

  // Test case 18: Array containing nested functions
  it('18. should handle arrays containing nested functions', () => {
    const func1: () => () => number = () => () => 1;
    const func2: () => () => number = () => () => 2;
    const arr: Array<() => () => number> = [func1, func2];
    expect(findIndexOfElement(arr, func2)).toBe(1);
  });

  // Test case 19: Array containing nested arrays with different lengths
  it('19. should handle arrays containing nested arrays with different lengths', () => {
    const arr: number[][] = [
      [1, 2],
      [3, 4, 5],
    ];
    expect(findIndexOfElement(arr, [3, 4, 5])).toBe(1);
  });

  // Test case 20: Array containing deeply nested arrays
  it('20. should handle arrays containing deeply nested arrays', () => {
    const arr = [
      [1, [2, [3, [4]]]],
      [5, [6, [7, [8]]]],
    ];
    expect(findIndexOfElement(arr, [5, [6, [7, [8]]]])).toBe(1);
  });
});
