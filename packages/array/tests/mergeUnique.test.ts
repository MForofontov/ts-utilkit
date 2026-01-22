import { mergeUnique } from '../src/mergeUnique';

describe('mergeUnique', () => {
  // Test case 1: Merging two arrays with no common elements
  test('1. should merge two arrays with no common elements', () => {
    const array1: number[] = [1, 2, 3];
    const array2: number[] = [4, 5, 6];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  // Test case 2: Merging two arrays with some common elements
  test('2. should merge two arrays with some common elements', () => {
    const array1: number[] = [1, 2, 3, 4];
    const array2: number[] = [3, 4, 5, 6];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  // Test case 3: Merging two arrays with all common elements
  test('3. should merge two arrays with all common elements', () => {
    const array1: number[] = [1, 2, 3];
    const array2: number[] = [1, 2, 3];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 4: Merging an empty array with a non-empty array
  test('4. should merge an empty array with a non-empty array', () => {
    const array1: number[] = [];
    const array2: number[] = [1, 2, 3];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 5: Merging a non-empty array with an empty array
  test('5. should merge a non-empty array with an empty array', () => {
    const array1: number[] = [1, 2, 3];
    const array2: number[] = [];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 6: Merging two empty arrays
  test('6. should merge two empty arrays', () => {
    const array1: number[] = [];
    const array2: number[] = [];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([]);
  });

  // Test case 7: Merging arrays with different types
  test('7. should merge arrays with different types', () => {
    const array1: (number | string)[] = [1, 'two', 3];
    const array2: (number | string)[] = ['four', 5, 'six'];
    const result: (number | string)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 'two', 3, 'four', 5, 'six']);
  });

  // Test case 8: Merging arrays with nested arrays
  test('8. should merge arrays with nested arrays', () => {
    const array1: (number[] | string[])[] = [
      [1, 2],
      [3, 4],
    ];
    const array2: (number[] | string[])[] = [
      [3, 4],
      [5, 6],
    ];
    const result: (number[] | string[])[] = mergeUnique(array1, array2);
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  // Test case 9: Merging arrays with objects
  test('9. should merge arrays with objects', () => {
    const array1: { [key: string]: number }[] = [{ a: 1 }, { b: 2 }];
    const array2: { [key: string]: number }[] = [{ b: 2 }, { c: 3 }];
    const result: { [key: string]: number }[] = mergeUnique(array1, array2);
    expect(result).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
  });

  // Test case 10: Merging arrays with special characters
  test('10. should merge arrays with special characters', () => {
    const array1: string[] = ['@', '#', '$'];
    const array2: string[] = ['$', '%', '^'];
    const result: string[] = mergeUnique(array1, array2);
    expect(result).toEqual(['@', '#', '$', '%', '^']);
  });

  // Test case 11: Merging arrays with duplicate elements
  test('11. should merge arrays with duplicate elements', () => {
    const array1: number[] = [1, 2, 2, 3];
    const array2: number[] = [3, 4, 4, 5];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  // Test case 12: Merging arrays with negative numbers
  test('12. should merge arrays with negative numbers', () => {
    const array1: number[] = [-1, -2, -3];
    const array2: number[] = [-3, -4, -5];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([-1, -2, -3, -4, -5]);
  });

  // Test case 13: Merging arrays with mixed positive and negative numbers
  test('13. should merge arrays with mixed positive and negative numbers', () => {
    const array1: number[] = [1, -2, 3];
    const array2: number[] = [-3, 4, -5];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, -2, 3, -3, 4, -5]);
  });

  // Test case 14: Merging arrays with floating point numbers
  test('14. should merge arrays with floating point numbers', () => {
    const array1: number[] = [1.1, 2.2, 3.3];
    const array2: number[] = [3.3, 4.4, 5.5];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([1.1, 2.2, 3.3, 4.4, 5.5]);
  });

  // Test case 15: Merging arrays with boolean values
  test('15. should merge arrays with boolean values', () => {
    const array1: (number | boolean)[] = [1, true, 3];
    const array2: (number | boolean)[] = [false, 4, true];
    const result: (number | boolean)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, true, 3, false, 4]);
  });

  // Test case 16: Merging arrays with null and undefined values
  test('16. should merge arrays with null and undefined values', () => {
    const array1: (number | null | undefined)[] = [1, null, 3];
    const array2: (number | null | undefined)[] = [undefined, 4, null];
    const result: (number | null | undefined)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, null, 3, undefined, 4]);
  });

  // Test case 17: Merging arrays with large numbers
  test('17. should merge arrays with large numbers', () => {
    const array1: number[] = [Number.MAX_SAFE_INTEGER, Number.MAX_VALUE];
    const array2: number[] = [Number.MIN_SAFE_INTEGER, Number.MIN_VALUE];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([
      Number.MAX_SAFE_INTEGER,
      Number.MAX_VALUE,
      Number.MIN_SAFE_INTEGER,
      Number.MIN_VALUE,
    ]);
  });

  // Test case 18: Merging arrays with Infinity and -Infinity
  test('18. should merge arrays with Infinity and -Infinity', () => {
    const array1: number[] = [Infinity, -Infinity];
    const array2: number[] = [Infinity, -Infinity];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([Infinity, -Infinity]);
  });

  // Test case 19: Merging arrays with NaN values
  test('19. should merge arrays with NaN values', () => {
    const array1: number[] = [NaN, 1, 2];
    const array2: number[] = [NaN, 3, 4];
    const result: number[] = mergeUnique(array1, array2);
    expect(result).toEqual([NaN, 1, 2, 3, 4]);
  });

  // Test case 20: Merging arrays with mixed data types
  test('20. should merge arrays with mixed data types', () => {
    const array1: (number | string | boolean | null | undefined)[] = [
      1,
      'two',
      true,
      null,
      undefined,
    ];
    const array2: (number | string | boolean | null | undefined)[] = [
      'three',
      4,
      false,
      null,
      undefined,
    ];
    const result: (number | string | boolean | null | undefined)[] =
      mergeUnique(array1, array2);
    expect(result).toEqual([
      1,
      'two',
      true,
      null,
      undefined,
      'three',
      4,
      false,
    ]);
  });

  // Test case 21: Merging arrays with symbols
  test('21. should merge arrays with symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const array1: (number | symbol)[] = [1, sym1, 3];
    const array2: (number | symbol)[] = [sym2, 4, sym1];
    const result: (number | symbol)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, sym1, 3, sym2, 4]);
  });

  // Test case 22: Merging arrays with functions
  test('22. should merge arrays with functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const array1: (number | (() => void))[] = [1, func1, 3];
    const array2: (number | (() => void))[] = [func2, 4, func1];
    const result: (number | (() => void))[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, func1, 3, func2, 4]);
  });

  // Test case 23: Merging arrays with dates
  test('23. should merge arrays with dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const array1: (number | Date)[] = [1, date1, 3];
    const array2: (number | Date)[] = [date2, 4, date1];
    const result: (number | Date)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, date1, 3, date2, 4]);
  });

  // Test case 24: Merging arrays with regular expressions
  test('24. should merge arrays with regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const array1: (number | RegExp)[] = [1, regex1, 3];
    const array2: (number | RegExp)[] = [regex2, 4, regex1];
    const result: (number | RegExp)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, regex1, 3, regex2, 4]);
  });

  // Test case 25: Merging arrays with BigInt values
  test('25. should merge arrays with BigInt values', () => {
    const array1: (number | bigint)[] = [1, BigInt(2), 3];
    const array2: (number | bigint)[] = [BigInt(4), 5, BigInt(2)];
    const result: (number | bigint)[] = mergeUnique(array1, array2);
    expect(result).toEqual([1, BigInt(2), 3, BigInt(4), 5]);
  });
});
