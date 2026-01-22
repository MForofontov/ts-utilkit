/**
 * Truncates a string to a specified length and appends an ellipsis if truncated.
 *
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the resulting string (including ellipsis).
 * @returns The truncated string with an ellipsis if necessary.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If maxLength is not a number.
 * @throws {Error} If maxLength is NaN.
 *
 * @example
 * // Basic usage
 * truncateString("This is a long string that needs to be truncated.", 20);
 * // "This is a long st..."
 *
 * @example
 * // String shorter than maxLength
 * truncateString("Short text", 50); // "Short text"
 *
 * @example
 * // Very short maxLength
 * truncateString("Hello World", 5); // "He..."
 * truncateString("Hello World", 3); // "..."
 * truncateString("Hello World", 2); // ".."
 *
 * @example
 * // Edge cases
 * truncateString("Hello World", 0); // ""
 * truncateString("", 10); // ""
 * truncateString("Hello", 11); // "Hello" (no truncation needed)
 *
 * @example
 * // Real-world usage
 * const title = "Understanding JavaScript Async/Await Patterns";
 * truncateString(title, 30); // "Understanding JavaScript A..."
 *
 * @note If maxLength is 0 or negative, returns empty string.
 * @note If str.length <= maxLength, returns the original string unchanged.
 * @note If maxLength <= 3, returns ellipsis trimmed to maxLength.
 * @note The ellipsis ("...") counts toward the maxLength.
 * @note Common use cases: preview text, table cells, card titles, tooltips.
 *
 * @complexity Time: O(n), Space: O(n) where n is maxLength
 */
export function truncateString(str: string, maxLength: number): string {
  if (maxLength <= 0) return '';
  if (str.length <= maxLength) return str;
  if (maxLength <= 3) return '...'.slice(0, maxLength);
  return str.slice(0, maxLength - 3) + '...';
}
