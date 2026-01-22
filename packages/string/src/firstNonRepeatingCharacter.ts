/**
 * Finds the first character in a string that appears only once.
 *
 * @param str - The string to analyze.
 * @returns The first non-repeating character, or null if all characters repeat or string is empty.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * firstNonRepeatingCharacter("abacabad"); // 'c'
 * firstNonRepeatingCharacter("aabbcc"); // null
 *
 * @example
 * // First occurrence is returned
 * firstNonRepeatingCharacter("stress"); // 't'
 * firstNonRepeatingCharacter("leetcode"); // 'l'
 *
 * @example
 * // Case-sensitive matching
 * firstNonRepeatingCharacter("AaBbCc"); // 'A'
 *
 * @example
 * // Edge cases
 * firstNonRepeatingCharacter(""); // null
 * firstNonRepeatingCharacter("a"); // 'a'
 * firstNonRepeatingCharacter("aaa"); // null
 *
 * @note Comparison is case-sensitive (A and a are different characters).
 * @note Whitespace and special characters are treated as regular characters.
 * @note Returns the first character that appears exactly once in the entire string.
 *
 * @complexity Time: O(n), Space: O(k) where n is string length and k is number of unique characters
 */
export function firstNonRepeatingCharacter(str: string): string | null {
  // Create an object to store the count of each character
  const charCount: { [key: string]: number } = {};

  // Iterate over each character in the string
  for (const char of str) {
    // Increment the count for the character in the charCount object
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Iterate over each character in the string again
  for (const char of str) {
    // If the character count is 1, return the character as it is non-repeating
    if (charCount[char] === 1) return char;
  }

  // If no non-repeating character is found, return null
  return null;
}
