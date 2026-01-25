import { shuffleArray } from '../src/shuffleArray';

// Helper function to check if two arrays are equal
const arraysEqual = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

describe('shuffleArray', () => {
  // Test case 1: Shuffling an array of numbers
  test('1. should shuffle an array of numbers', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    let result: number[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([1, 2, 3, 4, 5]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 2: Shuffling an array of strings
  test('2. should shuffle an array of strings', () => {
    const array: string[] = ['a', 'b', 'c', 'd', 'e'];
    let result: string[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 3: Shuffling an array of mixed types
  test('3. should shuffle an array of mixed types', () => {
    const array: (number | string | boolean)[] = [1, 'two', true, 4, 'five'];
    let result: (number | string | boolean)[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([1, 'two', true, 4, 'five']);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 4: Shuffling an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: never[] = [];
    const result: never[] = shuffleArray(array);
    expect(result).toEqual([]);
  });

  // Test case 5: Shuffling an array with one element
  test('5. should return the same array when the input array has one element', () => {
    const array: number[] = [1];
    const result: number[] = shuffleArray(array);
    expect(result).toEqual([1]);
  });

  // Test case 6: Shuffling an array of objects
  test('6. should shuffle an array of objects', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    let result: { id: number; name: string }[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 7: Shuffling an array of nested arrays
  test('7. should shuffle an array of nested arrays', () => {
    const array: number[][] = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    let result: number[][] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 8: Shuffling an array of boolean values
  test('8. should shuffle an array of boolean values', () => {
    const array: boolean[] = [true, false, true, false];
    let result: boolean[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([true, false, true, false]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 9: Shuffling an array of symbols
  test('9. should shuffle an array of symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const sym3: symbol = Symbol('sym3');
    const array: symbol[] = [sym1, sym2, sym3];
    let result: symbol[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([sym1, sym2, sym3]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 10: Shuffling an array of functions
  test('10. should shuffle an array of functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const func3: () => void = () => {};
    const array: (() => void)[] = [func1, func2, func3];
    let result: (() => void)[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([func1, func2, func3]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 11: Shuffling an array of dates
  test('11. should shuffle an array of dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const date3: Date = new Date('2023-01-01');
    const array: Date[] = [date1, date2, date3];
    let result: Date[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([date1, date2, date3]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 12: Shuffling an array of regular expressions
  test('12. should shuffle an array of regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const regex3: RegExp = /ghi/;
    const array: RegExp[] = [regex1, regex2, regex3];
    let result: RegExp[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([regex1, regex2, regex3]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 13: Shuffling an array of BigInt values
  test('13. should shuffle an array of BigInt values', () => {
    const array: bigint[] = [BigInt(1), BigInt(2), BigInt(3)];
    let result: bigint[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 14: Shuffling an array of Infinity and -Infinity
  test('14. should shuffle an array of Infinity and -Infinity', () => {
    const array: number[] = [Infinity, -Infinity, 1, 2, 3];
    let result: number[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([Infinity, -Infinity, 1, 2, 3]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 15: Shuffling an array of NaN values
  test('15. should shuffle an array of NaN values', () => {
    const array: number[] = [NaN, 1, 2, NaN, 3];
    const result = shuffleArray(array);

    // Verify the result has the same length
    expect(result).toHaveLength(array.length);

    // Count NaN values in both arrays
    const originalNaNCount = array.filter((x) => Number.isNaN(x)).length;
    const resultNaNCount = result.filter((x) => Number.isNaN(x)).length;
    expect(resultNaNCount).toBe(originalNaNCount);

    // Count non-NaN values and verify they match
    const originalNumbers = array.filter((x) => !Number.isNaN(x)).sort();
    const resultNumbers = result.filter((x) => !Number.isNaN(x)).sort();
    expect(resultNumbers).toEqual(originalNumbers);
  });

  // Test case 16: Shuffling an array of mixed data types
  test('16. should shuffle an array of mixed data types', () => {
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
    let result: (number | string | boolean | null | undefined)[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([
      0,
      'apple',
      null,
      undefined,
      false,
      '',
      'banana',
      3,
    ]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 17: Shuffling an array of symbols and functions
  test('17. should shuffle an array of symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (symbol | (() => void))[] = [sym1, func1, sym1, func1];
    let result: (symbol | (() => void))[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([sym1, func1, sym1, func1]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  // Test case 18: Shuffling an array of dates and regular expressions
  test('18. should shuffle an array of dates and regular expressions', () => {
    const date1: Date = new Date('2021-01-01');
    const regex1: RegExp = /abc/;
    const array: (Date | RegExp)[] = [date1, regex1, date1, regex1];
    let result: (Date | RegExp)[] = array;
    for (let i = 0; i < 5; i++) {
      result = shuffleArray(result);
      if (!arraysEqual(result, array)) break;
    }
    expect(result).not.toEqual([date1, regex1, date1, regex1]);
    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
  });
});
