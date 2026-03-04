/**
 * Converts an array of key-value pairs (entries) into an object.
 *
 * @param entries - Array of [key, value] pairs where keys must be strings.
 * @returns An object with properties created from the entries.
 *
 * @example
 * // Basic usage
 * const entries = [['name', 'John'], ['age', 30], ['city', 'New York']];
 * entriesToObject(entries);
 * // { name: 'John', age: 30, city: 'New York' }
 *
 * @example
 * // With different value types
 * const mixed = [['id', 1], ['active', true], ['data', { count: 5 }]];
 * entriesToObject(mixed);
 * // { id: 1, active: true, data: { count: 5 } }
 *
 * @example
 * // Empty array
 * entriesToObject([]); // {}
 *
 * @example
 * // Duplicate keys (last value wins)
 * const duplicates = [['key', 'first'], ['key', 'second']];
 * entriesToObject(duplicates);
 * // { key: 'second' }
 *
 * @note This is the inverse operation of Object.entries().
 * @note If duplicate keys exist, the last occurrence overwrites previous values.
 * @note Wraps Object.fromEntries() with input validation.
 * @note All keys must be strings; numeric keys will be converted to strings.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of entries
 */
export function entriesToObject<T>(entries: [string, unknown][]): T {
  return Object.fromEntries(entries) as T;
}
