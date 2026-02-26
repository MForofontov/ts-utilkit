/**
 * Returns a new object with all keys transformed by a given function,
 * while keeping values unchanged.
 *
 * @param obj - The source object.
 * @param fn - A function applied to each key string, returning the new key.
 * @returns A new object with all keys transformed.
 *
 * @throws {TypeError} If obj is not a non-null object.
 * @throws {TypeError} If fn is not a function.
 * @throws {TypeError} If fn returns a non-string value for any key.
 *
 * @example
 * // Convert all keys to uppercase
 * transformKeys({ foo: 1, bar: 2 }, k => k.toUpperCase());
 * // { FOO: 1, BAR: 2 }
 *
 * @example
 * // Add a prefix to every key
 * transformKeys({ id: 1, name: 'Alice' }, k => `user_${k}`);
 * // { user_id: 1, user_name: 'Alice' }
 *
 * @example
 * // Strip a common prefix
 * transformKeys({ data_id: 1, data_name: 'Bob' }, k => k.replace('data_', ''));
 * // { id: 1, name: 'Bob' }
 *
 * @note If the transform function produces duplicate keys, later values
 * (in insertion order) will overwrite earlier ones.
 * @note Only top-level keys are transformed; nested objects are not affected.
 * @note For opinionated case conversions use keysToCamelCase or keysToSnakeCase.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of keys
 */
export function transformKeys(
  obj: Record<string, unknown>,
  fn: (key: string) => string,
): Record<string, unknown> {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new TypeError(`obj must be a non-null object, got ${obj === null ? 'null' : typeof obj}`);
  }
  if (typeof fn !== 'function') {
    throw new TypeError(`fn must be a function, got ${typeof fn}`);
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const newKey = fn(key);
    if (typeof newKey !== 'string') {
      throw new TypeError(
        `fn must return a string, got ${typeof newKey} for key "${key}"`,
      );
    }
    result[newKey] = obj[key];
  }
  return result;
}
