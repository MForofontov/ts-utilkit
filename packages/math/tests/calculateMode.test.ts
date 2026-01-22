import { calculateMode } from '../src/statisticsFunctions/centralTendency/calculateMode';

describe('calculateMode', () => {
  // Test case 1: Normal array of positive numbers
  it('1. should calculate the mode of an array of positive numbers', () => {
    expect(calculateMode([1, 2, 2, 3, 4])).toEqual([2]);
  });

  // Test case 2: Array with a single number
  it('2. should return the number itself when the array has a single number', () => {
    expect(calculateMode([5])).toEqual([5]);
  });

  // Test case 3: Empty array
  it('3. should return an empty array for an empty array', () => {
    expect(calculateMode([])).toEqual([]);
  });

  // Test case 4: Array with multiple modes
  it('4. should return all modes when there are multiple modes', () => {
    expect(calculateMode([1, 2, 2, 3, 3])).toEqual([2, 3]);
  });

  // Test case 5: Array with negative numbers
  it('5. should calculate the mode of an array with negative numbers', () => {
    expect(calculateMode([-1, -2, -2, -3, -4])).toEqual([-2]);
  });

  // Test case 6: Array with all negative numbers
  it('6. should calculate the mode of an array with all negative numbers', () => {
    expect(calculateMode([-1, -1, -2, -2, -3, -3])).toEqual([-3, -2, -1]);
  });

  // Test case 7: Array with positive and negative numbers
  it('7. should calculate the mode of an array with positive and negative numbers', () => {
    expect(calculateMode([1, -2, 3, -2])).toEqual([-2]);
  });

  // Test case 8: Array with floating-point numbers
  it('8. should calculate the mode of an array with floating-point numbers', () => {
    expect(calculateMode([1.5, 2.5, 2.5, 3.5])).toEqual([2.5]);
  });

  // Test case 9: Array with a single zero
  it('9. should return the zero itself when the array contains a single zero', () => {
    expect(calculateMode([0])).toEqual([0]);
  });

  // Test case 10: Array with large numbers
  it('10. should calculate the mode of an array with large numbers', () => {
    expect(calculateMode([1000, 2000, 2000, 3000])).toEqual([2000]);
  });

  // Test case 11: Array with small numbers
  it('11. should calculate the mode of an array with small numbers', () => {
    expect(calculateMode([0.1, 0.2, 0.2, 0.3])).toEqual([0.2]);
  });

  // Test case 12: Array with mixed positive and negative floating-point numbers
  it('12. should calculate the mode of an array with mixed positive and negative floating-point numbers', () => {
    expect(calculateMode([1.5, -2.5, 3.5, -2.5])).toEqual([-2.5]);
  });

  // Test case 13: Array with very small numbers
  it('13. should calculate the mode of an array with very small numbers', () => {
    expect(calculateMode([1e-10, 2e-10, 2e-10, 3e-10])).toEqual([2e-10]);
  });

  // Test case 14: Array with very large numbers
  it('14. should calculate the mode of an array with very large numbers', () => {
    expect(calculateMode([1e10, 2e10, 2e10, 3e10])).toEqual([2e10]);
  });

  // Test case 15: Arrays with -Infinity values
  it('15. should handle arrays with -Infinity values', () => {
    expect(calculateMode([-Infinity, -Infinity, 1, 1])).toEqual([-Infinity, 1]);
  });

  // Test case 16: Arrays with mixed Infinity and finite numbers
  it('16. should handle arrays with mixed Infinity and finite numbers', () => {
    expect(calculateMode([Infinity, Infinity, 1, 1])).toEqual([1, Infinity]);
  });

  // Test case 17: Arrays with mixed positive, negative, and zero numbers
  it('17. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateMode([1, -1, 0, 1, -1, 0])).toEqual([-1, 0, 1]);
  });

  // Test case 18: Arrays with repeated numbers
  it('18. should calculate the mode of an array with repeated numbers', () => {
    expect(calculateMode([2, 2, 2, 2])).toEqual([2]);
  });

  // Test case 19: Arrays with alternating positive and negative numbers
  it('19. should calculate the mode of an array with alternating positive and negative numbers', () => {
    expect(calculateMode([1, -1, 1, -1])).toEqual([-1, 1]);
  });

  // Test case 20: Arrays with alternating positive and negative floating-point numbers
  it('20. should calculate the mode of an array with alternating positive and negative floating-point numbers', () => {
    expect(calculateMode([1.5, -1.5, 1.5, -1.5])).toEqual([-1.5, 1.5]);
  });

  // Test case 21: Arrays with a single negative number
  it('21. should return the negative number itself when the array has a single negative number', () => {
    expect(calculateMode([-5])).toEqual([-5]);
  });

  // Test case 22: Arrays with mixed positive, negative, and zero numbers
  it('22. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateMode([1, -1, 0, 1, -1, 0])).toEqual([-1, 0, 1]);
  });
});
