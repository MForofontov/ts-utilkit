/**
 * Performs a shallow equality comparison between two objects.
 * Objects are considered shallowly equal when they have the same properties
 * with the same values (using strict equality ===).
 *
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns True if objects have identical own enumerable properties, false otherwise.
 *
 * @throws {TypeError} If either input is not an object or is null.
 *
 * @example
 * // Objects with same properties and values
 * shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
 *
 * @example
 * // Different property values
 * shallowEqual({ a: 1, b: 2 }, { a: 1, b: 3 }); // false
 *
 * @example
 * // Different property sets
 * shallowEqual({ a: 1, b: 2 }, { a: 1, c: 2 }); // false
 *
 * @example
 * // Nested objects compared by reference
 * const nested = { x: 10 };
 * shallowEqual({ a: nested }, { a: nested }); // true (same reference)
 * shallowEqual({ a: { x: 10 } }, { a: { x: 10 } }); // false (different references)
 *
 * @example
 * // Real-world: Optimizing React re-renders
 * const prevProps = { count: 5, label: 'Items' };
 * const nextProps = { count: 5, label: 'Items' };
 * if (shallowEqual(prevProps, nextProps)) {
 *   // Skip re-render
 * }
 *
 * @note Reference equality (===) is used for nested objects and arrays.
 * @note Two objects with identical nested structures but different references will return false.
 * @note Only compares own enumerable properties, not inherited ones.
 * @note Use deepEqual() for deep comparison of nested structures.
 * @note Useful for performance optimization in frameworks like React (shouldComponentUpdate).
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the number of properties
 */
export function shallowEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean {
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    throw new TypeError('Both inputs must be non-null objects');
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => obj1[key] === obj2[key]);
}
