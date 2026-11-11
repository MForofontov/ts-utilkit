import { deepEqual } from '@ts-utilkit/object';

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
 * @complexity Time: O(n) for primitives, O(n²) for objects; Space: O(n).
 */
export function findUniqueElements<T>(arr: T[]): T[] {
  const uniqueElements: T[] = [];
  const primitiveSeen = new Set<T>();
  const objectSeen: T[] = [];

  for (const item of arr) {
    if (item === null || typeof item !== 'object') {
      if (!primitiveSeen.has(item)) {
        primitiveSeen.add(item);
        uniqueElements.push(item);
      }
    } else if (!objectSeen.some((uniqueItem) => deepEqual(uniqueItem, item))) {
      objectSeen.push(item);
      uniqueElements.push(item);
    }
  }

  return uniqueElements;
}
