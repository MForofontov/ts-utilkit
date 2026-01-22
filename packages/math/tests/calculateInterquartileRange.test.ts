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
});
