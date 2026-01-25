/**
 * Returns the union of two or more sets (all unique elements from all sets).
 *
 * @param sets - Two or more sets to union.
 * @returns A new Set containing all unique elements from all input sets.
 *
 * @throws {TypeError} If any argument is not a Set.
 * @throws {Error} If fewer than two sets are provided.
 *
 * @example
 * // Basic union
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 4, 5]);
 * setUnion(set1, set2); // Set { 1, 2, 3, 4, 5 }
 *
 * @example
 * // Union of multiple sets
 * const set1 = new Set(['a', 'b']);
 * const set2 = new Set(['b', 'c']);
 * const set3 = new Set(['c', 'd']);
 * setUnion(set1, set2, set3); // Set { 'a', 'b', 'c', 'd' }
 *
 * @example
 * // Union with empty sets
 * const set1 = new Set([1, 2]);
 * const set2 = new Set();
 * setUnion(set1, set2); // Set { 1, 2 }
 *
 * @note Does not modify the original sets
 * @note Order of elements in result is based on insertion order
 *
 * @complexity Time: O(n * m) where n is number of sets and m is average set size, Space: O(n * m)
 */
export function setUnion<T>(...sets: Set<T>[]): Set<T> {
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

  const result = new Set<T>();

  for (const set of sets) {
    for (const item of set) {
      result.add(item);
    }
  }

  return result;
}
