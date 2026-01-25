import { absoluteValue } from '../src/arithmeticFunctions/absoluteValue';

/**
 * Unit tests for the absoluteValue function.
 */
describe('absoluteValue', () => {
  // Test case 1: Positive integer
  it('1. should return the same number for a positive integer', () => {
    const input: number = 5;
    const expected: number = 5;
    const result: number = absoluteValue(input);
    expect(result).toBe(expected);
  });

  // Test case 2: Negative integer
  it('2. should return the positive equivalent for a negative integer', () => {
    const input: number = -5;
    const expected: number = 5;
    const result: number = absoluteValue(input);
    expect(result).toBe(expected);
  });

  // Test case 3: Zero
  it('3. should return zero for zero', () => {
    const input: number = 0;
    const expected: number = 0;
    const result: number = absoluteValue(input);
    expect(result).toBe(expected);
  });

  // Test case 4: Positive decimal
  it('4. should return the same number for a positive decimal', () => {
    const input: number = 3.14;
    const expected: number = 3.14;
    const result: number = absoluteValue(input);
    expect(result).toBe(expected);
  });

  // Test case 5: Negative decimal
  it('5. should return the positive equivalent for a negative decimal', () => {
    const input: number = -3.14;
    const expected: number = 3.14;
    const result: number = absoluteValue(input);
    expect(result).toBe(expected);
  });

  // Test case 6: NaN
  it('6. should throw an error for NaN', () => {
    const input: number = NaN;
    expect(() => absoluteValue(input)).toThrow('Input must be a number');
  });
});
