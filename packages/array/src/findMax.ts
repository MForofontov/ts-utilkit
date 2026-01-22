/**
 * Finds the highest value in an array of numbers.
 * Uses the native Math.max function with spread syntax to determine the maximum value.
 *
 * @param arr - The array of numbers to search through.
 * @returns The highest value in the array. Returns -Infinity for empty arrays.
 * @throws TypeError if the spread operator is used on an array that's too large.
 *
 * @example
 * // Basic usage
 * findMax([10, 22, 3, 14]); // Returns 22
 *
 * @example
 * // With negative numbers
 * findMax([-5, -10, -3]); // Returns -3
 *
 * @example
 * // Empty array
 * findMax([]); // Returns -Infinity
 *
 * @example
 * // Single element
 * findMax([42]); // Returns 42
 *
 * @note This implementation uses the spread operator with Math.max, which has
 * a limitation on the size of the input array (usually around 100,000 elements
 * depending on the JavaScript engine). For very large arrays, consider using
 * a manual loop-based approach instead.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function findMax(arr: number[]): number {
  return Math.max(...arr);
}
