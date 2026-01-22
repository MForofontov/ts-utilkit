import { calculateBinomialCoefficient } from '../src/combinatoricsFunctions/calculateBinomialCoefficient';

describe('calculateBinomialCoefficient', () => {
  // Test case 1: Binomial coefficient of 5 choose 3
  it('1. should return the correct binomial coefficient for 5 choose 3', () => {
    const n: number = 5;
    const k: number = 3;
    const expected: number = 10;
    const result: number = calculateBinomialCoefficient(n, k);
    expect(result).toBe(expected);
  });

  // Test case 2: Binomial coefficient of 5 choose 0
  it('2. should return 1 for 5 choose 0', () => {
    const n: number = 5;
    const k: number = 0;
    const expected: number = 1;
    const result: number = calculateBinomialCoefficient(n, k);
    expect(result).toBe(expected);
  });

  // Test case 3: Binomial coefficient of 10 choose 1
  it('3. should return the correct binomial coefficient for 10 choose 1', () => {
    const n: number = 10;
    const k: number = 1;
    const expected: number = 10;
    const result: number = calculateBinomialCoefficient(n, k);
    expect(result).toBe(expected);
  });

  // Test case 4: Binomial coefficient of 7 choose 7
  it('4. should return the correct binomial coefficient for 7 choose 7', () => {
    const n: number = 7;
    const k: number = 7;
    const expected: number = 1;
    const result: number = calculateBinomialCoefficient(n, k);
    expect(result).toBe(expected);
  });

  // Test case 5: Binomial coefficient with k greater than n
  it('5. should return 0 when k is greater than n', () => {
    const n: number = 5;
    const k: number = 6;
    const expected: number = 0;
    const result: number = calculateBinomialCoefficient(n, k);
    expect(result).toBe(expected);
  });

  // Test case 6: Binomial coefficient of 20 choose 10
  it('6. should return the correct binomial coefficient for 20 choose 10', () => {
    const n: number = 20;
    const k: number = 10;
    const expected: number = 184756;
    const result: number = calculateBinomialCoefficient(n, k);
    expect(result).toBe(expected);
  });

  // Test case 7: Binomial coefficient with floating-point inputs
  it('7. should throw an error for floating-point inputs', () => {
    const n: number = 5.5;
    const k: number = 3;
    expect(() => calculateBinomialCoefficient(n, k)).toThrow(
      'Both n and k must be integers',
    );
  });

  // Test case 8: Binomial coefficient with negative inputs
  it('8. should throw an error for negative inputs', () => {
    const n: number = -5;
    const k: number = 3;
    expect(() => calculateBinomialCoefficient(n, k)).toThrow(
      'Both n and k must be non-negative integers',
    );
  });

  // Test case 9: Binomial coefficient with NaN inputs
  it('9. should throw an error for NaN inputs', () => {
    expect(() => calculateBinomialCoefficient(NaN, 3)).toThrow(
      'Both n and k must be numbers',
    );
    expect(() => calculateBinomialCoefficient(5, NaN)).toThrow(
      'Both n and k must be numbers',
    );
  });
});
