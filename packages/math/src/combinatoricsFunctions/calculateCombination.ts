import { calculateFactorial } from './calculateFactorial';

/**
 * Calculates the combination of n items taken k at a time (n choose k, or C(n,k)).
 *
 * A combination is a selection of items where order does NOT matter. The formula is:
 * C(n,k) = n! / (k! × (n-k)!)
 *
 * @param n - The total number of items available.
 * @param k - The number of items to choose (must be ≤ n).
 * @returns The number of ways to choose k items from n items. Returns 0 if k > n.
 *
 * @throws {Error} If n or k is NaN.
 * @throws {Error} If n or k is not an integer.
 * @throws {Error} If n or k is negative.
 *
 * @example
 * // Basic combination
 * calculateCombination(5, 2); // 10 (choosing 2 from 5)
 *
 * @example
 * // Symmetric property: C(n,k) = C(n,n-k)
 * calculateCombination(5, 3); // 10 (same as choosing 2 from 5)
 *
 * @example
 * // Edge case: choosing all items
 * calculateCombination(4, 4); // 1 (only one way to choose all)
 *
 * @example
 * // Edge case: choosing none
 * calculateCombination(5, 0); // 1 (one way to choose nothing)
 *
 * @example
 * // Edge case: k > n
 * calculateCombination(3, 5); // 0 (impossible to choose more than available)
 *
 * @note Order does NOT matter in combinations: {A,B} is the same as {B,A}.
 * @note This is also known as the binomial coefficient.
 * @note For large values, results may overflow JavaScript's number precision limits.
 * @note Common use cases: lottery combinations, team selection, poker hands.
 * @note Uses factorial-based calculation; recursive implementation may hit call stack limits.
 *
 * @complexity Time: O(n), Space: O(n) due to factorial calculation
 */
export function calculateCombination(n: number, k: number): number {
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
  return (
    calculateFactorial(n) / (calculateFactorial(k) * calculateFactorial(n - k))
  );
}
