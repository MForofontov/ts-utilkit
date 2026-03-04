/**
 * Converts a plain object to a Map.
 *
 * @param obj - The object to convert.
 * @returns A new Map with the same key-value pairs.
 *
 * @example
 * // Basic conversion
 * const obj = { name: 'John', age: 30 };
 * objectToMap(obj); // Map { 'name' => 'John', 'age' => 30 }
 *
 * @example
 * // With symbol keys
 * const sym = Symbol('id');
 * const obj = { name: 'John', [sym]: 123 };
 * objectToMap(obj); // Map { 'name' => 'John', Symbol(id) => 123 }
 *
 * @example
 * // Empty object
 * const obj = {};
 * objectToMap(obj); // Map {}
 *
 * @note Preserves symbol keys
 * @note Only own enumerable properties are included
 *
 * @complexity Time: O(n) where n is number of properties, Space: O(n)
 */
export function objectToMap<V>(
  obj: Record<string | symbol, V>,
): Map<string | symbol, V> {
  const result = new Map<string | symbol, V>();

  // Add string keys
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.set(key, obj[key]);
    }
  }

  // Add symbol keys
  const symbols = Object.getOwnPropertySymbols(obj);
  for (const sym of symbols) {
    if (Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      result.set(sym, obj[sym]);
    }
  }

  return result;
}
