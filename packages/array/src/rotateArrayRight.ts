/**
 * Rotates an array to the right by a given number of positions.
 * Elements that would be shifted off the end are moved to the beginning.
 *
 * @param arr - The array to rotate.
 * @param positions - The number of positions to rotate the array.
 * @returns A new array with elements rotated to the right by the specified number of positions.
 *
 * @example
 * // Basic rotation
 * rotateArrayRight([1, 2, 3, 4, 5], 2); // Returns [4, 5, 1, 2, 3]
 *
 * @example
 * // Rotation with positions greater than array length
 * rotateArrayRight(['a', 'b', 'c'], 4); // Returns ['c', 'a', 'b']
 *
 * @example
 * // Negative positions (rotates left)
 * rotateArrayRight([1, 2, 3, 4], -1); // Returns [2, 3, 4, 1]
 *
 * @example
 * // Empty array
 * rotateArrayRight([], 3); // Returns []
 *
 * @note This implementation handles negative positions, positions greater than
 * the array length, and empty arrays. The function creates a new array without
 * modifying the original.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function rotateArrayRight<T>(arr: T[], positions: number): T[] {
  const len = arr.length;
  if (len === 0) return arr;

  // Normalize positions to be within the array length
  positions = ((positions % len) + len) % len;

  return arr.slice(-positions).concat(arr.slice(0, -positions));
}
