/**
 * Checks if a string contains only numeric digits (0-9).
 *
 * @param str - The string to check.
 * @returns True if the string contains only digits, false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * isNumeric("12345"); // true
 * isNumeric("123a5"); // false
 *
 * @example
 * // Edge cases
 * isNumeric("0"); // true
 * isNumeric("00123"); // true (leading zeros are allowed)
 * isNumeric(""); // false (empty string)
 *
 * @example
 * // Not numeric
 * isNumeric("123.45"); // false (decimals not allowed)
 * isNumeric("-123"); // false (negative sign not allowed)
 * isNumeric("123 456"); // false (spaces not allowed)
 *
 * @note Only digits 0-9 are accepted; no decimal points, spaces, or special characters.
 * @note Empty strings return false.
 * @note Leading zeros are allowed (e.g., "00123" is valid).
 * @note For checking if a string can be converted to a number (including decimals), use a different validation.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}
