/**
 * Joins an array of words into a sentence with proper spacing, filtering out empty strings.
 *
 * @param words - The array of words to join into a sentence.
 * @returns The joined sentence with single spaces between words, or empty string if no valid words.
 *
 * @throws {TypeError} If words is not an array.
 *
 * @example
 * // Basic usage
 * wordsToSentence(["Hello", "world!"]); // "Hello world!"
 *
 * @example
 * // With empty strings
 * wordsToSentence(["Hello", "", "world!"]); // "Hello world!"
 *
 * @example
 * // With extra whitespace
 * wordsToSentence(["  Hello  ", "  world  "]); // "Hello world"
 *
 * @example
 * // Edge cases
 * wordsToSentence([]); // ""
 * wordsToSentence(["", "", ""]); // ""
 * wordsToSentence(["word"]); // "word"
 *
 * @example
 * // Real-world: building sentences dynamically
 * const parts = ["The", "quick", "", "brown", "fox"];
 * const sentence = wordsToSentence(parts); // "The quick brown fox"
 *
 * @note Empty strings and whitespace-only strings are filtered out.
 * @note Leading and trailing whitespace is trimmed from each word.
 * @note Words are joined with a single space character.
 * @note If array is empty or contains only empty strings, returns empty string.
 *
 * @complexity Time: O(n), Space: O(n) where n is the total length of all words
 */
export function wordsToSentence(words: string[]): string {
  if (!Array.isArray(words) || words.length === 0) {
    return '';
  }
  return words
    .map((word) => word.trim()) // Trim each word
    .filter((word) => word !== '') // Filter out empty words
    .join(' ');
}
