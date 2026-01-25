import { isPerfectSquare } from '../src/numberTheoryFunctions/isPerfectSquare';

describe('isPerfectSquare', () => {
  // Test case 1: Check if a positive perfect square is identified correctly
  it('1. should return true for a positive perfect square', () => {
    const input: number = 16;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(true);
  });

  // Test case 2: Check if a positive non-perfect square is identified correctly
  it('2. should return false for a positive non-perfect square', () => {
    const input: number = 15;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(false);
  });

  // Test case 3: Check if zero is identified as a perfect square
  it('3. should return true for zero', () => {
    const input: number = 0;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(true);
  });

  // Test case 4: Check if a negative number is identified correctly
  it('4. should return false for a negative number', () => {
    const input: number = -16;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(false);
  });

  // Test case 5: Check if a large perfect square is identified correctly
  it('5. should return true for a large perfect square', () => {
    const input: number = 1000000;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(true);
  });

  // Test case 6: Check if a large non-perfect square is identified correctly
  it('6. should return false for a large non-perfect square', () => {
    const input: number = 1000001;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(false);
  });

  // Test case 7: Check if a small perfect square is identified correctly
  it('7. should return true for a small perfect square', () => {
    const input: number = 1;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(true);
  });

  // Test case 8: Check if a small non-perfect square is identified correctly
  it('8. should return false for a small non-perfect square', () => {
    const input: number = 2;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(false);
  });

  // Test case 9: Check if a floating-point number is identified correctly
  it('9. should return false for a floating-point number', () => {
    const input: number = 4.5;
    const result: boolean = isPerfectSquare(input);
    expect(result).toBe(false);
  });
});
