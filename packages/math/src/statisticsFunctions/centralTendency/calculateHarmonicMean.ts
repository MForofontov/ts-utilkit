/**
 * Calculates the harmonic mean of an array of numbers.
 * The harmonic mean is useful for rates and ratios.
 *
 * @param arr - The array of numbers to calculate the harmonic mean from.
 * @returns The harmonic mean of the numbers. Returns NaN for empty arrays or if any value is zero.
 *
 * @example
 * // Basic usage
 * calculateHarmonicMean([1, 2, 4]); // ~1.714
 *
 * @example
 * // All same values
 * calculateHarmonicMean([5, 5, 5]); // 5
 *
 * @example
 * // Contains zero - undefined harmonic mean
 * calculateHarmonicMean([1, 0, 2]); // NaN
 *
 * @example
 * // Empty array
 * calculateHarmonicMean([]); // NaN
 *
 * @example
 * // Real-world: Average speed for round trip
 * // Trip 1: 60 mph, Trip 2: 40 mph
 * calculateHarmonicMean([60, 40]); // 48 mph (average speed)
 *
 * @note The harmonic mean is not defined for arrays containing zero.
 * @note Useful for calculating average rates (e.g., speed, price-to-earnings ratios).
 * @note Always less than or equal to the arithmetic and geometric means.
 * @note Best for data expressed as rates or ratios (e.g., speed, density).
 *
 * @complexity Time: O(n), Space: O(1) - Where n is the array length
 */
export function calculateHarmonicMean(arr: number[]): number {
  if (arr.length === 0 || arr.some((num) => num === 0)) {
    return NaN;
  }

  const reciprocalSum: number = arr.reduce((sum, num) => sum + 1 / num, 0);
  return arr.length / reciprocalSum;
}
