import { calculateInterquartileRange } from '../src/statisticsFunctions/dispersion/calculateInterquartileRange';

describe('calculateInterquartileRange', () => {
  // Test case 1: IQR of an array with odd number of elements
  it('1. should calculate the IQR for an array with an odd number of elements', () => {
    expect(calculateInterquartileRange([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(5);
  });

  // Test case 2: IQR of an array with even number of elements
  it('2. should calculate the IQR for an array with an even number of elements', () => {
    expect(calculateInterquartileRange([1, 2, 3, 4, 5, 6, 7, 8])).toBe(4);
  });

  // Test case 3: Empty array
  it('3. should return NaN for an empty array', () => {
    expect(calculateInterquartileRange([])).toBeNaN();
  });

  // Test case 4: Unsorted input
  it('4. should handle unsorted input', () => {
    expect(calculateInterquartileRange([9, 1, 5, 3, 7, 2, 8, 4, 6])).toBe(5);
  });

  // Test case 5: Small arrays
  it('5. should handle arrays with fewer than 4 elements', () => {
    expect(calculateInterquartileRange([1])).toBeNaN();
    expect(calculateInterquartileRange([1, 2])).toBe(1);
    expect(calculateInterquartileRange([1, 2, 3])).toBe(2);
  });

  // Test case 6: Duplicates
  it('6. should return 0 when all values are identical', () => {
    expect(calculateInterquartileRange([5, 5, 5, 5])).toBe(0);
  });
});
