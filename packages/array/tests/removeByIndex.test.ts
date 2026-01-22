import { removeByIndex } from '../src/removeByIndex';

describe('removeByIndex', () => {
  // Test case 1: Removing elements from an array of numbers
  test('1. should remove elements from an array of numbers', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const indices: number[] = [1, 3];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3, 5]);
  });

  // Test case 2: Removing elements from an array of strings
  test('2. should remove elements from an array of strings', () => {
    const array: string[] = ['apple', 'banana', 'cherry', 'date'];
    const indices: number[] = [1, 3];
    const result: string[] = removeByIndex(array, indices);
    expect(result).toEqual(['apple', 'cherry']);
  });

  // Test case 3: Removing elements from an array of objects
  test('3. should remove elements from an array of objects', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const indices: number[] = [1];
    const result: { id: number; name: string }[] = removeByIndex(
      array,
      indices,
    );
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  // Test case 4: Removing elements from an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: number[] = [];
    const indices: number[] = [1, 3];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([]);
  });

  // Test case 5: Removing elements with indices that are out of bounds
  test('5. should ignore indices that are out of bounds', () => {
    const array: number[] = [1, 2, 3];
    const indices: number[] = [3, 4];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 6: Removing elements with negative indices
  test('6. should ignore negative indices', () => {
    const array: number[] = [1, 2, 3];
    const indices: number[] = [-1, -2];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 7: Removing elements with duplicate indices
  test('7. should handle duplicate indices', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const indices: number[] = [1, 1, 3];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3, 5]);
  });

  // Test case 8: Removing elements from an array with mixed types
  test('8. should remove elements from an array with mixed types', () => {
    const array: (number | string)[] = [1, 'two', 3, 'four'];
    const indices: number[] = [1, 3];
    const result: (number | string)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 9: Removing elements from an array with nested arrays
  test('9. should remove elements from an array with nested arrays', () => {
    const array: (number[] | string[])[] = [
      [1, 2],
      ['three', 'four'],
      [5, 6],
    ];
    const indices: number[] = [1];
    const result: (number[] | string[])[] = removeByIndex(array, indices);
    expect(result).toEqual([
      [1, 2],
      [5, 6],
    ]);
  });

  // Test case 10: Removing elements from an array with null values
  test('10. should remove elements from an array with null values', () => {
    const array: (number | null)[] = [1, null, 3, null];
    const indices: number[] = [1, 3];
    const result: (number | null)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 11: Removing elements from an array with undefined values
  test('11. should remove elements from an array with undefined values', () => {
    const array: (number | undefined)[] = [1, undefined, 3, undefined];
    const indices: number[] = [1, 3];
    const result: (number | undefined)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 12: Removing elements from an array with boolean values
  test('12. should remove elements from an array with boolean values', () => {
    const array: (number | boolean)[] = [1, true, 3, false];
    const indices: number[] = [1, 3];
    const result: (number | boolean)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 13: Removing elements from an array with symbols
  test('13. should remove elements from an array with symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const array: (number | symbol)[] = [1, sym1, 3, sym2];
    const indices: number[] = [1, 3];
    const result: (number | symbol)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 14: Removing elements from an array with functions
  test('14. should remove elements from an array with functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const array: (number | (() => void))[] = [1, func1, 3, func2];
    const indices: number[] = [1, 3];
    const result: (number | (() => void))[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 15: Removing elements from an array with dates
  test('15. should remove elements from an array with dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const array: (number | Date)[] = [1, date1, 3, date2];
    const indices: number[] = [1, 3];
    const result: (number | Date)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 16: Removing elements from an array with regular expressions
  test('16. should remove elements from an array with regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const array: (number | RegExp)[] = [1, regex1, 3, regex2];
    const indices: number[] = [1, 3];
    const result: (number | RegExp)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 17: Removing elements from an array with BigInt values
  test('17. should remove elements from an array with BigInt values', () => {
    const array: (number | bigint)[] = [1, BigInt(2), 3, BigInt(4)];
    const indices: number[] = [1, 3];
    const result: (number | bigint)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 18: Removing elements from an array with Infinity and -Infinity
  test('18. should remove elements from an array with Infinity and -Infinity', () => {
    const array: number[] = [1, Infinity, 3, -Infinity];
    const indices: number[] = [1, 3];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 19: Removing elements from an array with NaN values
  test('19. should remove elements from an array with NaN values', () => {
    const array: number[] = [1, NaN, 3, NaN];
    const indices: number[] = [1, 3];
    const result: number[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 20: Removing elements from an array with mixed data types
  test('20. should remove elements from an array with mixed data types', () => {
    const array: (number | string | boolean | null | undefined)[] = [
      1,
      'two',
      true,
      null,
      undefined,
    ];
    const indices: number[] = [1, 3];
    const result: (number | string | boolean | null | undefined)[] =
      removeByIndex(array, indices);
    expect(result).toEqual([1, true, undefined]);
  });

  // Test case 21: Removing elements from an array with symbols and functions
  test('21. should remove elements from an array with symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (number | symbol | (() => void))[] = [1, sym1, 3, func1];
    const indices: number[] = [1, 3];
    const result: (number | symbol | (() => void))[] = removeByIndex(
      array,
      indices,
    );
    expect(result).toEqual([1, 3]);
  });

  // Test case 22: Removing elements from an array with dates and regular expressions
  test('22. should remove elements from an array with dates and regular expressions', () => {
    const date1: Date = new Date('2021-01-01');
    const regex1: RegExp = /abc/;
    const array: (number | Date | RegExp)[] = [1, date1, 3, regex1];
    const indices: number[] = [1, 3];
    const result: (number | Date | RegExp)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 23: Removing elements from an array with BigInt and Infinity values
  test('23. should remove elements from an array with BigInt and Infinity values', () => {
    const array: (number | bigint)[] = [1, BigInt(2), 3, Infinity];
    const indices: number[] = [1, 3];
    const result: (number | bigint)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 24: Removing elements from an array with NaN and undefined values
  test('24. should remove elements from an array with NaN and undefined values', () => {
    const array: (number | undefined)[] = [1, NaN, 3, undefined];
    const indices: number[] = [1, 3];
    const result: (number | undefined)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });

  // Test case 25: Removing elements from an array with null and boolean values
  test('25. should remove elements from an array with null and boolean values', () => {
    const array: (number | null | boolean)[] = [1, null, 3, true];
    const indices: number[] = [1, 3];
    const result: (number | null | boolean)[] = removeByIndex(array, indices);
    expect(result).toEqual([1, 3]);
  });
});
