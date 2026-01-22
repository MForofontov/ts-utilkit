/**
 * Returns the difference between the first set and subsequent sets (elements in first set but not in others).
 *
 * @param firstSet - The base set.
 * @param otherSets - One or more sets to subtract from the first set.
 * @returns A new Set containing elements from firstSet that are not in any of the otherSets.
 *
 * @throws {TypeError} If any argument is not a Set.
 * @throws {Error} If fewer than two sets are provided.
 *
 * @example
 * // Basic difference
 * const set1 = new Set([1, 2, 3, 4]);
 * const set2 = new Set([3, 4, 5]);
 * setDifference(set1, set2); // Set { 1, 2 }
 *
 * @example
 * // Difference with multiple sets
 * const set1 = new Set([1, 2, 3, 4, 5]);
 * const set2 = new Set([2, 3]);
 * const set3 = new Set([4]);
 * setDifference(set1, set2, set3); // Set { 1, 5 }
 *
 * @example
 * // All elements removed
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([1, 2, 3, 4]);
 * setDifference(set1, set2); // Set {}
 *
 * @note Does not modify the original sets
 * @note Order matters: A - B ≠ B - A
 *
 * @complexity Time: O(n * m) where n is firstSet size and m is number of other sets, Space: O(n)
 */
export function setDifference<T>(
  firstSet: Set<T>,
  ...otherSets: Set<T>[]
): Set<T> {
  if (otherSets.length < 1) {
    throw new Error(
      'At least two sets are required (one base set and one to subtract)',
    );
  }

  if (!(firstSet instanceof Set)) {
    throw new TypeError(`First argument must be a Set, got ${typeof firstSet}`);
  }

  for (let i = 0; i < otherSets.length; i++) {
    if (!(otherSets[i] instanceof Set)) {
      throw new TypeError(
        `All arguments must be Sets, argument ${i + 1} is ${typeof otherSets[i]}`,
      );
    }
  }

  const result = new Set<T>();

  for (const item of firstSet) {
    // Check if item exists in any of the other sets
    let inOtherSets = false;
    for (const otherSet of otherSets) {
      if (otherSet.has(item)) {
        inOtherSets = true;
        break;
      }
    }

    if (!inOtherSets) {
      result.add(item);
    }
  }

  return result;
}
