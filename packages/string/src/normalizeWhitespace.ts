/**
 * Normalizes whitespace in a string by trimming leading and trailing whitespace
 * and collapsing all internal sequences of whitespace characters (spaces, tabs,
 * newlines, etc.) into a single space.
 *
 * @param str - The string to normalize.
 * @returns A new string with leading/trailing whitespace removed and internal
 *   whitespace sequences collapsed to a single space.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Collapse internal spaces
 * normalizeWhitespace('  hello   world  ');
 * // 'hello world'
 *
 * @example
 * // Normalize mixed whitespace characters
 * normalizeWhitespace('\t hello \n world \t');
 * // 'hello world'
 *
 * @example
 * // Empty or whitespace-only string returns empty string
 * normalizeWhitespace('   ');
 * // ''
 *
 * @note This function differs from trimWhitespace (which only removes leading/
 *   trailing whitespace) and removeWhitespace (which removes all whitespace).
 *   normalizeWhitespace preserves single spaces between words.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function normalizeWhitespace(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }

  return str.trim().replace(/\s+/g, ' ');
}
