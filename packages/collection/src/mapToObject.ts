/**
 * Converts a Map to a plain object.
 *
 * @param map - The Map to convert.
 * @returns A plain object with the same key-value pairs.
 *
 * @throws {TypeError} If map is not a Map.
 * @throws {Error} If Map contains non-string and non-symbol keys.
 *
 * @example
 * // Basic conversion
 * const map = new Map([['name', 'John'], ['age', 30]]);
 * mapToObject(map); // { name: 'John', age: 30 }
 *
 * @example
 * // With symbol keys
 * const sym = Symbol('id');
 * const map = new Map([['name', 'John'], [sym, 123]]);
 * mapToObject(map); // { name: 'John', [Symbol(id)]: 123 }
 *
 * @example
 * // Empty map
 * const map = new Map();
 * mapToObject(map); // {}
 *
 * @note Only string and symbol keys are allowed (object property requirement)
 * @note Numeric keys are converted to strings
 *
 * @complexity Time: O(n) where n is map size, Space: O(n)
 */
export function mapToObject<V>(
  map: Map<string | symbol, V>,
): Record<string | symbol, V> {
  if (!(map instanceof Map)) {
    throw new TypeError(`map must be a Map, got ${typeof map}`);
  }

  const result: Record<string | symbol, V> = {};

  for (const [key, value] of map.entries()) {
    if (typeof key !== 'string' && typeof key !== 'symbol') {
      throw new Error(
        `Map keys must be strings or symbols for object conversion, got ${typeof key}`,
      );
    }
    result[key] = value;
  }

  return result;
}
