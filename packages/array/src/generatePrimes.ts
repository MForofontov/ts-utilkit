/**
 * Generates an array of all prime numbers up to a specified limit using the Sieve of Eratosthenes algorithm.
 * A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.
 *
 * @param limit - The upper limit of the range to find prime numbers (inclusive).
 * @returns An array containing all prime numbers up to and including the limit.
 * @throws {RangeError} If the limit is not an integer.
 *
 * @example
 * // Basic usage
 * generatePrimes(10); // Returns [2, 3, 5, 7]
 *
 * @example
 * // Empty result for small limits
 * generatePrimes(1); // Returns []
 *
 * @example
 * // Larger range
 * generatePrimes(20); // Returns [2, 3, 5, 7, 11, 13, 17, 19]
 *
 * @note This implementation uses the Sieve of Eratosthenes algorithm, which is efficient
 * for finding all primes up to a moderate limit. For very large limits, memory usage
 * may become a concern as the sieve requires O(n) space.
 *
 * @complexity Time: O(n log log n), Space: O(n) - Where n is the limit
 */
export function generatePrimes(limit: number): number[] {
  if (!Number.isInteger(limit)) {
    throw new RangeError('Limit must be an integer');
  }
  if (limit < 2) return [];

  const sieve: boolean[] = new Array<boolean>(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }

  return primes;
}
