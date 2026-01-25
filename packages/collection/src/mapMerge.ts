/**
 * Merges multiple Maps into a single Map. Later Maps override earlier ones for duplicate keys.
 *
 * @param maps - Two or more Maps to merge.
 * @returns A new Map containing all entries from all input Maps.
 *
 * @throws {TypeError} If any argument is not a Map.
 * @throws {Error} If fewer than two Maps are provided.
 *
 * @example
 * // Basic merge
 * const map1 = new Map([['a', 1], ['b', 2]]);
 * const map2 = new Map([['c', 3], ['d', 4]]);
 * mapMerge(map1, map2); // Map { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
 *
 * @example
 * // Merge with conflicts (later maps win)
 * const map1 = new Map([['a', 1], ['b', 2]]);
 * const map2 = new Map([['b', 20], ['c', 3]]);
 * mapMerge(map1, map2); // Map { 'a' => 1, 'b' => 20, 'c' => 3 }
 *
 * @example
 * // Merge multiple maps
 * const map1 = new Map([['a', 1]]);
 * const map2 = new Map([['b', 2]]);
 * const map3 = new Map([['c', 3]]);
 * mapMerge(map1, map2, map3); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
 *
 * @note Does not modify the original Maps
 * @note Later Maps take precedence for duplicate keys
 *
 * @complexity Time: O(n * m) where n is number of maps and m is average map size, Space: O(n * m)
 */
export function mapMerge<K, V>(...maps: Map<K, V>[]): Map<K, V> {
  if (maps.length < 2) {
    throw new Error(`At least two maps are required, got ${maps.length}`);
  }

  for (let i = 0; i < maps.length; i++) {
    if (!(maps[i] instanceof Map)) {
      throw new TypeError(
        `All arguments must be Maps, argument ${i} is ${typeof maps[i]}`,
      );
    }
  }

  const result = new Map<K, V>();

  for (const map of maps) {
    for (const [key, value] of map.entries()) {
      result.set(key, value);
    }
  }

  return result;
}
