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
 * deepEqual([], {}); // false (array vs plain object)
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
 * @example
 * // Map and Set
 * deepEqual(new Map([['a', 1]]), new Map([['a', 1]])); // true
 * deepEqual(new Set([1, 2]), new Set([1, 2])); // true
 *
 * @note Handles primitives, plain objects, arrays, NaN, Date, RegExp, Map, and Set.
 * @note NaN is considered equal to NaN (unlike === comparison).
 * @note Compares object properties recursively.
 * @note Arrays must have same length and elements in same order.
 * @note Mixed kinds (array vs object, Date vs plain object, Map vs object) are never equal.
 * @note Does NOT support circular references.
 * @note Property order doesn't matter for plain objects.
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

  // Arrays must match arrays (reject array vs plain object)
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) {
    return false;
  }

  // Special case for Date objects
  const aIsDate = a instanceof Date;
  const bIsDate = b instanceof Date;
  if (aIsDate || bIsDate) {
    if (aIsDate && bIsDate) {
      return a.getTime() === b.getTime();
    }
    return false;
  }

  // Special case for RegExp objects
  const aIsRegExp = a instanceof RegExp;
  const bIsRegExp = b instanceof RegExp;
  if (aIsRegExp || bIsRegExp) {
    if (aIsRegExp && bIsRegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    return false;
  }

  // Special case for Map
  const aIsMap = a instanceof Map;
  const bIsMap = b instanceof Map;
  if (aIsMap || bIsMap) {
    if (!(aIsMap && bIsMap)) {
      return false;
    }
    if (a.size !== b.size) {
      return false;
    }
    for (const [key, value] of a) {
      if (!b.has(key) || !deepEqual(value, b.get(key))) {
        return false;
      }
    }
    return true;
  }

  // Special case for Set
  const aIsSet = a instanceof Set;
  const bIsSet = b instanceof Set;
  if (aIsSet || bIsSet) {
    if (!(aIsSet && bIsSet)) {
      return false;
    }
    if (a.size !== b.size) {
      return false;
    }

    const bValues = [...b];
    const matchedIndices = new Set<number>();

    for (const value of a) {
      let found = false;
      for (let i = 0; i < bValues.length; i++) {
        if (!matchedIndices.has(i) && deepEqual(value, bValues[i])) {
          matchedIndices.add(i);
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }

  const objA = a as Record<PropertyKey, unknown>;
  const objB = b as Record<PropertyKey, unknown>;
  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) return false;

  const keysBSet = new Set(keysB);

  for (const key of keysA) {
    if (!keysBSet.has(key) || !deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
