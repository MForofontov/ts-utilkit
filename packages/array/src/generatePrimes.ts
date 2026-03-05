/**
 * Generates an array of all prime numbers up to a specified limit using the Sieve of Eratosthenes algorithm.
 *
 * @deprecated This function has moved to `@ts-utilkit/math`. Import it from there:
 * `import { generatePrimes } from '@ts-utilkit/math'`
 * Will be removed from this package in the next major version.
 *
 * @param limit - The upper limit of the range to find prime numbers (inclusive).
 * @returns An array containing all prime numbers up to and including the limit.
 * @throws {RangeError} If the limit is not an integer.
 *
 * @example
 * generatePrimes(10); // [2, 3, 5, 7]
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
