/**
 * Returns the index of the first occurrence of a substring within a string, or -1 if not found.
 *
 * @deprecated Use native `str.indexOf(searchString)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to search within.
 * @param searchString - The substring to search for.
 * @returns The index of the first occurrence, or -1 if not found.
 *
 * @example
 * indexOfSubstring('hello world', 'world'); // 6
 * indexOfSubstring('hello world', 'xyz');   // -1
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function indexOfSubstring(str: string, searchString: string): number {
  return str.indexOf(searchString);
}
