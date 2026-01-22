/**
 * Checks if a string contains any lowercase letters.
 *
 * @param str - The string to check.
 * @returns True if the string contains at least one lowercase letter, false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * hasLowercase("Hello"); // true
 * hasLowercase("hello"); // true
 * hasLowercase("HELLO"); // false
 *
 * @example
 * // Mixed content
 * hasLowercase("Hello123"); // true
 * hasLowercase("HELLO123"); // false
 * hasLowercase("123abc456"); // true
 *
 * @example
 * // Special characters and symbols
 * hasLowercase("test@example.com"); // true
 * hasLowercase("TEST@EXAMPLE.COM"); // false
 * hasLowercase("!@#$%^&*()"); // false (no letters)
 *
 * @example
 * // Edge cases
 * hasLowercase(""); // false
 * hasLowercase("123"); // false (no letters)
 * hasLowercase("a"); // true
 *
 * @note Only checks for lowercase ASCII letters (a-z).
 * @note Does not check for lowercase Unicode characters (e.g., é, ñ, ü).
 * @note Returns false for strings with no letters at all.
 * @note Complement of this function: use hasUppercase() to check for uppercase letters.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function hasLowercase(str: string): boolean {
  return /[a-z]/.test(str);
}
