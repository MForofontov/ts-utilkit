/**
 * Checks if a string starts with a specified substring.
 *
 * @param str - The string to check.
 * @param start - The substring to check for at the beginning.
 * @returns True if the string starts with the specified substring, false otherwise.
 *
 * @throws {TypeError} If str or start is not a string.
 *
 * @example
 * // Basic usage
 * startsWith("hello world", "hello"); // true
 * startsWith("hello world", "world"); // false
 *
 * @example
 * // Case-sensitive matching
 * startsWith("Hello World", "Hello"); // true
 * startsWith("Hello World", "hello"); // false
 *
 * @example
 * // Empty strings
 * startsWith("hello", ""); // true (empty string matches)
 * startsWith("", "hello"); // false
 * startsWith("", ""); // true
 *
 * @example
 * // Special characters
 * startsWith("!@#$%", "!@#"); // true
 *
 * @note This is a wrapper around the native String.prototype.startsWith() method.
 * @note Comparison is case-sensitive.
 * @note An empty substring always returns true (all strings start with empty string).
 *
 * @complexity Time: O(m), Space: O(1) where m is the length of the start substring
 */
export function startsWith(str: string, start: string): boolean {
  return str.startsWith(start);
}
