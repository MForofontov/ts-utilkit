import { findMin } from '../src/findMin';

describe('findMin', () => {
  // Test case 1: Normal array of positive numbers
  it('1. should return the smallest value in a normal array of positive numbers', () => {
    const arr: number[] = [1, 2, 3, 4, 5];
    expect(findMin(arr)).toBe(1);
  });

  // Test case 2: Array containing negative numbers
  it('2. should return the smallest value in an array containing negative numbers', () => {
    const arr: number[] = [-1, -2, -3, -4, -5];
    expect(findMin(arr)).toBe(-5);
  });

  // Test case 3: Array containing a mix of positive and negative numbers
  it('3. should return the smallest value in an array containing a mix of positive and negative numbers', () => {
    const arr: number[] = [-1, 2, -3, 4, -5];
    expect(findMin(arr)).toBe(-5);
  });

  // Test case 4: Array containing a single element
  it('4. should return the value of the single element in an array containing a single element', () => {
    const arr: number[] = [42];
    expect(findMin(arr)).toBe(42);
  });

  // Test case 5: Array containing all identical elements
  it('5. should return the value of the identical elements in an array containing all identical elements', () => {
    const arr: number[] = [7, 7, 7, 7];
    expect(findMin(arr)).toBe(7);
  });

  // Test case 6: Empty array
  it('6. should return Infinity for an empty array', () => {
    const arr: number[] = [];
    expect(findMin(arr)).toBe(Infinity);
  });

  // Test case 7: Array containing floating-point numbers
  it('7. should return the smallest value in an array containing floating-point numbers', () => {
    const arr: number[] = [1.1, 2.2, 3.3, 4.4, 5.5];
    expect(findMin(arr)).toBe(1.1);
  });

  // Test case 8: Array containing NaN
  it('8. should return NaN if the array contains NaN', () => {
    const arr: number[] = [1, 2, NaN, 4, 5];
    expect(findMin(arr)).toBeNaN();
  });

  // Test case 9: Array containing Infinity and -Infinity
  it('9. should return -Infinity if the array contains Infinity and -Infinity', () => {
    const arr: number[] = [1, 2, Infinity, -Infinity, 5];
    expect(findMin(arr)).toBe(-Infinity);
  });

  // Test case 10: Large array
  it('10. should return the smallest value in a large array', () => {
    const arr: number[] = Array.from({ length: 10000 }, (_, i) => i);
    expect(findMin(arr)).toBe(0);
  });

  // Test case 11: Array containing zero
  it('11. should return the smallest value in an array containing zero', () => {
    const arr: number[] = [0, -1, -2, -3];
    expect(findMin(arr)).toBe(-3);
  });

  // Test case 12: Array containing very large numbers
  it('12. should return the smallest value in an array containing very large numbers', () => {
    const arr: number[] = [Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, 1e308];
    expect(findMin(arr)).toBe(Number.MAX_SAFE_INTEGER);
  });

  // Test case 13: Array containing very small numbers
  it('13. should return the smallest value in an array containing very small numbers', () => {
    const arr: number[] = [Number.MIN_SAFE_INTEGER, Number.MIN_VALUE, -1e308];
    expect(findMin(arr)).toBe(-1e308);
  });
});
