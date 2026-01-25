import { calculateVariance } from '../src/statisticsFunctions/dispersion/calculateVariance';

describe('calculateVariance', () => {
  // Test case 1: Normal array of positive numbers
  it('1. should calculate the variance of an array of positive numbers', () => {
    expect(calculateVariance([1, 2, 3, 4, 5])).toBeCloseTo(2.0);
  });

  // Test case 2: Array with a single number
  it('2. should return 0 when the array has a single number', () => {
    expect(calculateVariance([5])).toBeCloseTo(0.0);
  });

  // Test case 3: Empty array
  it('3. should return NaN for an empty array', () => {
    expect(calculateVariance([])).toBeNaN();
  });

  // Test case 4: Array with negative numbers
  it('4. should calculate the variance of an array with negative numbers', () => {
    expect(calculateVariance([-1, -2, -3, -4, -5])).toBeCloseTo(2.0);
  });

  // Test case 5: Array with positive and negative numbers
  it('5. should calculate the variance of an array with positive and negative numbers', () => {
    expect(calculateVariance([-1, 0, 1, 2, 3])).toBeCloseTo(2.0);
  });

  // Test case 6: Array with zero
  it('6. should return 0 when the array contains only zero', () => {
    expect(calculateVariance([0])).toBeCloseTo(0.0);
  });

  // Test case 7: Array with floating-point numbers
  it('7. should calculate the variance of an array with floating-point numbers', () => {
    expect(calculateVariance([1.5, 2.5, 3.5])).toBeCloseTo(0.6667, 4);
  });

  // Test case 8: Array with large numbers
  it('8. should calculate the variance of an array with large numbers', () => {
    expect(calculateVariance([1000, 2000, 3000])).toBeCloseTo(666666.6667, 4);
  });

  // Test case 9: Array with small numbers
  it('9. should calculate the variance of an array with small numbers', () => {
    expect(calculateVariance([0.1, 0.2, 0.3])).toBeCloseTo(0.0067, 4);
  });

  // Test case 10: Variance of an array with mixed integers and floating point numbers
  it('10. should handle arrays with mixed integers and floating point numbers', () => {
    expect(calculateVariance([1, 2.5, 3])).toBeCloseTo(0.7222, 4);
    expect(calculateVariance([-1, -2.5, -3])).toBeCloseTo(0.7222, 4);
  });

  // Test case 11: Array with very small numbers
  it('11. should calculate the variance of an array with very small numbers', () => {
    expect(calculateVariance([1e-10, 2e-10, 3e-10])).toBeCloseTo(6.6666e-21, 4);
  });

  // Test case 12: Array with very large numbers
  it('12. should calculate the variance of an array with very large numbers', () => {
    expect(calculateVariance([1e10, 2e10, 3e10])).toBeCloseTo(
      66666666666666660000,
      4,
    );
  });

  // Test case 13: Array with mixed integers and floating-point numbers
  it('13. should calculate the variance of an array with mixed integers and floating-point numbers', () => {
    expect(calculateVariance([1, 2.5, 3])).toBeCloseTo(0.7222, 4);
  });

  // Test case 14: Array with repeated numbers
  it('14. should return 0 when the array contains repeated numbers', () => {
    expect(calculateVariance([2, 2, 2, 2])).toBeCloseTo(0.0);
  });

  // Test case 15: Array with alternating positive and negative numbers
  it('15. should calculate the variance of an array with alternating positive and negative numbers', () => {
    expect(calculateVariance([1, -1, 1, -1])).toBeCloseTo(1.0);
  });

  // Test case 16: Array with alternating positive and negative floating-point numbers
  it('16. should calculate the variance of an array with alternating positive and negative floating-point numbers', () => {
    expect(calculateVariance([1.5, -1.5, 1.5, -1.5])).toBeCloseTo(2.25);
  });

  // Test case 17: Array with a single negative number
  it('17. should return 0 when the array has a single negative number', () => {
    expect(calculateVariance([-5])).toBeCloseTo(0.0);
  });

  // Test case 18: Array with mixed positive, negative, and zero numbers
  it('18. should calculate the variance of an array with mixed positive, negative, and zero numbers', () => {
    expect(calculateVariance([1, -1, 0])).toBeCloseTo(0.6667);
  });

  // Test case 19: Array with Infinity values
  it('19. should return NaN for an array with Infinity values', () => {
    expect(calculateVariance([1, Infinity, -Infinity])).toBeNaN();
  });

  // Test case 20: Array with -Infinity values
  it('20. should return NaN for an array with -Infinity values', () => {
    expect(calculateVariance([-Infinity, -Infinity, 1, 1])).toBeNaN();
  });
});
