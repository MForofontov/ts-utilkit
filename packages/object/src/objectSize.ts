/**
 * Calculates the number of own enumerable properties in an object.
 *
 * @param obj - The object to count properties of.
 * @returns The number of own enumerable properties in the object.
 *
 * @throws {TypeError} If input is not a non-null object.
 *
 * @example
 * // Basic usage
 * objectSize({ a: 1, b: 2, c: 3 }); // 3
 * objectSize({}); // 0
 * objectSize({ key: 'value' }); // 1
 *
 * @example
 * // With arrays (arrays are objects)
 * objectSize([1, 2, 3]); // 3 (array indices are properties)
 * objectSize([]); // 0
 *
 * @example
 * // With inherited properties (not counted)
 * const proto = { inherited: 'value' };
 * const obj = Object.create(proto);
 * obj.own = 'value';
 * objectSize(obj); // 1 (only counts own properties)
 *
 * @example
 * // With non-enumerable properties (not counted)
 * const obj = { a: 1 };
 * Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
 * objectSize(obj); // 1 (non-enumerable 'hidden' not counted)
 *
 * @note Only counts own enumerable properties (using Object.keys()).
 * @note Non-enumerable properties and those on the prototype chain are not included.
 * @note For arrays specifically, prefer using array.length instead.
 * @note Equivalent to Object.keys(obj).length.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of properties
 */
export function objectSize(obj: Record<string, unknown>): number {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.keys(obj).length;
}
