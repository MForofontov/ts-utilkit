import { zipMultiple } from '../src/zipMultiple';

describe('zipMultiple', () => {
  // Test case 1: Zipping arrays of equal length
  test('1. should zip arrays of equal length', () => {
    const names: string[] = ['Alice', 'Bob', 'Charlie'];
    const ages: number[] = [25, 30, 35];
    const cities: string[] = ['New York', 'Los Angeles', 'Chicago'];
    const result: [string, number, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
      ['Charlie', 35, 'Chicago'],
    ]);
  });

  // Test case 2: Zipping arrays of different lengths
  test('2. should zip arrays of different lengths', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: number[] = [25, 30, 35];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, number, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      ['Bob', 30, 'Los Angeles'],
    ]);
  });

  // Test case 3: Zipping arrays with one empty array
  test('3. should return an empty array when one of the input arrays is empty', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: number[] = [];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, number, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([]);
  });

  // Test case 4: Zipping arrays with all empty arrays
  test('4. should return an empty array when all input arrays are empty', () => {
    const names: string[] = [];
    const ages: number[] = [];
    const cities: string[] = [];
    const result: [string, number, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([]);
  });

  // Test case 5: Zipping with no input arrays
  test('5. should return an empty array when called with no input arrays', () => {
    const result = zipMultiple();
    expect(result).toEqual([]);
  });

  // Test case 6: Zipping arrays with mixed types
  test('6. should zip arrays with mixed types', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: (number | string)[] = [25, 'thirty'];
    const cities: (string | boolean)[] = ['New York', true];
    const result: [string, number | string, string | boolean][] = zipMultiple(
      names,
      ages,
      cities,
    );
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      ['Bob', 'thirty', true],
    ]);
  });

  // Test case 7: Zipping arrays with nested arrays
  test('7. should zip arrays with nested arrays', () => {
    const names: string[][] = [['Alice'], ['Bob']];
    const ages: number[][] = [[25], [30]];
    const cities: string[][] = [['New York'], ['Los Angeles']];
    const result: [string[], number[], string[]][] = zipMultiple(
      names,
      ages,
      cities,
    );
    expect(result).toEqual([
      [['Alice'], [25], ['New York']],
      [['Bob'], [30], ['Los Angeles']],
    ]);
  });

  // Test case 8: Zipping arrays with boolean values
  test('8. should zip arrays with boolean values', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: boolean[] = [true, false];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, boolean, string][] = zipMultiple(
      names,
      ages,
      cities,
    );
    expect(result).toEqual([
      ['Alice', true, 'New York'],
      ['Bob', false, 'Los Angeles'],
    ]);
  });

  // Test case 9: Zipping arrays with symbols
  test('9. should zip arrays with symbols', () => {
    const sym1: symbol = Symbol('sym1');
    const sym2: symbol = Symbol('sym2');
    const names: string[] = ['Alice', 'Bob'];
    const ages: symbol[] = [sym1, sym2];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, symbol, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', sym1, 'New York'],
      ['Bob', sym2, 'Los Angeles'],
    ]);
  });

  // Test case 10: Zipping arrays with functions
  test('10. should zip arrays with functions', () => {
    const func1: () => void = () => {};
    const func2: () => void = () => {};
    const names: string[] = ['Alice', 'Bob'];
    const ages: (() => void)[] = [func1, func2];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, () => void, string][] = zipMultiple(
      names,
      ages,
      cities,
    );
    expect(result).toEqual([
      ['Alice', func1, 'New York'],
      ['Bob', func2, 'Los Angeles'],
    ]);
  });

  // Test case 11: Zipping arrays with dates
  test('11. should zip arrays with dates', () => {
    const date1: Date = new Date('2021-01-01');
    const date2: Date = new Date('2022-01-01');
    const names: string[] = ['Alice', 'Bob'];
    const ages: Date[] = [date1, date2];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, Date, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', date1, 'New York'],
      ['Bob', date2, 'Los Angeles'],
    ]);
  });

  // Test case 12: Zipping arrays with regular expressions
  test('12. should zip arrays with regular expressions', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const names: string[] = ['Alice', 'Bob'];
    const ages: RegExp[] = [regex1, regex2];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, RegExp, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', regex1, 'New York'],
      ['Bob', regex2, 'Los Angeles'],
    ]);
  });

  // Test case 13: Zipping arrays with BigInt values
  test('13. should zip arrays with BigInt values', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: bigint[] = [BigInt(25), BigInt(30)];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, bigint, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', BigInt(25), 'New York'],
      ['Bob', BigInt(30), 'Los Angeles'],
    ]);
  });

  // Test case 14: Zipping arrays with Infinity and -Infinity
  test('14. should zip arrays with Infinity and -Infinity', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: number[] = [Infinity, -Infinity];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, number, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', Infinity, 'New York'],
      ['Bob', -Infinity, 'Los Angeles'],
    ]);
  });

  // Test case 15: Zipping arrays with NaN values
  test('15. should zip arrays with NaN values', () => {
    const names: string[] = ['Alice', 'Bob'];
    const ages: number[] = [NaN, 30];
    const cities: string[] = ['New York', 'Los Angeles'];
    const result: [string, number, string][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', NaN, 'New York'],
      ['Bob', 30, 'Los Angeles'],
    ]);
  });

  // Test case 16: Zipping arrays with mixed data types
  test('16. should zip arrays with mixed data types', () => {
    const names: (string | number)[] = ['Alice', 42];
    const ages: (number | string)[] = [25, 'thirty'];
    const cities: (string | boolean)[] = ['New York', true];
    const result: [string | number, number | string, string | boolean][] =
      zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      [42, 'thirty', true],
    ]);
  });

  // Test case 17: Zipping arrays with symbols and functions
  test('17. should zip arrays with symbols and functions', () => {
    const sym1: symbol = Symbol('sym1');
    const func1: () => void = () => {};
    const names: (symbol | (() => void))[] = [sym1, func1];
    const ages: (symbol | (() => void))[] = [sym1, func1];
    const cities: (symbol | (() => void))[] = [sym1, func1];
    const result: [
      symbol | (() => void),
      symbol | (() => void),
      symbol | (() => void),
    ][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      [sym1, sym1, sym1],
      [func1, func1, func1],
    ]);
  });

  // Test case 18: Zipping arrays with dates and regular expressions
  test('18. should zip arrays with dates and regular expressions', () => {
    const date1: Date = new Date('2021-01-01');
    const regex1: RegExp = /abc/;
    const names: (Date | RegExp)[] = [date1, regex1];
    const ages: (Date | RegExp)[] = [date1, regex1];
    const cities: (Date | RegExp)[] = [date1, regex1];
    const result: [Date | RegExp, Date | RegExp, Date | RegExp][] = zipMultiple(
      names,
      ages,
      cities,
    );
    expect(result).toEqual([
      [date1, date1, date1],
      [regex1, regex1, regex1],
    ]);
  });

  // Test case 19: Zipping arrays with null values
  test('19. should zip arrays with null values', () => {
    const names: (string | null)[] = ['Alice', null];
    const ages: (number | null)[] = [25, null];
    const cities: (string | null)[] = ['New York', null];
    const result: [string | null, number | null, string | null][] = zipMultiple(
      names,
      ages,
      cities,
    );
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      [null, null, null],
    ]);
  });

  // Test case 20: Zipping arrays with undefined values
  test('20. should zip arrays with undefined values', () => {
    const names: (string | undefined)[] = ['Alice', undefined];
    const ages: (number | undefined)[] = [25, undefined];
    const cities: (string | undefined)[] = ['New York', undefined];
    const result: [
      string | undefined,
      number | undefined,
      string | undefined,
    ][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      [undefined, undefined, undefined],
    ]);
  });

  // Test case 21: Zipping arrays with mixed null and undefined values
  test('21. should zip arrays with mixed null and undefined values', () => {
    const names: (string | null | undefined)[] = ['Alice', null, undefined];
    const ages: (number | null | undefined)[] = [25, null, undefined];
    const cities: (string | null | undefined)[] = ['New York', null, undefined];
    const result: [
      string | null | undefined,
      number | null | undefined,
      string | null | undefined,
    ][] = zipMultiple(names, ages, cities);
    expect(result).toEqual([
      ['Alice', 25, 'New York'],
      [null, null, null],
      [undefined, undefined, undefined],
    ]);
  });

  test('21. should return an empty array when called without input arrays', () => {
    const result = zipMultiple();
    expect(result).toEqual([]);
  });
});
