/**
 * Recursively merges two objects, combining their properties and nested structures.
 *
 * @param target - The base object to merge into.
 * @param source - The object whose properties will be merged into the target.
 * @returns A new object containing the merged properties from both inputs.
 *
 * @throws {TypeError} If target or source is not a non-null object.
 *
 * @example
 * // Basic merging
 * const obj1 = { a: 1, b: 2 };
 * const obj2 = { b: 3, c: 4 };
 * deepMerge(obj1, obj2); // { a: 1, b: 3, c: 4 }
 *
 * @example
 * // Merging nested objects
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * deepMerge(obj1, obj2); // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 *
 * @example
 * // Array concatenation
 * const obj1 = { items: [1, 2] };
 * const obj2 = { items: [3, 4] };
 * deepMerge(obj1, obj2); // { items: [1, 2, 3, 4] }
 *
 * @example
 * // Conflicting primitive values (source wins)
 * const obj1 = { name: 'Alice', age: 25 };
 * const obj2 = { age: 30, city: 'NYC' };
 * deepMerge(obj1, obj2); // { name: 'Alice', age: 30, city: 'NYC' }
 *
 * @example
 * // Deep nesting
 * const config1 = { db: { host: 'localhost', port: 5432 } };
 * const config2 = { db: { user: 'admin' }, cache: true };
 * deepMerge(config1, config2); // { db: { host: 'localhost', port: 5432, user: 'admin' }, cache: true }
 *
 * @note Creates a new object; does not modify the input objects.
 * @note Arrays are concatenated, not recursively merged.
 * @note For conflicting primitive values, source overwrites target.
 * @note Nested objects are recursively merged.
 * @note Useful for configuration merging, state management, default options.
 *
 * @complexity Time: O(n) where n is total number of properties across all nesting levels, Space: O(n)
 */
export function deepMerge<T extends object, U extends object>(
  target: T,
  source: U,
): T & U {
  const isObject = (obj: unknown): obj is Record<string, unknown> =>
    !!obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    throw new TypeError('Both target and source must be non-null objects');
  }

  const merge = (
    t: Record<string, unknown>,
    s: Record<string, unknown>,
  ): Record<string, unknown> => {
    Reflect.ownKeys(s).forEach((k) => {
      const key = k as string;
      const targetValue = t[key];
      const sourceValue = s[key];
      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        t[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        t[key] = merge({ ...targetValue }, sourceValue);
      } else {
        t[key] = sourceValue;
      }
    });
    return t;
  };

  return merge({ ...target }, source) as T & U;
}
