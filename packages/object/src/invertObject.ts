/**
 * Inverts the keys and values of an object, swapping them to create a new object.
 *
 * @param obj - The object whose keys and values should be swapped.
 * @returns A new object with the original values as keys and original keys as values.
 *
 * @example
 * // Basic usage
 * invertObject({ a: 1, b: 2 }); // Returns { '1': 'a', '2': 'b' }
 *
 * @example
 * // String values
 * invertObject({ name: 'John', age: 'thirty' }); // Returns { 'John': 'name', 'thirty': 'age' }
 *
 * @example
 * // Duplicate values - last key wins
 * invertObject({ a: 1, b: 1, c: 2 }); // Returns { '1': 'b', '2': 'c' }
 *
 * @example
 * // With symbol keys
 * const sym = Symbol('test');
 * invertObject({ [sym]: 'value' }); // Returns { 'value': Symbol(test) }
 *
 * @example
 * // Empty object
 * invertObject({}); // Returns {}
 *
 * @note Only the object's own enumerable properties are processed.
 * @note If multiple keys share the same value, only the last key encountered will appear in the result.
 * @note All values are converted to strings when used as keys in the result.
 * @note Supports string, number, and symbol keys.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of keys in the input object
 */
export function invertObject(
  obj: Record<string | number | symbol, unknown>,
): Record<string, string | number | symbol> {
  const result: Record<string, string | number | symbol> = {};
  for (const key of Reflect.ownKeys(obj)) {
    const value = obj[key];
    result[String(value)] = key;
  }
  return result;
}
