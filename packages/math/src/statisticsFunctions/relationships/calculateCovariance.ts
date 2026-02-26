import { calculateAverage } from '../centralTendency/calculateAverage';

/**
 * Calculates the population covariance of two numeric arrays.
 * Covariance measures the joint variability of two variables: positive covariance
 * means the variables tend to increase together; negative means one tends to
 * increase as the other decreases.
 *
 * @param x - The first array of numeric values.
 * @param y - The second array of numeric values.
 * @returns The population covariance of x and y. Returns NaN for empty arrays.
 *
 * @throws {Error} If x and y have different lengths.
 *
 * @example
 * // Positive covariance — variables increase together
 * calculateCovariance([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]); // Returns 4
 *
 * @example
 * // Negative covariance — variables move in opposite directions
 * calculateCovariance([1, 2, 3, 4, 5], [10, 8, 6, 4, 2]); // Returns -4
 *
 * @example
 * // No covariance — independent variables
 * calculateCovariance([1, 2, 3], [3, 3, 3]); // Returns 0
 *
 * @example
 * // Empty arrays
 * calculateCovariance([], []); // Returns NaN
 *
 * @note Uses population covariance (divides by n), not sample covariance (n-1).
 * For sample covariance multiply the result by n/(n-1).
 * @note Both arrays must have the same length; mismatched lengths throw an Error.
 * @note Formula: Σ((xᵢ - x̄)(yᵢ - ȳ)) / n
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function calculateCovariance(x: number[], y: number[]): number {
  if (x.length !== y.length) {
    throw new Error(
      `x and y must have the same length, got x.length=${x.length} y.length=${y.length}`,
    );
  }
  if (x.length === 0) {
    return NaN;
  }

  const meanX = calculateAverage(x);
  const meanY = calculateAverage(y);

  const sum = x.reduce(
    (acc, xi, i) => acc + (xi - meanX) * (y[i] - meanY),
    0,
  );

  return sum / x.length;
}
