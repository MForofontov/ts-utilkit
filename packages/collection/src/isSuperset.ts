/**
 * Checks if a set is a superset of another set (contains all elements of the other set).
 *
 * @param superset - The potential superset.
 * @param subset - The potential subset.
 * @returns True if superset contains all elements of subset, false otherwise.
 *
 * @throws {TypeError} If either argument is not a Set.
 *
 * @example
 * // True superset
 * const superset = new Set([1, 2, 3, 4]);
 * const subset = new Set([1, 2]);
 * isSuperset(superset, subset); // true
 *
 * @example
 * // Not a superset
 * const superset = new Set([1, 2, 3]);
 * const subset = new Set([1, 5]);
 * isSuperset(superset, subset); // false
 *
 * @example
 * // Any set is superset of empty set
 * const superset = new Set([1, 2, 3]);
 * const subset = new Set();
 * isSuperset(superset, subset); // true
 *
 * @example
 * // Set is superset of itself
 * const set = new Set([1, 2, 3]);
 * isSuperset(set, set); // true
 *
 * @note Any set is a superset of the empty set
 * @note A set is always a superset of itself
 *
 * @complexity Time: O(n) where n is size of subset, Space: O(1)
 */
export function isSuperset<T>(superset: Set<T>, subset: Set<T>): boolean {
  if (!(superset instanceof Set)) {
    throw new TypeError(`First argument must be a Set, got ${typeof superset}`);
  }

  if (!(subset instanceof Set)) {
    throw new TypeError(`Second argument must be a Set, got ${typeof subset}`);
  }

  // If superset is smaller, it cannot be a superset
  if (superset.size < subset.size) {
    return false;
  }

  // Check if all elements of subset are in superset
  for (const item of subset) {
    if (!superset.has(item)) {
      return false;
    }
  }

  return true;
}
