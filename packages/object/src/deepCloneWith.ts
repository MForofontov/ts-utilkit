/**
 * Creates a deep clone of an object while customizing how individual values are cloned.
 *
 * @param obj - The object to clone.
 * @param cloneFn - A function that transforms each non-object value during cloning.
 * @returns A deep copy with values transformed by the custom function.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Double all number values in the object
 * const original = { name: 'John', age: 30, scores: [80, 90] };
 * const doubled = deepCloneWith(original, value =>
 *   typeof value === 'number' ? value * 2 : value
 * );
 * // { name: 'John', age: 60, scores: [160, 180] }
 *
 * @example
 * // Sanitize strings during cloning
 * const data = { title: 'Hello <script>', content: 'Safe' };
 * const safe = deepCloneWith(data, value =>
 *   typeof value === 'string' ? value.replace(/<[^>]*>/g, '') : value
 * );
 * // { title: 'Hello ', content: 'Safe' }
 *
 * @example
 * // Round all numbers
 * const measurements = { width: 10.567, height: 20.891, items: [1.234, 5.678] };
 * const rounded = deepCloneWith(measurements, value =>
 *   typeof value === 'number' ? Math.round(value) : value
 * );
 * // { width: 11, height: 21, items: [1, 6] }
 *
 * @example
 * // Identity clone (same as deepClone)
 * const obj = { a: 1, b: { c: 2 } };
 * const clone = deepCloneWith(obj, value => value);
 * // { a: 1, b: { c: 2 } }
 *
 * @example
 * // Real-world: Clone config with environment variables resolved
 * const config = { port: '${PORT}', host: 'localhost', retry: 3 };
 * const resolved = deepCloneWith(config, value =>
 *   typeof value === 'string' && value.startsWith('${')
 *     ? process.env[value.slice(2, -1)] || value
 *     : value
 * );
 * // Resolves ${PORT} from environment variables
 *
 * @note The cloneFn is applied only to primitive values (non-objects and non-arrays).
 * @note Arrays and objects are automatically recursively cloned.
 * @note Preserves nested structure while transforming leaf values.
 * @note More flexible than deepClone() for data transformation during copying.
 * @note Symbol keys are preserved using Reflect.ownKeys().
 *
 * @complexity Time: O(n), Space: O(n) - Where n is total values in object tree
 */
export function deepCloneWith<T>(
  obj: T,
  cloneFn: (value: unknown) => unknown,
): T {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }

  const clone = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.map(clone);
    }
    if (value && typeof value === 'object') {
      return Reflect.ownKeys(value).reduce<Record<PropertyKey, unknown>>(
        (acc, k) => {
          acc[k] = clone((value as Record<PropertyKey, unknown>)[k]);
          return acc;
        },
        {},
      );
    }
    return cloneFn(value);
  };

  return clone(obj) as T;
}
