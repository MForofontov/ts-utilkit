/**
 * Trims whitespace from both ends of a string.
 *
 * @param str - The string to trim.
 * @returns The string with leading and trailing whitespace removed.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * trimWhitespace("   hello   "); // "hello"
 *
 * @example
 * // Various whitespace characters
 * trimWhitespace("\t\n  hello world  \n\t"); // "hello world"
 *
 * @example
 * // No internal whitespace affected
 * trimWhitespace("  hello   world  "); // "hello   world"
 *
 * @note This is a wrapper around the native String.prototype.trim() method.
 * @note Only leading and trailing whitespace is removed; internal whitespace is preserved.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function trimWhitespace(str: string): string {
  return str.trim();
}
