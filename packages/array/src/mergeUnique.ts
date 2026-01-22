import { deepEqual } from '../object/src/deepEqual';

/**
 * Merges two arrays and returns a new array with unique elements.
 * Uses deep equality comparison to determine if elements are duplicates.
 *
 * @param arr1 - The first array to merge.
 * @param arr2 - The second array to merge.
 * @returns A new array containing unique elements from both input arrays, with duplicates removed.
 *
 * @example
 * // Basic usage with primitive values
 * mergeUnique([1, 2, 3], [3, 4, 5]); // Returns [1, 2, 3, 4, 5]
 *
 * @example
 * // With objects using deep equality
 * mergeUnique([{id: 1}, {id: 2}], [{id: 2}, {id: 3}]); // Returns [{id: 1}, {id: 2}, {id: 3}]
 *
 * @example
 * // Empty arrays
 * mergeUnique([], [1, 2]); // Returns [1, 2]
 * mergeUnique([1, 2], []); // Returns [1, 2]
 * mergeUnique([], []); // Returns []
 *
 * @example
 * // Array with duplicates
 * mergeUnique([1, 1, 2], [2, 3, 3]); // Returns [1, 2, 3]
 *
 * @note This implementation uses deep equality comparison via the deepEqual function,
 * which makes it suitable for merging arrays with complex objects and nested structures.
 * Elements from the first array are added first, followed by unique elements from the second array.
 *
 * @complexity Time: O(n*m), Space: O(n) - Where n, m are input array lengths
 */
export function mergeUnique<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];

  const addUnique = (arr: T[]) => {
    arr.forEach((item) => {
      if (!result.some((existingItem) => deepEqual(existingItem, item))) {
        result.push(item);
      }
    });
  };

  addUnique(arr1);
  addUnique(arr2);

  return result;
}
