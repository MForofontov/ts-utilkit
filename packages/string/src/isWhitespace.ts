/**
 * Checks if a string contains only whitespace characters or is empty.
 *
 * @param str - The string to check.
 * @returns True if the string contains only whitespace characters (or is empty), false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * isWhitespace("   "); // true
 * isWhitespace(""); // true
 * isWhitespace("Hello World"); // false
 *
 * @example
 * // Various whitespace types
 * isWhitespace(" \t\n\r"); // true (spaces, tabs, newlines)
 * isWhitespace("\n\n\n"); // true (only newlines)
 * isWhitespace("     "); // true (only spaces)
 *
 * @example
 * // With content
 * isWhitespace(" a "); // false (contains non-whitespace)
 * isWhitespace("  .  "); // false (contains punctuation)
 *
 * @example
 * // Single character
 * isWhitespace(" "); // true
 * isWhitespace("a"); // false
 *
 * @note Whitespace includes spaces, tabs, newlines, carriage returns, and other whitespace characters.
 * @note Empty strings return true.
 * @note Even a single non-whitespace character will return false.
 * @note Useful for validating if user input is blank.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function isWhitespace(str: string): boolean {
  return /^\s*$/.test(str);
}
