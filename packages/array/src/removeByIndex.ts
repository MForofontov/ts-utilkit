/**
 * Removes elements from an array by their indices.
 * Creates a new array without the elements at the specified indices.
 *
 * @param arr - The array to remove elements from.
 * @param indices - The indices of elements to remove.
 * @returns A new array with the specified elements removed.
 *
 * @example
 * // Basic usage
 * removeByIndex([1, 2, 3, 4, 5], [1, 3]); // Returns [1, 3, 5]
 *
 * @example
 * // Removing first and last elements
 * removeByIndex(['a', 'b', 'c', 'd'], [0, 3]); // Returns ['b', 'c']
 *
 * @example
 * // With no indices to remove
 * removeByIndex([1, 2, 3], []); // Returns [1, 2, 3]
 *
 * @example
 * // Empty array handling
 * removeByIndex([], [0, 1]); // Returns []
 *
 * @note This function does not modify the original array. It returns a new array
 * with the filtered results. Indices that don't exist in the array are ignored.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function removeByIndex<T>(arr: T[], indices: number[]): T[] {
  return arr.filter((_, index) => !indices.includes(index));
}
