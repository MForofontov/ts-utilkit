import { calculateCombination } from '../src/combinatoricsFunctions/calculateCombination';

describe('calculateCombination', () => {
  // Test case 1: Combination of 5 items taken 3 at a time
  it('1. should return the correct combination for 5 items taken 3 at a time', () => {
    const n: number = 5;
    const k: number = 3;
    const expected: number = 10;
    const result: number = calculateCombination(n, k);
    expect(result).toBe(expected);
  });

  // Test case 2: Combination of 5 items taken 0 at a time
  it('2. should return 1 for 5 items taken 0 at a time', () => {
    const n: number = 5;
    const k: number = 0;
    const expected: number = 1;
    const result: number = calculateCombination(n, k);
    expect(result).toBe(expected);
  });

  // Test case 3: Combination of 10 items taken 1 at a time
  it('3. should return the correct combination for 10 items taken 1 at a time', () => {
    const n: number = 10;
    const k: number = 1;
    const expected: number = 10;
    const result: number = calculateCombination(n, k);
    expect(result).toBe(expected);
  });

  // Test case 4: Combination of 7 items taken 7 at a time
  it('4. should return the correct combination for 7 items taken 7 at a time', () => {
    const n: number = 7;
    const k: number = 7;
    const expected: number = 1;
    const result: number = calculateCombination(n, k);
    expect(result).toBe(expected);
  });

  // Test case 5: Combination with k greater than n
  it('5. should return 0 when k is greater than n', () => {
    const n: number = 5;
    const k: number = 6;
    const expected: number = 0;
    const result: number = calculateCombination(n, k);
    expect(result).toBe(expected);
  });

  // Test case 6: Combination of 20 items taken 10 at a time
  it('6. should return the correct combination for 20 items taken 10 at a time', () => {
    const n: number = 20;
    const k: number = 10;
    const expected: number = 184756;
    const result: number = calculateCombination(n, k);
    expect(result).toBe(expected);
  });

  // Test case 7: Combination with floating-point inputs
  it('7. should throw an error for floating-point inputs', () => {
    const n: number = 5.5;
    const k: number = 3;
    expect(() => calculateCombination(n, k)).toThrow(
      'Both n and k must be integers',
    );
  });

  // Test case 8: Combination with negative inputs
  it('8. should throw an error for negative inputs', () => {
    const n: number = -5;
    const k: number = 3;
    expect(() => calculateCombination(n, k)).toThrow(
      'Both n and k must be non-negative integers',
    );
  });

  // Test case 9: Combination with NaN inputs
  it('9. should throw an error for NaN inputs', () => {
    expect(() => calculateCombination(NaN, 3)).toThrow(
      'Both n and k must be numbers',
    );
    expect(() => calculateCombination(5, NaN)).toThrow(
      'Both n and k must be numbers',
    );
  });
});
