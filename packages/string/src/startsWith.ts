/**
 * Checks whether a string begins with the specified search string.
 *
 * @deprecated Use native `str.startsWith(searchString)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to check.
 * @param searchString - The string to search for at the start.
 * @returns True if str begins with searchString, false otherwise.
 *
 * @example
 * startsWith('hello world', 'hello'); // true
 * startsWith('hello world', 'world'); // false
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function startsWith(str: string, searchString: string): boolean {
  return str.startsWith(searchString);
}
