import { removeDuplicates } from '../src/removeDuplicates';

describe('removeDuplicates', () => {
  // Test case 1: Removing duplicates from an array of numbers
  test('1. should remove duplicates from an array of numbers', () => {
    const array: number[] = [1, 2, 2, 3, 4, 4];
    const result: number[] = removeDuplicates(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  // Test case 2: Removing duplicates from an array of strings
  test('2. should remove duplicates from an array of strings', () => {
    const array: string[] = ['apple', 'banana', 'apple', 'cherry'];
    const result: string[] = removeDuplicates(array);
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  // Test case 3: Removing duplicates from an array of objects
  test('3. should remove duplicates from an array of objects', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ];
    const result: { id: number; name: string }[] = removeDuplicates(array);
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  // Test case 4: Removing duplicates from an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: number[] = [];
    const result: number[] = removeDuplicates(array);
    expect(result).toEqual([]);
  });

  // Test case 5: Removing duplicates from an array with no duplicates
  test('5. should return the original array when there are no duplicates', () => {
    const array: number[] = [1, 2, 3, 4];
    const result: number[] = removeDuplicates(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  // Test case 6: Removing duplicates from an array with mixed types
  test('6. should remove duplicates from an array with mixed types', () => {
    const array: (number | string)[] = [1, 'two', 1, 'two', 3];
    const result: (number | string)[] = removeDuplicates(array);
    expect(result).toEqual([1, 'two', 3]);
  });

  // Test case 7: Removing duplicates from an array with nested arrays
  test('7. should remove duplicates from an array with nested arrays', () => {
    const array: (number[] | string[])[] = [
      [1, 2],
      [1, 2],
      ['three', 'four'],
    ];
    const result: (number[] | string[])[] = removeDuplicates(array);
    expect(result).toEqual([
      [1, 2],
      ['three', 'four'],
    ]);
  });

  // Test case 8: Removing duplicates from an array with null values
  test('8. should remove duplicates from an array with null values', () => {
    const array: (number | null)[] = [1, null, 1, null, 3];
    const result: (number | null)[] = removeDuplicates(array);
    expect(result).toEqual([1, null, 3]);
  });

  // Test case 9: Removing duplicates from an array with undefined values
  test('9. should remove duplicates from an array with undefined values', () => {
    const array: (number | undefined)[] = [1, undefined, 1, undefined, 3];
    const result: (number | undefined)[] = removeDuplicates(array);
    expect(result).toEqual([1, undefined, 3]);
  });

  // Test case 10: Removing duplicates from an array with boolean values
  test('10. should remove duplicates from an array with boolean values', () => {
    const array: (number | boolean)[] = [1, true, 1, true, 3];
    const result: (number | boolean)[] = removeDuplicates(array);
    expect(result).toEqual([1, true, 3]);
  });

  // Test case 11: Removing duplicates from an array with symbols
  test('11. should remove duplicates from an array with symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const array: (number | symbol)[] = [1, sym1, 1, sym2, sym1];
    const result: (number | symbol)[] = removeDuplicates(array);
    expect(result).toEqual([1, sym1, sym2]);
  });

  // Test case 12: Removing duplicates from an array with functions
  test('12. should remove duplicates from an array with functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const array: (number | (() => void))[] = [1, func1, 1, func2, func1];
    const result: (number | (() => void))[] = removeDuplicates(array);
    expect(result).toEqual([1, func1, func2]);
  });

  // Test case 13: Removing duplicates from an array with dates
  test('13. should remove duplicates from an array with dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const array: (number | Date)[] = [1, date1, 1, date2, date1];
    const result: (number | Date)[] = removeDuplicates(array);
    expect(result).toEqual([1, date1, date2]);
  });

  // Test case 14: Removing duplicates from an array with regular expressions
  test('14. should remove duplicates from an array with regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const array: (number | RegExp)[] = [1, regex1, 1, regex2, regex1];
    const result: (number | RegExp)[] = removeDuplicates(array);
    expect(result).toEqual([1, regex1, regex2]);
  });

  // Test case 15: Removing duplicates from an array with BigInt values
  test('15. should remove duplicates from an array with BigInt values', () => {
    const array: (number | bigint)[] = [1, BigInt(2), 1, BigInt(2), 3];
    const result: (number | bigint)[] = removeDuplicates(array);
    expect(result).toEqual([1, BigInt(2), 3]);
  });

  // Test case 16: Removing duplicates from an array with Infinity and -Infinity
  test('16. should remove duplicates from an array with Infinity and -Infinity', () => {
    const array: number[] = [1, Infinity, 1, -Infinity, Infinity];
    const result: number[] = removeDuplicates(array);
    expect(result).toEqual([1, Infinity, -Infinity]);
  });

  // Test case 17: Removing duplicates from an array with NaN values
  test('17. should remove duplicates from an array with NaN values', () => {
    const array: number[] = [1, NaN, 1, NaN, 3];
    const result: number[] = removeDuplicates(array);
    expect(result).toEqual([1, NaN, 3]);
  });

  // Test case 18: Removing duplicates from an array with mixed data types
  test('18. should remove duplicates from an array with mixed data types', () => {
    const array: (number | string | boolean | null | undefined)[] = [
      1,
      'two',
      true,
      null,
      undefined,
      'two',
      1,
    ];
    const result: (number | string | boolean | null | undefined)[] =
      removeDuplicates(array);
    expect(result).toEqual([1, 'two', true, null, undefined]);
  });

  // Test case 19: Removing duplicates from an array with symbols and functions
  test('19. should remove duplicates from an array with symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (number | symbol | (() => void))[] = [1, sym1, 1, func1, sym1];
    const result: (number | symbol | (() => void))[] = removeDuplicates(array);
    expect(result).toEqual([1, sym1, func1]);
  });

  // Test case 20: Removing duplicates from an array with dates and regular expressions
  test('20. should remove duplicates from an array with dates and regular expressions', () => {
    const date1: Date = new Date('2021-01-01T00:00:00.000Z');
    const regex1: RegExp = /abc/;
    const array: (number | Date | RegExp)[] = [1, date1, 1, regex1, date1];
    const result: (number | Date | RegExp)[] = removeDuplicates(array);
    expect(result).toEqual([1, date1, regex1]);
  });

  // Test case 21: Removing duplicates from an array with BigInt and Infinity values
  test('21. should remove duplicates from an array with BigInt and Infinity values', () => {
    const array: (number | bigint)[] = [1, BigInt(2), 1, Infinity, BigInt(2)];
    const result: (number | bigint)[] = removeDuplicates(array);
    expect(result).toEqual([1, BigInt(2), Infinity]);
  });

  // Test case 22: Removing duplicates from an array with NaN and undefined values
  test('22. should remove duplicates from an array with NaN and undefined values', () => {
    const array: (number | undefined)[] = [1, NaN, 1, undefined, NaN];
    const result: (number | undefined)[] = removeDuplicates(array);
    expect(result).toEqual([1, NaN, undefined]);
  });

  // Test case 23: Removing duplicates from an array with null and boolean values
  test('23. should remove duplicates from an array with null and boolean values', () => {
    const array: (number | null | boolean)[] = [1, null, 1, true, null];
    const result: (number | null | boolean)[] = removeDuplicates(array);
    expect(result).toEqual([1, null, true]);
  });

  // Test case 24: Removing duplicates from an array with mixed data types and symbols
  test('24. should remove duplicates from an array with mixed data types and symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const array: (number | string | boolean | null | undefined | symbol)[] = [
      1,
      'two',
      true,
      null,
      undefined,
      sym1,
      'two',
      1,
    ];
    const result: (number | string | boolean | null | undefined | symbol)[] =
      removeDuplicates(array);
    expect(result).toEqual([1, 'two', true, null, undefined, sym1]);
  });

  // Test case 25: Removing duplicates from an array with mixed data types and functions
  test('25. should remove duplicates from an array with mixed data types and functions', () => {
    const func1: () => void = () => {};
    const array: (
      | number
      | string
      | boolean
      | null
      | undefined
      | (() => void)
    )[] = [1, 'two', true, null, undefined, func1, 'two', 1];
    const result: (
      | number
      | string
      | boolean
      | null
      | undefined
      | (() => void)
    )[] = removeDuplicates(array);
    expect(result).toEqual([1, 'two', true, null, undefined, func1]);
  });
});
