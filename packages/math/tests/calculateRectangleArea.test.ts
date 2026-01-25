import { calculateRectangleArea } from '../src/geometricFunctions/calculateRectangleArea';

describe('calculateRectangleArea', () => {
  // Test case 1: Area of a rectangle with positive integer dimensions
  it('1. should return the correct area for positive integer dimensions', () => {
    const width: number = 10;
    const height: number = 5;
    const expected: number = 50;
    const result: number = calculateRectangleArea(width, height);
    expect(result).toBe(expected);
  });

  // Test case 2: Area of a rectangle with positive floating-point dimensions
  it('2. should return the correct area for positive floating-point dimensions', () => {
    const width: number = 10.5;
    const height: number = 5.5;
    const expected: number = width * height;
    const result: number = calculateRectangleArea(width, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Area of a rectangle with a width of zero
  it('3. should return 0 for a width of zero', () => {
    const width: number = 0;
    const height: number = 5;
    const expected: number = 0;
    const result: number = calculateRectangleArea(width, height);
    expect(result).toBe(expected);
  });

  // Test case 4: Area of a rectangle with a height of zero
  it('4. should return 0 for a height of zero', () => {
    const width: number = 10;
    const height: number = 0;
    const expected: number = 0;
    const result: number = calculateRectangleArea(width, height);
    expect(result).toBe(expected);
  });

  // Test case 5: Area of a rectangle with very small positive dimensions
  it('5. should return the correct area for very small positive dimensions', () => {
    const width: number = 1e-10;
    const height: number = 1e-10;
    const expected: number = width * height;
    const result: number = calculateRectangleArea(width, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Area of a rectangle with very large positive dimensions
  it('6. should return the correct area for very large positive dimensions', () => {
    const width: number = 1e10;
    const height: number = 1e10;
    const expected: number = width * height;
    const result: number = calculateRectangleArea(width, height);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Area of a rectangle with negative width (should throw an error)
  it('7. should throw an error for negative width', () => {
    const width: number = -10;
    const height: number = 5;
    expect(() => calculateRectangleArea(width, height)).toThrow(
      'Width and height must be non-negative numbers',
    );
  });

  // Test case 8: Area of a rectangle with negative height (should throw an error)
  it('8. should throw an error for negative height', () => {
    const width: number = 10;
    const height: number = -5;
    expect(() => calculateRectangleArea(width, height)).toThrow(
      'Width and height must be non-negative numbers',
    );
  });

  // Test case 9: Area of a rectangle with NaN width (should throw an error)
  it('9. should throw an error for NaN width', () => {
    const width: number = NaN;
    const height: number = 5;
    expect(() => calculateRectangleArea(width, height)).toThrow(
      'Width and height must be numbers',
    );
  });

  // Test case 10: Area of a rectangle with NaN height (should throw an error)
  it('10. should throw an error for NaN height', () => {
    const width: number = 10;
    const height: number = NaN;
    expect(() => calculateRectangleArea(width, height)).toThrow(
      'Width and height must be numbers',
    );
  });
});
