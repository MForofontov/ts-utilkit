import { calculateStandardDeviation } from '../src/statisticsFunctions/dispersion/calculateStandardDeviation';

describe('calculateStandardDeviation', () => {
  // Test case 1: Standard deviation of an array of positive numbers
  it('1. should return the standard deviation of an array of positive numbers', () => {
    expect(calculateStandardDeviation([1, 2, 3, 4, 5])).toBeCloseTo(1.414);
    expect(calculateStandardDeviation([10, 20, 30, 40, 50])).toBeCloseTo(
      14.142,
    );
  });

  // Test case 2: Standard deviation of an array of negative numbers
  it('2. should return the standard deviation of an array of negative numbers', () => {
    expect(calculateStandardDeviation([-1, -2, -3, -4, -5])).toBeCloseTo(1.414);
    expect(calculateStandardDeviation([-10, -20, -30, -40, -50])).toBeCloseTo(
      14.142,
    );
  });

  // Test case 3: Standard deviation of an array of mixed positive and negative numbers
  it('3. should return the standard deviation of an array of mixed positive and negative numbers', () => {
    expect(calculateStandardDeviation([-1, 0, 1, 2, 3])).toBeCloseTo(1.414);
    expect(calculateStandardDeviation([-10, 0, 10, 20, 30])).toBeCloseTo(
      14.142,
    );
  });

  // Test case 4: Standard deviation of an array with a single element
  it('4. should return 0 for an array with a single element', () => {
    expect(calculateStandardDeviation([5])).toBe(0);
    expect(calculateStandardDeviation([-5])).toBe(0);
  });

  // Test case 5: Standard deviation of an empty array
  it('5. should return NaN for an empty array', () => {
    expect(calculateStandardDeviation([])).toBeNaN();
  });

  // Test case 6: Standard deviation of an array with zero
  it('6. should handle arrays with zero', () => {
    expect(calculateStandardDeviation([0, 0, 0])).toBe(0);
    expect(calculateStandardDeviation([0, 1, 2, 3])).toBeCloseTo(1.118);
  });

  // Test case 7: Standard deviation of an array with floating point numbers
  it('7. should handle arrays with floating point numbers', () => {
    expect(calculateStandardDeviation([1.5, 2.5, 3.5])).toBeCloseTo(0.817);
    expect(calculateStandardDeviation([-1.5, -2.5, -3.5])).toBeCloseTo(0.817);
  });

  // Test case 8: Standard deviation of an array with large numbers
  it('8. should handle arrays with large numbers', () => {
    expect(
      calculateStandardDeviation([1000000000, 2000000000, 3000000000]),
    ).toBeCloseTo(816496580.927);
    expect(
      calculateStandardDeviation([-1000000000, -2000000000, -3000000000]),
    ).toBeCloseTo(816496580.927);
  });

  // Test case 9: Standard deviation of an array with very small numbers
  it('9. should handle arrays with very small numbers', () => {
    expect(
      calculateStandardDeviation([0.0000001, 0.0000002, 0.0000003]),
    ).toBeCloseTo(0.0000001);
    expect(
      calculateStandardDeviation([-0.0000001, -0.0000002, -0.0000003]),
    ).toBeCloseTo(0.0000001);
  });

  // Test case 10: Standard deviation of an array with mixed integers and floating point numbers
  it('10. should handle arrays with mixed integers and floating point numbers', () => {
    expect(calculateStandardDeviation([1, 2.5, 3])).toBeCloseTo(0.85);
    expect(calculateStandardDeviation([-1, -2.5, -3])).toBeCloseTo(0.85);
  });

  // Test case 11: Standard deviation of an array with repeated numbers
  it('11. should handle arrays with repeated numbers', () => {
    expect(calculateStandardDeviation([5, 5, 5])).toBe(0);
    expect(calculateStandardDeviation([-5, -5, -5])).toBe(0);
  });

  // Test case 12: Standard deviation of an array with NaN values
  it('12. should handle arrays with NaN values', () => {
    expect(calculateStandardDeviation([NaN, 1, 2])).toBeNaN();
    expect(calculateStandardDeviation([1, NaN, 2])).toBeNaN();
  });

  // Test case 13: Standard deviation of an array with Infinity values
  it('13. should handle arrays with Infinity values', () => {
    expect(calculateStandardDeviation([Infinity, 1, 2])).toBeNaN();
    expect(calculateStandardDeviation([1, Infinity, 2])).toBeNaN();
  });

  // Test case 14: Standard deviation of an array with -Infinity values
  it('14. should handle arrays with -Infinity values', () => {
    expect(calculateStandardDeviation([-Infinity, 1, 2])).toBeNaN();
    expect(calculateStandardDeviation([1, -Infinity, 2])).toBeNaN();
  });

  // Test case 15: Standard deviation of an array with mixed Infinity and finite numbers
  it('15. should handle arrays with mixed Infinity and finite numbers', () => {
    expect(calculateStandardDeviation([Infinity, 1, 2])).toBeNaN();
    expect(calculateStandardDeviation([-Infinity, 1, 2])).toBeNaN();
  });

  // Test case 16: Standard deviation of an array with mixed NaN and finite numbers
  it('16. should handle arrays with mixed NaN and finite numbers', () => {
    expect(calculateStandardDeviation([NaN, 1, 2])).toBeNaN();
    expect(calculateStandardDeviation([1, NaN, 2])).toBeNaN();
  });

  // Test case 17: Standard deviation of an array with mixed NaN and Infinity values
  it('17. should handle arrays with mixed NaN and Infinity values', () => {
    expect(calculateStandardDeviation([NaN, Infinity, -Infinity])).toBeNaN();
    expect(calculateStandardDeviation([Infinity, NaN, -Infinity])).toBeNaN();
  });

  // Test case 18: Standard deviation of an array with very large and very small numbers
  it('18. should handle arrays with very large and very small numbers', () => {
    expect(calculateStandardDeviation([1e10, 1e-10])).toBeCloseTo(5e9);
    expect(calculateStandardDeviation([-1e10, -1e-10])).toBeCloseTo(5e9);
  });

  // Test case 19: Standard deviation of an array with mixed positive, negative, and zero numbers
  it('19. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateStandardDeviation([1, -1, 0])).toBeCloseTo(0.816);
    expect(calculateStandardDeviation([-1, 0, 1])).toBeCloseTo(0.816);
  });
});
