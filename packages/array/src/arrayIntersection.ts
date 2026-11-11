import { deepEqual } from '@ts-utilkit/object';
import { primitiveMembership } from './_primitiveMembership';

/**
 * Returns the intersection of two arrays (elements that are present in both arrays).
 * Uses deep equality comparison to determine if elements match.
 *
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @returns A new array containing only the elements that exist in both input arrays.
 * @throws Error if either input is not an array.
 *
 * @example
 * // Basic usage with primitive values
 * arrayIntersection([1, 2, 3], [2, 3, 4]); // Returns [2, 3]
 *
 * @example
 * // Works with objects using deep equality
 * const arr1 = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * const arr2 = [{ a: 2 }, { a: 3 }, { a: 4 }];
 * arrayIntersection(arr1, arr2); // Returns [{ a: 2 }, { a: 3 }]
 *
 * @example
 * // Empty arrays
 * arrayIntersection([], [1, 2]); // Returns []
 * arrayIntersection([1, 2], []); // Returns []
 *
 * @note Larger data-only arrays use native membership when arr2 contains no objects.
 * Small, object-containing, accessor, and inherited-element inputs retain nested
 * deep comparisons. Order, duplicates, and sparse-array filtering are preserved.
 *
 * @complexity Time: O(n+m) on the native path, otherwise O(n*m) deep comparisons;
 * Space: O(n+m), where n and m are input lengths, excluding deepEqual traversal.
 */
export function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
  // Validate input
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Both arguments must be arrays.');
  }

  const keys = primitiveMembership(arr1, arr2);
  if (keys !== undefined) return arr1.filter((item) => keys.has(item));

  // Filter arr1 to find common elements based on deep equality
  return arr1.filter((item1) => arr2.some((item2) => deepEqual(item1, item2)));
}
