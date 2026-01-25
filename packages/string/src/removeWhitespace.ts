/**
 * Removes all whitespace characters from a string.
 *
 * @param str - The string to process.
 * @returns The string with all whitespace characters removed (spaces, tabs, newlines, etc.).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * removeWhitespace("   hello   world   "); // "helloworld"
 *
 * @example
 * // Various whitespace types
 * removeWhitespace("hello\n\t world  \r\n  test"); // "helloworldtest"
 *
 * @example
 * // Empty and whitespace-only strings
 * removeWhitespace("     "); // ""
 * removeWhitespace(""); // ""
 *
 * @note Removes ALL whitespace including spaces, tabs, newlines, and carriage returns.
 * @note Unlike trimWhitespace, this removes internal whitespace as well.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, '');
}
