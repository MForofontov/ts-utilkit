/**
 * Returns the index of the last occurrence of a substring within a string, or -1 if not found.
 *
 * @deprecated Use native `str.lastIndexOf(searchString)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to search within.
 * @param searchString - The substring to search for.
 * @returns The index of the last occurrence, or -1 if not found.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If searchString is not a string.
 *
 * @example
 * lastIndexOfSubstring('hello world hello', 'hello'); // 12
 * lastIndexOfSubstring('hello world', 'xyz');         // -1
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function lastIndexOfSubstring(
  str: string,
  searchString: string,
): number {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  if (typeof searchString !== 'string') {
    throw new TypeError(
      `searchString must be a string, got ${typeof searchString}`,
    );
  }
  return str.lastIndexOf(searchString);
}
