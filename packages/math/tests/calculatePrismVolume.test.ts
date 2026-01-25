import { calculatePrismVolume } from '../src/geometricFunctions/calculatePrismVolume';

describe('calculatePrismVolume', () => {
  // Test case 1: Volume of a rectangular prism with positive integer dimensions
  it('1. should return the correct volume for positive integer dimensions', () => {
    const width: number = 2;
    const height: number = 3;
    const depth: number = 4;
    const expected: number = 24;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBe(expected);
  });

  // Test case 2: Volume of a rectangular prism with positive floating-point dimensions
  it('2. should return the correct volume for positive floating-point dimensions', () => {
    const width: number = 2.5;
    const height: number = 3.5;
    const depth: number = 4.5;
    const expected: number = width * height * depth;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Volume of a rectangular prism with a width of zero
  it('3. should return 0 for a width of zero', () => {
    const width: number = 0;
    const height: number = 3;
    const depth: number = 4;
    const expected: number = 0;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBe(expected);
  });

  // Test case 4: Volume of a rectangular prism with a height of zero
  it('4. should return 0 for a height of zero', () => {
    const width: number = 2;
    const height: number = 0;
    const depth: number = 4;
    const expected: number = 0;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBe(expected);
  });

  // Test case 5: Volume of a rectangular prism with a depth of zero
  it('5. should return 0 for a depth of zero', () => {
    const width: number = 2;
    const height: number = 3;
    const depth: number = 0;
    const expected: number = 0;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBe(expected);
  });

  // Test case 6: Volume of a rectangular prism with very small positive dimensions
  it('6. should return the correct volume for very small positive dimensions', () => {
    const width: number = 1e-10;
    const height: number = 1e-10;
    const depth: number = 1e-10;
    const expected: number = width * height * depth;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Volume of a rectangular prism with very large positive dimensions
  it('7. should return the correct volume for very large positive dimensions', () => {
    const width: number = 1e10;
    const height: number = 1e10;
    const depth: number = 1e10;
    const expected: number = width * height * depth;
    const result: number = calculatePrismVolume(width, height, depth);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Volume of a rectangular prism with negative width (should throw an error)
  it('8. should throw an error for negative width', () => {
    const width: number = -2;
    const height: number = 3;
    const depth: number = 4;
    expect(() => calculatePrismVolume(width, height, depth)).toThrow(
      'Width, height, and depth must be non-negative numbers',
    );
  });

  // Test case 9: Volume of a rectangular prism with negative height (should throw an error)
  it('9. should throw an error for negative height', () => {
    const width: number = 2;
    const height: number = -3;
    const depth: number = 4;
    expect(() => calculatePrismVolume(width, height, depth)).toThrow(
      'Width, height, and depth must be non-negative numbers',
    );
  });

  // Test case 10: Volume of a rectangular prism with negative depth (should throw an error)
  it('10. should throw an error for negative depth', () => {
    const width: number = 2;
    const height: number = 3;
    const depth: number = -4;
    expect(() => calculatePrismVolume(width, height, depth)).toThrow(
      'Width, height, and depth must be non-negative numbers',
    );
  });

  // Test case 11: Volume of a rectangular prism with NaN width (should throw an error)
  it('11. should throw an error for NaN width', () => {
    const width: number = NaN;
    const height: number = 3;
    const depth: number = 4;
    expect(() => calculatePrismVolume(width, height, depth)).toThrow(
      'Width, height, and depth must be numbers',
    );
  });

  // Test case 12: Volume of a rectangular prism with NaN height (should throw an error)
  it('12. should throw an error for NaN height', () => {
    const width: number = 2;
    const height: number = NaN;
    const depth: number = 4;
    expect(() => calculatePrismVolume(width, height, depth)).toThrow(
      'Width, height, and depth must be numbers',
    );
  });

  // Test case 13: Volume of a rectangular prism with NaN depth (should throw an error)
  it('13. should throw an error for NaN depth', () => {
    const width: number = 2;
    const height: number = 3;
    const depth: number = NaN;
    expect(() => calculatePrismVolume(width, height, depth)).toThrow(
      'Width, height, and depth must be numbers',
    );
  });
});
