import { calculateCovariance } from './calculateCovariance';
import { calculateStandardDeviation } from '../dispersion/calculateStandardDeviation';

/**
 * Calculates the Pearson correlation coefficient of two numeric arrays.
 * The correlation coefficient measures the linear relationship between two variables,
 * ranging from -1 (perfect negative correlation) to +1 (perfect positive correlation).
 * A value of 0 indicates no linear correlation.
 *
 * @param x - The first array of numeric values.
 * @param y - The second array of numeric values.
 * @returns The Pearson correlation coefficient in [-1, 1]. Returns NaN for empty arrays
 *   or when either array has zero standard deviation (constant values).
 *
 * @throws {Error} If x and y have different lengths.
 *
 * @example
 * // Perfect positive correlation
 * calculateCorrelation([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]); // Returns 1
 *
 * @example
 * // Perfect negative correlation
 * calculateCorrelation([1, 2, 3, 4, 5], [10, 8, 6, 4, 2]); // Returns -1
 *
 * @example
 * // No linear correlation (independent)
 * calculateCorrelation([1, 2, 3], [3, 3, 3]); // Returns NaN (constant y)
 *
 * @example
 * // Empty arrays
 * calculateCorrelation([], []); // Returns NaN
 *
 * @note Formula: cov(x, y) / (σx · σy), using population standard deviation.
 * @note Returns NaN rather than throwing when the distribution is degenerate
 * (std dev of 0), consistent with the rest of the statistics module.
 * @note Both arrays must have the same length; mismatched lengths throw an Error.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length) {
    throw new Error(
      `x and y must have the same length, got x.length=${x.length} y.length=${y.length}`,
    );
  }
  if (x.length === 0) {
    return NaN;
  }

  const stdX = calculateStandardDeviation(x);
  const stdY = calculateStandardDeviation(y);

  if (stdX === 0 || stdY === 0) {
    return NaN;
  }

  return calculateCovariance(x, y) / (stdX * stdY);
}
