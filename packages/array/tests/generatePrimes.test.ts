import { generatePrimes } from '../src/generatePrimes';

/**
 * Unit tests for the generatePrimes function.
 */
describe('generatePrimes', () => {
  // Test case 1: Normal usage with moderate limit
  it('1. should generate all prime numbers up to 10', () => {
    // Arrange
    const limit = 10;
    const expected = [2, 3, 5, 7];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Normal usage with larger limit
  it('2. should generate all prime numbers up to 20', () => {
    // Arrange
    const limit = 20;
    const expected = [2, 3, 5, 7, 11, 13, 17, 19];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Edge case - limit is 2 (smallest prime)
  it('3. should return [2] when limit is 2', () => {
    // Arrange
    const limit = 2;
    const expected = [2];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Edge case - limit less than 2
  it('4. should return empty array when limit is less than 2', () => {
    // Arrange & Act & Assert
    expect(generatePrimes(1)).toEqual([]);
    expect(generatePrimes(0)).toEqual([]);
    expect(generatePrimes(-5)).toEqual([]);
  });

  // Test case 5: Boundary condition - limit is 3
  it('5. should return [2, 3] when limit is 3', () => {
    // Arrange
    const limit = 3;
    const expected = [2, 3];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Normal usage - limit is 30
  it('6. should generate all prime numbers up to 30', () => {
    // Arrange
    const limit = 30;
    const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Normal usage - limit is 50
  it('7. should generate all prime numbers up to 50', () => {
    // Arrange
    const limit = 50;
    const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Verify all returned numbers are actually prime
  it('8. should return only prime numbers (verification)', () => {
    // Arrange
    const limit = 100;

    // Act
    const result = generatePrimes(limit);

    // Assert - verify each number is prime
    const isPrime = (num: number): boolean => {
      if (num < 2) return false;
      if (num === 2) return true;
      if (num % 2 === 0) return false;
      for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
      }
      return true;
    };

    result.forEach((num) => {
      expect(isPrime(num)).toBe(true);
    });
  });

  // Test case 9: Verify correct count of primes
  it('9. should return correct number of primes for known values', () => {
    // Arrange & Act & Assert
    // There are 25 primes up to 100
    expect(generatePrimes(100).length).toBe(25);

    // There are 4 primes up to 10
    expect(generatePrimes(10).length).toBe(4);

    // There are 8 primes up to 20
    expect(generatePrimes(20).length).toBe(8);
  });

  // Test case 10: Performance test with larger limit
  it('10. should handle larger limits efficiently', () => {
    // Arrange
    const limit = 1000;

    // Act
    const startTime = performance.now();
    const result = generatePrimes(limit);
    const endTime = performance.now();

    // Assert
    expect(result.length).toBe(168); // There are 168 primes up to 1000
    expect(result[0]).toBe(2); // First prime
    expect(result[result.length - 1]).toBe(997); // Last prime up to 1000
    expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
  });

  // Test case 11: Verify returned array is sorted
  it('11. should return primes in ascending order', () => {
    // Arrange
    const limit = 50;

    // Act
    const result = generatePrimes(limit);

    // Assert
    for (let i = 1; i < result.length; i++) {
      expect(result[i]).toBeGreaterThan(result[i - 1]);
    }
  });

  // Test case 12: Edge case - negative integer
  it('12. should return empty array for negative integer', () => {
    // Arrange
    const limit = -10;

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual([]);
  });

  // Test case 13: Verify no duplicates in result
  it('13. should not contain duplicate primes', () => {
    // Arrange
    const limit = 100;

    // Act
    const result = generatePrimes(limit);

    // Assert
    const uniqueResult = [...new Set(result)];
    expect(result.length).toBe(uniqueResult.length);
  });

  // Test case 14: Edge case - large prime numbers near limit
  it('14. should include prime numbers close to the limit', () => {
    // Arrange
    const limit = 100;

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toContain(97); // 97 is the largest prime up to 100
    expect(result[result.length - 1]).toBe(97);
  });

  // Test case 15: Verify first few primes are correct
  it('15. should correctly identify the first 10 prime numbers', () => {
    // Arrange
    const limit = 30;
    const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 16: Verify limit is inclusive
  it('16. should include the limit if it is prime', () => {
    // Arrange
    const limit = 13; // 13 is prime

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).toContain(13);
    expect(result[result.length - 1]).toBe(13);
  });

  // Test case 17: Verify limit is not included if not prime
  it('17. should not include the limit if it is not prime', () => {
    // Arrange
    const limit = 15; // 15 is not prime (3 * 5)

    // Act
    const result = generatePrimes(limit);

    // Assert
    expect(result).not.toContain(15);
    expect(result[result.length - 1]).toBe(13); // Last prime before 15
  });

  // Test case 18: Error case - non-integer limit
  it('18. should throw RangeError for non-integer limit', () => {
    // Arrange
    const limit = 10.5;
    const expectedMessage = 'Limit must be an integer';

    // Act & Assert
    expect(() => generatePrimes(limit)).toThrow(RangeError);
    expect(() => generatePrimes(limit)).toThrow(expectedMessage);
  });

  // Test case 19: Error case - float limit
  it('19. should throw RangeError for floating point limit', () => {
    // Arrange
    const limits = [3.14, 7.5, 100.1];

    // Act & Assert
    limits.forEach((limit) => {
      expect(() => generatePrimes(limit)).toThrow(RangeError);
      expect(() => generatePrimes(limit)).toThrow('Limit must be an integer');
    });
  });

  // Test case 20: Error case - NaN should throw error
  it('20. should throw RangeError for NaN', () => {
    // Arrange
    const limit = NaN;

    // Act & Assert
    expect(() => generatePrimes(limit)).toThrow(RangeError);
    expect(() => generatePrimes(limit)).toThrow('Limit must be an integer');
  });
});
