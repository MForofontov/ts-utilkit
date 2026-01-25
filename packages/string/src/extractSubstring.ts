/**
 * Extracts a substring from a string based on the starting index and length.
 *
 * @param str - The original string.
 * @param start - The starting index (0-based, must be non-negative).
 * @param length - The length of the substring to extract.
 * @returns The extracted substring of the specified length starting at the given index.
 *
 * @throws {Error} If start or length is NaN.
 * @throws {Error} If start is greater than string length.
 * @throws {Error} If start is negative.
 *
 * @example
 * // Basic usage
 * extractSubstring("hello world", 6, 5); // "world"
 * extractSubstring("hello world", 0, 5); // "hello"
 *
 * @example
 * // Extract from middle
 * extractSubstring("JavaScript", 4, 6); // "Script"
 *
 * @example
 * // Length extends beyond string
 * extractSubstring("hello", 2, 10); // "llo" (stops at string end)
 *
 * @example
 * // Zero length
 * extractSubstring("hello", 2, 0); // ""
 *
 * @example
 * // Start at end
 * extractSubstring("hello", 5, 3); // ""
 *
 * @note This is a wrapper around String.slice() with validation.
 * @note If start + length exceeds string length, returns substring to end of string.
 * @note Negative length values are treated as 0 (returns empty string).
 * @note For more flexible extraction, consider using String.slice() or String.substring() directly.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of extracted substring
 */
export function extractSubstring(
  str: string,
  start: number,
  length: number,
): string {
  if (isNaN(start) || isNaN(length)) {
    throw new Error('Start index and length must be numbers');
  }
  if (start > str.length) {
    throw new Error(
      'Start index must be less than or equal to the string length',
    );
  }
  if (start < 0) {
    throw new Error('Start index must be non-negative');
  }
  return str.slice(start, start + length);
}
