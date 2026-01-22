/**
 * Calculates the range of an array of numbers.
 * The range is the difference between the maximum and minimum values in the dataset.
 *
 * @param arr - The array of numbers to calculate the range from.
 * @returns The range (max - min) of the values. Returns NaN for empty arrays.
 *
 * @example
 * // Basic usage
 * calculateRange([1, 3, 5, 7]); // Returns 6 (7 - 1)
 *
 * @example
 * // With negative numbers
 * calculateRange([-10, 0, 10]); // Returns 20 (10 - (-10))
 *
 * @example
 * // All same values (no range)
 * calculateRange([5, 5, 5, 5]); // Returns 0
 *
 * @example
 * // Empty array
 * calculateRange([]); // Returns NaN
 *
 * @note The function uses Math.min and Math.max with the spread operator,
 * which may cause stack overflow for very large arrays.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateRange(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }

  const min: number = Math.min(...arr);
  const max: number = Math.max(...arr);
  return max - min;
}
