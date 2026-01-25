/**
 * Performs a deep equality comparison between two values of any type.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns True if the values are deeply equal, false otherwise.
 *
 * @example
 * // Primitive comparisons
 * deepEqual(42, 42); // true
 * deepEqual('hello', 'hello'); // true
 * deepEqual(NaN, NaN); // true (special NaN handling)
 *
 * @example
 * // Objects with nested structures
 * deepEqual({a: {b: 1}}, {a: {b: 1}}); // true
 * deepEqual({a: {b: 1}}, {a: {b: 2}}); // false
 *
 * @example
 * // Array comparisons
 * deepEqual([1, 2, [3, 4]], [1, 2, [3, 4]]); // true
 * deepEqual([1, 2, 3], [1, 2]); // false (different lengths)
 *
 * @example
 * // Date objects
 * deepEqual(new Date('2025-01-01'), new Date('2025-01-01')); // true
 * deepEqual(new Date('2025-01-01'), new Date('2025-01-02')); // false
 *
 * @example
 * // RegExp objects
 * deepEqual(/test/gi, /test/gi); // true
 * deepEqual(/test/gi, /test/i); // false (different flags)
 *
 * @note Handles primitives, objects, arrays, NaN, Date, and RegExp objects.
 * @note NaN is considered equal to NaN (unlike === comparison).
 * @note Compares object properties recursively.
 * @note Arrays must have same length and elements in same order.
 * @note Does NOT support Map, Set, or circular references.
 * @note Property order doesn't matter for objects.
 *
 * @complexity Time: O(n) where n is total number of values across both structures, Space: O(d) where d is max depth (recursion stack)
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  // Special case for NaN
  if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
    return true;
  }

  // If both values are strictly equal, they are deeply equal.
  if (a === b) return true;

  // If either value is not an object or is null, they are not deeply equal.
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  // Special case for Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Special case for RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // If one is a Date and the other is a RegExp, they are not deeply equal
  if (
    (a instanceof Date && b instanceof RegExp) ||
    (a instanceof RegExp && b instanceof Date)
  ) {
    return false;
  }

  // Special case for boolean values
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return a === b;
  }

  // Get the keys of both objects.
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // If the objects have different numbers of keys, they are not deeply equal.
  if (keysA.length !== keysB.length) return false;

  // Recursively compare each key and value in both objects.
  for (const key of keysA) {
    // If the key is not present in both objects or the values are not deeply equal, return false.
    if (!keysB.includes(key) || !deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  // If all keys and values are deeply equal, return true.

  return true;
}
