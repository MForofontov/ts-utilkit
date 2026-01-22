import { deepEqual } from '@ts-functions/object';

/**
 * Finds unique elements in an array using deep equality comparison.
 * Removes duplicate elements while preserving the original order of first occurrence.
 *
 * @param arr - The array to search for unique elements.
 * @returns A new array containing only the unique elements from the input array.
 *
 * @example
 * // Basic usage with primitive values
 * findUniqueElements([1, 2, 2, 3, 4, 4, 5]); // Returns [1, 2, 3, 4, 5]
 *
 * @example
 * // With objects using deep equality
 * findUniqueElements([{id: 1}, {id: 2}, {id: 1}, {id: 3}]); // Returns [{id: 1}, {id: 2}, {id: 3}]
 *
 * @example
 * // Empty array
 * findUniqueElements([]); // Returns []
 *
 * @example
 * // With mixed data types
 * findUniqueElements([1, '1', true, 1, '1']); // Returns [1, '1', true]
 *
 * @note This implementation uses deep equality comparison via the deepEqual function,
 * which makes it suitable for finding unique elements among complex objects and nested structures.
 * The original order of appearance is preserved for the first occurrence of each unique element.
 *
 * @complexity Time: O(n²), Space: O(1) - Where n is array length, due to the some() method with deep equality checks
 */
export function findUniqueElements<T>(arr: T[]): T[] {
  const uniqueElements: T[] = [];

  for (const item of arr) {
    if (!uniqueElements.some((uniqueItem) => deepEqual(uniqueItem, item))) {
      uniqueElements.push(item);
    }
  }

  return uniqueElements;
}
