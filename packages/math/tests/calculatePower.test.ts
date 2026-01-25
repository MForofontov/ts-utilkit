import { calculatePower } from '../src/algebraFunctions/calculatePower';

describe('calculatePower', () => {
  // Test case 1: Positive base and positive exponent
  it('1. should return the correct power for a positive base and positive exponent', () => {
    const base: number = 2;
    const exponent: number = 3;
    const expected: number = 8;
    const result: number = calculatePower(base, exponent);
    expect(result).toBe(expected);
  });

  // Test case 2: Positive base and zero exponent
  it('2. should return 1 for any base with exponent 0', () => {
    const base: number = 5;
    const exponent: number = 0;
    const expected: number = 1;
    const result: number = calculatePower(base, exponent);
    expect(result).toBe(expected);
  });

  // Test case 3: Positive base and negative exponent
  it('3. should return the correct power for a positive base and negative exponent', () => {
    const base: number = 2;
    const exponent: number = -2;
    const expected: number = 0.25;
    const result: number = calculatePower(base, exponent);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 4: Zero base and positive exponent
  it('4. should return 0 for base 0 with any positive exponent', () => {
    const base: number = 0;
    const exponent: number = 5;
    const expected: number = 0;
    const result: number = calculatePower(base, exponent);
    expect(result).toBe(expected);
  });

  // Test case 5: Zero base and zero exponent
  it('5. should return 1 for base 0 with exponent 0', () => {
    const base: number = 0;
    const exponent: number = 0;
    const expected: number = 1;
    const result: number = calculatePower(base, exponent);
    expect(result).toBe(expected);
  });

  // Test case 6: Negative base and positive exponent
  it('6. should return the correct power for a negative base and positive exponent', () => {
    const base: number = -2;
    const exponent: number = 3;
    const expected: number = -8;
    const result: number = calculatePower(base, exponent);
    expect(result).toBe(expected);
  });

  // Test case 7: Negative base and negative exponent
  it('7. should return the correct power for a negative base and negative exponent', () => {
    const base: number = -2;
    const exponent: number = -2;
    const expected: number = 0.25;
    const result: number = calculatePower(base, exponent);
    expect(result).toBeCloseTo(expected, 5);
  });

  // Test case 8: floating-point base and exponent
  it('8. should return the correct square root for a floating-point number', () => {
    const base: number = 2.5;
    const exponent: number = 1.5;
    const expected: number = Math.pow(2.5, 1.5);
    const result: number = calculatePower(base, exponent);
    expect(result).toBeCloseTo(expected, 5);
  });
});
