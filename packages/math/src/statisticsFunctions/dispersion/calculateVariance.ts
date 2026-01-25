import { calculateAverage } from '../centralTendency/calculateAverage';

/**
 * Calculates the variance of an array of numbers.
 * Variance measures how far a set of numbers are spread out from their average value.
 * A variance of zero indicates that all values in the dataset are identical.
 *
 * @param arr - The array of numbers to calculate variance for.
 * @returns The variance of the numbers in the array. Returns NaN for empty arrays.
 *
 * @example
 * // Basic usage
 * calculateVariance([1, 2, 3, 4, 5]); // Returns 2
 *
 * @example
 * // Array with identical values
 * calculateVariance([7, 7, 7, 7]); // Returns 0
 *
 * @example
 * // With negative numbers
 * calculateVariance([-2, 0, 2]); // Returns ~2.67
 *
 * @example
 * // Empty array
 * calculateVariance([]); // Returns NaN
 *
 * @note This function calculates the population variance (dividing by n),
 * not the sample variance (which would divide by n-1). It uses the arithmetic
 * mean calculated by the calculateAverage function.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateVariance(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }

  const mean: number = calculateAverage(arr);
  const sumOfSquares: number = arr.reduce(
    (sum, num) => sum + Math.pow(num - mean, 2),
    0,
  );
  return sumOfSquares / arr.length;
}
