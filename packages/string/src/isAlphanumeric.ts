/**
 * Checks if a string contains only alphanumeric characters (letters A-Z, a-z, and digits 0-9).
 *
 * @param str - The string to check.
 * @returns True if the string contains only letters and digits, false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * isAlphanumeric("Hello123"); // true
 * isAlphanumeric("Hello!"); // false
 *
 * @example
 * // Various cases
 * isAlphanumeric("ABC123xyz"); // true
 * isAlphanumeric("OnlyLetters"); // true
 * isAlphanumeric("123456"); // true
 *
 * @example
 * // Not alphanumeric
 * isAlphanumeric("Hello World"); // false (space not allowed)
 * isAlphanumeric("Hello-World"); // false (hyphen not allowed)
 * isAlphanumeric("email@test.com"); // false (special characters not allowed)
 *
 * @example
 * // Edge cases
 * isAlphanumeric(""); // false (empty string)
 * isAlphanumeric("a"); // true
 *
 * @note Only English alphabet letters (A-Z, a-z) and digits (0-9) are accepted.
 * @note No spaces, punctuation, or special characters are allowed.
 * @note Empty strings return false.
 * @note Accented characters (é, ñ, etc.) are not considered alphanumeric.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function isAlphanumeric(str: string): boolean {
  return /^[A-Za-z0-9]+$/.test(str);
}
