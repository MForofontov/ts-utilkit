const factorials: number[] = [1, 1];

/**
 * Calculates the factorial of a non-negative integer using cached iterative products.
 *
 * The factorial of n (denoted n!) is the product of all positive integers less than or equal to n.
 * By definition, 0! = 1.
 *
 * @param n - The non-negative integer to calculate the factorial of.
 * @returns The factorial of n (n!).
 *
 * @throws {Error} If n is NaN.
 * @throws {Error} If n is not an integer.
 * @throws {Error} If n is negative.
 *
 * @example
 * // Basic factorials
 * calculateFactorial(5); // 120 (5 × 4 × 3 × 2 × 1)
 *
 * @example
 * // Edge case: zero factorial
 * calculateFactorial(0); // 1
 *
 * @example
 * // Small values
 * calculateFactorial(1); // 1
 * calculateFactorial(3); // 6
 *
 * @example
 * // Moderate values
 * calculateFactorial(10); // 3628800
 *
 * @note Caches at most 171 ascending products; repeated calls reuse the same rounded results.
 * @note For n > 170, JavaScript returns Infinity due to floating-point number limits.
 * @note JavaScript's maximum safe integer is 2^53 - 1; factorials exceed this quickly.
 * @note Use BigInt arithmetic when exact large integer results are required.
 * @note Common use cases: permutations, combinations, probability calculations.
 *
 * @complexity Time: O(n) on first extension, O(1) for cached values; bounded Space: O(1)
 */
export function calculateFactorial(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  if (n > 170) return Infinity;
  for (let i = factorials.length; i <= n; i++) {
    factorials.push(factorials[i - 1] * i);
  }
  return factorials[n];
}
