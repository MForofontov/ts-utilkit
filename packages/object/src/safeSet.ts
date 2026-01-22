/**
 * Safely sets a value at a specified path in an object, creating intermediate objects if needed.
 * Uses dot notation to navigate nested properties.
 *
 * @param obj - The object to modify.
 * @param path - The dot-notation path where the value should be set (e.g., 'user.address.city').
 * @param value - The value to set at the specified path.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Set a value in a nested path, creating objects as needed
 * const user = { name: 'John' };
 * safeSet(user, 'address.city', 'New York');
 * // user is now: { name: 'John', address: { city: 'New York' } }
 *
 * @example
 * // Overwrite existing value
 * const data = { settings: { theme: 'light' } };
 * safeSet(data, 'settings.theme', 'dark');
 * // data.settings.theme is now 'dark'
 *
 * @example
 * // Create deeply nested path
 * const config = {};
 * safeSet(config, 'api.endpoints.users', '/api/users');
 * // config is now: { api: { endpoints: { users: '/api/users' } } }
 *
 * @example
 * // Empty path does nothing
 * const obj = { a: 1 };
 * safeSet(obj, '', 'value');
 * // obj remains unchanged: { a: 1 }
 *
 * @example
 * // Real-world: Update configuration dynamically
 * const appConfig = { name: 'MyApp' };
 * safeSet(appConfig, 'database.connection.host', 'localhost');
 * // appConfig.database.connection.host is now 'localhost'
 *
 * @note Modifies the original object directly without creating a copy.
 * @note Creates empty objects for any missing intermediate properties.
 * @note Only supports dot notation and doesn't handle array indices.
 * @note Optimized for common case: checks if path exists as-is before splitting.
 * @note For immutable updates, consider using deepClone() first.
 *
 * @complexity Time: O(d), Space: O(d) - Where d is the path depth
 */
export function safeSet<T extends Record<string, unknown>, V>(
  obj: T,
  path: string,
  value: V,
): void {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  if (path === '') return;
  if (Object.prototype.hasOwnProperty.call(obj, path)) {
    (obj as Record<string, unknown>)[path] = value as unknown;
    return;
  }

  const keys = path.split('.').filter((k) => k);
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const rest = keys.slice(i).join('.');
    if (Object.prototype.hasOwnProperty.call(current, rest)) {
      current[rest] = value as unknown;
      return;
    }
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value as unknown;
}
