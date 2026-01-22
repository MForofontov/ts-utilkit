import { roundValue } from '../src/arithmeticFunctions/roundValue';

describe('roundValue', () => {
  // Test case 1: Round a positive decimal number
  it('1. should round a positive decimal number to the nearest integer', () => {
    const input: number = 4.7;
    const expected: number = 5;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Round a negative decimal number
  it('2. should round a negative decimal number to the nearest integer', () => {
    const input: number = -4.7;
    const expected: number = -5;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Round a positive integer
  it('3. should return the same value for a positive integer', () => {
    const input: number = 4;
    const expected: number = 4;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Round a negative integer
  it('4. should return the same value for a negative integer', () => {
    const input: number = -4;
    const expected: number = -4;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Round zero
  it('5. should return 0 for the value 0', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 6: Round a number exactly halfway between two integers (positive)
  it('6. should round a positive number exactly halfway between two integers up', () => {
    const input: number = 4.5;
    const expected: number = 5;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 7: Round a number exactly halfway between two integers (negative)
  it('7. should round a negative number exactly halfway between two integers down', () => {
    const input: number = -4.5;
    const expected: number = -4;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 8: Round a large positive decimal number
  it('8. should round a large positive decimal number to the nearest integer', () => {
    const input: number = 123456.789;
    const expected: number = 123457;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 9: Round a small positive decimal number
  it('9. should round a small positive decimal number to the nearest integer', () => {
    const input: number = 0.00056789;
    const expected: number = 0;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 10: Round a large negative decimal number
  it('10. should round a large negative decimal number to the nearest integer', () => {
    const input: number = -123456.789;
    const expected: number = -123457;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 11: Round a small negative decimal number
  it('11. should round a small negative decimal number to the nearest integer', () => {
    const input: number = -0.00056789;
    const expected: number = 0;
    const result: number = roundValue(input);
    expect(result).toBe(expected);
  });

  // Test case 12: Round a floating-point number
  it('12. should return an integer when rounding a floating-point number', () => {
    const input: number = 4.5;
    const result: number = roundValue(input);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test case 13: Round NaN (should throw an error)
  it('13. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => roundValue(input)).toThrow('Input must be a number');
  });
});
