/**
 * Converts a string to lowercase.
 *
 * @deprecated Use native `str.toLowerCase()` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to convert.
 * @returns The lowercase version of the string.
 *
 * @example
 * toLowerCase('Hello World'); // 'hello world'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function toLowerCase(str: string): string {
  return str.toLowerCase();
}
