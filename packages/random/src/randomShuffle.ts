/**
 * Randomly shuffles an array using the Fisher-Yates algorithm.
 *
 * @template T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @param inPlace - Whether to shuffle in-place or return a new array (default: false).
 * @returns A shuffled array.
 *
 * @throws {TypeError} If array is not an array or inPlace is not a boolean.
 * @throws {Error} If array is empty.
 *
 * @example
 * // Shuffle and return new array
 * randomShuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4]
 *
 * @example
 * // Shuffle in-place
 * const arr = [1, 2, 3, 4, 5];
 * randomShuffle(arr, true); // arr is now shuffled
 *
 * @note Uses Fisher-Yates shuffle for uniform distribution.
 *
 * @complexity Time: O(n), Space: O(n) for new array or O(1) for in-place
 */
export function randomShuffle<T>(array: T[], inPlace: boolean = false): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }
  if (typeof inPlace !== 'boolean') {
    throw new TypeError(`inPlace must be a boolean, got ${typeof inPlace}`);
  }
  if (array.length === 0) {
    throw new Error('array cannot be empty');
  }

  const arr = inPlace ? array : [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
