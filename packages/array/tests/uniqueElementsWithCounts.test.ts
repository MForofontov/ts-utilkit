import { uniqueElementsWithCounts } from '../src/uniqueElementsWithCounts';

describe('uniqueElementsWithCounts', () => {
  // Test case 1: Unique elements with counts in an array of numbers
  test('1. should return unique elements with counts in an array of numbers', () => {
    const array: number[] = [1, 2, 2, 3, 3, 3];
    const result: { element: number; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: 1, count: 1 },
      { element: 2, count: 2 },
      { element: 3, count: 3 },
    ]);
  });

  // Test case 2: Unique elements with counts in an array of strings
  test('2. should return unique elements with counts in an array of strings', () => {
    const array: string[] = ['a', 'b', 'b', 'c', 'c', 'c'];
    const result: { element: string; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: 'a', count: 1 },
      { element: 'b', count: 2 },
      { element: 'c', count: 3 },
    ]);
  });

  // Test case 3: Unique elements with counts in an array of mixed types
  test('3. should return unique elements with counts in an array of mixed types', () => {
    const array: (number | string | boolean)[] = [
      1,
      'two',
      true,
      1,
      'two',
      true,
      1,
    ];
    const result: { element: number | string | boolean; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: 1, count: 3 },
      { element: 'two', count: 2 },
      { element: true, count: 2 },
    ]);
  });

  // Test case 4: Unique elements with counts in an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: [] = [];
    const result = uniqueElementsWithCounts(array);
    expect(result).toEqual([]);
  });

  // Test case 5: Unique elements with counts in an array with one element
  test('5. should return the same array when the input array has one element', () => {
    const array: number[] = [1];
    const result: { element: number; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([{ element: 1, count: 1 }]);
  });

  // Test case 6: Unique elements with counts in an array of objects
  test('6. should return unique elements with counts in an array of objects', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ];
    const result: { element: { id: number; name: string }; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: { id: 1, name: 'Alice' }, count: 2 },
      { element: { id: 2, name: 'Bob' }, count: 1 },
    ]);
  });

  // Test case 7: Unique elements with counts in an array of nested arrays
  test('7. should return unique elements with counts in an array of nested arrays', () => {
    const array: number[][] = [
      [1, 2],
      [3, 4],
      [1, 2],
    ];
    const result: { element: number[]; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: [1, 2], count: 2 },
      { element: [3, 4], count: 1 },
    ]);
  });

  // Test case 8: Unique elements with counts in an array of boolean values
  test('8. should return unique elements with counts in an array of boolean values', () => {
    const array: boolean[] = [true, false, true, false, true];
    const result: { element: boolean; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: true, count: 3 },
      { element: false, count: 2 },
    ]);
  });

  // Test case 9: Unique elements with counts in an array of symbols
  test('9. should return unique elements with counts in an array of symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const array: symbol[] = [sym1, sym2, sym1];
    const result: { element: symbol; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: sym1, count: 2 },
      { element: sym2, count: 1 },
    ]);
  });

  // Test case 10: Unique elements with counts in an array of functions
  test('10. should return unique elements with counts in an array of functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const array: (() => void)[] = [func1, func2, func1];
    const result: { element: () => void; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: func1, count: 2 },
      { element: func2, count: 1 },
    ]);
  });

  // Test case 11: Unique elements with counts in an array of dates
  test('11. should return unique elements with counts in an array of dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const array: Date[] = [date1, date2, date1];
    const result: { element: Date; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: date1, count: 2 },
      { element: date2, count: 1 },
    ]);
  });

  // Test case 12: Unique elements with counts in an array of regular expressions
  test('12. should return unique elements with counts in an array of regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const array: RegExp[] = [regex1, regex2, regex1];
    const result: { element: RegExp; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: regex1, count: 2 },
      { element: regex2, count: 1 },
    ]);
  });

  // Test case 13: Unique elements with counts in an array of BigInt values
  test('13. should return unique elements with counts in an array of BigInt values', () => {
    const array: bigint[] = [BigInt(1), BigInt(2), BigInt(1)];
    const result: { element: bigint; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: BigInt(1), count: 2 },
      { element: BigInt(2), count: 1 },
    ]);
  });

  // Test case 14: Unique elements with counts in an array of Infinity and -Infinity
  test('14. should return unique elements with counts in an array of Infinity and -Infinity', () => {
    const array: number[] = [Infinity, -Infinity, Infinity];
    const result: { element: number; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: Infinity, count: 2 },
      { element: -Infinity, count: 1 },
    ]);
  });

  // Test case 15: Unique elements with counts in an array of NaN values
  test('15. should return unique elements with counts in an array of NaN values', () => {
    const array: number[] = [NaN, 1, NaN, 2];
    const result: { element: number; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: NaN, count: 2 },
      { element: 1, count: 1 },
      { element: 2, count: 1 },
    ]);
  });

  // Test case 16: Unique elements with counts in an array of mixed data types
  test('16. should return unique elements with counts in an array of mixed data types', () => {
    const array: (number | string | boolean | null | undefined)[] = [
      0,
      'apple',
      null,
      undefined,
      false,
      '',
      'banana',
      3,
      0,
      'apple',
    ];
    const result: {
      element: number | string | boolean | null | undefined;
      count: number;
    }[] = uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: 0, count: 2 },
      { element: 'apple', count: 2 },
      { element: null, count: 1 },
      { element: undefined, count: 1 },
      { element: false, count: 1 },
      { element: '', count: 1 },
      { element: 'banana', count: 1 },
      { element: 3, count: 1 },
    ]);
  });

  // Test case 17: Unique elements with counts in an array of symbols and functions
  test('17. should return unique elements with counts in an array of symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (symbol | (() => void))[] = [sym1, func1, sym1, func1];
    const result: { element: symbol | (() => void); count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: sym1, count: 2 },
      { element: func1, count: 2 },
    ]);
  });

  // Test case 18: Unique elements with counts in an array of dates and regular expressions
  test('18. should return unique elements with counts in an array of dates and regular expressions', () => {
    const date1: Date = new Date('2021-01-01T00:00:00.000Z');
    const regex1: RegExp = /abcdf/;
    const array: (Date | RegExp)[] = [date1, regex1, date1, regex1];
    const result: { element: Date | RegExp; count: number }[] =
      uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: date1, count: 2 },
      { element: regex1, count: 2 },
    ]);
  });

  // Test case 19: Mix of primitive and object elements
  test('19. should handle mixed primitive and object elements preserving order', () => {
    const first = { id: 1 };
    const array = [1, first, 1, { id: 1 }, 2];
    const result = uniqueElementsWithCounts(array);
    expect(result).toEqual([
      { element: 1, count: 2 },
      { element: first, count: 2 },
      { element: 2, count: 1 },
    ]);
    expect(result[1].element).toBe(first);
  });

  // Test case 20: same object instance counted correctly
  test('20. should keep first object reference for equal objects', () => {
    const obj = { a: 1 };
    const array = [obj, { a: 1 }, obj];
    const result = uniqueElementsWithCounts(array);
    expect(result).toEqual([{ element: obj, count: 3 }]);
    expect(result[0].element).toBe(obj);
  });
});
