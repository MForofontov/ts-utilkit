/**
 * Counts the number of times a specific character appears in a string (case-sensitive).
 *
 * @param str - The string to search in.
 * @param char - The character to count (can be any length, not just single character).
 * @returns The number of occurrences of the character in the string.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If char is not a string.
 *
 * @example
 * // Basic usage
 * countCharacterOccurrences("hello world", "l"); // 3
 * countCharacterOccurrences("hello world", "o"); // 2
 *
 * @example
 * // Case-sensitive counting
 * countCharacterOccurrences("Hello World", "o"); // 1
 * countCharacterOccurrences("Hello World", "O"); // 0
 *
 * @example
 * // Special characters
 * countCharacterOccurrences("a.b.c.d", "."); // 3
 * countCharacterOccurrences("test$value$end", "$"); // 2
 *
 * @example
 * // Multi-character strings
 * countCharacterOccurrences("hello hello", "hello"); // 2
 * countCharacterOccurrences("ababab", "ab"); // 3
 *
 * @example
 * // Edge cases
 * countCharacterOccurrences("hello", ""); // 0 (empty char returns 0)
 * countCharacterOccurrences("", "a"); // 0
 * countCharacterOccurrences("test", "x"); // 0
 *
 * @note Counting is case-sensitive (a and A are different).
 * @note Works with special regex characters by escaping them.
 * @note Can count multi-character strings, not just single characters.
 * @note Returns 0 if char is empty string or not found.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function countCharacterOccurrences(str: string, char: string): number {
  if (!char) {
    return 0;
  }

  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return (str.match(new RegExp(escapedChar, 'g')) || []).length;
}
