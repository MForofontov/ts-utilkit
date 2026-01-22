import { calculateLogBase10 } from '../src/algebraFunctions/calculateLogBase10';

describe('calculateLogBase10', () => {
  // Test case 1: Logarithm of a positive number
  it('1. should return the correct logarithm for a positive number', () => {
    const input: number = 100;
    const expected: number = 2;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Logarithm of 1
  it('2. should return 0 for the logarithm of 1', () => {
    const input: number = 1;
    const expected: number = 0;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Logarithm of a number less than 1
  it('3. should return the correct logarithm for a number less than 1', () => {
    const input: number = 0.1;
    const expected: number = -1;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Logarithm of a negative number (should return NaN)
  it('4. should return NaN for the logarithm of a negative number', () => {
    const input: number = -10;
    const result: number = calculateLogBase10(input);
    expect(result).toBeNaN();
  });

  // Test case 5: Logarithm of zero (should return -Infinity)
  it('5. should return -Infinity for the logarithm of zero', () => {
    const input: number = 0;
    const expected: number = -Infinity;
    const result: number = calculateLogBase10(input);
    expect(result).toBe(expected);
  });

  // Test case 6: Logarithm of a large positive number
  it('6. should return the correct logarithm for a large positive number', () => {
    const input: number = 1000000;
    const expected: number = 6;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 7: Logarithm of a small positive number
  it('7. should return the correct logarithm for a small positive number', () => {
    const input: number = 0.0001;
    const expected: number = -4;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: Logarithm of NaN
  it('8. should return NaN for the logarithm of NaN', () => {
    const input: number = NaN;
    const result: number = calculateLogBase10(input);
    expect(result).toBeNaN();
  });

  // Test case 9: Logarithm of Infinity
  it('9. should return Infinity for the logarithm of Infinity', () => {
    const input: number = Infinity;
    const expected: number = Infinity;
    const result: number = calculateLogBase10(input);
    expect(result).toBe(expected);
  });

  // Test case 10: Logarithm of a very small positive number
  it('10. should return the correct logarithm for a very small positive number', () => {
    const input: number = 1e-10;
    const expected: number = -10;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 11: Logarithm of a very large positive number
  it('11. should return the correct logarithm for a very large positive number', () => {
    const input: number = 1e10;
    const expected: number = 10;
    const result: number = calculateLogBase10(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
