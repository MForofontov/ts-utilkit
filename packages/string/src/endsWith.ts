/**
 * Checks if a string ends with a specified substring.
 *
 * @param str - The string to check.
 * @param end - The substring to check for at the end.
 * @returns True if the string ends with the specified substring, false otherwise.
 *
 * @throws {TypeError} If str or end is not a string.
 *
 * @example
 * // Basic usage
 * endsWith("hello world", "world"); // true
 * endsWith("hello world", "hello"); // false
 *
 * @example
 * // Case-sensitive matching
 * endsWith("Hello World", "World"); // true
 * endsWith("Hello World", "world"); // false
 *
 * @example
 * // Empty strings
 * endsWith("hello", ""); // true (empty string matches)
 * endsWith("", "hello"); // false
 * endsWith("", ""); // true
 *
 * @example
 * // Special characters and punctuation
 * endsWith("hello!", "!"); // true
 * endsWith("file.txt", ".txt"); // true
 *
 * @note This is a wrapper around the native String.prototype.endsWith() method.
 * @note Comparison is case-sensitive.
 * @note An empty substring always returns true (all strings end with empty string).
 *
 * @complexity Time: O(m), Space: O(1) where m is the length of the end substring
 */
export function endsWith(str: string, end: string): boolean {
  return str.endsWith(end);
}
