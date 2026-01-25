/**
 * Extracts unique characters from a string in order of first appearance.
 *
 * @param str - The string to analyze.
 * @returns An array of unique characters in the order they first appear.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * uniqueCharacters("hello"); // ['h', 'e', 'l', 'o']
 *
 * @example
 * // Preserves order of first appearance
 * uniqueCharacters("programming"); // ['p', 'r', 'o', 'g', 'a', 'm', 'i', 'n']
 *
 * @example
 * // Case-sensitive
 * uniqueCharacters("AaBbCc"); // ['A', 'a', 'B', 'b', 'C', 'c']
 *
 * @example
 * // Includes spaces and special characters
 * uniqueCharacters("hello world!"); // ['h', 'e', 'l', 'o', ' ', 'w', 'r', 'd', '!']
 *
 * @example
 * // Edge cases
 * uniqueCharacters(""); // []
 * uniqueCharacters("aaa"); // ['a']
 *
 * @note Preserves the order in which characters first appear.
 * @note Comparison is case-sensitive (A and a are different).
 * @note Whitespace and special characters are included.
 * @note Uses Set for efficient duplicate detection.
 *
 * @complexity Time: O(n), Space: O(k) where n is string length and k is number of unique characters
 */
export function uniqueCharacters(str: string): string[] {
  return Array.from(new Set(str));
}
