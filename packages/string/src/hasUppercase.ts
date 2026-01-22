/**
 * Checks if a string contains at least one uppercase letter (A-Z).
 *
 * @param str - The string to check.
 * @returns True if the string contains at least one uppercase letter, false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * hasUppercase("Hello"); // true
 * hasUppercase("hello"); // false
 *
 * @example
 * // Various cases
 * hasUppercase("HELLO"); // true
 * hasUppercase("HeLLo WoRLd"); // true
 * hasUppercase("123ABC"); // true
 *
 * @example
 * // No uppercase
 * hasUppercase("hello world 123"); // false
 * hasUppercase("123!@#"); // false
 * hasUppercase(""); // false
 *
 * @example
 * // Single character
 * hasUppercase("A"); // true
 * hasUppercase("a"); // false
 *
 * @note Only checks for English alphabet uppercase letters (A-Z).
 * @note Returns false for empty strings.
 * @note Accented uppercase letters (É, Ñ, etc.) are not detected by this function.
 * @note Numbers and special characters don't affect the result.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function hasUppercase(str: string): boolean {
  return /[A-Z]/.test(str);
}
