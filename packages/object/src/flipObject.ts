/**
 * Creates a new object by swapping the keys and values of the input object.
 * All values are converted to strings when used as keys in the result.
 *
 * @param obj - The object whose keys and values will be swapped.
 * @returns A new object with keys and values swapped (values become keys, keys become values).
 *
 * @throws {TypeError} If input is not a non-null object.
 *
 * @example
 * // Basic usage
 * flipObject({ a: 1, b: 2 }); // { '1': 'a', '2': 'b' }
 * flipObject({ x: 'foo', y: 'bar' }); // { 'foo': 'x', 'bar': 'y' }
 *
 * @example
 * // Duplicate values (last key wins)
 * flipObject({ a: 1, b: 1, c: 2 }); // { '1': 'b', '2': 'c' } (key 'a' is overwritten)
 * flipObject({ first: 'same', second: 'same' }); // { 'same': 'second' }
 *
 * @example
 * // Values converted to strings
 * flipObject({ a: true, b: false, c: null }); // { 'true': 'a', 'false': 'b', 'null': 'c' }
 * flipObject({ x: 42, y: 3.14 }); // { '42': 'x', '3.14': 'y' }
 *
 * @example
 * // Edge cases
 * flipObject({}); // {}
 * flipObject({ a: '' }); // { '': 'a' } (empty string key)
 *
 * @note If the original object has duplicate values, only the last key with that value is preserved.
 * @note All values are converted to strings using String() before becoming keys.
 * @note Complex values (objects, arrays) are converted to strings using toString().
 * @note Original object is not modified; a new object is returned.
 * @note Use with caution when values are objects/arrays as they become "[object Object]" or comma-separated strings.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of properties
 */
export function flipObject<T extends Record<string, unknown>>(
  obj: T,
): Record<string, string> {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    acc[String(obj[key])] = key;
    return acc;
  }, {});
}
