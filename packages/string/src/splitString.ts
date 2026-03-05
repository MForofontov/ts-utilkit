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
 * @example
 * splitString('a,b,c', ','); // ['a', 'b', 'c']
 * splitString('hello', '');  // ['h', 'e', 'l', 'l', 'o']
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function splitString(str: string, delimiter: string): string[] {
  return str.split(delimiter);
}
