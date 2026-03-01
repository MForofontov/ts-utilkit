/**
 * Converts a string to uppercase.
 *
 * @deprecated Use native `str.toUpperCase()` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to convert.
 * @returns The uppercase version of the string.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * toUpperCase('Hello World'); // 'HELLO WORLD'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function toUpperCase(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  return str.toUpperCase();
}
