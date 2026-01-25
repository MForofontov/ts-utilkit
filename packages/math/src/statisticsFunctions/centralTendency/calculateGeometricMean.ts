import { calculateProduct } from './calculateProduct';

/**
 * Calculates the geometric mean of an array of positive numbers.
 *
 * @param arr - The array of numbers to calculate the geometric mean from.
 * @returns The geometric mean of the array values. Returns NaN for empty arrays or if any number is non-positive.
 *
 * @example
 * // Basic usage
 * calculateGeometricMean([1, 3, 9, 27]); // Returns 6
 *
 * @example
 * // Contains zero or negative numbers
 * calculateGeometricMean([1, 0, 2]); // Returns NaN
 * calculateGeometricMean([-1, 2, 3]); // Returns NaN
 *
 * @example
 * // Real-world: Calculate average growth rate
 * const growthRates = [1.05, 1.10, 1.08]; // 5%, 10%, 8% growth
 * calculateGeometricMean(growthRates); // ~1.0766 (7.66% average growth)
 *
 * @note The geometric mean is only defined for positive numbers.
 * @note Formula: nth root of the product of n numbers.
 * @note Useful for calculating average rates of change and investment returns.
 * @note Returns NaN for empty arrays or arrays containing non-positive values.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateGeometricMean(arr: number[]): number {
  if (arr.length === 0 || arr.some((num) => num <= 0)) {
    return NaN;
  }

  const product: number = calculateProduct(arr);
  return Math.pow(product, 1 / arr.length);
}
