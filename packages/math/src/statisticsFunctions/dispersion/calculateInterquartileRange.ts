import { calculateMedian } from '../centralTendency/calculateMedian';

/**
 * Calculates the interquartile range (IQR) of a numeric array.
 * The IQR is the difference between the third quartile (Q3) and the first quartile (Q1).
 *
 * @param arr - The array of numbers to calculate the IQR from.
 * @returns The interquartile range. Returns NaN for empty arrays.
 *
 * @example
 * // Basic usage
 * calculateInterquartileRange([1, 2, 3, 4, 5, 6, 7, 8, 9]); // 4
 *
 * @example
 * // Even number of elements
 * calculateInterquartileRange([1, 2, 3, 4, 5, 6]); // 2.5
 *
 * @example
 * // Single value (no spread)
 * calculateInterquartileRange([5, 5, 5, 5]); // 0
 *
 * @example
 * // Empty array
 * calculateInterquartileRange([]); // NaN
 *
 * @example
 * // Real-world: Identifying outliers in test scores
 * const scores = [65, 70, 72, 75, 78, 80, 82, 85, 90, 95];
 * const iqr = calculateInterquartileRange(scores); // 13
 * // Outliers: values < Q1 - 1.5*IQR or > Q3 + 1.5*IQR
 *
 * @note This function sorts the input array and uses calculateMedian for quartile calculation.
 * @note The IQR measures the statistical spread of the middle 50% of data.
 * @note Used to detect outliers in box plots (values beyond Q1 - 1.5*IQR or Q3 + 1.5*IQR).
 * @note Resistant to extreme values, making it useful for skewed distributions.
 * @note The input array is copied before sorting to avoid mutation.
 *
 * @complexity Time: O(n log n), Space: O(n) - Where n is the array length (due to sorting)
 */
export function calculateInterquartileRange(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }

  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const lower = sorted.slice(0, mid);
  const upper =
    sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
  const q1 = calculateMedian(lower);
  const q3 = calculateMedian(upper);
  return q3 - q1;
}
