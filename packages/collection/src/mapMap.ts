/**
 * Transforms a Map's values using a mapper function.
 *
 * @param map - The Map to transform.
 * @param mapper - Function to transform each entry's value.
 * @returns A new Map with transformed values.
 *
 * @throws {TypeError} If map is not a Map.
 * @throws {TypeError} If mapper is not a function.
 *
 * @example
 * // Double all values
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * mapMap(map, ([key, value]) => value * 2); // Map { 'a' => 2, 'b' => 4, 'c' => 6 }
 *
 * @example
 * // Transform based on key
 * const map = new Map([['name', 'john'], ['age', '30']]);
 * mapMap(map, ([key, value]) => key === 'age' ? parseInt(value) : value);
 * // Map { 'name' => 'john', 'age' => 30 }
 *
 * @example
 * // Use index in transformation
 * const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
 * mapMap(map, ([k, v], idx) => v + idx); // Map { 'a' => 1, 'b' => 3, 'c' => 5 }
 *
 * @note Does not modify the original Map
 * @note Keys remain unchanged, only values are transformed
 *
 * @complexity Time: O(n) where n is map size, Space: O(n)
 */
export function mapMap<K, V, R>(
  map: Map<K, V>,
  mapper: (entry: [K, V], index: number) => R,
): Map<K, R> {
  if (!(map instanceof Map)) {
    throw new TypeError(`map must be a Map, got ${typeof map}`);
  }

  if (typeof mapper !== 'function') {
    throw new TypeError(`mapper must be a function, got ${typeof mapper}`);
  }

  const result = new Map<K, R>();
  let index = 0;

  for (const entry of map.entries()) {
    const newValue = mapper(entry, index);
    result.set(entry[0], newValue);
    index++;
  }

  return result;
}
