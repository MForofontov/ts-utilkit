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
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If searchString is not a string.
 *
 * @example
 * startsWith('hello world', 'hello'); // true
 * startsWith('hello world', 'world'); // false
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function startsWith(str: string, searchString: string): boolean {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  if (typeof searchString !== 'string') {
    throw new TypeError(
      `searchString must be a string, got ${typeof searchString}`,
    );
  }
  return str.startsWith(searchString);
}
