import { calculateVariance } from './calculateVariance';

/**
 * Calculates the standard deviation of an array of numbers.
 * Standard deviation measures the amount of variation or dispersion in a set of values.
 * A low standard deviation indicates values tend to be close to the mean, while a high
 * standard deviation indicates values are spread out over a wider range.
 *
 * @param arr - The array of numbers to calculate standard deviation for.
 * @returns The standard deviation value. Returns NaN for empty arrays or if variance calculation fails.
 *
 * @example
 * // Basic usage
 * calculateStandardDeviation([1, 2, 3, 4, 5]); // Returns ~1.414
 *
 * @example
 * // Array with identical values
 * calculateStandardDeviation([7, 7, 7, 7]); // Returns 0
 *
 * @example
 * // With negative numbers
 * calculateStandardDeviation([-2, 0, 2]); // Returns ~1.633
 *
 * @example
 * // Empty array
 * calculateStandardDeviation([]); // Returns NaN
 *
 * @note This function uses the calculateVariance function internally and
 * returns the square root of the variance. It uses the population standard
 * deviation formula (not the sample standard deviation).
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateStandardDeviation(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }

  const variance: number = calculateVariance(arr);
  return Math.sqrt(variance);
}
