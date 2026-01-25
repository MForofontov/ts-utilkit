import { calculatePermutation } from '../src/combinatoricsFunctions/calculatePermutation';

describe('calculatePermutation', () => {
  // Test case 1: Permutation of 5 items taken 3 at a time
  it('1. should return the correct permutation for 5 items taken 3 at a time', () => {
    const n: number = 5;
    const k: number = 3;
    const expected: number = 60;
    const result: number = calculatePermutation(n, k);
    expect(result).toBe(expected);
  });

  // Test case 2: Permutation of 5 items taken 0 at a time
  it('2. should return 1 for 5 items taken 0 at a time', () => {
    const n: number = 5;
    const k: number = 0;
    const expected: number = 1;
    const result: number = calculatePermutation(n, k);
    expect(result).toBe(expected);
  });

  // Test case 3: Permutation of 10 items taken 1 at a time
  it('3. should return the correct permutation for 10 items taken 1 at a time', () => {
    const n: number = 10;
    const k: number = 1;
    const expected: number = 10;
    const result: number = calculatePermutation(n, k);
    expect(result).toBe(expected);
  });

  // Test case 4: Permutation of 7 items taken 7 at a time
  it('4. should return the correct permutation for 7 items taken 7 at a time', () => {
    const n: number = 7;
    const k: number = 7;
    const expected: number = 5040;
    const result: number = calculatePermutation(n, k);
    expect(result).toBe(expected);
  });

  // Test case 5: Permutation with k greater than n
  it('5. should return 0 when k is greater than n', () => {
    const n: number = 5;
    const k: number = 6;
    const expected: number = 0;
    const result: number = calculatePermutation(n, k);
    expect(result).toBe(expected);
  });

  // Test case 6: Permutation of 20 items taken 10 at a time
  it('6. should return extremely large results', () => {
    const n: number = 20;
    const k: number = 10;
    const expected: number = 670442572800;
    const result: number = calculatePermutation(n, k);
    expect(result).toBe(expected);
  });

  // Test case 7: Permutation with floating-point inputs
  it('7. should throw an error for floating-point inputs', () => {
    const n: number = 5.5;
    const k: number = 3;
    expect(() => calculatePermutation(n, k)).toThrow(
      'Both n and k must be integers',
    );
  });

  // Test case 8: Permutation with negative inputs
  it('8. should throw an error for negative inputs', () => {
    const n: number = -5;
    const k: number = 3;
    expect(() => calculatePermutation(n, k)).toThrow(
      'Both n and k must be non-negative integers',
    );
  });

  // Test case 9: Permutation with NaN inputs
  it('9. should throw an error for NaN inputs', () => {
    expect(() => calculatePermutation(NaN, 3)).toThrow(
      'Both n and k must be numbers',
    );
    expect(() => calculatePermutation(5, NaN)).toThrow(
      'Both n and k must be numbers',
    );
  });
});
