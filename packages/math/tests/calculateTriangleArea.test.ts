import { calculateTriangleArea } from '../src/geometricFunctions/calculateTriangleArea';

describe('calculateTriangleArea', () => {
  // Test case 1: Area of a triangle with positive integer base and height
  it('1. should return the correct area for positive integer base and height', () => {
    const base: number = 10;
    const height: number = 5;
    const expected: number = 0.5 * base * height;
    const result: number = calculateTriangleArea(base, height);
    expect(result).toBe(expected);
  });

  // Test case 2: Area of a triangle with positive floating-point base and height
  it('2. should return the correct area for positive floating-point base and height', () => {
    const base: number = 10.5;
    const height: number = 5.5;
    const expected: number = 0.5 * base * height;
    const result: number = calculateTriangleArea(base, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Area of a triangle with a base of zero
  it('3. should return 0 for a base of zero', () => {
    const base: number = 0;
    const height: number = 5;
    const expected: number = 0;
    const result: number = calculateTriangleArea(base, height);
    expect(result).toBe(expected);
  });

  // Test case 4: Area of a triangle with a height of zero
  it('4. should return 0 for a height of zero', () => {
    const base: number = 10;
    const height: number = 0;
    const expected: number = 0;
    const result: number = calculateTriangleArea(base, height);
    expect(result).toBe(expected);
  });

  // Test case 5: Area of a triangle with very small positive base and height
  it('5. should return the correct area for very small positive base and height', () => {
    const base: number = 1e-10;
    const height: number = 1e-10;
    const expected: number = 0.5 * base * height;
    const result: number = calculateTriangleArea(base, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Area of a triangle with very large positive base and height
  it('6. should return the correct area for very large positive base and height', () => {
    const base: number = 1e10;
    const height: number = 1e10;
    const expected: number = 0.5 * base * height;
    const result: number = calculateTriangleArea(base, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Area of a triangle with negative base (should throw an error)
  it('7. should throw an error for negative base', () => {
    const base: number = -10;
    const height: number = 5;
    expect(() => calculateTriangleArea(base, height)).toThrow(
      'Base and height must be non-negative numbers',
    );
  });

  // Test case 8: Area of a triangle with negative height (should throw an error)
  it('8. should throw an error for negative height', () => {
    const base: number = 10;
    const height: number = -5;
    expect(() => calculateTriangleArea(base, height)).toThrow(
      'Base and height must be non-negative numbers',
    );
  });

  // Test case 9: Area of a triangle with NaN base (should throw an error)
  it('9. should throw an error for NaN base', () => {
    const base: number = NaN;
    const height: number = 5;
    expect(() => calculateTriangleArea(base, height)).toThrow(
      'Base and height must be numbers',
    );
  });

  // Test case 10: Area of a triangle with NaN height (should throw an error)
  it('10. should throw an error for NaN height', () => {
    const base: number = 10;
    const height: number = NaN;
    expect(() => calculateTriangleArea(base, height)).toThrow(
      'Base and height must be numbers',
    );
  });
});
