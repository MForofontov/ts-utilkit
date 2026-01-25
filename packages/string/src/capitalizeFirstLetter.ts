/**
 * Converts the first letter of a string to uppercase.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string (only first letter uppercase, rest unchanged).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * capitalizeFirstLetter("hello"); // "Hello"
 * capitalizeFirstLetter("world"); // "World"
 *
 * @example
 * // Already capitalized or mixed case
 * capitalizeFirstLetter("Hello"); // "Hello"
 * capitalizeFirstLetter("typescript"); // "Typescript"
 * capitalizeFirstLetter("javaScript"); // "JavaScript"
 *
 * @example
 * // Multiple words (only first letter affected)
 * capitalizeFirstLetter("hello world"); // "Hello world"
 * capitalizeFirstLetter("the quick brown fox"); // "The quick brown fox"
 *
 * @example
 * // Edge cases
 * capitalizeFirstLetter(""); // ""
 * capitalizeFirstLetter("a"); // "A"
 * capitalizeFirstLetter("123abc"); // "123abc" (first char is not a letter)
 *
 * @note Only the first character is affected; the rest of the string remains unchanged.
 * @note If the first character is not a letter, the string is returned as-is.
 * @note To capitalize each word in a sentence, use capitalizeEachWord() instead.
 * @note This function does not convert other letters to lowercase.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
