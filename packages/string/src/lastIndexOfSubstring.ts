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
  return str.lastIndexOf(searchString);
}
