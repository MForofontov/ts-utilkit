/**
 * Splits an array into two groups based on a predicate function.
 * The first array contains all elements for which the predicate returns true,
 * and the second array contains all elements for which it returns false.
 *
 * @param arr - The array to partition.
 * @param predicate - A function that tests each element. Returns true for elements in the first group.
 * @returns A tuple `[matches, nonMatches]` where `matches` are elements satisfying the predicate
 * and `nonMatches` are elements that do not.
 *
 * @example
 * // Partition numbers into even and odd
 * partition([1, 2, 3, 4, 5], n => n % 2 === 0);
 * // Returns [[2, 4], [1, 3, 5]]
 *
 * @example
 * // Partition objects by a boolean property
 * const users = [
 *   { name: 'Alice', active: true },
 *   { name: 'Bob', active: false },
 *   { name: 'Charlie', active: true },
 * ];
 * partition(users, u => u.active);
 * // Returns [[{ name: 'Alice', active: true }, { name: 'Charlie', active: true }], [{ name: 'Bob', active: false }]]
 *
 * @example
 * // Empty array returns two empty arrays
 * partition([], x => x > 0); // Returns [[], []]
 *
 * @example
 * // All elements match
 * partition([2, 4, 6], n => n % 2 === 0); // Returns [[2, 4, 6], []]
 *
 * @note Preserves the relative order of elements in both output arrays.
 * The original array is not modified.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function partition<T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
): [T[], T[]] {
  const matches: T[] = [];
  const nonMatches: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      matches.push(arr[i]);
    } else {
      nonMatches.push(arr[i]);
    }
  }

  return [matches, nonMatches];
}
