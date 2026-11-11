import { calculateHarmonicMean } from '../src/statisticsFunctions/centralTendency/calculateHarmonicMean';

describe('calculateHarmonicMean', () => {
  // Test case 1: Harmonic mean of positive numbers
  it('1. should calculate the harmonic mean of positive numbers', () => {
    expect(calculateHarmonicMean([1, 2, 4])).toBeCloseTo(1.714, 3);
  });

  // Test case 2: Array containing zero
  it('2. should return NaN if the array contains zero', () => {
    expect(calculateHarmonicMean([1, 0, 2])).toBeNaN();
  });

  // Test case 3: Empty array
  it('3. should return NaN for an empty array', () => {
    expect(calculateHarmonicMean([])).toBeNaN();
  });

  // Test case 4: Negatives
  it('4. should return NaN if the array contains negatives', () => {
    expect(calculateHarmonicMean([1, -2, 4])).toBeNaN();
  });

  // Test case 5: Mixed signs
  it('5. should return NaN for mixed positive and negative values', () => {
    expect(calculateHarmonicMean([-1, 2, 3])).toBeNaN();
  });

  // Test case 6: Identical values
  it('6. should return the value itself when all elements are equal', () => {
    expect(calculateHarmonicMean([5, 5, 5])).toBeCloseTo(5);
  });
});
