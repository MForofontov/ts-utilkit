/**
 * Checks if a string contains only alphabetical characters (A-Z, a-z).
 *
 * @param str - The string to validate.
 * @returns True if string contains only letters with no numbers, spaces, or special characters; false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Valid alphabetic strings
 * isAlpha("Hello"); // true
 * isAlpha("abc"); // true
 * isAlpha("XYZ"); // true
 *
 * @example
 * // Contains non-alphabetic characters
 * isAlpha("Hello123"); // false
 * isAlpha("Hello World"); // false (space)
 * isAlpha("Hello!"); // false (punctuation)
 *
 * @example
 * // Edge cases
 * isAlpha(""); // false (empty string)
 * isAlpha("a"); // true
 * isAlpha("123"); // false (numbers only)
 *
 * @example
 * // Real-world: name validation
 * const firstName = "John";
 * if (isAlpha(firstName)) {
 *   console.log("Valid name");
 * }
 *
 * @example
 * // Real-world: filtering inputs
 * const inputs = ["Hello", "Test123", "World", "A1B"];
 * const validNames = inputs.filter(isAlpha); // ["Hello", "World"]
 *
 * @note Only English alphabet letters (A-Z, a-z) are considered valid.
 * @note Numbers, spaces, punctuation, and special characters return false.
 * @note Empty strings return false (string must have at least one letter).
 * @note Does not validate accented characters or letters from other alphabets.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function isAlpha(str: string): boolean {
  return /^[A-Za-z]+$/.test(str);
}
