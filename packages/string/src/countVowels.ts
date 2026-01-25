/**
 * Counts the number of vowels in a string (case-insensitive).
 *
 * @param str - The string to analyze.
 * @returns The total count of vowels (a, e, i, o, u) found in the string.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * countVowels("Hello world"); // 3
 *
 * @example
 * // Case-insensitive counting
 * countVowels("AEIOU"); // 5
 *
 * @example
 * // No vowels
 * countVowels("xyz"); // 0
 * countVowels(""); // 0
 *
 * @note Only the vowels a, e, i, o, and u are counted; "y" is not considered a vowel.
 * @note Counting is case-insensitive.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the input string
 */
export function countVowels(str: string): number {
  return (str.match(/[aeiou]/gi) || []).length;
}
