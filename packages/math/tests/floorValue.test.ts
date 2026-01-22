import { floorValue } from '../src/arithmeticFunctions/floorValue';

describe('floorValue', () => {
  // Test case 1: Floor value for a positive decimal number
  it('1. should return the correct floor value for a positive decimal number', () => {
    const input: number = 4.7;
    const expected: number = 4;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Floor value for a negative decimal number
  it('2. should return the correct floor value for a negative decimal number', () => {
    const input: number = -4.7;
    const expected: number = -5;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Floor value for a positive integer
  it('3. should return the same value for a positive integer', () => {
    const input: number = 4;
    const expected: number = 4;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Floor value for a negative integer
  it('4. should return the same value for a negative integer', () => {
    const input: number = -4;
    const expected: number = -4;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Floor value for zero
  it('5. should return 0 for the value 0', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });

  // Test case 6: Floor value for a very large number
  it('6. should return the correct floor value for a very large number', () => {
    const input: number = 1e12 + 0.1;
    const expected: number = 1e12;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });

  // Test case 7: Floor value for a very small number
  it('7. should return the correct floor value for a very small number', () => {
    const input: number = -1e-12;
    const expected: number = -1;
    const result: number = floorValue(input);
    expect(result).toBe(expected);
  });
});
