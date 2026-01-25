/**
 * Determines if an object is a deep subset of another object.
 * A subset must have all its properties and nested structures match
 * the corresponding properties in the target object.
 *
 * @param subset - The object to check if it's a subset.
 * @param obj - The target object to check against.
 * @returns True if all properties in subset exist with identical values in obj, false otherwise.
 *
 * @throws {TypeError} If subset is not an object or is null.
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic subset check
 * isDeepSubset({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }); // true
 * isDeepSubset({ a: 1, b: 3 }, { a: 1, b: 2, c: 3 }); // false
 *
 * @example
 * // Nested subset
 * const subset = { user: { name: 'Alice' } };
 * const obj = { user: { name: 'Alice', age: 30 }, active: true };
 * isDeepSubset(subset, obj); // true
 *
 * @example
 * // Not a subset - different nested value
 * isDeepSubset(
 *   { settings: { theme: 'dark' } },
 *   { settings: { theme: 'light', lang: 'en' } }
 * ); // false
 *
 * @example
 * // Identical objects
 * const same = { a: 1, b: 2 };
 * isDeepSubset(same, same); // true
 *
 * @example
 * // Real-world: Validate partial configuration
 * const requiredSettings = { api: { timeout: 5000 } };
 * const userConfig = { api: { timeout: 5000, retries: 3 }, debug: true };
 * isDeepSubset(requiredSettings, userConfig); // true (required settings present)
 *
 * @note Uses strict equality (===) for comparing primitive values.
 * @note Recursively checks nested objects for subset relationship.
 * @note Does not handle array comparisons specially - arrays are treated as objects.
 * @note Empty object {} is a subset of any object.
 * @note Useful for configuration validation and partial matching.
 *
 * @complexity Time: O(n), Space: O(d) - Where n is subset properties, d is recursion depth
 */
export function isDeepSubset<T extends Record<string, unknown>>(
  subset: T,
  obj: T,
): boolean {
  if (typeof subset !== 'object' || subset === null) {
    throw new TypeError('Subset must be a non-null object');
  }
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Object must be a non-null object');
  }

  return Object.keys(subset).every((key) => {
    const subsetValue = subset[key];

    if (typeof subsetValue === 'object' && subsetValue !== null) {
      const objValue = obj[key];

      if (typeof objValue !== 'object' || objValue === null) {
        return false;
      }

      return isDeepSubset(
        subsetValue as Record<string, unknown>,
        objValue as Record<string, unknown>,
      );
    }

    return subsetValue === obj[key];
  });
}
