/**
 * Converts an array to a Set, removing duplicates.
 *
 * @param array - The array to convert.
 * @returns A new Set containing unique elements from the array.
 *
 * @throws {TypeError} If array is not an array.
 *
 * @example
 * // Remove duplicates
 * const array = [1, 2, 2, 3, 3, 3];
 * arrayToSet(array); // Set { 1, 2, 3 }
 *
 * @example
 * // String array
 * const array = ['apple', 'banana', 'apple', 'cherry'];
 * arrayToSet(array); // Set { 'apple', 'banana', 'cherry' }
 *
 * @example
 * // Empty array
 * const array: number[] = [];
 * arrayToSet(array); // Set {}
 *
 * @note Preserves insertion order of first occurrence
 * @note Uses strict equality (===) for duplicate detection
 *
 * @complexity Time: O(n) where n is array length, Space: O(n)
 */
export function arrayToSet<T>(array: T[]): Set<T> {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }

  return new Set(array);
}
