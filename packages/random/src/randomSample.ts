/**
 * Selects a random sample of elements from an array without replacement.
 *
 * @template T - The type of array elements.
 * @param array - The array to sample from.
 * @param count - The number of elements to sample.
 * @returns An array of randomly selected elements (without duplicates).
 *
 * @throws {TypeError} If array is not an array.
 * @throws {TypeError} If count is not a number.
 * @throws {Error} If array is empty.
 * @throws {Error} If count is NaN.
 * @throws {Error} If count is negative or not an integer.
 * @throws {Error} If count is greater than array length.
 *
 * @example
 * // Pick 3 random numbers
 * randomSample([1, 2, 3, 4, 5], 3); // [2, 5, 1]
 *
 * @example
 * // Pick random cards
 * randomSample(['♠', '♣', '♥', '♦'], 2); // ['♥', '♠']
 *
 * @example
 * // Pick all elements (shuffled)
 * randomSample([1, 2, 3], 3); // [3, 1, 2]
 *
 * @note Uses Fisher-Yates shuffle algorithm for unbiased sampling.
 * @note Does not modify the original array.
 * @note Elements in result maintain relative order from original array.
 *
 * @complexity Time: O(n), Space: O(n) where n is count
 */
export function randomSample<T>(array: T[], count: number): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }
  if (typeof count !== 'number') {
    throw new TypeError(`count must be a number, got ${typeof count}`);
  }
  if (array.length === 0) {
    throw new Error('array cannot be empty');
  }
  if (isNaN(count)) {
    throw new Error('count must be a valid number, not NaN');
  }
  if (!Number.isInteger(count)) {
    throw new Error('count must be an integer');
  }
  if (count < 0) {
    throw new Error('count must be non-negative');
  }
  if (count > array.length) {
    throw new Error('count cannot exceed array length');
  }

  // Create a copy of the array to avoid modifying the original
  const copy = [...array];
  const result: T[] = [];

  // Fisher-Yates shuffle for first 'count' elements
  for (let i = 0; i < count; i++) {
    const randomIndex = i + Math.floor(Math.random() * (copy.length - i));
    // Swap
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
    result.push(copy[i]);
  }

  return result;
}
