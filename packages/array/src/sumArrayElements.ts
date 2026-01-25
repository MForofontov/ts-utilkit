/**
 * Calculates the sum of all elements in a number array.
 * Uses array.reduce() to efficiently calculate the sum with a single pass through the array.
 *
 * @param arr - The array of numbers to sum.
 * @returns The sum of the elements in the array. Returns 0 for an empty array.
 *
 * @example
 * // Basic usage
 * sumArrayElements([1, 2, 3, 4, 5]); // Returns 15
 *
 * @example
 * // With negative numbers
 * sumArrayElements([1, -2, 3, -4, 5]); // Returns 3
 *
 * @example
 * // Empty array
 * sumArrayElements([]); // Returns 0
 *
 * @example
 * // With floating point numbers
 * sumArrayElements([1.1, 2.2, 3.3]); // Returns 6.6 (might have small floating point precision errors)
 *
 * @note This function uses array.reduce() with an initial value of 0.
 * Be cautious with very large arrays as the sum might exceed Number.MAX_SAFE_INTEGER.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function sumArrayElements(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0);
}
