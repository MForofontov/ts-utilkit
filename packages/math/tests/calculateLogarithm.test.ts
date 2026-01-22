import { calculateLogarithm } from '../src/algebraFunctions/calculateLogarithm';

describe('calculateLogarithm', () => {
  // Test case 1: Logarithm of a positive number with base 10
  it('1. should return the correct logarithm for a positive number with base 10', () => {
    const n: number = 100;
    const base: number = 10;
    const expected: number = 2;
    const result: number = calculateLogarithm(n, base);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 2: Logarithm of a positive number with base e (natural logarithm)
  it('2. should return the correct natural logarithm for a positive number', () => {
    const n: number = Math.E;
    const expected: number = 1;
    const result: number = calculateLogarithm(n);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 3: Logarithm of 1 with any base
  it('3. should return 0 for the logarithm of 1 with any base', () => {
    const n: number = 1;
    const base: number = 10;
    const expected: number = 0;
    const result: number = calculateLogarithm(n, base);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Logarithm of a positive number with base 2
  it('4. should return the correct logarithm for a positive number with base 2', () => {
    const n: number = 8;
    const base: number = 2;
    const expected: number = 3;
    const result: number = calculateLogarithm(n, base);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 5: Logarithm with base e (natural logarithm)
  it('5. should return the correct natural logarithm for a positive number', () => {
    const n: number = Math.E;
    const expected: number = 1;
    const result: number = calculateLogarithm(n);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 6: Logarithm of a number with base 1 (should throw an error)
  it('6. should throw an error for the logarithm with base 1', () => {
    const n: number = 10;
    const base: number = 1;
    expect(() => calculateLogarithm(n, base)).toThrow(
      'Base must be greater than 0 and not equal to 1',
    );
  });

  // Test case 7: Logarithm of a negative number (should throw an error)
  it('7. should throw an error for the logarithm of a negative number', () => {
    const n: number = -10;
    const base: number = 10;
    expect(() => calculateLogarithm(n, base)).toThrow(
      'Input must be a positive number',
    );
  });

  // Test case 8: Logarithm with NaN inputs (should throw an error)
  it('8. should throw an error for NaN inputs', () => {
    const n: number = NaN;
    const base: number = 10;
    expect(() => calculateLogarithm(n, base)).toThrow(
      'Both n and base must be numbers',
    );
  });

  // Test case 9: Logarithm with base less than or equal to 0 (should throw an error)
  it('9. should throw an error for base less than or equal to 0', () => {
    const n: number = 10;
    const base: number = 0;
    expect(() => calculateLogarithm(n, base)).toThrow(
      'Base must be greater than 0 and not equal to 1',
    );
  });
});
