import { sumArrayElements } from '../../../../array/src/sumArrayElements';

/**
 * Calculates the arithmetic mean (average) of all numbers in an array.
 *
 * @param arr - The array of numbers to calculate the average from.
 * @returns The arithmetic mean of the array values. Returns NaN for empty arrays.
 *
 * @example
 * // Basic usage
 * calculateAverage([1, 2, 3, 4, 5]); // Returns 3
 *
 * @example
 * // With negative numbers
 * calculateAverage([-10, 0, 10]); // Returns 0
 *
 * @example
 * // Empty array
 * calculateAverage([]); // Returns NaN
 *
 * @example
 * // Single value
 * calculateAverage([42]); // Returns 42
 *
 * @note This function delegates to sumArrayElements for the summation,
 * then divides by the array length to get the average.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateAverage(arr: number[]): number {
  // Get the total sum of the array
  const total = sumArrayElements(arr);
  // If the array is not empty, return the average, otherwise return 0
  return arr.length ? total / arr.length : NaN;
}
