/**
 * Generates all contiguous sub-arrays (windows) of a fixed size by sliding
 * a window across the input array one element at a time.
 *
 * @param arr - The source array to slide over.
 * @param size - The size of each window. Must be a positive integer.
 * @returns An array of windows, where each window is a sub-array of length `size`.
 * Returns an empty array if `size` is greater than `arr.length`.
 *
 * @throws {Error} If `size` is not a positive integer (≤ 0 or non-integer).
 *
 * @example
 * // Basic sliding window of size 3
 * slidingWindow([1, 2, 3, 4, 5], 3);
 * // Returns [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * @example
 * // Window size equals array length — one window
 * slidingWindow([1, 2, 3], 3); // Returns [[1, 2, 3]]
 *
 * @example
 * // Window size of 1 — every element individually
 * slidingWindow([1, 2, 3], 1); // Returns [[1], [2], [3]]
 *
 * @example
 * // Window size larger than array — returns empty
 * slidingWindow([1, 2], 5); // Returns []
 *
 * @example
 * // Moving average use-case
 * const prices = [10, 11, 12, 10, 9];
 * const windows = slidingWindow(prices, 3);
 * const movingAverages = windows.map(w => w.reduce((a, b) => a + b, 0) / w.length);
 * // movingAverages => [11, 11, 10.33...]
 *
 * @note Each window is a shallow copy; mutations to a window element do not
 * affect the original array for primitive types but will for object references.
 *
 * @complexity Time: O(n * size), Space: O(n * size) - Where n is array length
 */
export function slidingWindow<T>(arr: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error(`size must be a positive integer, got ${size}`);
  }

  if (size > arr.length) {
    return [];
  }

  const result: T[][] = [];
  const windowCount = arr.length - size + 1;

  for (let i = 0; i < windowCount; i++) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
