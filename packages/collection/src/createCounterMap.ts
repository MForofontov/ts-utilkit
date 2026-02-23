/**
 * Counts the occurrences of each item in an array and returns a Map of item → count.
 *
 * @param items - The array of items to count.
 * @returns A Map where each key is a unique item from the array and the value is the number
 *   of times it appears.
 *
 * @throws {TypeError} If `items` is not an array.
 *
 * @example
 * // Count string occurrences
 * createCounterMap(['a', 'b', 'a', 'c', 'b', 'a']);
 * // Map { 'a' => 3, 'b' => 2, 'c' => 1 }
 *
 * @example
 * // Count number occurrences
 * createCounterMap([1, 2, 2, 3, 3, 3]);
 * // Map { 1 => 1, 2 => 2, 3 => 3 }
 *
 * @example
 * // Count object references (by identity)
 * const obj = { id: 1 };
 * createCounterMap([obj, obj, { id: 2 }]);
 * // Map { { id: 1 } => 2, { id: 2 } => 1 }
 *
 * @example
 * // Empty array returns empty Map
 * createCounterMap([]); // Map {}
 *
 * @note Uses Map equality (===) for key comparison — objects are matched by reference.
 * @note Preserves the full type of `T` as the Map key, unlike `countBy` which normalises
 *   keys to strings via a key function.
 *
 * @complexity Time: O(n), Space: O(k) where n is array length and k is number of unique items
 */
export function createCounterMap<T>(items: T[]): Map<T, number> {
  if (!Array.isArray(items)) {
    throw new TypeError(`items must be an array, got ${typeof items}`);
  }

  const counter = new Map<T, number>();

  for (const item of items) {
    counter.set(item, (counter.get(item) ?? 0) + 1);
  }

  return counter;
}
