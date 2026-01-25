/**
 * Calculates the factorial of a non-negative integer using a recursive implementation.
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
 * @note Uses a recursive implementation which may hit call stack limits for very large inputs.
 * @note For n > 170, JavaScript returns Infinity due to floating-point number limits.
 * @note JavaScript's maximum safe integer is 2^53 - 1; factorials exceed this quickly.
 * @note Consider using an iterative implementation or BigInt for large factorials.
 * @note Common use cases: permutations, combinations, probability calculations.
 *
 * @complexity Time: O(n), Space: O(n) due to recursive call stack
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
  if (n === 0) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}
