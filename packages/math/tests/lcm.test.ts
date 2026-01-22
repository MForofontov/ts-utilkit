import { lcm } from '../src/numberTheoryFunctions/lcm';

describe('lcm', () => {
  // Test case 1: LCM of two positive integers
  it('1. should return the correct LCM for two positive integers', () => {
    const a: number = 12;
    const b: number = 15;
    const expected: number = 60;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 2: LCM of two negative integers
  it('2. should return the correct LCM for two negative integers', () => {
    const a: number = -12;
    const b: number = -15;
    const expected: number = 60;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 3: LCM of a positive and a negative integer
  it('3. should return the correct LCM for a positive and a negative integer', () => {
    const a: number = 12;
    const b: number = -15;
    const expected: number = 60;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 4: LCM of zero and a positive integer
  it('4. should return 0 when one number is zero and the other is positive', () => {
    const a: number = 0;
    const b: number = 15;
    const expected: number = 0;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 5: LCM of zero and a negative integer
  it('5. should return 0 when one number is zero and the other is negative', () => {
    const a: number = 0;
    const b: number = -15;
    const expected: number = 0;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 6: LCM of a number and itself
  it('6. should return the number when both numbers are the same', () => {
    const a: number = 15;
    const b: number = 15;
    const expected: number = 15;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 7: LCM of a number and 1
  it('7. should return the number when one number is 1', () => {
    const a: number = 15;
    const b: number = 1;
    const expected: number = 15;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 8: LCM of two prime numbers
  it('8. should return the product of the two numbers when both are prime', () => {
    const a: number = 7;
    const b: number = 11;
    const expected: number = 77;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 9: LCM of a prime number and a composite number
  it('9. should return the correct LCM for a prime number and a composite number', () => {
    const a: number = 7;
    const b: number = 14;
    const expected: number = 14;
    const result: number = lcm(a, b);
    expect(result).toBe(expected);
  });

  // Test case 10: LCM of two zeros (should throw an error)
  it('10. should throw an error when both numbers are zero', () => {
    const a: number = 0;
    const b: number = 0;
    expect(() => lcm(a, b)).toThrow(
      'LCM is not defined for both a and b being zero',
    );
  });

  // Test case 11: LCM with floating-point inputs
  it('11. should throw an error for floating-point inputs', () => {
    const a: number = 12.5;
    const b: number = 15;
    expect(() => lcm(a, b)).toThrow('Both a and b must be integers');
  });

  // Test case 12: LCM with NaN inputs
  it('12. should throw an error for NaN inputs', () => {
    const a: number = NaN;
    const b: number = 15;
    expect(() => lcm(a, b)).toThrow('Both a and b must be numbers');
  });
});
