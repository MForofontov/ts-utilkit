/**
 * Splits a string into an array of substrings using the specified delimiter.
 *
 * @deprecated Use native `str.split(delimiter)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to split.
 * @param delimiter - The delimiter to split on.
 * @returns An array of substrings.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If delimiter is not a string.
 *
 * @example
 * splitString('a,b,c', ','); // ['a', 'b', 'c']
 * splitString('hello', '');  // ['h', 'e', 'l', 'l', 'o']
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function splitString(str: string, delimiter: string): string[] {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  if (typeof delimiter !== 'string') {
    throw new TypeError(`delimiter must be a string, got ${typeof delimiter}`);
  }
  return str.split(delimiter);
}
