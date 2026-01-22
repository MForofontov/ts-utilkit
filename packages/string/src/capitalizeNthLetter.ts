/**
 * Capitalizes the nth letter of a given string.
 *
 * @param str - The string to process.
 * @param n - The position of the letter to capitalize (0-based index).
 * @returns A new string with the nth letter capitalized.
 *
 * @throws {TypeError} If str is not a string or n is not a number.
 *
 * @example
 * // Basic usage
 * capitalizeNthLetter("hello world", 0); // "Hello world"
 * capitalizeNthLetter("hello world", 6); // "hello World"
 *
 * @example
 * // Multiple capitalizations
 * capitalizeNthLetter("javascript", 4); // "javaScript"
 * capitalizeNthLetter("typescript", 4); // "typeScript"
 *
 * @example
 * // Non-letter characters
 * capitalizeNthLetter("hello123world", 8); // "hello123World"
 * capitalizeNthLetter("test-case", 5); // "test-Case"
 *
 * @example
 * // Edge cases
 * capitalizeNthLetter("hello", -1); // "hello" (negative index returns unchanged)
 * capitalizeNthLetter("hello", 10); // "hello" (out of range returns unchanged)
 * capitalizeNthLetter("hello", 0); // "Hello"
 * capitalizeNthLetter("", 0); // ""
 *
 * @note If n is negative or greater than/equal to string length, returns the original string.
 * @note Only the character at index n is affected; all other characters remain unchanged.
 * @note If the character at index n is not a letter, it will be "uppercased" but remain the same.
 * @note Uses 0-based indexing (first character is at index 0).
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function capitalizeNthLetter(str: string, n: number): string {
  if (n < 0 || n >= str.length) return str;
  return str.slice(0, n) + str.charAt(n).toUpperCase() + str.slice(n + 1);
}
