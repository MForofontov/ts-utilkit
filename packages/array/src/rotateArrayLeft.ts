/**
 * Rotates an array to the left by a given number of positions.
 * Elements that would be shifted off the beginning are appended to the end.
 *
 * @param arr - The array to rotate.
 * @param positions - The number of positions to rotate the array.
 * @returns A new array with elements rotated to the left by the specified number of positions.
 *
 * @example
 * // Basic rotation
 * rotateArrayLeft([1, 2, 3, 4, 5], 2); // Returns [3, 4, 5, 1, 2]
 *
 * @example
 * // Rotation with positions greater than array length
 * rotateArrayLeft(['a', 'b', 'c'], 4); // Returns ['b', 'c', 'a']
 *
 * @example
 * // Negative positions (rotates right)
 * rotateArrayLeft([1, 2, 3, 4], -1); // Returns [4, 1, 2, 3]
 *
 * @example
 * // Empty array
 * rotateArrayLeft([], 3); // Returns []
 *
 * @note This implementation handles negative positions, positions greater than
 * the array length, and empty arrays. The function creates a new array without
 * modifying the original.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function rotateArrayLeft<T>(arr: T[], positions: number): T[] {
  const len = arr.length;
  if (len === 0) return arr;

  // Normalize positions to be within the array length
  positions = ((positions % len) + len) % len;

  return arr.slice(positions).concat(arr.slice(0, positions));
}
