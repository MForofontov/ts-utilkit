/**
 * Drops elements from the beginning of an array while the predicate returns true,
 * then returns the remaining elements.
 * Once the predicate returns false for an element, that element and all subsequent
 * elements are included regardless of whether they satisfy the predicate.
 *
 * @param arr - The source array.
 * @param predicate - A function that tests each element. Dropping stops at the first false result.
 * @returns A new array with the leading elements that satisfy the predicate removed.
 *
 * @throws {TypeError} If `arr` is not an array.
 * @throws {TypeError} If `predicate` is not a function.
 *
 * @example
 * // Drop while less than 4
 * dropWhile([1, 2, 3, 4, 2, 1], n => n < 4); // Returns [4, 2, 1]
 *
 * @example
 * // Drop leading whitespace tokens
 * dropWhile(['', ' ', 'hello', '', 'world'], s => s.trim() === '');
 * // Returns ['hello', '', 'world']
 *
 * @example
 * // First element fails — returns entire array
 * dropWhile([5, 1, 2, 3], n => n < 4); // Returns [5, 1, 2, 3]
 *
 * @example
 * // All elements pass — returns empty array
 * dropWhile([1, 2, 3], n => n < 10); // Returns []
 *
 * @example
 * // Empty array
 * dropWhile([], n => n > 0); // Returns []
 *
 * @note Stops testing at the first element that fails the predicate.
 * Later elements that would satisfy the predicate are still included in the result.
 * The original array is not modified.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function dropWhile<T>(
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

  let dropIndex = 0;

  while (dropIndex < arr.length && predicate(arr[dropIndex], dropIndex, arr)) {
    dropIndex++;
  }

  return arr.slice(dropIndex);
}
