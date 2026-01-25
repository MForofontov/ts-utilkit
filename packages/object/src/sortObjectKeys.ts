/**
 * Creates a new object with the same properties as the input, but with keys sorted alphabetically.
 *
 * @param obj - The object whose keys should be sorted.
 * @returns A new object with identical properties but keys in alphabetical order.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic usage
 * sortObjectKeys({ c: 3, a: 1, b: 2 });
 * // { a: 1, b: 2, c: 3 }
 *
 * @example
 * // With mixed key types
 * sortObjectKeys({ 10: 'ten', 2: 'two', a: 'alpha' });
 * // { '10': 'ten', '2': 'two', a: 'alpha' } (lexicographic order)
 *
 * @example
 * // Nested objects (only top level sorted)
 * sortObjectKeys({ z: { b: 2, a: 1 }, a: 'first' });
 * // { a: 'first', z: { b: 2, a: 1 } }
 *
 * @example
 * // Empty object
 * sortObjectKeys({}); // {}
 *
 * @example
 * // Real-world: Normalize object for comparison/hashing
 * const config1 = { port: 3000, host: 'localhost', debug: true };
 * const config2 = { debug: true, host: 'localhost', port: 3000 };
 * JSON.stringify(sortObjectKeys(config1)) === JSON.stringify(sortObjectKeys(config2)); // true
 *
 * @note Creates a new object and doesn't modify the original.
 * @note Uses string comparison (localeCompare) for sorting, which means numbers as keys will be sorted as strings, not by numeric value.
 * @note Only sorts the top-level keys; nested objects remain unchanged.
 * @note Useful for consistent JSON serialization and object comparison.
 * @note Key order is alphabetical regardless of insertion order.
 *
 * @complexity Time: O(n log n), Space: O(n) - Where n is the number of keys
 */
export function sortObjectKeys<T extends Record<string, unknown>>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.fromEntries(
    Object.entries(obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
  ) as T;
}
