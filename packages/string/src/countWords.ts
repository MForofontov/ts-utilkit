/**
 * Counts the number of words in a string.
 *
 * @param str - The string to analyze.
 * @returns The total count of words (sequences of non-whitespace characters).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * countWords("Hello world! This is a test."); // 6
 *
 * @example
 * // Multiple spaces are handled
 * countWords("Hello    world"); // 2
 *
 * @example
 * // Punctuation is part of words
 * countWords("Hello, world!"); // 2
 *
 * @example
 * // Edge cases
 * countWords(""); // 0
 * countWords("    "); // 0
 * countWords("word"); // 1
 *
 * @note Words are defined as sequences separated by whitespace.
 * @note Leading and trailing whitespace is ignored.
 * @note Multiple consecutive spaces count as a single separator.
 * @note Punctuation remains attached to words and doesn't create separate words.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function countWords(str: string): number {
  if (str.trim() === '') {
    return 0;
  }
  return str.trim().split(/\s+/).length;
}
