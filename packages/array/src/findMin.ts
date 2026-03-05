/**
 * Finds the smallest value in an array of numbers.
 *
 * @param arr - The array of numbers to search through.
 * @returns The smallest value in the array. Returns Infinity for empty arrays.
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
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function findMin(arr: number[]): number {
  if (arr.length === 0) return Infinity;
  return arr.reduce((min, val) => {
    if (Number.isNaN(val) || Number.isNaN(min)) return NaN;
    return val < min ? val : min;
  }, arr[0]);
}
