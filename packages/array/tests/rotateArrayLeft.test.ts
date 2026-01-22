import { rotateArrayLeft } from '../src/rotateArrayLeft';

describe('rotateArrayLeft', () => {
  // Test case 1: Rotating an array of numbers by 1 position
  test('1. should rotate an array of numbers by 1 position', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const positions: number = 1;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([2, 3, 4, 5, 1]);
  });

  // Test case 2: Rotating an array of numbers by 3 positions
  test('2. should rotate an array of numbers by 3 positions', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const positions: number = 3;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([4, 5, 1, 2, 3]);
  });

  // Test case 3: Rotating an array of strings by 2 positions
  test('3. should rotate an array of strings by 2 positions', () => {
    const array: string[] = ['a', 'b', 'c', 'd', 'e'];
    const positions: number = 2;
    const result: string[] = rotateArrayLeft(array, positions);
    expect(result).toEqual(['c', 'd', 'e', 'a', 'b']);
  });

  // Test case 4: Rotating an empty array
  test('4. should return an empty array when the input array is empty', () => {
    const array: [] = [];
    const positions: number = 3;
    const result = rotateArrayLeft(array, positions);
    expect(result).toEqual([]);
  });

  // Test case 5: Rotating an array by 0 positions
  test('5. should return the original array when rotating by 0 positions', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const positions: number = 0;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  // Test case 6: Rotating an array to the left by a negative number of positions
  test('6. should rotate an array to the right by the absolute value of the negative number of positions', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const positions: number = -2;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([4, 5, 1, 2, 3]);
  });

  // Test case 7: Rotating an array by a number of positions greater than the array length
  test('7. should rotate an array by a number of positions greater than the array length', () => {
    const array: number[] = [1, 2, 3, 4, 5];
    const positions: number = 7;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([3, 4, 5, 1, 2]);
  });

  // Test case 8: Rotating an array of mixed types by 2 positions
  test('8. should rotate an array of mixed types by 2 positions', () => {
    const array: (number | string | boolean)[] = [1, 'two', true, 4, 'five'];
    const positions: number = 2;
    const result: (number | string | boolean)[] = rotateArrayLeft(
      array,
      positions,
    );
    expect(result).toEqual([true, 4, 'five', 1, 'two']);
  });

  // Test case 9: Rotating an array of objects by 1 position
  test('9. should rotate an array of objects by 1 position', () => {
    const array: { id: number; name: string }[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const positions: number = 1;
    const result: { id: number; name: string }[] = rotateArrayLeft(
      array,
      positions,
    );
    expect(result).toEqual([
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
    ]);
  });

  // Test case 10: Rotating an array of nested arrays by 3 positions
  test('10. should rotate an array of nested arrays by 3 positions', () => {
    const array: number[][] = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ];
    const positions: number = 3;
    const result: number[][] = rotateArrayLeft(array, positions);
    expect(result).toEqual([
      [7, 8],
      [9, 10],
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  // Test case 11: Rotating an array of boolean values by 2 positions
  test('11. should rotate an array of boolean values by 2 positions', () => {
    const array: boolean[] = [true, false, true, false, true];
    const positions: number = 2;
    const result: boolean[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([true, false, true, true, false]);
  });

  // Test case 12: Rotating an array of symbols by 1 position
  test('12. should rotate an array of symbols by 1 position', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const sym3: symbol = Symbol('sym3');
    const array: symbol[] = [sym1, sym2, sym3];
    const positions: number = 1;
    const result: symbol[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([sym2, sym3, sym1]);
  });

  // Test case 13: Rotating an array of functions by 2 positions
  test('13. should rotate an array of functions by 2 positions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const func3: () => void = () => {};
    const array: (() => void)[] = [func1, func2, func3];
    const positions: number = 2;
    const result: (() => void)[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([func3, func1, func2]);
  });

  // Test case 14: Rotating an array of dates by 3 positions
  test('14. should rotate an array of dates by 3 positions', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const date3: Date = new Date('2023-01-01');
    const array: Date[] = [date1, date2, date3];
    const positions: number = 3;
    const result: Date[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([date1, date2, date3]);
  });

  // Test case 15: Rotating an array of regular expressions by 1 position
  test('15. should rotate an array of regular expressions by 1 position', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const regex3: RegExp = /ghi/;
    const array: RegExp[] = [regex1, regex2, regex3];
    const positions: number = 1;
    const result: RegExp[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([regex2, regex3, regex1]);
  });

  // Test case 16: Rotating an array of BigInt values by 2 positions
  test('16. should rotate an array of BigInt values by 2 positions', () => {
    const array: bigint[] = [
      BigInt(1),
      BigInt(2),
      BigInt(3),
      BigInt(4),
      BigInt(5),
    ];
    const positions: number = 2;
    const result: bigint[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([
      BigInt(3),
      BigInt(4),
      BigInt(5),
      BigInt(1),
      BigInt(2),
    ]);
  });

  // Test case 17: Rotating an array of Infinity and -Infinity by 1 position
  test('17. should rotate an array of Infinity and -Infinity by 1 position', () => {
    const array: number[] = [Infinity, -Infinity, 1, 2, 3];
    const positions: number = 1;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([-Infinity, 1, 2, 3, Infinity]);
  });

  // Test case 18: Rotating an array of NaN values by 2 positions
  test('18. should rotate an array of NaN values by 2 positions', () => {
    const array: number[] = [NaN, 1, 2, NaN, 3];
    const positions: number = 2;
    const result: number[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([2, NaN, 3, NaN, 1]);
  });

  // Test case 19: Rotating an array of mixed data types by 3 positions
  test('19. should rotate an array of mixed data types by 3 positions', () => {
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
    const positions: number = 3;
    const result: (number | string | boolean | null | undefined)[] =
      rotateArrayLeft(array, positions);
    expect(result).toEqual([
      undefined,
      false,
      '',
      'banana',
      3,
      0,
      'apple',
      null,
    ]);
  });

  // Test case 20: Rotating an array of symbols and functions by 2 positions
  test('20. should rotate an array of symbols and functions by 2 positions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const array: (symbol | (() => void))[] = [sym1, func1, sym1, func1];
    const positions: number = 2;
    const result: (symbol | (() => void))[] = rotateArrayLeft(array, positions);
    expect(result).toEqual([sym1, func1, sym1, func1]);
  });
});
