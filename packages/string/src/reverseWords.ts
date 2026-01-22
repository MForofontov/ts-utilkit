/**
 * Reverses the order of words in a string while preserving word integrity.
 *
 * @param str - The string to reverse the words in.
 * @returns The string with words in reverse order, with leading/trailing whitespace removed and multiple spaces normalized to single spaces.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * reverseWords("hello world"); // "world hello"
 *
 * @example
 * // Multiple words
 * reverseWords("The quick brown fox"); // "fox brown quick The"
 *
 * @example
 * // Whitespace handling
 * reverseWords("   hello   world   "); // "world hello"
 * reverseWords("   "); // ""
 *
 * @note Whitespace is normalized - multiple spaces are reduced to single spaces between reversed words.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function reverseWords(str: string): string {
  if (!str.trim()) return '';

  // Split the string into words, filter out empty strings, reverse the array, and join back into a string
  return str.trim().split(/\s+/).reverse().join(' ');
}
