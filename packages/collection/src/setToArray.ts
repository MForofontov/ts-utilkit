/**
 * Converts a Set to an array.
 *
 * @param set - The Set to convert.
 * @returns A new array containing all elements from the set.
 *
 * @example
 * // Basic conversion
 * const set = new Set([1, 2, 3]);
 * setToArray(set); // [1, 2, 3]
 *
 * @example
 * // String set
 * const set = new Set(['apple', 'banana', 'cherry']);
 * setToArray(set); // ['apple', 'banana', 'cherry']
 *
 * @example
 * // Empty set
 * const set = new Set();
 * setToArray(set); // []
 *
 * @note Preserves insertion order
 * @note Creates a new array (does not reference internal Set structure)
 *
 * @deprecated Use `Array.from(set)` or `[...set]` directly — this function wraps a single built-in call.
 * Will be removed in the next major version.
 *
 * @complexity Time: O(n) where n is set size, Space: O(n)
 */
export function setToArray<T>(set: Set<T>): T[] {

  return Array.from(set);
}
