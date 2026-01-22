import { calculateProduct } from '../src/statisticsFunctions/centralTendency/calculateProduct';

describe('calculateProduct', () => {
  // Test case 1: Product of all numbers in the array
  it('1. should return the product of all numbers in the array', () => {
    expect(calculateProduct([1, 2, 3, 4])).toBe(24);
    expect(calculateProduct([2, 5, 6])).toBe(60);
  });

  // Test case 2: Empty array
  it('2. should return 1 for an empty array', () => {
    expect(calculateProduct([])).toBe(1);
  });

  // Test case 3: Arrays with negative numbers
  it('3. should handle arrays with negative numbers', () => {
    expect(calculateProduct([-1, 2, -3, 4])).toBe(24);
  });

  // Test case 4: Arrays with a single element
  it('4. should handle arrays with a single element', () => {
    expect(calculateProduct([5])).toBe(5);
  });

  // Test case 5: Arrays with zero
  it('5. should handle arrays with zero', () => {
    expect(calculateProduct([1, 2, 0, 4])).toBe(0);
  });

  // Test case 6: Arrays with floating point numbers
  it('6. should handle arrays with floating point numbers', () => {
    expect(calculateProduct([1.5, 2.5, 3.5])).toBeCloseTo(13.125);
  });

  // Test case 7: Arrays with mixed positive and negative numbers
  it('7. should handle arrays with mixed positive and negative numbers', () => {
    expect(calculateProduct([-1, 2, -3, 4])).toBe(24);
  });

  // Test case 8: Arrays with large numbers
  it('8. should handle arrays with large numbers', () => {
    expect(calculateProduct([100000, 200000, 300000])).toBe(6000000000000000);
  });

  // Test case 9: Arrays with very small numbers
  it('9. should handle arrays with very small numbers', () => {
    expect(calculateProduct([0.0001, 0.0002, 0.0003])).toBeCloseTo(0.000000006);
  });

  // Test case 10: Arrays with mixed integers and floating point numbers
  it('10. should handle arrays with mixed integers and floating point numbers', () => {
    expect(calculateProduct([1, 2.5, 3])).toBeCloseTo(7.5);
  });

  // Test case 11: Arrays with repeated numbers
  it('11. should handle arrays with repeated numbers', () => {
    expect(calculateProduct([5, 5, 5])).toBe(125);
  });

  // Test case 12: Arrays with NaN values
  it('12. should handle arrays with NaN values', () => {
    expect(calculateProduct([NaN, 1, 2])).toBeNaN();
  });

  // Test case 13: Arrays with Infinity values
  it('13. should handle arrays with Infinity values', () => {
    expect(calculateProduct([Infinity, 1, 2])).toBe(Infinity);
  });

  // Test case 14: Arrays with -Infinity values
  it('14. should handle arrays with -Infinity values', () => {
    expect(calculateProduct([-Infinity, 1, 2])).toBe(-Infinity);
  });

  // Test case 15: Arrays with mixed Infinity and finite numbers
  it('15. should handle arrays with mixed Infinity and finite numbers', () => {
    expect(calculateProduct([Infinity, 1, 2])).toBe(Infinity);
  });

  // Test case 16: Arrays with mixed -Infinity and finite numbers
  it('16. should handle arrays with mixed -Infinity and finite numbers', () => {
    expect(calculateProduct([-Infinity, 1, 2])).toBe(-Infinity);
  });

  // Test case 17: Arrays with mixed NaN and finite numbers
  it('17. should handle arrays with mixed NaN and finite numbers', () => {
    expect(calculateProduct([NaN, 1, 2])).toBeNaN();
  });

  // Test case 18: Arrays with mixed NaN and Infinity values
  it('18. should handle arrays with mixed NaN and Infinity values', () => {
    expect(calculateProduct([NaN, Infinity, -Infinity])).toBeNaN();
  });

  // Test case 19: Arrays with very large and very small numbers
  it('19. should handle arrays with very large and very small numbers', () => {
    expect(calculateProduct([1e10, 1e-10])).toBe(1);
  });

  // Test case 20: Arrays with mixed positive, negative, and zero numbers
  it('20. should handle arrays with mixed positive, negative, and zero numbers', () => {
    expect(calculateProduct([1, -1, 0])).toEqual(-0);
  });
});
