import { ceilValue } from '../src/arithmeticFunctions/ceilValue';

describe('ceilValue', () => {
  // Test case 1: Ceil value for a positive decimal number
  it('1. should return the correct ceil value for a positive decimal number', () => {
    const input: number = 4.2;
    const expected: number = 5;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Ceil value for a negative decimal number
  it('2. should return the correct ceil value for a negative decimal number', () => {
    const input: number = -4.2;
    const expected: number = -4;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Ceil value for a positive integer
  it('3. should return the same value for a positive integer', () => {
    const input: number = 4;
    const expected: number = 4;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Ceil value for a negative integer
  it('4. should return the same value for a negative integer', () => {
    const input: number = -4;
    const expected: number = -4;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Ceil value for zero
  it('5. should return 0 for the value 0', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 6: Ceil value for a very large number
  it('6. should return the correct ceil value for a very large number', () => {
    const input: number = 1e12 + 0.1;
    const expected: number = 1e12 + 1;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 7: Ceil value for a very small number
  it('7. should return the correct ceil value for a very small number', () => {
    const input: number = -1e-12;
    const expected: number = 0;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 8: Ceil value for a floating-point number
  it('8. should return the correct ceil value for a floating-point number', () => {
    const input: number = 4.5;
    const expected: number = 5;
    const result: number = ceilValue(input);
    expect(result).toBe(expected);
  });

  // Test case 9: Ceil value for NaN (should throw an error)
  it('9. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => ceilValue(input)).toThrow('Input must be a number');
  });
});
