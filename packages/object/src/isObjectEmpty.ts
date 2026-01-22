/**
 * Checks if an object has no own enumerable properties.
 *
 * @param obj - The object to check for emptiness.
 * @returns True if the object has no own enumerable properties, false otherwise.
 *
 * @throws {TypeError} If input is not a non-null object.
 *
 * @example
 * // Basic usage
 * isObjectEmpty({}); // true
 * isObjectEmpty({ a: 1 }); // false
 * isObjectEmpty({ key: 'value' }); // false
 *
 * @example
 * // Works with different object types
 * isObjectEmpty(new Object()); // true
 * isObjectEmpty(Object.create(null)); // true
 * isObjectEmpty([]); // true (empty arrays are also empty objects)
 * isObjectEmpty([1, 2]); // false
 *
 * @example
 * // Objects with inherited properties
 * const proto = { inherited: 'value' };
 * const obj = Object.create(proto);
 * isObjectEmpty(obj); // true (inherited properties don't count)
 * obj.own = 'value';
 * isObjectEmpty(obj); // false (now has own property)
 *
 * @example
 * // With non-enumerable properties
 * const obj = {};
 * Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
 * isObjectEmpty(obj); // true (non-enumerable properties don't count)
 *
 * @note This function only checks for own enumerable properties using Object.keys().
 * @note Non-enumerable properties and inherited properties are not considered.
 * @note Arrays are also objects, so empty arrays return true.
 * @note For arrays specifically, prefer checking array.length === 0.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isObjectEmpty(obj: Record<string, unknown>): boolean {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.keys(obj).length === 0;
}
