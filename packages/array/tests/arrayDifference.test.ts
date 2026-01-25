import { arrayDifference } from '../src/arrayDifference';

describe('arrayDifference', () => {
  // Test case 1: Elements in the first array that are not in the second array
  it('1. should return elements in the first array that are not in the second array', () => {
    expect(arrayDifference([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2]);
    expect(arrayDifference(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a']);
  });

  // Test case 2: The first array if the second array is empty
  it('2. should return the first array if the second array is empty', () => {
    expect(arrayDifference([1, 2, 3, 4], [])).toEqual([1, 2, 3, 4]);
  });

  // Test case 3: An empty array if the first array is empty
  it('3. should return an empty array if the first array is empty', () => {
    expect(arrayDifference([], [1, 2, 3, 4])).toEqual([]);
  });

  // Test case 4: An empty array if both arrays are empty
  it('4. should return an empty array if both arrays are empty', () => {
    expect(arrayDifference([], [])).toEqual([]);
  });

  // Test case 5: Arrays with different types of elements
  it('5. should handle arrays with different types of elements', () => {
    expect(arrayDifference([1, 'a', true], [true, 2, 'b'])).toEqual([1, 'a']);
  });

  // Test case 6: Arrays with duplicate elements
  it('6. should handle arrays with duplicate elements', () => {
    expect(arrayDifference([1, 2, 2, 3], [2, 3, 3, 4])).toEqual([1]);
  });

  // Test case 7: Arrays with nested arrays
  it('7. should handle arrays with nested arrays', () => {
    expect(
      arrayDifference(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [3, 4],
          [5, 6],
        ],
      ),
    ).toEqual([[1, 2]]);
  });

  // Test case 8: Arrays with objects
  it('8. should handle arrays with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(arrayDifference([obj1, obj2], [obj2])).toEqual([obj1]);
  });

  // Test case 9: Arrays with null and undefined
  it('9. should handle arrays with null and undefined', () => {
    expect(arrayDifference([null, undefined, 1], [undefined, 2])).toEqual([
      null,
      1,
    ]);
  });

  // Test case 10: Arrays with NaN values
  it('10. should handle arrays with NaN values', () => {
    expect(arrayDifference([NaN, 1, 2], [NaN, 2, 3])).toEqual([1]);
  });

  // Test case 11: Large arrays
  it('11. should handle large arrays', () => {
    const largeArray1 = Array.from({ length: 1000 }, (_, i) => i);
    const largeArray2 = Array.from({ length: 500 }, (_, i) => i * 2);
    const expectedDifference = Array.from({ length: 500 }, (_, i) => i * 2 + 1);
    expect(arrayDifference(largeArray1, largeArray2)).toEqual(
      expectedDifference,
    );
  });

  // Test case 12: Arrays with special characters
  it('12. should handle arrays with special characters', () => {
    expect(arrayDifference(['@', '#', '$'], ['#', '%', '&'])).toEqual([
      '@',
      '$',
    ]);
  });

  // Test case 13: Arrays with mixed data types
  it('13. should handle arrays with mixed data types', () => {
    expect(
      arrayDifference([1, 'a', null, undefined], [null, 2, 'b', undefined]),
    ).toEqual([1, 'a']);
  });

  // Test case 14: Arrays with boolean values
  it('14. should handle arrays with boolean values', () => {
    expect(arrayDifference([true, false, true], [false])).toEqual([true, true]);
  });

  // Test case 15: Arrays with functions
  it('15. should handle arrays with functions', () => {
    const func1 = () => {};
    const func2 = () => {};
    expect(arrayDifference([func1, func2], [func2])).toEqual([func1]);
  });

  // Test case 16: Arrays with symbols
  it('16. should handle arrays with symbols', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    expect(arrayDifference([sym1, sym2], [sym2])).toEqual([sym1]);
  });

  // Test case 17: Arrays with dates
  it('17. should handle arrays with dates', () => {
    const date1 = new Date(2020, 1, 1);
    const date2 = new Date(2021, 1, 1);
    expect(arrayDifference([date1, date2], [date2])).toEqual([date1]);
  });

  // Test case 18: Arrays with regex
  it('18. should handle arrays with regex', () => {
    const regex1 = /a/;
    const regex2 = /b/;
    expect(arrayDifference([regex1, regex2], [regex2])).toEqual([regex1]);
  });
});
