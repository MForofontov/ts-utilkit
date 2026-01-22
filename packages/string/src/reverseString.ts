/**
 * Reverses the characters in a string.
 *
 * @param str - The string to reverse.
 * @returns A new string with characters in reverse order.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * reverseString("hello"); // "olleh"
 * reverseString("12345"); // "54321"
 *
 * @example
 * // With spaces and punctuation
 * reverseString("Hello World!"); // "!dlroW olleH"
 * reverseString("a b c"); // "c b a"
 *
 * @example
 * // Palindromes
 * reverseString("racecar"); // "racecar"
 * reverseString("noon"); // "noon"
 *
 * @example
 * // Edge cases
 * reverseString(""); // ""
 * reverseString("a"); // "a"
 *
 * @example
 * // Unicode characters
 * reverseString("hello 👋"); // "👋 olleh"
 *
 * @note Preserves all characters including spaces, punctuation, and special characters.
 * @note Works with Unicode characters but may not handle complex emoji combinations perfectly.
 * @note Creates a new string; does not modify the original.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
