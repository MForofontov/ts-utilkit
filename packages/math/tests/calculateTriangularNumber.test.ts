import { calculateTriangularNumber } from '../src/sequenceFunctions/calculateTriangularNumber';

describe('calculateTriangularNumber', () => {
  // Test case 1: Triangular number for a positive integer
  it('1. should return the correct triangular number for a positive integer', () => {
    const input: number = 5;
    const expected: number = 15;
    const result: number = calculateTriangularNumber(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Triangular number for zero
  it('2. should return 0 for the triangular number of 0', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = calculateTriangularNumber(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Triangular number for a large positive integer
  it('3. should return the correct triangular number for a large positive integer', () => {
    const input: number = 10000;
    const expected: number = 50005000;
    const result: number = calculateTriangularNumber(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Triangular number for a negative integer
  it('4. should throw an error for a negative integer', () => {
    const input: number = -5;
    expect(() => calculateTriangularNumber(input)).toThrow(
      'Input must be a non-negative integer',
    );
  });

  // Test case 5: Triangular number for a non-integer number
  it('5. should throw an error for a floating-point number', () => {
    const input: number = 5.5;
    expect(() => calculateTriangularNumber(input)).toThrow(
      'Input must be an integer',
    );
  });

  // Test case 6: Triangular number for NaN (should throw an error)
  it('6. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => calculateTriangularNumber(input)).toThrow(
      'Input must be a number',
    );
  });
});
