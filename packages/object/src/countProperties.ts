/**
 * Counts the number of own enumerable properties in an object.
 *
 * @param obj - The object to count properties of.
 * @returns The total number of own enumerable properties in the object.
 *
 * @throws {TypeError} If input is not a non-null object.
 *
 * @example
 * // Basic usage
 * countProperties({ a: 1, b: 2, c: 3 }); // 3
 * countProperties({ name: 'Alice', age: 30 }); // 2
 *
 * @example
 * // Empty object
 * countProperties({}); // 0
 *
 * @example
 * // With arrays (arrays are objects)
 * countProperties([1, 2, 3]); // 3 (array indices are properties)
 * countProperties([]); // 0
 *
 * @example
 * // Non-enumerable properties not counted
 * const obj = { a: 1 };
 * Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
 * countProperties(obj); // 1 (only 'a' is counted)
 *
 * @note Only counts own enumerable properties using Object.keys().
 * @note Inherited properties and non-enumerable properties are not counted.
 * @note This function is functionally equivalent to objectSize().
 * @note For arrays specifically, prefer using array.length instead.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of properties
 */
export function countProperties(obj: Record<string, unknown>): number {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.keys(obj).length;
}
