/**
 * Checks if a number is a perfect square (a number that equals some integer squared).
 *
 * @param n - The number to check (must be non-negative).
 * @returns True if the number is a perfect square, false otherwise.
 *
 * @example
 * // Perfect squares
 * isPerfectSquare(16); // true (4²)
 * isPerfectSquare(25); // true (5²)
 * isPerfectSquare(144); // true (12²)
 *
 * @example
 * // Non-perfect squares
 * isPerfectSquare(15); // false
 * isPerfectSquare(50); // false
 * isPerfectSquare(99); // false
 *
 * @example
 * // Edge cases
 * isPerfectSquare(0); // true (0²)
 * isPerfectSquare(1); // true (1²)
 * isPerfectSquare(2); // false
 *
 * @example
 * // Large numbers
 * isPerfectSquare(10000); // true (100²)
 * isPerfectSquare(10001); // false
 *
 * @example
 * // Validation use case
 * const gridSize = 64;
 * if (isPerfectSquare(gridSize)) {
 *   const rowCount = Math.sqrt(gridSize); // 8x8 grid
 * }
 *
 * @note Uses Math.sqrt() and checks if the result is an integer.
 * @note Returns true for 0 and 1, as they are perfect squares (0² = 0, 1² = 1).
 * @note Returns false for negative numbers (no real square roots).
 * @note Useful for grid layouts, array reshaping, and mathematical validations.
 * @note More efficient than iterating to find if any integer squared equals n.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isPerfectSquare(n: number): boolean {
  return Number.isInteger(Math.sqrt(n));
}
