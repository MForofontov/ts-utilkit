/**
 * Calculates the median value of an array of numbers.
 * The median is the middle value when the array is sorted. For arrays with an even
 * number of elements, it's the average of the two middle values.
 *
 * @param arr - The array of numbers to find the median of.
 * @returns The median value. Returns NaN for empty arrays or arrays with only non-finite values.
 *
 * @example
 * // Odd number of elements
 * calculateMedian([3, 1, 4, 1, 5]); // Returns 3
 *
 * @example
 * // Even number of elements
 * calculateMedian([3, 1, 4, 1]); // Returns 2 (average of 1 and 3)
 *
 * @example
 * // Handles unsorted input
 * calculateMedian([9, 2, 5, 1, 3]); // Returns 3
 *
 * @example
 * // Filters out NaN and non-finite values
 * calculateMedian([1, 2, NaN, 3, Infinity]); // Returns 2
 *
 * @note The function filters out NaN and non-finite numbers before calculation.
 * If the array contains no valid numbers, it returns NaN.
 *
 * @complexity Time: O(n log n), Space: O(n) - Where n is array length (due to sorting)
 */
export function calculateMedian(arr: number[]): number {
  const filtered = arr.filter((num) => isFinite(num) && !isNaN(num));
  if (filtered.length === 0) return NaN;

  const sorted = filtered.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}
