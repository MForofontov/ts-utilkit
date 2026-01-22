/**
 * Finds the longest word in a string, ignoring punctuation and special characters.
 *
 * @param str - The string to analyze.
 * @returns The longest word in the string (or empty string if no words found).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * findLongestWord("The quick brown fox jumps over the lazy dog."); // "jumps"
 *
 * @example
 * // Multiple words with same length (returns first)
 * findLongestWord("cat dog bird"); // "cat" (all length 3, first wins)
 *
 * @example
 * // With punctuation
 * findLongestWord("Hello, world! How are you?"); // "Hello" or "world" (length 5)
 *
 * @example
 * // Edge cases
 * findLongestWord(""); // ""
 * findLongestWord("a"); // "a"
 * findLongestWord("!!!"); // "" (no words, only punctuation)
 *
 * @example
 * // Real-world: analyzing text
 * const text = "JavaScript is a powerful programming language.";
 * const longest = findLongestWord(text); // "programming" (length 11)
 *
 * @note Punctuation and special characters are removed before comparison.
 * @note Whitespace is used to separate words after punctuation removal.
 * @note If multiple words have the same maximum length, returns the first one.
 * @note Empty strings and strings with only punctuation return empty string.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function findLongestWord(str: string): string {
  // Remove punctuation and special characters
  const cleanedStr = str.replace(
    /[.,/#!$%^&*;:{}=\-_`~()"\t\n\r\b\f\v\\']/g,
    ' ',
  );

  // Split the string into words using any whitespace character as the delimiter
  return cleanedStr.split(/\s+/).reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, '');
}
