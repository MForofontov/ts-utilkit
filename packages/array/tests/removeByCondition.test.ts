import { removeByCondition } from '../src/removeByCondition';

describe('removeByCondition', () => {
  // Test case 1: Removing elements from an array of numbers
  test('1. should remove elements from an array of numbers', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const condition: (value: number) => boolean = (value) => value > 3;
    const result: number[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 2: Removing elements from an array of strings
  test('2. should remove elements from an array of strings', () => {
    const array: string[] = ['apple', 'banana', 'cherry', 'date'];
    const condition: (value: string) => boolean = (value) =>
      value.startsWith('b');
    const result: string[] = removeByCondition(array, condition);
    expect(result).toEqual(['apple', 'cherry', 'date']);
  });

  // Test case 3: Removing elements from an array of objects
  test('3. should remove elements from an array of objects', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const condition: (value: { id: number; name: string }) => boolean = (
      value,
    ) => value.id === 2;
    const result: { id: number; name: string }[] = removeByCondition(
      array,
      condition,
    );
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  // Test case 4: Removing elements from an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: number[] = [];
    const condition: (value: number) => boolean = (value) => value > 3;
    const result: number[] = removeByCondition(array, condition);
    expect(result).toEqual([]);
  });

  // Test case 5: Removing elements with a condition that matches no elements
  test('5. should return the original array when no elements match the condition', () => {
    const array: number[] = [1, 2, 3];
    const condition: (value: number) => boolean = (value) => value > 3;
    const result: number[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 6: Removing elements with a condition that matches all elements
  test('6. should return an empty array when all elements match the condition', () => {
    const array: number[] = [1, 2, 3];
    const condition: (value: number) => boolean = (value) => value > 0;
    const result: number[] = removeByCondition(array, condition);
    expect(result).toEqual([]);
  });

  // Test case 7: Removing elements from an array with mixed types
  test('7. should remove elements from an array with mixed types', () => {
    const array: (number | string)[] = [1, 'two', 3, 'four'];
    const condition: (value: number | string) => boolean = (value) =>
      typeof value === 'string';
    const result: (number | string)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 8: Removing elements from an array with nested arrays
  test('8. should remove elements from an array with nested arrays', () => {
    const array: (number[] | string[])[] = [
      [1, 2],
      ['three', 'four'],
      [5, 6],
    ];
    const condition: (value: number[] | string[]) => boolean = (value) =>
      Array.isArray(value) && value.length === 2;
    const result: (number[] | string[])[] = removeByCondition(array, condition);
    expect(result).toEqual([]);
  });

  // Test case 9: Removing elements from an array with null values
  test('9. should remove elements from an array with null values', () => {
    const array: (number | null)[] = [1, null, 3, null];
    const condition: (value: number | null) => boolean = (value) =>
      value === null;
    const result: (number | null)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 10: Removing elements from an array with undefined values
  test('10. should remove elements from an array with undefined values', () => {
    const array: (number | undefined)[] = [1, undefined, 3, undefined];
    const condition: (value: number | undefined) => boolean = (value) =>
      value === undefined;
    const result: (number | undefined)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 11: Removing elements from an array with boolean values
  test('11. should remove elements from an array with boolean values', () => {
    const array: (number | boolean)[] = [1, true, 3, false];
    const condition: (value: number | boolean) => boolean = (value) =>
      typeof value === 'boolean';
    const result: (number | boolean)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 12: Removing elements from an array with symbols
  test('12. should remove elements from an array with symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const array: (number | symbol)[] = [1, sym1, 3, sym2];
    const condition: (value: number | symbol) => boolean = (value) =>
      typeof value === 'symbol';
    const result: (number | symbol)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 13: Removing elements from an array with functions
  test('13. should remove elements from an array with functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const array: (number | (() => void))[] = [1, func1, 3, func2];
    const condition: (value: number | (() => void)) => boolean = (value) =>
      typeof value === 'function';
    const result: (number | (() => void))[] = removeByCondition(
      array,
      condition,
    );
    expect(result).toEqual([1, 3]);
  });

  // Test case 14: Removing elements from an array with dates
  test('14. should remove elements from an array with dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const array: (number | Date)[] = [1, date1, 3, date2];
    const condition: (value: number | Date) => boolean = (value) =>
      value instanceof Date;
    const result: (number | Date)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 15: Removing elements from an array with regular expressions
  test('15. should remove elements from an array with regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const array: (number | RegExp)[] = [1, regex1, 3, regex2];
    const condition: (value: number | RegExp) => boolean = (value) =>
      value instanceof RegExp;
    const result: (number | RegExp)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 16: Removing elements from an array with BigInt values
  test('16. should remove elements from an array with BigInt values', () => {
    const array: (number | bigint)[] = [1, BigInt(2), 3, BigInt(4)];
    const condition: (value: number | bigint) => boolean = (value) =>
      typeof value === 'bigint';
    const result: (number | bigint)[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 17: Removing elements from an array with Infinity and -Infinity
  test('17. should remove elements from an array with Infinity and -Infinity', () => {
    const array: number[] = [1, Infinity, 3, -Infinity];
    const condition: (value: number) => boolean = (value) => !isFinite(value);
    const result: number[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 18: Removing elements from an array with NaN values
  test('18. should remove elements from an array with NaN values', () => {
    const array: number[] = [1, NaN, 3, NaN];
    const condition: (value: number) => boolean = (value) => isNaN(value);
    const result: number[] = removeByCondition(array, condition);
    expect(result).toEqual([1, 3]);
  });

  // Test case 19: Removing elements from an array with mixed data types
  test('19. should remove elements from an array with mixed data types', () => {
    const array: (number | string | boolean | null | undefined)[] = [
      1,
      'two',
      true,
      null,
      undefined,
    ];
    const condition: (
      value: number | string | boolean | null | undefined,
    ) => boolean = (value) => typeof value === 'string';
    const result: (number | string | boolean | null | undefined)[] =
      removeByCondition(array, condition);
    expect(result).toEqual([1, true, null, undefined]);
  });

  // Test case 20: Removing elements from an array with symbols and functions
  test('20. should remove elements from an array with symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (number | symbol | (() => void))[] = [1, sym1, 3, func1];
    const condition: (value: number | symbol | (() => void)) => boolean = (
      value,
    ) => typeof value === 'symbol' || typeof value === 'function';
    const result: (number | symbol | (() => void))[] = removeByCondition(
      array,
      condition,
    );
    expect(result).toEqual([1, 3]);
  });
});
