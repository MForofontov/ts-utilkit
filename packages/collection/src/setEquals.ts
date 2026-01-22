/**
 * Checks if two sets are equal (contain exactly the same elements).
 *
 * @param set1 - The first set.
 * @param set2 - The second set.
 * @returns True if both sets contain exactly the same elements, false otherwise.
 *
 * @throws {TypeError} If either argument is not a Set.
 *
 * @example
 * // Equal sets
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 2, 1]);
 * setEquals(set1, set2); // true
 *
 * @example
 * // Not equal (different sizes)
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([1, 2]);
 * setEquals(set1, set2); // false
 *
 * @example
 * // Not equal (different elements)
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([1, 2, 4]);
 * setEquals(set1, set2); // false
 *
 * @example
 * // Empty sets are equal
 * const set1 = new Set();
 * const set2 = new Set();
 * setEquals(set1, set2); // true
 *
 * @note Order does not matter for equality
 * @note Uses strict equality (===) for element comparison
 *
 * @complexity Time: O(n) where n is set size, Space: O(1)
 */
export function setEquals<T>(set1: Set<T>, set2: Set<T>): boolean {
  if (!(set1 instanceof Set)) {
    throw new TypeError(`First argument must be a Set, got ${typeof set1}`);
  }

  if (!(set2 instanceof Set)) {
    throw new TypeError(`Second argument must be a Set, got ${typeof set2}`);
  }

  // Quick check: if sizes differ, sets are not equal
  if (set1.size !== set2.size) {
    return false;
  }

  // Check if all elements of set1 are in set2
  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  return true;
}
