import { calculateFactorial } from './calculateFactorial';

/**
 * Calculates the permutation of n items taken k at a time (nPk or P(n,k)).
 *
 * A permutation is an arrangement of items where order matters. The formula is:
 * P(n,k) = n! / (n-k)!
 *
 * @param n - The total number of items available.
 * @param k - The number of items to arrange (must be ≤ n).
 * @returns The number of ways to arrange k items from n items (nPk). Returns 0 if k > n.
 *
 * @throws {Error} If n or k is NaN.
 * @throws {Error} If n or k is not an integer.
 * @throws {Error} If n or k is negative.
 *
 * @example
 * // Basic permutation
 * calculatePermutation(5, 2); // 20 (5!/(5-2)! = 120/6)
 *
 * @example
 * // Full permutation (all items)
 * calculatePermutation(4, 4); // 24 (4!)
 *
 * @example
 * // Single item selection
 * calculatePermutation(10, 1); // 10
 *
 * @example
 * // Edge case: k > n
 * calculatePermutation(3, 5); // 0
 *
 * @example
 * // Edge case: k = 0
 * calculatePermutation(5, 0); // 1
 *
 * @note Order matters in permutations: selecting [A,B] is different from [B,A].
 * @note For large values, results may overflow JavaScript's number precision limits.
 * @note When k = n, this equals n! (factorial).
 * @note Common use cases: arranging people in a line, password possibilities, race placements.
 * @note Uses factorial-based calculation; recursive implementation may hit call stack limits.
 *
 * @complexity Time: O(n), Space: O(n) due to factorial calculation
 */
export function calculatePermutation(n: number, k: number): number {
  if (isNaN(n) || isNaN(k)) {
    throw new Error('Both n and k must be numbers');
  }
  if (!Number.isInteger(n) || !Number.isInteger(k)) {
    throw new Error('Both n and k must be integers');
  }
  if (n < 0 || k < 0) {
    throw new Error('Both n and k must be non-negative integers');
  }
  if (k > n) {
    return 0;
  }
  return calculateFactorial(n) / calculateFactorial(n - k);
}
