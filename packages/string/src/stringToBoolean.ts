/**
 * Converts a string to a boolean value.
 *
 * @param str - The string to convert.
 * @returns True if the string equals "true" or "1" (case-insensitive, whitespace-trimmed), false otherwise.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // String "true" variants
 * stringToBoolean("true"); // true
 * stringToBoolean("True"); // true
 * stringToBoolean("TRUE"); // true
 * stringToBoolean("  true  "); // true (whitespace trimmed)
 *
 * @example
 * // Numeric string "1"
 * stringToBoolean("1"); // true
 * stringToBoolean("  1  "); // true
 *
 * @example
 * // String "false" and other values
 * stringToBoolean("false"); // false
 * stringToBoolean("False"); // false
 * stringToBoolean("FALSE"); // false
 * stringToBoolean("0"); // false
 * stringToBoolean("no"); // false
 * stringToBoolean("yes"); // false
 * stringToBoolean(""); // false
 *
 * @example
 * // Edge cases
 * stringToBoolean("truee"); // false (not exact match)
 * stringToBoolean("true1"); // false
 * stringToBoolean("11"); // false (must be exactly "1")
 *
 * @note The function only returns true for exactly "true" or "1" after trimming and lowercasing.
 * @note All other values, including "false", "0", "yes", "no", return false.
 * @note Case-insensitive: "TRUE", "True", "true" all return true.
 * @note Leading and trailing whitespace is automatically trimmed.
 * @note This is a simple conversion; for more complex boolean parsing, consider a validation library.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function stringToBoolean(str: string): boolean {
  const normalizedStr = str.trim().toLowerCase();
  return normalizedStr === 'true' || normalizedStr === '1';
}
