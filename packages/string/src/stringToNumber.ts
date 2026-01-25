/**
 * Converts a string representation of a number to an actual number.
 *
 * @param str - The string to convert to a number.
 * @returns The converted number, or NaN if the string is not a valid number.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * stringToNumber("123"); // 123
 * stringToNumber("456.78"); // 456.78
 *
 * @example
 * // Negative numbers
 * stringToNumber("-42"); // -42
 * stringToNumber("-3.14"); // -3.14
 *
 * @example
 * // Scientific notation
 * stringToNumber("1e5"); // 100000
 * stringToNumber("2.5e-3"); // 0.0025
 * stringToNumber("1.5E+2"); // 150
 *
 * @example
 * // With whitespace (trimmed automatically)
 * stringToNumber("  123  "); // 123
 * stringToNumber("\t456\n"); // 456
 *
 * @example
 * // Invalid inputs return NaN
 * stringToNumber("abc"); // NaN
 * stringToNumber("12a34"); // NaN
 * stringToNumber(""); // NaN
 * stringToNumber("   "); // NaN
 *
 * @example
 * // Edge cases
 * stringToNumber("0"); // 0
 * stringToNumber("+42"); // 42
 * stringToNumber(".5"); // NaN (no leading digit)
 *
 * @note Leading and trailing whitespace is automatically trimmed.
 * @note Supports integers, decimals, negative numbers, and scientific notation.
 * @note Returns NaN for invalid or empty strings.
 * @note More strict than parseFloat() - requires the entire string to be a valid number.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the string
 */
export function stringToNumber(str: string): number {
  // Trim the input string to remove leading and trailing whitespace
  const trimmedStr = str.trim();

  // Use a regular expression to check if the trimmed string is a valid number
  if (/^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(trimmedStr)) {
    // If the string is a valid number, convert it to a number using parseFloat
    return parseFloat(trimmedStr);
  }

  // If the string is not a valid number, return NaN
  return NaN;
}
