/**
 * Filters a Map based on a predicate function applied to its entries.
 *
 * @param map - The Map to filter.
 * @param predicate - Function to test each entry. Returns true to keep the entry.
 * @returns A new Map containing only entries that pass the predicate test.
 *
 * @throws {TypeError} If map is not a Map.
 * @throws {TypeError} If predicate is not a function.
 *
 * @example
 * // Filter by value
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * mapFilter(map, ([key, value]) => value > 1); // Map { 'b' => 2, 'c' => 3 }
 *
 * @example
 * // Filter by key
 * const map = new Map([['apple', 1], ['banana', 2], ['cherry', 3]]);
 * mapFilter(map, ([key]) => key.startsWith('a')); // Map { 'apple' => 1 }
 *
 * @example
 * // Filter with index
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * mapFilter(map, ([k, v], index) => index < 2); // Map { 'a' => 1, 'b' => 2 }
 *
 * @note Does not modify the original Map
 * @note Predicate receives [key, value] tuple and index
 *
 * @complexity Time: O(n) where n is map size, Space: O(n)
 */
export function mapFilter<K, V>(
  map: Map<K, V>,
  predicate: (entry: [K, V], index: number) => boolean,
): Map<K, V> {
  if (!(map instanceof Map)) {
    throw new TypeError(`map must be a Map, got ${typeof map}`);
  }

  if (typeof predicate !== 'function') {
    throw new TypeError(
      `predicate must be a function, got ${typeof predicate}`,
    );
  }

  const result = new Map<K, V>();
  let index = 0;

  for (const entry of map.entries()) {
    if (predicate(entry, index)) {
      result.set(entry[0], entry[1]);
    }
    index++;
  }

  return result;
}
