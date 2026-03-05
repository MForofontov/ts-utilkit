/**
 * Converts a string to uppercase.
 *
 * @deprecated Use native `str.toUpperCase()` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to convert.
 * @returns The uppercase version of the string.
 *
 * @example
 * toUpperCase('Hello World'); // 'HELLO WORLD'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function toUpperCase(str: string): string {
  return str.toUpperCase();
}
