/**
 * Creates an object containing key-value pairs from the first object that are different
 * from the second object, based on a custom comparison function.
 *
 * @param obj1 - The source object to check for differences.
 * @param obj2 - The object to compare against.
 * @param comparator - Function that determines if two values are equal.
 * @returns A new object containing only the different key-value pairs from obj1.
 *
 * @throws {TypeError} If obj1 is not an object or is null.
 * @throws {TypeError} If obj2 is not an object or is null.
 * @throws {TypeError} If comparator is not a function.
 *
 * @example
 * // Simple value comparison
 * const obj1 = { a: 1, b: 2, c: 3 };
 * const obj2 = { a: 1, b: 4, c: 3 };
 * differenceBy(obj1, obj2, (a, b) => a === b);
 * // { b: 2 }
 *
 * @example
 * // Case-insensitive string comparison
 * const user1 = { name: 'Alice', role: 'Admin' };
 * const user2 = { name: 'alice', role: 'User' };
 * differenceBy(user1, user2, (a, b) =>
 *   String(a).toLowerCase() === String(b).toLowerCase()
 * );
 * // { role: 'Admin' }
 *
 * @example
 * // Numeric tolerance comparison
 * const data1 = { x: 1.0001, y: 2.0 };
 * const data2 = { x: 1.0, y: 2.0 };
 * differenceBy(data1, data2, (a, b) =>
 *   Math.abs(Number(a) - Number(b)) < 0.01
 * );
 * // {}
 *
 * @example
 * // Keys only in obj1
 * differenceBy({ a: 1, b: 2 }, {}, (a, b) => a === b);
 * // { a: 1, b: 2 }
 *
 * @example
 * // Real-world: Find configuration changes
 * const oldConfig = { theme: 'light', lang: 'en', timeout: 5000 };
 * const newConfig = { theme: 'dark', lang: 'en', timeout: 5000 };
 * const changes = differenceBy(oldConfig, newConfig, (a, b) => a === b);
 * // { theme: 'light' } (old values that changed)
 *
 * @note Keys that exist only in the first object are included in the result.
 * @note The comparator receives values from both objects (or undefined if key missing).
 * @note Returns empty object if all values are equal per the comparator.
 * @note Similar to getObjectDifference but with custom equality logic.
 * @note Useful for custom comparisons like fuzzy matching or type coercion.
 *
 * @complexity Time: O(n), Space: O(k) - Where n is obj1 keys, k is different keys
 */
export function differenceBy<T extends Record<string, unknown>>(
  obj1: T,
  obj2: T,
  comparator: (a: unknown, b: unknown) => boolean,
): Partial<T> {
  if (typeof obj1 !== 'object' || obj1 === null) {
    throw new TypeError('First argument must be a non-null object');
  }
  if (typeof obj2 !== 'object' || obj2 === null) {
    throw new TypeError('Second argument must be a non-null object');
  }
  if (typeof comparator !== 'function') {
    throw new TypeError('Comparator must be a function');
  }

  const keys = Reflect.ownKeys(obj1);
  const result: Partial<T> = {};
  for (const key of keys) {
    const k = key as keyof T;
    if (!comparator(obj1[k], obj2[k])) {
      result[k] = obj1[k];
    }
  }
  return result;
}
