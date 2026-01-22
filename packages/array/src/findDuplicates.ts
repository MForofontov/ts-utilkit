import { deepEqual } from '../object/src/deepEqual';

/**
 * Finds duplicate elements in an array using deep equality comparison.
 * Each duplicate value is included only once in the result array.
 *
 * @param arr - The array to search for duplicates.
 * @returns A new array containing the duplicate values (with no repetition of the duplicates themselves).
 *
 * @example
 * // Basic usage with primitive values
 * findDuplicates([1, 2, 2, 3, 4, 4, 5]); // Returns [2, 4]
 *
 * @example
 * // With objects using deep equality
 * findDuplicates([{id: 1}, {id: 2}, {id: 1}, {id: 3}]); // Returns [{id: 1}]
 *
 * @example
 * // Empty array or no duplicates
 * findDuplicates([]); // Returns []
 * findDuplicates([1, 2, 3]); // Returns []
 *
 * @example
 * // Multiple occurrences of the same value
 * findDuplicates([1, 1, 1, 2, 2]); // Returns [1, 2]
 *
 * @note This implementation uses deep equality comparison via the deepEqual function,
 * which makes it suitable for finding duplicates of complex objects and nested structures.
 * Each duplicate is included exactly once in the result, regardless of how many times it appears.
 *
 * @complexity Time: O(n²), Space: O(n) - Where n is array length, due to the nested array searches
 */
export function findDuplicates<T>(arr: T[]): T[] {
  const duplicates: T[] = [];
  const seen: T[] = [];

  for (const item of arr) {
    if (seen.some((seenItem) => deepEqual(seenItem, item))) {
      if (!duplicates.some((duplicate) => deepEqual(duplicate, item))) {
        duplicates.push(item);
      }
    } else {
      seen.push(item);
    }
  }

  return duplicates;
}
