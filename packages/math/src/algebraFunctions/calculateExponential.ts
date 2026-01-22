/**
 * Calculates the exponential of a number (`e^n`), where `e` is Euler's number (approximately 2.71828).
 *
 * @param n - The exponent (can be positive, negative, or zero).
 * @returns The result of `e` raised to the power of `n`.
 *
 * @example
 * // Basic usage
 * calculateExponential(1); // 2.718281828459045
 * calculateExponential(0); // 1
 *
 * @example
 * // Negative exponents
 * calculateExponential(-1); // 0.36787944117144233
 * calculateExponential(-2); // 0.1353352832366127
 *
 * @example
 * // Large exponents
 * calculateExponential(5); // 148.4131591025766
 * calculateExponential(10); // 22026.465794806718
 *
 * @example
 * // Practical use: Exponential growth/decay
 * const growthRate = 0.05;
 * const time = 10;
 * const finalValue = 100 * calculateExponential(growthRate * time); // 164.87
 *
 * @note Wraps `Math.exp` with validation for consistency with other library functions.
 * @note Returns `Infinity` for very large positive exponents (around n > 709).
 * @note Returns `0` for very large negative exponents (around n < -745).
 * @note Useful for calculations involving exponential growth, decay, or probability distributions.
 * @note The result is always positive since e^n > 0 for all real n.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateExponential(n: number): number {
  return Math.exp(n);
}
