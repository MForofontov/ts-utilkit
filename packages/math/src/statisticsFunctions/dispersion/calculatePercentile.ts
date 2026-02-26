/**
 * Calculates the p-th percentile of a numeric array using linear interpolation.
 * The p-th percentile is the value below which p percent of the data falls.
 *
 * @param arr - The array of numbers to calculate the percentile from.
 * @param p - The percentile to compute, in the range [0, 100].
 * @returns The p-th percentile value. Returns NaN for an empty array.
 *
 * @throws {Error} If p is NaN.
 * @throws {Error} If p is less than 0 or greater than 100.
 *
 * @example
 * // Median (50th percentile)
 * calculatePercentile([1, 2, 3, 4, 5], 50); // Returns 3
 *
 * @example
 * // Quartiles
 * calculatePercentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 25); // Returns 3.25
 * calculatePercentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 75); // Returns 7.75
 *
 * @example
 * // Boundary percentiles
 * calculatePercentile([10, 20, 30, 40, 50], 0);   // Returns 10 (minimum)
 * calculatePercentile([10, 20, 30, 40, 50], 100); // Returns 50 (maximum)
 *
 * @example
 * // Empty array
 * calculatePercentile([], 50); // Returns NaN
 *
 * @note Uses the inclusive linear interpolation method (same as Excel's PERCENTILE.INC
 * and Python's numpy.percentile with interpolation="linear").
 * @note The input array is sorted internally; the original array is not mutated.
 * @note For a single-element array, every percentile returns that element.
 *
 * @complexity Time: O(n log n), Space: O(n) — due to sorting a copy of the array
 */
export function calculatePercentile(arr: number[], p: number): number {
  if (isNaN(p)) {
    throw new Error('p must be a valid number, not NaN');
  }
  if (p < 0 || p > 100) {
    throw new Error(
      `p must be in the range [0, 100], got ${p}`,
    );
  }
  if (arr.length === 0) {
    return NaN;
  }

  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) {
    return sorted[lower];
  }

  // Linear interpolation between the two surrounding values
  return sorted[lower] + (index - lower) * (sorted[upper] - sorted[lower]);
}
