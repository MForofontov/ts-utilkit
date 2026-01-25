import { calculateHypotenuse } from '../src/geometricFunctions/calculateHypotenuse';

describe('calculateHypotenuse', () => {
  // Test case 1: Hypotenuse of a right triangle with positive integer side lengths
  it('1. should return the correct hypotenuse for positive integer side lengths', () => {
    const a: number = 3;
    const b: number = 4;
    const expected: number = 5;
    const result: number = calculateHypotenuse(a, b);
    expect(result).toBe(expected);
  });

  // Test case 2: Hypotenuse of a right triangle with positive floating-point side lengths
  it('2. should return the correct hypotenuse for positive floating-point side lengths', () => {
    const a: number = 3.5;
    const b: number = 4.5;
    const expected: number = Math.sqrt(a * a + b * b);
    const result: number = calculateHypotenuse(a, b);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Hypotenuse of a right triangle with one side length of zero
  it('3. should return the other side length for one side length of zero', () => {
    const a: number = 0;
    const b: number = 4;
    const expected: number = 4;
    const result: number = calculateHypotenuse(a, b);
    expect(result).toBe(expected);
  });

  // Test case 4: Hypotenuse of a right triangle with very small positive side lengths
  it('4. should return the correct hypotenuse for very small positive side lengths', () => {
    const a: number = 1e-10;
    const b: number = 1e-10;
    const expected: number = Math.sqrt(a * a + b * b);
    const result: number = calculateHypotenuse(a, b);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Hypotenuse of a right triangle with very large positive side lengths
  it('5. should return the correct hypotenuse for very large positive side lengths', () => {
    const a: number = 1e10;
    const b: number = 1e10;
    const expected: number = Math.sqrt(a * a + b * b);
    const result: number = calculateHypotenuse(a, b);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Hypotenuse of a right triangle with negative side length (should throw an error)
  it('6. should throw an error for negative side length', () => {
    const a: number = -3;
    const b: number = 4;
    expect(() => calculateHypotenuse(a, b)).toThrow(
      'Side lengths must be non-negative numbers',
    );
  });

  // Test case 7: Hypotenuse of a right triangle with NaN side length (should throw an error)
  it('7. should throw an error for NaN side length', () => {
    const a: number = NaN;
    const b: number = 4;
    expect(() => calculateHypotenuse(a, b)).toThrow(
      'Side lengths must be numbers',
    );
  });

  // Test case 8: Hypotenuse of a right triangle with negative side length for the second variable (should throw an error)
  it('8. should throw an error for negative side length for the second variable', () => {
    const a: number = 3;
    const b: number = -4;
    expect(() => calculateHypotenuse(a, b)).toThrow(
      'Side lengths must be non-negative numbers',
    );
  });

  // Test case 9: Hypotenuse of a right triangle with NaN side length for the second variable (should throw an error)
  it('9. should throw an error for NaN side length for the second variable', () => {
    const a: number = 3;
    const b: number = NaN;
    expect(() => calculateHypotenuse(a, b)).toThrow(
      'Side lengths must be numbers',
    );
  });
});
