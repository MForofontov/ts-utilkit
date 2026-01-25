import { calculateRange } from '../src/statisticsFunctions/dispersion/calculateRange';

describe('calculateRange', () => {
  // Test case 1: Range of an array of positive numbers
  it('1. should return the range of an array of positive numbers', () => {
    expect(calculateRange([1, 2, 3, 4, 5])).toBe(4);
    expect(calculateRange([10, 20, 30, 40, 50])).toBe(40);
  });

  // Test case 2: Range of an array of negative numbers
  it('2. should return the range of an array of negative numbers', () => {
    expect(calculateRange([-1, -2, -3, -4, -5])).toBe(4);
    expect(calculateRange([-10, -20, -30, -40, -50])).toBe(40);
  });

  // Test case 3: Range of an array of mixed positive and negative numbers
  it('3. should return the range of an array of mixed positive and negative numbers', () => {
    expect(calculateRange([-1, 0, 1, 2, 3])).toBe(4);
    expect(calculateRange([-10, 0, 10, 20, 30])).toBe(40);
  });

  // Test case 4: Range of an array with a single element
  it('4. should return 0 for an array with a single element', () => {
    expect(calculateRange([5])).toBe(0);
    expect(calculateRange([-5])).toBe(0);
  });

  // Test case 5: Range of an empty array
  it('5. should return NaN for an empty array', () => {
    expect(calculateRange([])).toBeNaN();
  });

  // Test case 6: Range of an array with zero
  it('6. should handle arrays with zero', () => {
    expect(calculateRange([0, 0, 0])).toBe(0);
    expect(calculateRange([0, 1, 2, 3])).toBe(3);
  });

  // Test case 7: Range of an array with floating point numbers
  it('7. should handle arrays with floating point numbers', () => {
    expect(calculateRange([1.5, 2.5, 3.5])).toBeCloseTo(2);
    expect(calculateRange([-1.5, -2.5, -3.5])).toBeCloseTo(2);
  });

  // Test case 8: Range of an array with large numbers
  it('8. should handle arrays with large numbers', () => {
    expect(calculateRange([1000000000, 2000000000, 3000000000])).toBe(
      2000000000,
    );
    expect(calculateRange([-1000000000, -2000000000, -3000000000])).toBe(
      2000000000,
    );
  });

  // Test case 9: Range of an array with very small numbers
  it('9. should handle arrays with very small numbers', () => {
    expect(calculateRange([0.0000001, 0.0000002, 0.0000003])).toBeCloseTo(
      0.0000002,
    );
    expect(calculateRange([-0.0000001, -0.0000002, -0.0000003])).toBeCloseTo(
      0.0000002,
    );
  });

  // Test case 10: Range of an array with mixed integers and floating point numbers
  it('10. should handle arrays with mixed integers and floating point numbers', () => {
    expect(calculateRange([1, 2.5, 3])).toBeCloseTo(2);
    expect(calculateRange([-1, -2.5, -3])).toBeCloseTo(2);
  });

  // Test case 11: Range of an array with repeated numbers
  it('11. should handle arrays with repeated numbers', () => {
    expect(calculateRange([5, 5, 5])).toBe(0);
    expect(calculateRange([-5, -5, -5])).toBe(0);
  });

  // Test case 12: Range of an array with NaN values
  it('12. should handle arrays with NaN values', () => {
    expect(calculateRange([NaN, 1, 2])).toBeNaN();
    expect(calculateRange([1, NaN, 2])).toBeNaN();
  });

  // Test case 13: Range of an array with Infinity values
  it('13. should handle arrays with Infinity values', () => {
    expect(calculateRange([Infinity, 1, 2])).toBe(Infinity);
    expect(calculateRange([1, Infinity, 2])).toBe(Infinity);
  });

  // Test case 14: Range of an array with -Infinity values
  it('14. should handle arrays with -Infinity values', () => {
    expect(calculateRange([-Infinity, 1, 2])).toBe(Infinity);
    expect(calculateRange([1, -Infinity, 2])).toBe(Infinity);
  });

  // Test case 15: Range of an array with mixed Infinity and finite numbers
  it('15. should handle arrays with mixed Infinity and finite numbers', () => {
    expect(calculateRange([Infinity, 1, 2])).toBe(Infinity);
    expect(calculateRange([-Infinity, 1, 2])).toBe(Infinity);
  });

  // Test case 16: Range of an array with mixed NaN and finite numbers
  it('16. should handle arrays with mixed NaN and finite numbers', () => {
    expect(calculateRange([NaN, 1, 2])).toBeNaN();
    expect(calculateRange([1, NaN, 2])).toBeNaN();
  });

  // Test case 17: Range of an array with mixed NaN and Infinity values
  it('17. should handle arrays with mixed NaN and Infinity values', () => {
    expect(calculateRange([NaN, Infinity, -Infinity])).toBeNaN();
    expect(calculateRange([Infinity, NaN, -Infinity])).toBeNaN();
  });

  // Test case 18: Range of an array with very large and very small numbers
  it('18. should handle arrays with very large and very small numbers', () => {
    expect(calculateRange([1e10, 1e-10])).toBeCloseTo(1e10);
    expect(calculateRange([-1e10, -1e-10])).toBeCloseTo(1e10);
  });

  // Test case 19: Range of an array with mixed positive, negative, and zero numbers
  it('19. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateRange([1, -1, 0])).toBe(2);
    expect(calculateRange([-1, 0, 1])).toBe(2);
  });
});
