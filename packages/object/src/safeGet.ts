/**
 * Safely retrieves a nested property value from an object using a dot-notation path.
 * Returns a default value if the property doesn't exist or any part of the path is invalid.
 *
 * @param obj - The source object to retrieve the value from.
 * @param path - A dot-notation string representing the property path (e.g., 'user.address.city').
 * @param defaultValue - The value to return if the path cannot be resolved (default: undefined).
 * @returns The value at the specified path or the default value if not found.
 *
 * @throws {TypeError} If obj is not a non-null object.
 *
 * @example
 * // Basic nested property access
 * const user = { name: 'John', address: { city: 'New York', zip: 10001 } };
 * safeGet(user, 'address.city'); // 'New York'
 * safeGet(user, 'name'); // 'John'
 *
 * @example
 * // Deep nesting
 * const data = { a: { b: { c: { d: 'value' } } } };
 * safeGet(data, 'a.b.c.d'); // 'value'
 *
 * @example
 * // Non-existent paths return default
 * safeGet(user, 'address.country', 'USA'); // 'USA' (default)
 * safeGet(user, 'phone.mobile'); // undefined
 * safeGet(user, 'settings.theme', 'dark'); // 'dark'
 *
 * @example
 * // Empty path returns entire object
 * safeGet(user, ''); // { name: 'John', address: { city: 'New York', zip: 10001 } }
 *
 * @example
 * // Top-level property with dots in key name
 * const obj = { 'user.name': 'Alice', user: { name: 'Bob' } };
 * safeGet(obj, 'user.name'); // 'Alice' (exact key match has priority)
 *
 * @note Returns default value if any segment of the path doesn't exist or is null/undefined.
 * @note Only supports dot notation (e.g., 'a.b.c'); does NOT handle array indices (e.g., 'items[0]').
 * @note If the path exactly matches a top-level key, returns that value directly.
 * @note Empty string segments in path (e.g., 'a..b') return the default value.
 * @note Useful for safely accessing configuration, API responses, or user data.
 *
 * @complexity Time: O(n) where n is the depth of the path, Space: O(1)
 */
export function safeGet<T extends Record<string, unknown>, D>(
  obj: T,
  path: string,
  defaultValue: D = undefined as unknown as D,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
): D | unknown {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  if (path === '') return obj;
  if (Object.prototype.hasOwnProperty.call(obj, path)) {
    return obj[path];
  }

  const parts = path.split('.');
  if (parts.slice(1, -1).some((p) => p === '')) return defaultValue;
  const keys = parts.filter((k) => k);
  let current: unknown = obj;
  for (let i = 0; i < keys.length; i++) {
    if (current == null) return defaultValue;
    const key = keys[i];
    if (
      typeof current === 'object' &&
      current !== null &&
      Object.prototype.hasOwnProperty.call(current, key)
    ) {
      current = (current as Record<string, unknown>)[key];
    } else {
      const rest = keys.slice(i).join('.');
      if (
        typeof current === 'object' &&
        current !== null &&
        Object.prototype.hasOwnProperty.call(current, rest)
      ) {
        return (current as Record<string, unknown>)[rest];
      }
      return defaultValue;
    }
  }
  return current === undefined ? defaultValue : current;
}
