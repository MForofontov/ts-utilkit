/**
 * Returns the first key in an object whose value satisfies the given predicate.
 * Returns `undefined` if no key matches.
 *
 * @template T - The type of the object values.
 * @param obj - The object to search.
 * @param predicate - A function that receives `(value, key)` and returns `true`
 *   for the key to return.
 * @returns The first matching key string, or `undefined` if none is found.
 *
 * @example
 * // Find the key with a specific value
 * findKey({ a: 1, b: 2, c: 3 }, v => v === 2);
 * // 'b'
 *
 * @example
 * // Find the first key whose value exceeds a threshold
 * findKey({ x: 10, y: 50, z: 30 }, v => v > 20);
 * // 'y'
 *
 * @example
 * // Using both value and key in the predicate
 * findKey({ id_1: true, id_2: false, id_3: true }, (v, k) => v && k.endsWith('3'));
 * // 'id_3'
 *
 * @example
 * // No match returns undefined
 * findKey({ a: 1, b: 2 }, v => v > 100);
 * // undefined
 *
 * @note Iteration order follows `Object.keys()` (insertion order for
 * string keys in modern JavaScript engines).
 * @note Use pickBy to collect all matching entries rather than just the first key.
 *
 * @complexity Time: O(n), Space: O(1) where n is the number of object keys
 */
export function findKey<T>(
  obj: Record<string, T>,
  predicate: (value: T, key: string) => boolean,
): string | undefined {

  for (const key of Object.keys(obj)) {
    if (predicate(obj[key], key)) {
      return key;
    }
  }
  return undefined;
}
