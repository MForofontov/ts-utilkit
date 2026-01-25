/**
 * Returns the symmetric difference of two sets (elements in either set but not in both).
 *
 * @param set1 - The first set.
 * @param set2 - The second set.
 * @returns A new Set containing elements that are in either set1 or set2, but not in both.
 *
 * @throws {TypeError} If either argument is not a Set.
 *
 * @example
 * // Basic symmetric difference
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 4, 5]);
 * setSymmetricDifference(set1, set2); // Set { 1, 2, 4, 5 }
 *
 * @example
 * // No overlap
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([3, 4]);
 * setSymmetricDifference(set1, set2); // Set { 1, 2, 3, 4 }
 *
 * @example
 * // Complete overlap
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([1, 2, 3]);
 * setSymmetricDifference(set1, set2); // Set {}
 *
 * @example
 * // With empty set
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set();
 * setSymmetricDifference(set1, set2); // Set { 1, 2, 3 }
 *
 * @note Does not modify the original sets
 * @note Symmetric difference is commutative: A ⊕ B = B ⊕ A
 *
 * @complexity Time: O(n + m) where n and m are set sizes, Space: O(n + m)
 */
export function setSymmetricDifference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  if (!(set1 instanceof Set)) {
    throw new TypeError(`First argument must be a Set, got ${typeof set1}`);
  }

  if (!(set2 instanceof Set)) {
    throw new TypeError(`Second argument must be a Set, got ${typeof set2}`);
  }

  const result = new Set<T>();

  // Add elements from set1 that are not in set2
  for (const item of set1) {
    if (!set2.has(item)) {
      result.add(item);
    }
  }

  // Add elements from set2 that are not in set1
  for (const item of set2) {
    if (!set1.has(item)) {
      result.add(item);
    }
  }

  return result;
}
