/**
 * Calculates the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 *
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The greatest common divisor (GCD) of a and b (always non-negative).
 *
 * @throws {Error} If a or b is not a valid integer.
 *
 * @example
 * // Basic GCD
 * gcd(12, 15); // 3 (both divisible by 3)
 * gcd(8, 12); // 4 (both divisible by 4)
 * gcd(21, 14); // 7 (both divisible by 7)
 *
 * @example
 * // Coprime numbers (GCD = 1)
 * gcd(7, 13); // 1 (no common divisors except 1)
 * gcd(15, 28); // 1
 *
 * @example
 * // One number is zero
 * gcd(0, 5); // 5 (GCD with 0 is the other number)
 * gcd(10, 0); // 10
 *
 * @example
 * // Negative numbers (result is always positive)
 * gcd(-12, 15); // 3
 * gcd(12, -15); // 3
 * gcd(-12, -15); // 3
 *
 * @note GCD is also known as the greatest common factor (GCF) or highest common factor (HCF).
 * @note Uses the Euclidean algorithm, which is efficient and recursive.
 * @note The result is always non-negative, even when inputs are negative.
 * @note GCD(a, 0) = |a| for any non-zero a.
 * @note Common use cases: simplifying fractions, finding common denominators, modular arithmetic.
 *
 * @complexity Time: O(log(min(a, b))), Space: O(log(min(a, b))) due to recursion
 */
export function gcd(a: number, b: number): number {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Both a and b must be numbers');
  }
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('Both a and b must be integers');
  }
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}
