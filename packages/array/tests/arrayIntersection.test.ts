import { arrayIntersection } from '../src/arrayIntersection';

describe('arrayIntersection', () => {
  // Test case 1: Elements that are present in both arrays
  it('1. should return elements that are present in both arrays', () => {
    expect(arrayIntersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    expect(arrayIntersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual([
      'b',
      'c',
    ]);
  });

  // Test case 2: No common elements
  it('2. should return an empty array if there are no common elements', () => {
    expect(arrayIntersection([1, 2, 3], [4, 5, 6])).toEqual([]);
  });

  // Test case 3: First array is empty
  it('3. should return an empty array if the first array is empty', () => {
    expect(arrayIntersection([], [1, 2, 3])).toEqual([]);
  });

  // Test case 4: Second array is empty
  it('4. should return an empty array if the second array is empty', () => {
    expect(arrayIntersection([1, 2, 3], [])).toEqual([]);
  });

  // Test case 5: Both arrays are empty
  it('5. should return an empty array if both arrays are empty', () => {
    expect(arrayIntersection([], [])).toEqual([]);
  });

  // Test case 6: Arrays with different types of elements
  it('6. should handle arrays with different types of elements', () => {
    expect(arrayIntersection([1, 'a', true], [true, 2, 'a'])).toEqual([
      'a',
      true,
    ]);
  });

  // Test case 7: Arrays containing special characters
  it('7. should handle arrays containing special characters', () => {
    const arr1: string[] = ['@', '#', '$'];
    const arr2: string[] = ['$', '%', '&'];
    expect(arrayIntersection(arr1, arr2)).toEqual(['$']);
  });

  // Test case 8: Arrays containing nested arrays
  it('8. should handle arrays containing nested arrays', () => {
    const arr1: number[][] = [
      [1, 2],
      [3, 4],
    ];
    const arr2: number[][] = [
      [3, 4],
      [5, 6],
    ];
    expect(arrayIntersection(arr1, arr2)).toEqual([[3, 4]]);
  });

  // Test case 9: Arrays containing null and undefined
  it('9. should handle arrays containing null and undefined', () => {
    const arr1: (number | null | undefined)[] = [null, 1, 2];
    const arr2: (number | null | undefined)[] = [null, 2, 3];
    expect(arrayIntersection(arr1, arr2)).toEqual([null, 2]);
  });

  // Test case 10: Arrays containing NaN
  it('10. should handle arrays containing NaN', () => {
    const arr1: number[] = [NaN, 1, 2];
    const arr2: number[] = [NaN, 2, 3];
    expect(arrayIntersection(arr1, arr2)).toEqual([NaN, 2]);
  });

  // Test case 11: Arrays containing objects
  it('11. should handle arrays containing objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const arr1: object[] = [obj1, obj2];
    const arr2: object[] = [obj2, { c: 3 }];
    expect(arrayIntersection(arr1, arr2)).toEqual([obj2]);
  });

  // Test case 12: Arrays containing functions
  it('12. should handle arrays containing functions', () => {
    const func1 = () => {};
    const func2 = () => {};
    expect(arrayIntersection([func1, func2], [func2])).toEqual([func2]);
  });

  // Test case 13: Arrays containing symbols
  it('13. should handle arrays containing symbols', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    expect(arrayIntersection([sym1, sym2], [sym2])).toEqual([sym2]);
  });

  // Test case 14: Arrays containing dates
  it('14. should handle arrays containing dates', () => {
    const date1 = new Date(2020, 1, 1);
    const date2 = new Date(2021, 1, 1);
    expect(arrayIntersection([date1, date2], [date2])).toEqual([date2]);
  });

  // Test case 15: Arrays containing regex
  it('15. should handle arrays containing regex', () => {
    const regex1 = /a/;
    const regex2 = /b/;
    expect(arrayIntersection([regex1, regex2], [regex2])).toEqual([regex2]);
  });

  // Test case 16: Large arrays
  it('16. should handle large arrays', () => {
    const arr1: number[] = Array.from({ length: 10000 }, (_, i) => i);
    const arr2: number[] = Array.from({ length: 10000 }, (_, i) => i + 5000);
    const expected: number[] = Array.from({ length: 5000 }, (_, i) => i + 5000);
    expect(arrayIntersection(arr1, arr2)).toEqual(expected);
  });
});
