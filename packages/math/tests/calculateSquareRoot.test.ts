import { calculateSquareRoot } from '../src/algebraFunctions/calculateSquareRoot';

/**
 * Unit tests for the calculateSquareRoot function.
 */
describe('calculateSquareRoot', () => {
  // Test case 1: Square root of a positive integer
  it('1. should return the correct square root for a positive integer', () => {
    const input: number = 9;
    const expected: number = 3;
    const result: number = calculateSquareRoot(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Square root of zero
  it('2. should return 0 for the square root of 0', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = calculateSquareRoot(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Square root of a non-integer number
  it('3. should return the correct square root for a non-integer number', () => {
    const input: number = 2.25;
    const expected: number = 1.5;
    const result: number = calculateSquareRoot(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Square root of a very large number
  it('4. should return the correct square root for a very large number', () => {
    const input: number = 1e12;
    const expected: number = 1e6;
    const result: number = calculateSquareRoot(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Square root of a very small positive number
  it('5. should return the correct square root for a very small positive number', () => {
    const input: number = 1e-12;
    const expected: number = 1e-6;
    const result: number = calculateSquareRoot(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Square root of a floating-point number
  it('6. should return the correct square root for a floating-point number', () => {
    const input: number = 4.5;
    const expected: number = Math.sqrt(4.5);
    const result: number = calculateSquareRoot(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Square root of a negative number
  it('7. should throw an error for the square root of a negative number', () => {
    const input: number = -9;
    expect(() => calculateSquareRoot(input)).toThrow(
      'Input must be a non-negative number',
    );
  });

  // Test case 8: Square root of NaN (should throw an error)
  it('8. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => calculateSquareRoot(input)).toThrow('Input must be a number');
  });
});
