/**
 * Creates a new object with properties that satisfy the predicate function.
 *
 * @param obj - The source object to filter properties from.
 * @param predicate - Function that determines which properties to include.
 *                    Return true to keep a property, false to exclude it.
 * @returns A new object with only the properties where predicate returned true.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Keep only numeric values
 * const data = { a: 1, b: 'string', c: 3, d: false };
 * pickBy(data, value => typeof value === 'number');
 * // { a: 1, c: 3 }
 *
 * @example
 * // Keep only truthy values
 * const settings = { theme: 'dark', notifications: true, autoSave: false, timeout: 0 };
 * pickBy(settings, value => !!value);
 * // { theme: 'dark', notifications: true }
 *
 * @example
 * // Filter by key pattern
 * const config = { apiKey: 'secret', apiUrl: 'https://...', debugMode: true };
 * pickBy(config, (_, key) => key.startsWith('api'));
 * // { apiKey: 'secret', apiUrl: 'https://...' }
 *
 * @example
 * // Keep values above threshold
 * const scores = { alice: 85, bob: 92, charlie: 78, diana: 95 };
 * pickBy(scores, score => score >= 90);
 * // { bob: 92, diana: 95 }
 *
 * @example
 * // Real-world: Filter active users
 * const users = {
 *   user1: { name: 'Alice', active: true },
 *   user2: { name: 'Bob', active: false },
 *   user3: { name: 'Charlie', active: true }
 * };
 * const activeUsers = pickBy(users, user => user.active);
 *
 * @note Creates a new object and doesn't modify the original.
 * @note Similar to Array.prototype.filter() but for object properties.
 * @note Predicate receives both value and key for flexible filtering.
 * @note Returns a Partial<T> type since not all properties may be included.
 * @note Opposite of omitBy() function.
 *
 * @complexity Time: O(n), Space: O(k) - Where n is properties, k is kept properties
 */
export function pickBy<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: unknown, key: string) => boolean,
): Partial<T> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(value, key)),
  ) as Partial<T>;
}
