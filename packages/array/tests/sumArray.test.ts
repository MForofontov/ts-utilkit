import { sumArrayElements } from '../src/sumArrayElements';

describe('sumArrayElements', () => {
  // Test case 1: Sum of all positive numbers in the array
  it('1. should return the sum of all positive numbers in the array', () => {
    expect(sumArrayElements([1, 2, 3, 4])).toBe(10);
    expect(sumArrayElements([5, 10, 15])).toBe(30);
  });

  // Test case 2: Sum of all negative numbers in the array
  it('2. should return the sum of all negative numbers in the array', () => {
    expect(sumArrayElements([-1, -2, -3, -4])).toBe(-10);
    expect(sumArrayElements([-5, -10, -15])).toBe(-30);
  });

  // Test case 3: Sum of mixed positive and negative numbers
  it('3. should return the sum of mixed positive and negative numbers', () => {
    expect(sumArrayElements([1, -2, 3, -4])).toBe(-2);
    expect(sumArrayElements([-5, 10, -15, 20])).toBe(10);
  });

  // Test case 4: Sum of an empty array
  it('4. should return 0 for an empty array', () => {
    expect(sumArrayElements([])).toBe(0);
  });

  // Test case 5: Sum of an array with a single element
  it('5. should return the single element for an array with one element', () => {
    expect(sumArrayElements([5])).toBe(5);
    expect(sumArrayElements([-5])).toBe(-5);
  });

  // Test case 6: Sum of an array with zero
  it('6. should handle arrays with zero', () => {
    expect(sumArrayElements([0, 0, 0])).toBe(0);
    expect(sumArrayElements([1, 0, -1])).toBe(0);
  });

  // Test case 7: Sum of an array with floating point numbers
  it('7. should handle arrays with floating point numbers', () => {
    expect(sumArrayElements([1.5, 2.5, 3.5])).toBeCloseTo(7.5);
    expect(sumArrayElements([-1.5, -2.5, -3.5])).toBeCloseTo(-7.5);
  });

  // Test case 8: Sum of an array with large numbers
  it('8. should handle arrays with large numbers', () => {
    expect(sumArrayElements([1000000000, 2000000000, 3000000000])).toBe(
      6000000000,
    );
    expect(sumArrayElements([-1000000000, -2000000000, -3000000000])).toBe(
      -6000000000,
    );
  });

  // Test case 9: Sum of an array with very small numbers
  it('9. should handle arrays with very small numbers', () => {
    expect(sumArrayElements([0.0000001, 0.0000002, 0.0000003])).toBeCloseTo(
      0.0000006,
    );
    expect(sumArrayElements([-0.0000001, -0.0000002, -0.0000003])).toBeCloseTo(
      -0.0000006,
    );
  });

  // Test case 10: Sum of an array with mixed integers and floating point numbers
  it('10. should handle arrays with mixed integers and floating point numbers', () => {
    expect(sumArrayElements([1, 2.5, 3])).toBeCloseTo(6.5);
    expect(sumArrayElements([-1, -2.5, -3])).toBeCloseTo(-6.5);
  });

  // Test case 11: Sum of an array with repeated numbers
  it('11. should handle arrays with repeated numbers', () => {
    expect(sumArrayElements([5, 5, 5])).toBe(15);
    expect(sumArrayElements([-5, -5, -5])).toBe(-15);
  });

  // Test case 12: Sum of an array with NaN values
  it('12. should handle arrays with NaN values', () => {
    expect(sumArrayElements([NaN, 1, 2])).toBeNaN();
    expect(sumArrayElements([1, NaN, 2])).toBeNaN();
  });

  // Test case 13: Sum of an array with Infinity values
  it('13. should handle arrays with Infinity values', () => {
    expect(sumArrayElements([Infinity, 1, 2])).toBe(Infinity);
    expect(sumArrayElements([1, Infinity, 2])).toBe(Infinity);
  });

  // Test case 14: Sum of an array with -Infinity values
  it('14. should handle arrays with -Infinity values', () => {
    expect(sumArrayElements([-Infinity, 1, 2])).toBe(-Infinity);
    expect(sumArrayElements([1, -Infinity, 2])).toBe(-Infinity);
  });

  // Test case 15: Sum of an array with mixed Infinity and finite numbers
  it('15. should handle arrays with mixed Infinity and finite numbers', () => {
    expect(sumArrayElements([Infinity, 1, 2])).toBe(Infinity);
    expect(sumArrayElements([-Infinity, 1, 2])).toBe(-Infinity);
  });

  // Test case 16: Sum of an array with mixed NaN and finite numbers
  it('16. should handle arrays with mixed NaN and finite numbers', () => {
    expect(sumArrayElements([NaN, 1, 2])).toBeNaN();
    expect(sumArrayElements([1, NaN, 2])).toBeNaN();
  });

  // Test case 17: Sum of an array with mixed NaN and Infinity values
  it('17. should handle arrays with mixed NaN and Infinity values', () => {
    expect(sumArrayElements([NaN, Infinity, -Infinity])).toBeNaN();
    expect(sumArrayElements([Infinity, NaN, -Infinity])).toBeNaN();
  });

  // Test case 18: Sum of an array with very large and very small numbers
  it('18. should handle arrays with very large and very small numbers', () => {
    expect(sumArrayElements([1e10, 1e-10])).toBeCloseTo(1e10);
    expect(sumArrayElements([-1e10, -1e-10])).toBeCloseTo(-1e10);
  });

  // Test case 19: Sum of an array with mixed positive, negative, and zero numbers
  it('19. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(sumArrayElements([1, -1, 0])).toBe(0);
    expect(sumArrayElements([-1, 0, 1])).toBe(0);
  });
});
