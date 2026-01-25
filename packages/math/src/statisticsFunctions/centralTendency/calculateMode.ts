/**
 * Calculates the mode of an array of numbers.
 * The mode is the value(s) that appear most frequently in a dataset.
 * Unlike mean and median, a dataset can have multiple modes.
 *
 * @param arr - The array of numbers to find the mode(s) of.
 * @returns An array containing the mode(s) of the dataset, sorted in ascending order.
 *          If all values appear with equal frequency, returns all unique values.
 *
 * @example
 * // Single mode
 * calculateMode([1, 2, 2, 3, 4]); // Returns [2]
 *
 * @example
 * // Multiple modes (bimodal)
 * calculateMode([1, 2, 2, 3, 3, 4]); // Returns [2, 3]
 *
 * @example
 * // All values appear once (no clear mode)
 * calculateMode([1, 2, 3, 4, 5]); // Returns [1, 2, 3, 4, 5]
 *
 * @example
 * // Empty array
 * calculateMode([]); // Returns []
 *
 * @note The function returns multiple values when there are multiple modes.
 * The returned array is always sorted in ascending numerical order.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function calculateMode(arr: number[]): number[] {
  const frequency: { [key: string]: number } = {};
  arr.forEach((num: number) => {
    frequency[num] = (frequency[num] || 0) + 1;
  });

  const maxFreq: number = Math.max(...Object.values(frequency));
  return Object.keys(frequency)
    .filter((num: string) => frequency[num] === maxFreq)
    .map(Number)
    .sort((a: number, b: number) => a - b); // Ensure the result is sorted
}
