/**
 * Finds the smallest value in an array of numbers.
 * Uses the native Math.min function with spread syntax to determine the minimum value.
 *
 * @param arr - The array of numbers to search through.
 * @returns The smallest value in the array. Returns Infinity for empty arrays.
 * @throws TypeError if the spread operator is used on an array that's too large.
 *
 * @example
 * // Basic usage
 * findMin([10, 22, 3, 14]); // Returns 3
 *
 * @example
 * // With negative numbers
 * findMin([-5, -10, -3]); // Returns -10
 *
 * @example
 * // Empty array
 * findMin([]); // Returns Infinity
 *
 * @example
 * // Single element
 * findMin([42]); // Returns 42
 *
 * @note This implementation uses the spread operator with Math.min, which has
 * a limitation on the size of the input array (usually around 100,000 elements
 * depending on the JavaScript engine). For very large arrays, consider using
 * a manual loop-based approach instead.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function findMin(arr: number[]): number {
  return Math.min(...arr);
}
