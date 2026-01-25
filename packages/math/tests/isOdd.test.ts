import { isOdd } from '../src/numberTheoryFunctions/isOdd';

/**
 * Unit tests for the isOdd function.
 */
describe('isOdd', () => {
  // Test case 1: Check if a positive odd number is identified correctly
  it('1. should return true for a positive odd number', () => {
    const input: number = 3;
    const result: boolean = isOdd(input);
    expect(result).toBe(true);
  });

  // Test case 2: Check if a positive even number is identified correctly
  it('2. should return false for a positive even number', () => {
    const input: number = 4;
    const result: boolean = isOdd(input);
    expect(result).toBe(false);
  });

  // Test case 3: Check if zero is identified correctly
  it('3. should return false for zero', () => {
    const input: number = 0;
    const result: boolean = isOdd(input);
    expect(result).toBe(false);
  });

  // Test case 4: Check if a negative odd number is identified correctly
  it('4. should return true for a negative odd number', () => {
    const input: number = -3;
    const result: boolean = isOdd(input);
    expect(result).toBe(true);
  });

  // Test case 5: Check if a negative even number is identified correctly
  it('5. should return false for a negative even number', () => {
    const input: number = -4;
    const result: boolean = isOdd(input);
    expect(result).toBe(false);
  });

  // Test case 6: Check if a large odd number is identified correctly
  it('6. should return true for a large odd number', () => {
    const input: number = 1000001;
    const result: boolean = isOdd(input);
    expect(result).toBe(true);
  });

  // Test case 7: Check if a large even number is identified correctly
  it('7. should return false for a large even number', () => {
    const input: number = 1000000;
    const result: boolean = isOdd(input);
    expect(result).toBe(false);
  });

  // Test case 8: Check if a small odd number is identified correctly
  it('8. should return true for a small odd number', () => {
    const input: number = 1;
    const result: boolean = isOdd(input);
    expect(result).toBe(true);
  });

  // Test case 9: Check if a small even number is identified correctly
  it('9. should return false for a small even number', () => {
    const input: number = 2;
    const result: boolean = isOdd(input);
    expect(result).toBe(false);
  });

  // Test case 10: Check if a floating-point number throws an error
  it('10. should throw an error for a floating-point number', () => {
    const input: number = 3.5;
    expect(() => isOdd(input)).toThrow('Input must be an integer');
  });

  // Test case 11: Check if NaN throws an error
  it('11. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => isOdd(input)).toThrow('Input must be a number');
  });
});
