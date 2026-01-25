/**
 * Rounds a number up to the nearest integer (ceiling).
 *
 * @param n - The number to round up.
 * @returns The smallest integer greater than or equal to n.
 *
 * @throws {Error} If n is NaN.
 *
 * @example
 * // Basic usage
 * ceilValue(4.2); // 5
 * ceilValue(4.8); // 5
 * ceilValue(4.1); // 5
 *
 * @example
 * // Negative numbers
 * ceilValue(-4.2); // -4 (rounds toward positive infinity)
 * ceilValue(-4.8); // -4
 *
 * @example
 * // Edge cases
 * ceilValue(5); // 5 (already an integer)
 * ceilValue(0); // 0
 * ceilValue(-0); // 0 (normalizes -0 to 0)
 *
 * @example
 * // Special values
 * ceilValue(0.1); // 1
 * ceilValue(-0.1); // 0 (rounds up toward 0)
 *
 * @note Wraps Math.ceil() with input validation.
 * @note Always rounds toward positive infinity (upward on the number line).
 * @note For positive numbers, rounds to the next higher integer.
 * @note For negative numbers, rounds toward zero (less negative).
 * @note Converts -0 to 0 for consistency.
 * @note Useful for pagination, capacity calculations, and rounding up prices.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function ceilValue(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  const result = Math.ceil(n);
  return Object.is(result, -0) ? 0 : result;
}
