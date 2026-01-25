/**
 * Returns the intersection of two or more sets (elements common to all sets).
 *
 * @param sets - Two or more sets to intersect.
 * @returns A new Set containing only elements present in all input sets.
 *
 * @throws {TypeError} If any argument is not a Set.
 * @throws {Error} If fewer than two sets are provided.
 *
 * @example
 * // Basic intersection
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([2, 3, 4]);
 * setIntersection(set1, set2); // Set { 2, 3 }
 *
 * @example
 * // Intersection of multiple sets
 * const set1 = new Set([1, 2, 3, 4]);
 * const set2 = new Set([2, 3, 4, 5]);
 * const set3 = new Set([3, 4, 5, 6]);
 * setIntersection(set1, set2, set3); // Set { 3, 4 }
 *
 * @example
 * // No common elements
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([3, 4]);
 * setIntersection(set1, set2); // Set {}
 *
 * @note Does not modify the original sets
 * @note Returns empty set if no common elements exist
 *
 * @complexity Time: O(n * m) where n is number of sets and m is smallest set size, Space: O(m)
 */
export function setIntersection<T>(...sets: Set<T>[]): Set<T> {
  if (sets.length < 2) {
    throw new Error(`At least two sets are required, got ${sets.length}`);
  }

  for (let i = 0; i < sets.length; i++) {
    if (!(sets[i] instanceof Set)) {
      throw new TypeError(
        `All arguments must be Sets, argument ${i} is ${typeof sets[i]}`,
      );
    }
  }

  // Start with the first set's elements
  const result = new Set<T>();
  const firstSet = sets[0];

  for (const item of firstSet) {
    // Check if item exists in all other sets
    let inAllSets = true;
    for (let i = 1; i < sets.length; i++) {
      if (!sets[i].has(item)) {
        inAllSets = false;
        break;
      }
    }

    if (inAllSets) {
      result.add(item);
    }
  }

  return result;
}
