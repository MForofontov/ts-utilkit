/**
 * Checks if a number is a prime number.
 *
 * @param n - The number to check (must be an integer).
 * @returns True if the number is prime, false otherwise.
 *
 * @throws {Error} If n is not a valid number.
 *
 * @example
 * // Prime numbers
 * isPrime(2); // true (smallest prime)
 * isPrime(3); // true
 * isPrime(5); // true
 * isPrime(7); // true
 * isPrime(11); // true
 *
 * @example
 * // Non-prime numbers
 * isPrime(1); // false (1 is not prime by definition)
 * isPrime(4); // false (2 × 2)
 * isPrime(10); // false (2 × 5)
 * isPrime(15); // false (3 × 5)
 *
 * @example
 * // Edge cases
 * isPrime(0); // false
 * isPrime(-5); // false (negative numbers are not prime)
 * isPrime(2.5); // false (non-integers are not prime)
 *
 * @example
 * // Large primes
 * isPrime(97); // true
 * isPrime(100); // false
 *
 * @note A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.
 * @note By definition, 1 is not considered a prime number.
 * @note Negative numbers and non-integers are not prime.
 * @note Uses trial division up to √n for efficiency.
 * @note Common use cases: cryptography, number theory, algorithm optimization.
 *
 * @complexity Time: O(√n), Space: O(1)
 */
export function isPrime(n: number): boolean {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n) || n <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
