import { calculateGeometricMean } from '../src/statisticsFunctions/centralTendency/calculateGeometricMean';

describe('calculateGeometricMean', () => {
  // Test case 1: Geometric mean of positive numbers
  it('1. should calculate the geometric mean of positive numbers', () => {
    expect(calculateGeometricMean([1, 3, 9, 27])).toBeCloseTo(5.196, 3);
  });

  // Test case 2: Array containing zero or negative values
  it('2. should return NaN if the array contains non-positive values', () => {
    expect(calculateGeometricMean([1, 0, 2])).toBeNaN();
    expect(calculateGeometricMean([1, -2, 3])).toBeNaN();
  });

  // Test case 3: Empty array
  it('3. should return NaN for an empty array', () => {
    expect(calculateGeometricMean([])).toBeNaN();
  });
});
