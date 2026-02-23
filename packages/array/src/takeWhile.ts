/**
 * Returns elements from the beginning of an array while the predicate returns true.
 * Stops collecting elements as soon as the predicate returns false for the first time.
 *
 * @param arr - The source array.
 * @param predicate - A function that tests each element. Collection stops at the first false result.
 * @returns A new array containing the leading elements that satisfy the predicate.
 *
 * @throws {TypeError} If `arr` is not an array.
 * @throws {TypeError} If `predicate` is not a function.
 *
 * @example
 * // Take while less than 4
 * takeWhile([1, 2, 3, 4, 2, 1], n => n < 4); // Returns [1, 2, 3]
 *
 * @example
 * // Take words shorter than 6 characters
 * takeWhile(['hi', 'hey', 'hello', 'world!'], w => w.length < 6);
 * // Returns ['hi', 'hey', 'hello']
 *
 * @example
 * // First element fails — returns empty array
 * takeWhile([5, 1, 2, 3], n => n < 4); // Returns []
 *
 * @example
 * // All elements pass — returns entire array
 * takeWhile([1, 2, 3], n => n < 10); // Returns [1, 2, 3]
 *
 * @example
 * // Empty array
 * takeWhile([], n => n > 0); // Returns []
 *
 * @note Stops iterating at the first element that fails the predicate.
 * Elements after the failing element are never tested, even if they would pass.
 * The original array is not modified.
 *
 * @complexity Time: O(k), Space: O(k) - Where k is the number of taken elements
 */
export function takeWhile<T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
): T[] {
  if (!Array.isArray(arr)) {
    throw new TypeError(`arr must be an array, got ${typeof arr}`);
  }
  if (typeof predicate !== 'function') {
    throw new TypeError(
      `predicate must be a function, got ${typeof predicate}`,
    );
  }

  const result: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      break;
    }
    result.push(arr[i]);
  }

  return result;
}
