/**
 * Creates a new object excluding the specified keys from the input object.
 *
 * @param obj - The source object to exclude keys from.
 * @param keysToOmit - Array of keys to exclude from the result.
 * @returns A new object with the specified keys removed.
 *
 * @throws {TypeError} If obj is not a non-null object.
 *
 * @example
 * // Remove sensitive data
 * const user = { id: 1, name: 'John', password: 'secret', role: 'admin' };
 * const safeUser = omitKeys(user, ['password', 'role']);
 * // { id: 1, name: 'John' }
 *
 * @example
 * // Clean up object for logging
 * const request = { url: '/api', method: 'POST', token: 'abc123', body: {...} };
 * const logData = omitKeys(request, ['token']);
 * // { url: '/api', method: 'POST', body: {...} }
 *
 * @example
 * // Non-existent keys are ignored
 * const obj = { a: 1, b: 2 };
 * omitKeys(obj, ['b', 'c']); // { a: 1 } (key 'c' doesn't exist)
 *
 * @example
 * // Empty keysToOmit returns full object
 * omitKeys(user, []); // { id: 1, name: 'John', password: 'secret', role: 'admin' }
 *
 * @example
 * // Omit all keys
 * omitKeys({ a: 1, b: 2 }, ['a', 'b']); // {}
 *
 * @note Creates a new object; does not modify the original.
 * @note Keys in keysToOmit that don't exist in obj are silently ignored.
 * @note Only own enumerable properties are considered.
 * @note Useful for removing sensitive data, excluding computed fields, or sanitizing responses.
 * @note Opposite of pickKeys function.
 *
 * @complexity Time: O(n) where n is the number of keys in obj, Space: O(n-k) where k is keysToOmit.length
 */
export function omitKeys<T extends Record<string, unknown>>(
  obj: T,
  keysToOmit: (keyof T)[],
): Partial<T> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToOmit.includes(key as keyof T)),
  ) as Partial<T>;
}
