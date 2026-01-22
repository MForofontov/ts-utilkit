/**
 * Creates a new object with all properties from the source except those with null or undefined values.
 * Recursively removes null and undefined values from nested objects and arrays.
 *
 * @param obj - The source object to process.
 * @returns A new object containing only properties with non-null and non-undefined values.
 *
 * @throws {TypeError} If input is not a non-null object.
 *
 * @example
 * // Basic usage
 * compactObject({ a: 1, b: null, c: undefined, d: 0, e: '' });
 * // { a: 1, d: 0, e: '' }
 *
 * @example
 * // Note: falsy values like 0, false, '' are kept
 * compactObject({ count: 0, active: false, name: '', city: null });
 * // { count: 0, active: false, name: '' }
 *
 * @example
 * // Nested objects
 * compactObject({ user: { name: 'Alice', age: null, email: undefined } });
 * // { user: { name: 'Alice' } }
 *
 * @example
 * // With arrays
 * compactObject({ items: [1, null, 2, undefined, 3] });
 * // { items: [1, null, 2, undefined, 3] } (arrays are preserved but objects inside are compacted)
 *
 * @note Only removes null and undefined values, not other falsy values (0, false, '').
 * @note Creates a new object and does not modify the original input.
 * @note Recursively processes nested objects at any depth.
 * @note Array elements are not filtered, but objects within arrays are compacted.
 * @note Useful for cleaning API payloads before sending to backend.
 *
 * @complexity Time: O(n), Space: O(n) where n is the total number of properties in all nested objects
 */
export function compactObject<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  const compact = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.map((v: unknown) =>
        typeof v === 'object' && v !== null ? compact(v) : v,
      );
    }
    if (value && typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => [k, compact(v)])
        .filter(([_, v]) => v != null);
      return Object.fromEntries(entries) as Record<string, unknown>;
    }
    return value;
  };

  return compact(obj) as Partial<T>;
}
