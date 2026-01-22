/**
 * Creates a new object containing only the specified keys from the source object.
 *
 * @param obj - The source object to pick properties from.
 * @param keysToPick - Array of keys to include in the result.
 * @returns A new object with only the specified keys (subset of original).
 *
 * @throws {TypeError} If obj is not a non-null object.
 *
 * @example
 * // Pick specific properties for public API
 * const user = { id: 1, name: 'John', email: 'john@example.com', role: 'admin' };
 * const publicUser = pickKeys(user, ['id', 'name']);
 * // { id: 1, name: 'John' }
 *
 * @example
 * // Extract configuration subset
 * const config = { host: 'localhost', port: 3000, debug: true, env: 'dev' };
 * const serverConfig = pickKeys(config, ['host', 'port']);
 * // { host: 'localhost', port: 3000 }
 *
 * @example
 * // Non-existent keys are ignored
 * const obj = { a: 1, b: 2 };
 * pickKeys(obj, ['a', 'c']); // { a: 1 } (key 'c' doesn't exist)
 *
 * @example
 * // Empty keysToPick returns empty object
 * pickKeys(user, []); // {}
 *
 * @example
 * // All keys selected
 * pickKeys({ a: 1, b: 2 }, ['a', 'b']); // { a: 1, b: 2 }
 *
 * @note Creates a new object; does not modify the original.
 * @note Keys in keysToPick that don't exist in obj are silently ignored.
 * @note Only own enumerable properties are picked.
 * @note Useful for creating DTOs, sanitizing data, or selecting specific fields.
 * @note Opposite of omitKeys function.
 *
 * @complexity Time: O(n) where n is the number of keys in obj, Space: O(k) where k is keysToPick.length
 */
export function pickKeys<T extends Record<string, unknown>>(
  obj: T,
  keysToPick: (keyof T)[],
): Partial<T> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keysToPick.includes(key as keyof T)),
  ) as Partial<T>;
}
