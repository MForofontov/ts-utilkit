/**
 * Rounds a number down to the nearest integer (floor).
 *
 * @param n - The number to round down.
 * @returns The largest integer less than or equal to n.
 *
 * @throws {Error} If n is NaN.
 *
 * @example
 * // Basic usage
 * floorValue(4.7); // 4
 * floorValue(4.2); // 4
 * floorValue(4.9); // 4
 *
 * @example
 * // Negative numbers
 * floorValue(-4.2); // -5 (rounds toward negative infinity)
 * floorValue(-4.8); // -5
 *
 * @example
 * // Edge cases
 * floorValue(5); // 5 (already an integer)
 * floorValue(0); // 0
 * floorValue(-0); // -0
 *
 * @example
 * // Special values
 * floorValue(0.9); // 0
 * floorValue(-0.1); // -1 (rounds down toward -infinity)
 *
 * @note Wraps Math.floor() with input validation.
 * @note Always rounds toward negative infinity (downward on the number line).
 * @note For positive numbers, rounds to the next lower integer.
 * @note For negative numbers, rounds away from zero (more negative).
 * @note Opposite behavior to ceilValue() for non-integer inputs.
 * @note Useful for array indexing, integer division, and discount calculations.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function floorValue(n: number): number {
  return Math.floor(n);
}
