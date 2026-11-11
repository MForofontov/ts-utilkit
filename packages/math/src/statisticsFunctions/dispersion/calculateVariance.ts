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
 * not the sample variance (which would divide by n-1).
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateVariance(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }

  let mean = 0;
  let sumOfSquares = 0;

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const delta = value - mean;
    mean += delta / (i + 1);
    sumOfSquares += delta * (value - mean);
  }

  return sumOfSquares / arr.length;
}
