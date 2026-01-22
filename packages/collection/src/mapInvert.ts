/**
 * Inverts a Map by swapping keys and values.
 *
 * @param map - The Map to invert.
 * @returns A new Map with keys and values swapped.
 *
 * @throws {TypeError} If map is not a Map.
 *
 * @example
 * // Basic inversion
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * mapInvert(map); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
 *
 * @example
 * // Duplicate values (later entries win)
 * const map = new Map([['a', 1], ['b', 1], ['c', 2]]);
 * mapInvert(map); // Map { 1 => 'b', 2 => 'c' }
 *
 * @example
 * // Empty map
 * const map = new Map();
 * mapInvert(map); // Map {}
 *
 * @note Does not modify the original Map
 * @note If multiple keys have the same value, the last one wins
 *
 * @complexity Time: O(n) where n is map size, Space: O(n)
 */
export function mapInvert<K, V>(map: Map<K, V>): Map<V, K> {
  if (!(map instanceof Map)) {
    throw new TypeError(`map must be a Map, got ${typeof map}`);
  }

  const result = new Map<V, K>();

  for (const [key, value] of map.entries()) {
    result.set(value, key);
  }

  return result;
}
