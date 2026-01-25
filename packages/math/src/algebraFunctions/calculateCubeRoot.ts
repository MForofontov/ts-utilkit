/**
 * Calculates the cube root of a number (∛n), supporting both positive and negative numbers.
 *
 * @param n - The number to find the cube root of (can be positive, negative, or zero).
 * @returns The cube root of the number.
 *
 * @example
 * // Basic usage with positive numbers
 * calculateCubeRoot(27); // 3
 * calculateCubeRoot(8); // 2
 *
 * @example
 * // Negative numbers
 * calculateCubeRoot(-27); // -3
 * calculateCubeRoot(-8); // -2
 *
 * @example
 * // Edge cases
 * calculateCubeRoot(0); // 0
 * calculateCubeRoot(1); // 1
 * calculateCubeRoot(-1); // -1
 *
 * @example
 * // Non-perfect cubes
 * calculateCubeRoot(10); // 2.154434690031884
 * calculateCubeRoot(100); // 4.641588833612779
 *
 * @example
 * // Real-world: Volume to side length
 * const volume = 125; // cubic meters
 * const sideLength = calculateCubeRoot(volume); // 5 meters
 *
 * @note Wraps Math.cbrt() with input validation for consistency.
 * @note Unlike square roots, cube roots of negative numbers are defined and negative.
 * @note The cube root of 0 is 0, and the cube root of 1 is 1.
 * @note Useful for calculating dimensions from volume (e.g., finding cube side length).
 * @note More precise than Math.pow(n, 1/3) for negative numbers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCubeRoot(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  return Math.cbrt(n);
}
