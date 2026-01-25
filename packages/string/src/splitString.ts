/**
 * Splits a string into an array of substrings based on a specified delimiter.
 *
 * @param str - The string to split.
 * @param delimiter - The delimiter to use for splitting.
 * @returns An array of substrings. If delimiter is empty string, returns array of individual characters.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If delimiter is not a string.
 *
 * @example
 * // Basic splitting
 * splitString("hello,world", ","); // ["hello", "world"]
 *
 * @example
 * // Multiple delimiters
 * splitString("a-b-c-d", "-"); // ["a", "b", "c", "d"]
 *
 * @example
 * // Delimiter not found
 * splitString("hello world", ","); // ["hello world"]
 *
 * @example
 * // Empty string delimiter (split into characters)
 * splitString("hello", ""); // ["h", "e", "l", "l", "o"]
 *
 * @example
 * // Multi-character delimiter
 * splitString("hello::world::test", "::"); // ["hello", "world", "test"]
 *
 * @note This is a wrapper around the native String.prototype.split() method.
 * @note If delimiter is empty string, splits into individual characters.
 * @note Empty strings appear in result when consecutive delimiters are found.
 * @note Leading/trailing delimiters create empty strings in result array.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function splitString(str: string, delimiter: string): string[] {
  return str.split(delimiter);
}
