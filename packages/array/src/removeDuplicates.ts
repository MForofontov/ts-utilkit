import { deepEqual } from '@ts-utilkit/object';

/**
 * Removes duplicates from an array using deep equality comparison.
 * Preserves the original order of elements, keeping the first occurrence of each value.
 *
 * @param arr - The array to remove duplicates from.
 * @returns A new array containing only unique elements from the input array.
 *
 * @example
 * // Basic usage with primitive values
 * removeDuplicates([1, 2, 2, 3, 4, 4]); // Returns [1, 2, 3, 4]
 *
 * @example
 * // With objects using deep equality
 * removeDuplicates([{id: 1}, {id: 2}, {id: 1}]); // Returns [{id: 1}, {id: 2}]
 *
 * @example
 * // With nested arrays
 * removeDuplicates([[1, 2], [1, 2], ['three', 'four']]); // Returns [[1, 2], ['three', 'four']]
 *
 * @example
 * // Empty array
 * removeDuplicates([]); // Returns []
 *
 * @note This implementation uses deep equality comparison via the deepEqual function,
 * which makes it suitable for removing duplicates from arrays with complex objects
 * and nested structures. The original order is preserved for the first occurrence of each value.
 *
 * @complexity Time: O(n²), Space: O(n) - Where n is array length
 */
export function removeDuplicates<T>(arr: T[]): T[] {
  const uniqueItems: T[] = [];
  arr.forEach((item) => {
    if (!uniqueItems.some((existingItem) => deepEqual(existingItem, item))) {
      uniqueItems.push(item);
    }
  });
  return uniqueItems;
}
