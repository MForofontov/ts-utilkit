/**
 * Calculates the absolute value of a number.
 *
 * @param n - The number to find the absolute value of.
 * @returns The absolute value of the number (always non-negative).
 *
 * @throws {Error} If n is NaN.
 *
 * @example
 * // Negative numbers
 * absoluteValue(-5); // 5
 * absoluteValue(-42.7); // 42.7
 * absoluteValue(-0.001); // 0.001
 *
 * @example
 * // Positive numbers (returned unchanged)
 * absoluteValue(5); // 5
 * absoluteValue(42.7); // 42.7
 *
 * @example
 * // Zero
 * absoluteValue(0); // 0
 * absoluteValue(-0); // 0
 *
 * @example
 * // Edge cases
 * absoluteValue(-Infinity); // Infinity
 * absoluteValue(Infinity); // Infinity
 *
 * @note Wraps the native Math.abs() function with input validation.
 * @note The absolute value represents the distance from zero on the number line.
 * @note For -0, the result is 0 (positive zero).
 * @note Useful for distance calculations, magnitude comparisons, and error margins.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function absoluteValue(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }

  return Math.abs(n);
}
