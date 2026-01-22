/**
 * Checks if two sets are disjoint (have no common elements).
 *
 * @param set1 - The first set.
 * @param set2 - The second set.
 * @returns True if the sets have no elements in common, false otherwise.
 *
 * @throws {TypeError} If either argument is not a Set.
 *
 * @example
 * // Disjoint sets
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([4, 5, 6]);
 * isDisjoint(set1, set2); // true
 *
 * @example
 * // Not disjoint (have common elements)
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 4, 5]);
 * isDisjoint(set1, set2); // false
 *
 * @example
 * // Empty sets are disjoint
 * const set1 = new Set();
 * const set2 = new Set();
 * isDisjoint(set1, set2); // true
 *
 * @example
 * // Empty set is disjoint with any set
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set();
 * isDisjoint(set1, set2); // true
 *
 * @note Empty sets are considered disjoint with any set (including other empty sets)
 *
 * @complexity Time: O(min(n, m)) where n and m are set sizes, Space: O(1)
 */
export function isDisjoint<T>(set1: Set<T>, set2: Set<T>): boolean {
  if (!(set1 instanceof Set)) {
    throw new TypeError(`First argument must be a Set, got ${typeof set1}`);
  }

  if (!(set2 instanceof Set)) {
    throw new TypeError(`Second argument must be a Set, got ${typeof set2}`);
  }

  // Optimize: iterate over the smaller set
  const smallerSet = set1.size <= set2.size ? set1 : set2;
  const largerSet = set1.size <= set2.size ? set2 : set1;

  // Check if any element from smaller set exists in larger set
  for (const item of smallerSet) {
    if (largerSet.has(item)) {
      return false;
    }
  }

  return true;
}
