/**
 * Checks if a set is a subset of another set (all elements of subset are in superset).
 *
 * @param subset - The potential subset.
 * @param superset - The potential superset.
 * @returns True if subset is a subset of superset, false otherwise.
 *
 * @example
 * // True subset
 * const subset = new Set([1, 2]);
 * const superset = new Set([1, 2, 3, 4]);
 * isSubset(subset, superset); // true
 *
 * @example
 * // Not a subset
 * const subset = new Set([1, 5]);
 * const superset = new Set([1, 2, 3, 4]);
 * isSubset(subset, superset); // false
 *
 * @example
 * // Empty set is subset of any set
 * const subset = new Set();
 * const superset = new Set([1, 2, 3]);
 * isSubset(subset, superset); // true
 *
 * @example
 * // Set is subset of itself
 * const set = new Set([1, 2, 3]);
 * isSubset(set, set); // true
 *
 * @note Empty set is considered a subset of any set
 * @note A set is always a subset of itself
 *
 * @complexity Time: O(n) where n is size of subset, Space: O(1)
 */
export function isSubset<T>(subset: Set<T>, superset: Set<T>): boolean {

  // If subset is larger, it cannot be a subset
  if (subset.size > superset.size) {
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
