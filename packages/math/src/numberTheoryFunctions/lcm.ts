import { gcd } from './gcd';

/**
 * Calculates the least common multiple (LCM) of two numbers.
 *
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The least common multiple (LCM) of a and b (always non-negative).
 *
 * @throws {Error} If a or b is not a valid integer or both are zero.
 *
 * @example
 * // Basic LCM
 * lcm(12, 15); // 60 (smallest number divisible by both 12 and 15)
 * lcm(4, 6); // 12
 * lcm(3, 5); // 15
 *
 * @example
 * // One number is zero
 * lcm(0, 5); // 0 (LCM with 0 is 0)
 * lcm(10, 0); // 0
 *
 * @example
 * // Same numbers
 * lcm(7, 7); // 7
 * lcm(10, 10); // 10
 *
 * @example
 * // Negative numbers (result is always positive)
 * lcm(-12, 15); // 60
 * lcm(12, -15); // 60
 * lcm(-12, -15); // 60
 *
 * @note Formula: LCM(a, b) = |a × b| / GCD(a, b)
 * @note LCM is the smallest positive integer that is divisible by both a and b.
 * @note Uses the gcd() function internally for calculation.
 * @note The result is always non-negative, even when inputs are negative.
 * @note LCM(a, 0) = 0 for any a (by convention).
 * @note Common use cases: finding common denominators, synchronizing cycles, scheduling.
 *
 * @complexity Time: O(log(min(a, b))), Space: O(log(min(a, b))) (inherited from GCD)
 */
export function lcm(a: number, b: number): number {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Both a and b must be numbers');
  }
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('Both a and b must be integers');
  }
  if (a === 0 && b === 0) {
    throw new Error('LCM is not defined for both a and b being zero');
  }
  return Math.abs((a * b) / gcd(a, b));
}
