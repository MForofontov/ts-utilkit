import { isPrime } from '../src/numberTheoryFunctions/isPrime';

describe('isPrime', () => {
  // Test case 1: Check if a small prime number is identified correctly
  it('1. should return true for a small prime number', () => {
    const input: number = 7;
    const result: boolean = isPrime(input);
    expect(result).toBe(true);
  });

  // Test case 2: Check if a small non-prime number is identified correctly
  it('2. should return false for a small non-prime number', () => {
    const input: number = 10;
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 3: Check if a large prime number is identified correctly
  it('3. should return true for a large prime number', () => {
    const input: number = 104729; // 10000th prime number
    const result: boolean = isPrime(input);
    expect(result).toBe(true);
  });

  // Test case 4: Check if a large non-prime number is identified correctly
  it('4. should return false for a large non-prime number', () => {
    const input: number = 104728;
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 5: Check if zero is identified correctly
  it('5. should return false for zero', () => {
    const input: number = 0;
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 6: Check if one is identified correctly
  it('6. should return false for one', () => {
    const input: number = 1;
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 7: Check if a negative number is identified correctly
  it('7. should return false for a negative number', () => {
    const input: number = -7;
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 8: Check if a prime number just below a power of 10 is identified correctly
  it('8. should return true for a prime number just below a power of 10', () => {
    const input: number = 29; // Prime number just below 30
    const result: boolean = isPrime(input);
    expect(result).toBe(true);
  });

  // Test case 9: Check if a non-prime number just above a power of 10 is identified correctly
  it('9. should return false for a non-prime number just above a power of 10', () => {
    const input: number = 21; // Non-prime number just above 20
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 10: Check if a prime number that is a Mersenne prime is identified correctly
  it('10. should return true for a Mersenne prime number', () => {
    const input: number = 31; // 2^5 - 1
    const result: boolean = isPrime(input);
    expect(result).toBe(true);
  });

  // Test case 11: Check if a non-prime number that is a perfect square is identified correctly
  it('11. should return false for a non-prime number that is a perfect square', () => {
    const input: number = 49; // 7^2
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 12: Check if a prime number that is a twin prime is identified correctly
  it('12. should return true for a twin prime number', () => {
    const input: number = 11; // Twin prime with 13
    const result: boolean = isPrime(input);
    expect(result).toBe(true);
  });

  // Test case 13: Check if a non-prime number that is a product of two primes is identified correctly
  it('13. should return false for a non-prime number that is a product of two primes', () => {
    const input: number = 15; // 3 * 5
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 14: Check if a prime number that is a Sophie Germain prime is identified correctly
  it('14. should return true for a Sophie Germain prime number', () => {
    const input: number = 23; // 2 * 23 + 1 = 47 is also prime
    const result: boolean = isPrime(input);
    expect(result).toBe(true);
  });

  // Test case 15: Check if a non-prime number that is a factorial is identified correctly
  it('15. should return false for a non-prime number that is a factorial', () => {
    const input: number = 24; // 4!
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 16: Check if a floating-point number is identified correctly
  it('16. should return false for a floating-point number', () => {
    const input: number = 7.5;
    const result: boolean = isPrime(input);
    expect(result).toBe(false);
  });

  // Test case 17: Check if NaN throws an error
  it('17. should throw an error for NaN input', () => {
    const input: number = NaN;
    expect(() => isPrime(input)).toThrow('Input must be a number');
  });
});
