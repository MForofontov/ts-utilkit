/**
 * Splits an array into chunks of a specified size.
 * This is useful for batch processing, pagination, or displaying data in grids.
 *
 * @param arr - The array to be split into chunks.
 * @param size - The size of each chunk (must be greater than 0).
 * @returns A two-dimensional array with the elements divided into chunks.
 * @throws Error if the size is less than or equal to 0.
 *
 * @example
 * // Basic usage
 * chunkArray([1, 2, 3, 4, 5, 6, 7], 3); // Returns [[1, 2, 3], [4, 5, 6], [7]]
 *
 * @example
 * // With strings
 * chunkArray(['a', 'b', 'c', 'd', 'e'], 2); // Returns [['a', 'b'], ['c', 'd'], ['e']]
 *
 * @example
 * // Empty array
 * chunkArray([], 5); // Returns []
 *
 * @example
 * // When array length is a multiple of chunk size
 * chunkArray([1, 2, 3, 4], 2); // Returns [[1, 2], [3, 4]]
 *
 * @note The final chunk may contain fewer elements than the specified size
 * if the array length is not a multiple of the chunk size.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be greater than 0.');
  }

  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}
