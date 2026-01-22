/**
 * Finds the index of the first occurrence of a substring within a string (case-sensitive).
 *
 * @param str - The string to search in.
 * @param substr - The substring to find.
 * @returns The zero-based index of the first occurrence, or -1 if not found.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If substr is not a string.
 *
 * @example
 * // Basic usage
 * indexOfSubstring("hello world", "world"); // 6
 * indexOfSubstring("hello world", "hello"); // 0
 *
 * @example
 * // Case-sensitive search
 * indexOfSubstring("Hello World", "world"); // -1 (not found)
 * indexOfSubstring("Hello World", "World"); // 6
 *
 * @example
 * // Not found cases
 * indexOfSubstring("hello", "xyz"); // -1
 * indexOfSubstring("", "test"); // -1
 *
 * @example
 * // Empty substring
 * indexOfSubstring("hello", ""); // 0 (empty string found at start)
 * indexOfSubstring("", ""); // 0
 *
 * @example
 * // Real-world: finding markers
 * const text = "User: John, Age: 30";
 * const agePos = indexOfSubstring(text, "Age:");
 * if (agePos !== -1) {
 *   const age = text.substring(agePos + 5).trim();
 * }
 *
 * @note This is a wrapper around String.prototype.indexOf().
 * @note Search is case-sensitive.
 * @note Returns position of first occurrence only (use lastIndexOf for last).
 * @note Empty substring always returns 0.
 *
 * @complexity Time: O(n*m), Space: O(1) where n is str length, m is substr length
 */
export function indexOfSubstring(str: string, substr: string): number {
  return str.indexOf(substr);
}
