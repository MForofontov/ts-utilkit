/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param str - The string to capitalize.
 * @returns A new string with the first letter of each word capitalized and other letters unchanged.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * capitalizeEachWord("hello world"); // "Hello World"
 *
 * @example
 * // Multiple words
 * capitalizeEachWord("the quick brown fox"); // "The Quick Brown Fox"
 *
 * @example
 * // Mixed case input
 * capitalizeEachWord("hELLO wORLD"); // "HELLO WORLD"
 *
 * @example
 * // With punctuation
 * capitalizeEachWord("hello, world! how are you?"); // "Hello, World! How Are You?"
 *
 * @example
 * // Edge cases
 * capitalizeEachWord(""); // ""
 * capitalizeEachWord("a b c"); // "A B C"
 *
 * @note Only the first letter of each word is capitalized; other letters remain unchanged.
 * @note Words are identified by word boundaries (spaces, punctuation).
 * @note Numbers and special characters at the start of words remain unchanged.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function capitalizeEachWord(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
