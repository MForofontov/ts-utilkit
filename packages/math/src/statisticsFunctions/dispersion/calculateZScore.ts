/**
 * Calculates the standard score (z-score) of a single value.
 * The z-score expresses how many standard deviations a value is from the mean.
 *
 * @param value - The data point to score.
 * @param mean - The population or sample mean.
 * @param stdDev - The standard deviation of the distribution. Must be ≥ 0.
 * @returns The z-score: `(value - mean) / stdDev`. Returns NaN when stdDev is 0
 *   (all values in the distribution are identical — the score is undefined).
 *
 * @throws {Error} If value is NaN.
 * @throws {Error} If mean is NaN.
 * @throws {Error} If stdDev is NaN.
 * @throws {Error} If stdDev is negative.
 *
 * @example
 * // Value equal to the mean — z-score is 0
 * calculateZScore(5, 5, 2); // Returns 0
 *
 * @example
 * // One standard deviation above the mean
 * calculateZScore(7, 5, 2); // Returns 1
 *
 * @example
 * // Two standard deviations below the mean
 * calculateZScore(1, 5, 2); // Returns -2
 *
 * @example
 * // Zero standard deviation — degenerate distribution
 * calculateZScore(5, 5, 0); // Returns NaN
 *
 * @note A positive z-score indicates the value is above the mean;
 * a negative z-score indicates it is below.
 * @note Typically |z| > 3 is considered a statistical outlier.
 * @note Use calculateAverage and calculateStandardDeviation from this library
 * to derive mean and stdDev from an array before calling this function.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateZScore(
  value: number,
  mean: number,
  stdDev: number,
): number {
  if (isNaN(value)) {
    throw new Error('value must be a valid number, not NaN');
  }
  if (isNaN(mean)) {
    throw new Error('mean must be a valid number, not NaN');
  }
  if (isNaN(stdDev)) {
    throw new Error('stdDev must be a valid number, not NaN');
  }
  if (stdDev < 0) {
    throw new Error(`stdDev must be non-negative, got ${stdDev}`);
  }
  if (stdDev === 0) {
    return NaN;
  }
  return (value - mean) / stdDev;
}
