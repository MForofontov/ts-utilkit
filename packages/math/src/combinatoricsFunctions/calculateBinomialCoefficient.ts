import { calculateFactorial } from './calculateFactorial';

/**
 * Calculates the binomial coefficient (n choose k), also denoted as C(n,k) or ⁿCₖ.
 *
 * The binomial coefficient represents the number of ways to choose k items from n items
 * where order does not matter. It appears in the binomial theorem expansion and probability theory.
 * Formula: C(n,k) = n! / (k! × (n-k)!)
 *
 * @param n - The total number of items available.
 * @param k - The number of items to choose (must be ≤ n).
 * @returns The binomial coefficient C(n,k). Returns 0 if k > n.
 *
 * @throws {Error} If n or k is NaN.
 * @throws {Error} If n or k is not an integer.
 * @throws {Error} If n or k is negative.
 *
 * @example
 * // Basic binomial coefficient
 * calculateBinomialCoefficient(5, 2); // 10
 *
 * @example
 * // Pascal's triangle row 4
 * [0, 1, 2, 3, 4].map(k => calculateBinomialCoefficient(4, k)); // [1, 4, 6, 4, 1]
 *
 * @example
 * // Symmetric property
 * calculateBinomialCoefficient(7, 3); // 35
 * calculateBinomialCoefficient(7, 4); // 35 (same result)
 *
 * @example
 * // Edge cases
 * calculateBinomialCoefficient(5, 0); // 1
 * calculateBinomialCoefficient(5, 5); // 1
 * calculateBinomialCoefficient(3, 4); // 0
 *
 * @note This is mathematically equivalent to calculateCombination.
 * @note Binomial coefficients form Pascal's triangle: each value is sum of two values above it.
 * @note Symmetric property: C(n,k) = C(n,n-k).
 * @note For large values, results may overflow JavaScript's number precision limits.
 * @note Common use cases: binomial theorem expansion, probability distributions, combinatorics.
 * @note Uses factorial-based calculation; recursive implementation may hit call stack limits.
 *
 * @complexity Time: O(n), Space: O(n) due to factorial calculation
 */
export function calculateBinomialCoefficient(n: number, k: number): number {
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
