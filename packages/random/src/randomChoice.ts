/**
 * Picks a random element from an array.
 *
 * @template T - The type of array elements.
 * @param array - The array to pick from.
 * @returns A random element from the array.
 *
 * @throws {TypeError} If array is not an array.
 * @throws {Error} If array is empty.
 *
 * @example
 * // Pick random fruit
 * randomChoice(['apple', 'banana', 'orange']); // 'banana'
 *
 * @example
 * // Pick random number
 * randomChoice([1, 2, 3, 4, 5]); // 3
 *
 * @example
 * // Pick random object
 * randomChoice([{ id: 1 }, { id: 2 }]); // { id: 2 }
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Does not modify the original array.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomChoice<T>(array: T[]): T {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }
  if (array.length === 0) {
    throw new Error('array cannot be empty');
  }

  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
