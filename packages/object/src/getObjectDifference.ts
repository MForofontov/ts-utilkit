/**
 * Returns an object containing properties that differ between two objects,
 * using values from the second object when they differ.
 *
 * @param obj1 - The first object for comparison.
 * @param obj2 - The second object for comparison.
 * @returns An object containing keys where values differ, using obj2's values.
 *
 * @throws {TypeError} If either obj1 or obj2 is not an object or is null.
 *
 * @example
 * // Different values and unique properties
 * const obj1 = { a: 1, b: 2, c: 3 };
 * const obj2 = { a: 1, b: 4, d: 5 };
 * getObjectDifference(obj1, obj2);
 * // { b: 4, c: undefined, d: 5 }
 *
 * @example
 * // Identical objects
 * const same1 = { x: 10, y: 20 };
 * const same2 = { x: 10, y: 20 };
 * getObjectDifference(same1, same2); // {}
 *
 * @example
 * // Only keys in obj2
 * getObjectDifference({}, { a: 1, b: 2 });
 * // { a: 1, b: 2 }
 *
 * @example
 * // Only keys in obj1
 * getObjectDifference({ a: 1, b: 2 }, {});
 * // { a: undefined, b: undefined }
 *
 * @example
 * // Real-world: Detect configuration changes
 * const oldConfig = { port: 3000, debug: false, timeout: 30 };
 * const newConfig = { port: 3000, debug: true, timeout: 30 };
 * const changes = getObjectDifference(oldConfig, newConfig);
 * // { debug: true } (only changed properties)
 *
 * @note Uses shallow equality (===) for comparison. Objects and arrays are only equal if they are the same reference.
 * @note Keys that exist only in obj1 will appear with undefined values in the result.
 * @note Keys that exist only in obj2 will appear with their obj2 values.
 * @note Useful for change detection, configuration diffs, and state management.
 * @note For deep comparison, consider using deepEqual first.
 *
 * @complexity Time: O(n + m), Space: O(d) - Where n and m are key counts, d is differences
 */
export function getObjectDifference(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): Record<string, unknown> {
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    throw new TypeError('Both inputs must be non-null objects');
  }

  const diff: Record<string, unknown> = {};

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  allKeys.forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
    }
  });

  return diff;
}
