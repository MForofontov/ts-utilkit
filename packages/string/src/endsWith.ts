/**
 * Checks whether a string ends with the specified search string.
 *
 * @deprecated Use native `str.endsWith(searchString)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to check.
 * @param searchString - The string to search for at the end.
 * @returns True if str ends with searchString, false otherwise.
 *
 * @example
 * endsWith('hello world', 'world'); // true
 * endsWith('hello world', 'hello'); // false
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function endsWith(str: string, searchString: string): boolean {
  return str.endsWith(searchString);
}
