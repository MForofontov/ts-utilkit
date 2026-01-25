import { findUniqueElements } from '../src/findUniqueElements';

describe('findUniqueElements', () => {
  // Test case 1: Normal array of numbers
  it('1. should return unique elements from a normal array of numbers', () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    expect(findUniqueElements(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  // Test case 2: Array containing duplicate numbers
  it('2. should return unique elements from an array containing duplicate numbers', () => {
    const arr: number[] = [1, 2, 2, 3, 4, 4, 5];
    expect(findUniqueElements(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  // Test case 3: Array containing negative numbers
  it('3. should return unique elements from an array containing negative numbers', () => {
    const arr: number[] = [-1, -2, -2, -3, -4, -4, -5];
    expect(findUniqueElements(arr)).toEqual([-1, -2, -3, -4, -5]);
  });

  // Test case 4: Array containing a mix of positive and negative numbers
  it('4. should return unique elements from an array containing a mix of positive and negative numbers', () => {
    const arr: number[] = [-1, 2, -3, 4, -5, 2, 4];
    expect(findUniqueElements(arr)).toEqual([-1, 2, -3, 4, -5]);
  });

  // Test case 5: Array containing a single element
  it('5. should return the single element from an array containing a single element', () => {
    const arr: number[] = [42];
    expect(findUniqueElements(arr)).toEqual([42]);
  });

  // Test case 6: Array containing all identical elements
  it('6. should return the single unique element from an array containing all identical elements', () => {
    const arr: number[] = [7, 7, 7, 7];
    expect(findUniqueElements(arr)).toEqual([7]);
  });

  // Test case 7: Empty array
  it('7. should return an empty array when the input array is empty', () => {
    const arr: number[] = [];
    expect(findUniqueElements(arr)).toEqual([]);
  });

  // Test case 8: Array containing floating-point numbers
  it('8. should return unique elements from an array containing floating-point numbers', () => {
    const arr: number[] = [1.1, 2.2, 2.2, 3.3, 4.4, 4.4, 5.5];
    expect(findUniqueElements(arr)).toEqual([1.1, 2.2, 3.3, 4.4, 5.5]);
  });

  // Test case 9: Array containing strings
  it('9. should return unique elements from an array containing strings', () => {
    const arr: string[] = ['a', 'b', 'b', 'c', 'd', 'd', 'e'];
    expect(findUniqueElements(arr)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  // Test case 10: Array containing a mix of numbers and strings
  it('10. should return unique elements from an array containing a mix of numbers and strings', () => {
    const arr: (number | string)[] = [1, 'a', 2, 'b', 1, 'a'];
    expect(findUniqueElements(arr)).toEqual([1, 'a', 2, 'b']);
  });

  // Test case 11: Array containing special characters
  it('11. should return unique elements from an array containing special characters', () => {
    const arr: string[] = ['@', '#', '#', '$', '%', '%', '&'];
    expect(findUniqueElements(arr)).toEqual(['@', '#', '$', '%', '&']);
  });

  // Test case 12: Array containing nested arrays
  it('12. should return unique elements from an array containing nested arrays', () => {
    const arr: number[][] = [
      [1, 2],
      [3, 4],
      [1, 2],
      [5, 6],
    ];
    expect(findUniqueElements(arr)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  // Test case 13: Array containing null and undefined
  it('13. should return unique elements from an array containing null and undefined', () => {
    const arr: (number | null | undefined)[] = [
      null,
      1,
      2,
      null,
      undefined,
      undefined,
    ];
    expect(findUniqueElements(arr)).toEqual([null, 1, 2, undefined]);
  });

  // Test case 14: Array containing NaN
  it('14. should return unique elements from an array containing NaN', () => {
    const arr: number[] = [NaN, 1, 2, NaN];
    expect(findUniqueElements(arr)).toEqual([NaN, 1, 2]);
  });

  // Test case 15: Array containing objects
  it('15. should return unique elements from an array containing objects', () => {
    const obj1: { a: number } = { a: 1 };
    const obj2: { b: number } = { b: 2 };
    const arr: object[] = [obj1, obj2, obj1];
    expect(findUniqueElements(arr)).toEqual([obj1, obj2]);
  });

  // Test case 16: Array containing functions
  it('16. should return unique elements from an array containing functions', () => {
    const func1: () => number = () => 1;
    const func2: () => number = () => 2;
    const arr: Array<() => number> = [func1, func2, func1];
    expect(findUniqueElements(arr)).toEqual([func1, func2]);
  });

  // Test case 17: Array containing symbols
  it('17. should return unique elements from an array containing symbols', () => {
    const sym1: symbol = Symbol('symbol1');
    const sym2: symbol = Symbol('symbol2');
    const arr: symbol[] = [sym1, sym2, sym1];
    expect(findUniqueElements(arr)).toEqual([sym1, sym2]);
  });

  // Test case 18: Array containing dates
  it('18. should return unique elements from an array containing dates', () => {
    const date1: Date = new Date(2020, 0, 1);
    const date2: Date = new Date(2021, 0, 1);
    const arr: Date[] = [date1, date2, date1];
    expect(findUniqueElements(arr)).toEqual([date1, date2]);
  });

  // Test case 19: Array containing regex
  it('19. should return unique elements from an array containing regex', () => {
    const regex1: RegExp = /abc/;
    const regex2: RegExp = /def/;
    const arr: RegExp[] = [regex1, regex2, regex1];
    expect(findUniqueElements(arr)).toEqual([regex1, regex2]);
  });

  // Test case 20: Large array
  it('20. should return unique elements from a large array', () => {
    const arr: number[] = Array.from({ length: 10000 }, (_, i) => i % 100);
    const expected: number[] = Array.from({ length: 100 }, (_, i) => i);
    expect(findUniqueElements(arr)).toEqual(expected);
  });
});
