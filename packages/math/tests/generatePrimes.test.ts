import { generatePrimes } from '../src/numberTheoryFunctions/generatePrimes';

/**
 * Unit tests for the generatePrimes function.
 */
describe('generatePrimes', () => {
  // Test case 1: Normal usage with moderate limit
  it('1. should generate all prime numbers up to 10', () => {
    const result = generatePrimes(10);
    expect(result).toEqual([2, 3, 5, 7]);
  });

  // Test case 2: Normal usage with larger limit
  it('2. should generate all prime numbers up to 20', () => {
    const result = generatePrimes(20);
    expect(result).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });

  // Test case 3: Edge case - limit is 2 (smallest prime)
  it('3. should return [2] when limit is 2', () => {
    expect(generatePrimes(2)).toEqual([2]);
  });

  // Test case 4: Edge case - limit less than 2 returns empty array
  it('4. should return empty array when limit is less than 2', () => {
    expect(generatePrimes(1)).toEqual([]);
    expect(generatePrimes(0)).toEqual([]);
    expect(generatePrimes(-5)).toEqual([]);
  });

  // Test case 5: Boundary condition - limit is 3
  it('5. should return [2, 3] when limit is 3', () => {
    expect(generatePrimes(3)).toEqual([2, 3]);
  });

  // Test case 6: Normal usage - limit is 30
  it('6. should generate all prime numbers up to 30', () => {
    expect(generatePrimes(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  // Test case 7: Normal usage - limit is 50
  it('7. should generate all prime numbers up to 50', () => {
    expect(generatePrimes(50)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]);
  });

  // Test case 8: Verify all returned numbers are actually prime
  it('8. should return only prime numbers', () => {
    const isPrime = (n: number) => {
      if (n < 2) return false;
      if (n === 2) return true;
      if (n % 2 === 0) return false;
      for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
      return true;
    };
    generatePrimes(100).forEach((n) => expect(isPrime(n)).toBe(true));
  });

  // Test case 9: Correct count of primes
  it('9. should return correct number of primes for known values', () => {
    expect(generatePrimes(10).length).toBe(4);
    expect(generatePrimes(20).length).toBe(8);
    expect(generatePrimes(100).length).toBe(25);
  });

  // Test case 10: Performance test
  it('10. should handle larger limits efficiently', () => {
    const start = performance.now();
    const result = generatePrimes(1000);
    expect(performance.now() - start).toBeLessThan(100);
    expect(result.length).toBe(168);
    expect(result[0]).toBe(2);
    expect(result[result.length - 1]).toBe(997);
  });

  // Test case 11: Result is in ascending order
  it('11. should return primes in ascending order', () => {
    const result = generatePrimes(50);
    for (let i = 1; i < result.length; i++) {
      expect(result[i]).toBeGreaterThan(result[i - 1]);
    }
  });

  // Test case 12: Negative integer returns empty array
  it('12. should return empty array for negative integer', () => {
    expect(generatePrimes(-10)).toEqual([]);
  });

  // Test case 13: No duplicates
  it('13. should not contain duplicate primes', () => {
    const result = generatePrimes(100);
    expect(result.length).toBe(new Set(result).size);
  });

  // Test case 14: Limit is inclusive when prime
  it('14. should include the limit if it is prime', () => {
    const result = generatePrimes(13);
    expect(result).toContain(13);
    expect(result[result.length - 1]).toBe(13);
  });

  // Test case 15: Limit not included if composite
  it('15. should not include the limit if it is not prime', () => {
    const result = generatePrimes(15);
    expect(result).not.toContain(15);
    expect(result[result.length - 1]).toBe(13);
  });

  // Test case 16: Prime right below limit is included
  it('16. should include 97 as the largest prime up to 100', () => {
    const result = generatePrimes(100);
    expect(result).toContain(97);
    expect(result[result.length - 1]).toBe(97);
  });

  // Error case: non-integer throws RangeError
  it('17. should throw RangeError for non-integer limit', () => {
    expect(() => generatePrimes(10.5)).toThrow(RangeError);
  });

  // Error case: NaN throws RangeError
  it('18. should throw RangeError for NaN', () => {
    expect(() => generatePrimes(NaN)).toThrow(RangeError);
  });

  // Error case: float values throw RangeError
  it('19. should throw RangeError for floating point limits', () => {
    [3.14, 7.5, 100.1].forEach((limit) => {
      expect(() => generatePrimes(limit)).toThrow(RangeError);
    });
  });
});
