import { deepEqual } from '@ts-functions/object';

/**
 * Finds the difference between two arrays (elements in the first array that are not in the second).
 * Uses deep equality comparison to determine if elements match.
 *
 * @param arr1 - The first array (source array).
 * @param arr2 - The second array (array to compare against).
 * @returns A new array containing only the elements from arr1 that don't exist in arr2.
 *
 * @example
 * // Basic usage with primitive values
 * arrayDifference([1, 2, 3, 4], [3, 4, 5, 6]); // Returns [1, 2]
 *
 * @example
 * // Works with objects using deep equality
 * arrayDifference([{id: 1}, {id: 2}], [{id: 2}]); // Returns [{id: 1}]
 *
 * @example
 * // Empty arrays
 * arrayDifference([], [1, 2]); // Returns []
 * arrayDifference([1, 2], []); // Returns [1, 2]
 *
 * @note For large arrays, consider using a Set-based approach for better performance
 * with primitive values. This implementation uses deep equality which is more suitable
 * for comparing objects and nested structures but has O(n*m) complexity.
 * @note This implementation uses deep equality comparison which makes it suitable
 * for comparing objects and nested structures, but has higher computational cost.
 * For large arrays with primitive values only, a Set-based approach would be more efficient.
 * @complexity Time: O(n*m), Space: O(n) - Where n, m are arr1, arr2 lengths
 */
export function arrayDifference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item1) => !arr2.some((item2) => deepEqual(item1, item2)));
}
