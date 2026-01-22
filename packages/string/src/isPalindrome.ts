/**
 * Checks if a string is a palindrome (reads the same forwards and backwards).
 *
 * @param str - The string to check.
 * @returns True if the string is a palindrome, false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic palindrome
 * isPalindrome("racecar"); // true
 * isPalindrome("hello"); // false
 *
 * @example
 * // Case and punctuation are ignored
 * isPalindrome("A man, a plan, a canal, Panama"); // true
 * isPalindrome("Was it a car or a cat I saw?"); // true
 *
 * @example
 * // Single character and empty strings
 * isPalindrome("a"); // true
 * isPalindrome(""); // true
 *
 * @note Non-alphanumeric characters (spaces, punctuation) are removed before comparison.
 * @note Comparison is case-insensitive.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function isPalindrome(str: string): boolean {
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  return cleanedStr === cleanedStr.split('').reverse().join('');
}
