/**
 * Finds the highest value in an array of numbers.
 *
 * @param arr - The array of numbers to search through.
 * @returns The highest value in the array. Returns -Infinity for empty arrays.
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
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function findMax(arr: number[]): number {
  if (arr.length === 0) return -Infinity;
  return arr.reduce((max, val) => {
    if (Number.isNaN(val) || Number.isNaN(max)) return NaN;
    return val > max ? val : max;
  }, arr[0]);
}
