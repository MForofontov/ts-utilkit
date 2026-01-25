/**
 * Creates a new object excluding properties that satisfy the predicate function.
 * Returns a filtered version of the original object.
 *
 * @param obj - The source object to filter properties from.
 * @param predicate - Function that determines which properties to exclude.
 *                    Return true to omit a property, false to keep it.
 * @returns A new object with all properties where predicate returned false.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Remove all properties with value 2
 * const obj = { a: 1, b: 2, c: 3 };
 * omitBy(obj, value => value === 2);
 * // { a: 1, c: 3 }
 *
 * @example
 * // Remove falsy values
 * const data = { name: 'Alice', age: 0, active: false, role: 'admin' };
 * omitBy(data, value => !value);
 * // { name: 'Alice', role: 'admin' }
 *
 * @example
 * // Remove by key pattern
 * const config = { apiKey: 'secret', apiUrl: 'https://...', debugMode: true };
 * omitBy(config, (_, key) => key.startsWith('api'));
 * // { debugMode: true }
 *
 * @example
 * // Remove values below threshold
 * const scores = { alice: 85, bob: 92, charlie: 78, diana: 95 };
 * omitBy(scores, score => score < 80);
 * // { alice: 85, bob: 92, diana: 95 }
 *
 * @example
 * // Real-world: Remove sensitive data
 * const user = { name: 'John', password: 'secret', email: 'john@example.com', token: 'abc' };
 * const safeUser = omitBy(user, (_, key) => ['password', 'token'].includes(key));
 * // { name: 'John', email: 'john@example.com' }
 *
 * @note Creates a new object and doesn't modify the original.
 * @note Similar to Array.prototype.filter() but for object properties (inverted logic).
 * @note Predicate receives both value and key for flexible filtering.
 * @note Returns a Partial<T> type since not all properties may be included.
 * @note Opposite of pickBy() function.
 *
 * @complexity Time: O(n), Space: O(k) - Where n is properties, k is kept properties
 */
export function omitBy<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: unknown, key: string) => boolean,
): Partial<T> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => !predicate(value, key)),
  ) as Partial<T>;
}
