import { calculateMedian } from '../src/statisticsFunctions/centralTendency/calculateMedian';

describe('calculateMedian', () => {
  // Test case 1: Normal array of positive numbers
  it('1. should calculate the median of an array of positive numbers', () => {
    expect(calculateMedian([1, 2, 3, 4, 5])).toBe(3);
  });

  // Test case 2: Array with a single number
  it('2. should return the number itself when the array has a single number', () => {
    expect(calculateMedian([5])).toBe(5);
  });

  // Test case 3: Empty array
  it('3. should return NaN for an empty array', () => {
    expect(calculateMedian([])).toBeNaN();
  });

  // Test case 4: Array with an even number of elements
  it('4. should calculate the median of an array with an even number of elements', () => {
    expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
  });

  // Test case 5: Array with negative numbers
  it('5. should calculate the median of an array with negative numbers', () => {
    expect(calculateMedian([-1, -2, -3, -4, -5])).toBe(-3);
  });

  // Test case 6: Array with both positive and negative numbers
  it('6. should calculate the median of an array with both positive and negative numbers', () => {
    expect(calculateMedian([-1, 2, -3, 4, -5])).toBe(-1);
  });

  // Test case 7: Array with floating-point numbers
  it('7. should calculate the median of an array with floating-point numbers', () => {
    expect(calculateMedian([1.5, 2.5, 3.5, 4.5, 5.5])).toBe(3.5);
  });

  // Test case 8: Array with a single zero
  it('8. should return zero when the array contains a single zero', () => {
    expect(calculateMedian([0])).toBe(0);
  });

  // Test case 9: Array with large numbers
  it('9. should calculate the median of an array with large numbers', () => {
    expect(calculateMedian([1000, 2000, 3000, 4000, 5000])).toBe(3000);
  });

  // Test case 10: Array with small numbers
  it('10. should calculate the median of an array with small numbers', () => {
    expect(calculateMedian([0.1, 0.2, 0.3, 0.4, 0.5])).toBe(0.3);
  });

  // Test case 11: Array with mixed positive and negative floating-point numbers
  it('11. should calculate the median of an array with mixed positive and negative floating-point numbers', () => {
    expect(calculateMedian([1.5, -2.5, 3.5, -4.5, 5.5])).toBe(1.5);
  });

  // Test case 12: Array with very small numbers
  it('12. should calculate the median of an array with very small numbers', () => {
    expect(calculateMedian([1e-10, 2e-10, 3e-10, 4e-10, 5e-10])).toBe(3e-10);
  });

  // Test case 13: Array with very large numbers
  it('13. should calculate the median of an array with very large numbers', () => {
    expect(calculateMedian([1e10, 2e10, 3e10, 4e10, 5e10])).toBe(3e10);
  });

  // Test case 14: Arrays with -Infinity values
  it('14. should handle arrays with -Infinity values', () => {
    expect(calculateMedian([-Infinity, -Infinity, 1, 1])).toBe(1);
  });

  // Test case 15: Arrays with mixed Infinity and finite numbers
  it('15. should handle arrays with mixed Infinity and finite numbers', () => {
    expect(calculateMedian([Infinity, Infinity, 1, 1])).toBe(1);
  });

  // Test case 16: Arrays with mixed positive, negative, and zero numbers
  it('16. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateMedian([1, -1, 0, 1, -1, 0])).toBe(0);
  });

  // Test case 17: Arrays with repeated numbers
  it('17. should calculate the median of an array with repeated numbers', () => {
    expect(calculateMedian([2, 2, 2, 2])).toBe(2);
  });

  // Test case 18: Arrays with alternating positive and negative numbers
  it('18. should calculate the median of an array with alternating positive and negative numbers', () => {
    expect(calculateMedian([1, -1, 1, -1])).toBe(0);
  });

  // Test case 19: Arrays with alternating positive and negative floating-point numbers
  it('19. should calculate the median of an array with alternating positive and negative floating-point numbers', () => {
    expect(calculateMedian([1.5, -1.5, 1.5, -1.5])).toBe(0);
  });

  // Test case 20: Arrays with a single negative number
  it('20. should return the negative number itself when the array has a single negative number', () => {
    expect(calculateMedian([-5])).toBe(-5);
  });

  // Test case 21: Arrays with mixed positive, negative, and zero numbers
  it('21. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateMedian([1, -1, 0, 1, -1, 0])).toBe(0);
  });
});
