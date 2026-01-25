import { removeFalsyValues } from '../src/removeFalsyValues';

describe('removeFalsyValues', () => {
  // Test case 1: Removing falsy values from an array of numbers
  test('1. should remove falsy values from an array of numbers', () => {
    const array: (number | null | undefined | boolean | string)[] = [
      0,
      1,
      2,
      null,
      undefined,
      false,
      '',
      3,
    ];
    const result: number[] = removeFalsyValues(array);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 2: Removing falsy values from an array of strings
  test('2. should remove falsy values from an array of strings', () => {
    const array: (string | null | undefined | boolean | number)[] = [
      '',
      'apple',
      'banana',
      null,
      undefined,
      false,
      0,
      'cherry',
    ];
    const result: string[] = removeFalsyValues(array);
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  // Test case 3: Removing falsy values from an array of mixed types
  test('3. should remove falsy values from an array of mixed types', () => {
    const array: (number | string | null | undefined | boolean)[] = [
      0,
      'apple',
      null,
      undefined,
      false,
      '',
      'banana',
      3,
    ];
    const result: (number | string)[] = removeFalsyValues(array);
    expect(result).toEqual(['apple', 'banana', 3]);
  });

  // Test case 4: Removing falsy values from an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: [] = [];
    const result = removeFalsyValues(array);
    expect(result).toEqual([]);
  });

  // Test case 5: Removing falsy values from an array with no falsy values
  test('5. should return the original array when there are no falsy values', () => {
    const array: (number | string | boolean)[] = [1, 'apple', true];
    const result: (number | string | boolean)[] = removeFalsyValues(array);
    expect(result).toEqual([1, 'apple', true]);
  });

  // Test case 6: Removing falsy values from an array with objects
  test('6. should remove falsy values from an array with objects', () => {
    const array: ({ id: number; name: string } | null | undefined | boolean)[] =
      [
        { id: 1, name: 'Alice' },
        null,
        undefined,
        false,
        { id: 2, name: 'Bob' },
      ];
    const result: { id: number; name: string }[] = removeFalsyValues(array);
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  // Test case 7: Removing falsy values from an array with null values
  test('7. should remove falsy values from an array with null values', () => {
    const array: (number | null)[] = [1, null, 2, null, 3];
    const result: number[] = removeFalsyValues(array);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 8: Removing falsy values from an array with undefined values
  test('8. should remove falsy values from an array with undefined values', () => {
    const array: (number | undefined)[] = [1, undefined, 2, undefined, 3];
    const result: number[] = removeFalsyValues(array);
    expect(result).toEqual([1, 2, 3]);
  });

  // Test case 9: Removing falsy values from an array with boolean values
  test('9. should remove falsy values from an array with boolean values', () => {
    const array: (number | boolean)[] = [1, false, 2, true, 3];
    const result: (number | boolean)[] = removeFalsyValues(array);
    expect(result).toEqual([1, 2, true, 3]);
  });

  // Test case 10: Removing falsy values from an array with symbols
  test('10. should remove falsy values from an array with symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const array: (number | symbol | null | undefined | boolean)[] = [
      1,
      sym1,
      null,
      undefined,
      false,
      sym2,
      3,
    ];
    const result: (number | symbol)[] = removeFalsyValues(array);
    expect(result).toEqual([1, sym1, sym2, 3]);
  });

  // Test case 11: Removing falsy values from an array with functions
  test('11. should remove falsy values from an array with functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const array: (number | (() => void) | null | undefined | boolean)[] = [
      1,
      func1,
      null,
      undefined,
      false,
      func2,
      3,
    ];
    const result: (number | (() => void))[] = removeFalsyValues(array);
    expect(result).toEqual([1, func1, func2, 3]);
  });

  // Test case 12: Removing falsy values from an array with dates
  test('12. should remove falsy values from an array with dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const array: (number | Date | null | undefined | boolean)[] = [
      1,
      date1,
      null,
      undefined,
      false,
      date2,
      3,
    ];
    const result: (number | Date)[] = removeFalsyValues(array);
    expect(result).toEqual([1, date1, date2, 3]);
  });

  // Test case 13: Removing falsy values from an array with regular expressions
  test('13. should remove falsy values from an array with regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const array: (number | RegExp | null | undefined | boolean)[] = [
      1,
      regex1,
      null,
      undefined,
      false,
      regex2,
      3,
    ];
    const result: (number | RegExp)[] = removeFalsyValues(array);
    expect(result).toEqual([1, regex1, regex2, 3]);
  });

  // Test case 14: Removing falsy values from an array with BigInt values
  test('14. should remove falsy values from an array with BigInt values', () => {
    const array: (number | bigint | null | undefined | boolean)[] = [
      1,
      BigInt(2),
      null,
      undefined,
      false,
      BigInt(3),
      3,
    ];
    const result: (number | bigint)[] = removeFalsyValues(array);
    expect(result).toEqual([1, BigInt(2), BigInt(3), 3]);
  });

  // Test case 15: Removing falsy values from an array with Infinity and -Infinity
  test('15. should remove falsy values from an array with Infinity and -Infinity', () => {
    const array: (number | null | undefined | boolean)[] = [
      1,
      Infinity,
      null,
      undefined,
      false,
      -Infinity,
      3,
    ];
    const result: number[] = removeFalsyValues(array);
    expect(result).toEqual([1, Infinity, -Infinity, 3]);
  });

  // Test case 16: Removing falsy values from an array with NaN values
  test('16. should remove falsy values from an array with NaN values', () => {
    const array: (number | null | undefined | boolean)[] = [
      1,
      NaN,
      null,
      undefined,
      false,
      NaN,
      3,
    ];
    const result: number[] = removeFalsyValues(array);
    expect(result).toEqual([1, 3]);
  });

  // Test case 17: Removing falsy values from an array with mixed data types
  test('17. should remove falsy values from an array with mixed data types', () => {
    const array: (number | string | boolean | null | undefined)[] = [
      0,
      'apple',
      null,
      undefined,
      false,
      '',
      'banana',
      3,
    ];
    const result: (number | string)[] = removeFalsyValues(array);
    expect(result).toEqual(['apple', 'banana', 3]);
  });

  // Test case 18: Removing falsy values from an array with symbols and functions
  test('18. should remove falsy values from an array with symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (
      | number
      | symbol
      | (() => void)
      | null
      | undefined
      | boolean
    )[] = [1, sym1, null, undefined, false, func1, 3];
    const result: (number | symbol | (() => void))[] = removeFalsyValues(array);
    expect(result).toEqual([1, sym1, func1, 3]);
  });

  // Test case 19: Removing falsy values from an array with dates and regular expressions
  test('19. should remove falsy values from an array with dates and regular expressions', () => {
    const date1: Date = new Date('2021-01-01');
    const regex1: RegExp = /abc/;
    const array: (number | Date | RegExp | null | undefined | boolean)[] = [
      1,
      date1,
      null,
      undefined,
      false,
      regex1,
      3,
    ];
    const result: (number | Date | RegExp)[] = removeFalsyValues(array);
    expect(result).toEqual([1, date1, regex1, 3]);
  });

  // Test case 20: Removing falsy values from an array with BigInt and Infinity values
  test('20. should remove falsy values from an array with BigInt and Infinity values', () => {
    const array: (number | bigint | null | undefined | boolean)[] = [
      1,
      BigInt(2),
      null,
      undefined,
      false,
      Infinity,
      3,
    ];
    const result: (number | bigint)[] = removeFalsyValues(array);
    expect(result).toEqual([1, BigInt(2), Infinity, 3]);
  });

  // Test case 21: Removing falsy values from an array with NaN and undefined values
  test('21. should remove falsy values from an array with NaN and undefined values', () => {
    const array: (number | null | undefined | boolean)[] = [
      1,
      NaN,
      null,
      undefined,
      false,
      NaN,
      3,
    ];
    const result: number[] = removeFalsyValues(array);
    expect(result).toEqual([1, 3]);
  });

  // Test case 22: Removing falsy values from an array with null and boolean values
  test('22. should remove falsy values from an array with null and boolean values', () => {
    const array: (number | null | boolean)[] = [1, null, 1, true, null];
    const result: (number | boolean)[] = removeFalsyValues(array);
    expect(result).toEqual([1, 1, true]);
  });

  // Test case 23: Removing falsy values from an array with mixed data types and symbols
  test('23. should remove falsy values from an array with mixed data types and symbols', () => {
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
    const result: (number | string | symbol)[] = removeFalsyValues(array);
    expect(result).toEqual([1, 'two', true, sym1, 'two', 1]);
  });

  // Test case 24: Removing falsy values from an array with mixed data types and functions
  test('24. should remove falsy values from an array with mixed data types and functions', () => {
    const func1: () => void = () => {};
    const array: (
      | number
      | string
      | boolean
      | null
      | undefined
      | (() => void)
    )[] = [1, 'two', true, null, undefined, func1, 'two', 1];
    const result: (number | string | (() => void))[] = removeFalsyValues(array);
    expect(result).toEqual([1, 'two', true, func1, 'two', 1]);
  });
});
