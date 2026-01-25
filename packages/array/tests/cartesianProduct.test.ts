import { cartesianProduct } from '../src/cartesianProduct';

describe('cartesianProduct', () => {
  // Test case 1: Cartesian product of two arrays with numbers
  it('1. should return the Cartesian product of two arrays with numbers', () => {
    expect(cartesianProduct([1, 2], [3, 4])).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);
  });

  // Test case 2: Cartesian product of two arrays with strings
  it('2. should return the Cartesian product of two arrays with strings', () => {
    expect(cartesianProduct(['a', 'b'], ['c', 'd'])).toEqual([
      ['a', 'c'],
      ['a', 'd'],
      ['b', 'c'],
      ['b', 'd'],
    ]);
  });

  // Test case 3: Cartesian product of three arrays
  it('3. should return the Cartesian product of three arrays', () => {
    expect(cartesianProduct([1, 2], ['a', 'b'], [true, false])).toEqual([
      [1, 'a', true],
      [1, 'a', false],
      [1, 'b', true],
      [1, 'b', false],
      [2, 'a', true],
      [2, 'a', false],
      [2, 'b', true],
      [2, 'b', false],
    ]);
  });

  // Test case 4: Cartesian product with an empty array
  it('4. should return an empty array if one of the arrays is empty', () => {
    expect(cartesianProduct([1, 2], [])).toEqual([]);
  });

  // Test case 5: Cartesian product with all empty arrays
  it('5. should return an empty array if all arrays are empty', () => {
    expect(cartesianProduct([], [])).toEqual([]);
  });

  // Test case 6: Cartesian product with arrays of different types
  it('6. should return the Cartesian product of arrays with different types', () => {
    expect(cartesianProduct([1, 'a'], [true, null])).toEqual([
      [1, true],
      [1, null],
      ['a', true],
      ['a', null],
    ]);
  });

  // Test case 7: Cartesian product with nested arrays
  it('7. should return the Cartesian product of arrays with nested arrays', () => {
    expect(cartesianProduct([[1, 2]], [[3, 4]])).toEqual([
      [
        [1, 2],
        [3, 4],
      ],
    ]);
  });

  // Test case 8: Cartesian product with arrays containing objects
  it('8. should return the Cartesian product of arrays with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(cartesianProduct([obj1], [obj2])).toEqual([[obj1, obj2]]);
  });

  // Test case 9: Cartesian product with arrays containing null and undefined
  it('9. should return the Cartesian product of arrays with null and undefined', () => {
    expect(cartesianProduct([null], [undefined])).toEqual([[null, undefined]]);
  });

  // Test case 10: Cartesian product with arrays containing NaN values
  it('10. should return the Cartesian product of arrays with NaN values', () => {
    expect(cartesianProduct([NaN], [1])).toEqual([[NaN, 1]]);
  });

  // Test case 11: Cartesian product with large arrays
  it('11. should handle large arrays', () => {
    const largeArray1 = Array.from({ length: 100 }, (_, i) => i);
    const largeArray2 = Array.from({ length: 50 }, (_, i) => i * 2);
    const result = cartesianProduct(largeArray1, largeArray2);
    expect(result.length).toBe(5000);
  });

  // Test case 12: Cartesian product with arrays containing special characters
  it('12. should return the Cartesian product of arrays with special characters', () => {
    expect(cartesianProduct(['@', '#'], ['$'])).toEqual([
      ['@', '$'],
      ['#', '$'],
    ]);
  });

  // Test case 13: Cartesian product with arrays containing mixed data types
  it('13. should return the Cartesian product of arrays with mixed data types', () => {
    expect(cartesianProduct([1, 'a'], [null, undefined])).toEqual([
      [1, null],
      [1, undefined],
      ['a', null],
      ['a', undefined],
    ]);
  });

  // Test case 14: Cartesian product with arrays containing boolean values
  it('14. should return the Cartesian product of arrays with boolean values', () => {
    expect(cartesianProduct([true, false], [false])).toEqual([
      [true, false],
      [false, false],
    ]);
  });

  // Test case 15: Cartesian product with arrays containing functions
  it('15. should return the Cartesian product of arrays with functions', () => {
    const func1 = () => {};
    const func2 = () => {};
    expect(cartesianProduct([func1], [func2])).toEqual([[func1, func2]]);
  });

  // Test case 16: Cartesian product with arrays containing symbols
  it('16. should return the Cartesian product of arrays with symbols', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    expect(cartesianProduct([sym1], [sym2])).toEqual([[sym1, sym2]]);
  });

  // Test case 17: Cartesian product with arrays containing dates
  it('17. should return the Cartesian product of arrays with dates', () => {
    const date1 = new Date(2020, 1, 1);
    const date2 = new Date(2021, 1, 1);
    expect(cartesianProduct([date1], [date2])).toEqual([[date1, date2]]);
  });

  // Test case 18: Cartesian product with arrays containing regex
  it('18. should return the Cartesian product of arrays with regex', () => {
    const regex1 = /a/;
    const regex2 = /b/;
    expect(cartesianProduct([regex1], [regex2])).toEqual([[regex1, regex2]]);
  });
});
