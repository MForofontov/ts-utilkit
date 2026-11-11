import { deepEqual } from '@ts-utilkit/object';
import { primitiveMembership } from './_primitiveMembership';

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
 * @note Larger data-only arrays use native membership when arr2 contains no objects.
 * Small, object-containing, accessor, and inherited-element inputs retain nested
 * deep comparisons. Order, duplicates, and sparse-array filtering are preserved.
 * @complexity Time: O(n+m) on the native path, otherwise O(n*m) deep comparisons;
 * Space: O(n+m), where n and m are input lengths, excluding deepEqual traversal.
 */
export function arrayDifference<T>(arr1: T[], arr2: T[]): T[] {
  const keys = primitiveMembership(arr1, arr2);
  if (keys !== undefined) return arr1.filter((item) => !keys.has(item));
  return arr1.filter((item1) => !arr2.some((item2) => deepEqual(item1, item2)));
}
