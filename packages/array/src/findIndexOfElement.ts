import { deepEqual } from '../object/src/deepEqual';

/**
 * Finds the index of an element in an array using deep equality comparison.
 * Unlike the native Array.indexOf method, this function can find objects with the same structure
 * even if they are different references.
 *
 * @param arr - The array to search.
 * @param element - The element to find.
 * @returns The index of the element in the array, or -1 if not found.
 *
 * @example
 * // Basic usage with primitive values
 * findIndexOfElement([1, 2, 3, 4, 5], 3); // Returns 2
 *
 * @example
 * // With objects using deep equality
 * const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * findIndexOfElement(arr, { id: 2 }); // Returns 1
 *
 * @example
 * // Element not in array
 * findIndexOfElement([1, 2, 3], 5); // Returns -1
 *
 * @example
 * // With nested objects
 * const nestedArr = [{ user: { name: 'Alice', age: 30 } }, { user: { name: 'Bob', age: 25 } }];
 * findIndexOfElement(nestedArr, { user: { name: 'Bob', age: 25 } }); // Returns 1
 *
 * @note This implementation uses the deepEqual function for comparison,
 * which makes it more powerful than the native indexOf method for complex objects.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function findIndexOfElement<T>(arr: T[], element: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (deepEqual(arr[i], element)) {
      return i;
    }
  }
  return -1;
}
