/**
 * Rounds a number to the nearest integer using standard rounding rules.
 *
 * @param n - The number to round.
 * @returns The nearest integer to n (rounds half up for .5).
 *
 * @throws {Error} If n is NaN.
 *
 * @example
 * // Basic usage
 * roundValue(4.5); // 5 (rounds up)
 * roundValue(4.4); // 4 (rounds down)
 * roundValue(4.6); // 5 (rounds up)
 *
 * @example
 * // Negative numbers
 * roundValue(-4.5); // -4 (rounds toward zero for negative .5)
 * roundValue(-4.6); // -5 (rounds down)
 * roundValue(-4.4); // -4 (rounds up)
 *
 * @example
 * // Edge cases
 * roundValue(5); // 5 (already an integer)
 * roundValue(0); // 0
 * roundValue(-0); // 0 (normalizes -0 to 0)
 *
 * @example
 * // Midpoint behavior
 * roundValue(2.5); // 3 (rounds up)
 * roundValue(3.5); // 4 (rounds up)
 * roundValue(-2.5); // -2 (rounds toward zero)
 *
 * @note Wraps Math.round() with input validation.
 * @note Uses "round half up" (also called "round half towards positive infinity").
 * @note For positive .5 values, rounds away from zero (up).
 * @note For negative .5 values, rounds toward zero (up).
 * @note Converts -0 to 0 for consistency.
 * @note For more control over decimal places, use roundToDecimals() instead.
 * @note Common use in financial calculations, statistics, and general number rounding.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function roundValue(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  const result = Math.round(n);
  return Object.is(result, -0) ? 0 : result;
}
