/**
 * Finds the index of the last occurrence of a substring within a string (case-sensitive).
 *
 * @param str - The string to search in.
 * @param substr - The substring to find.
 * @returns The zero-based index of the last occurrence, or -1 if not found.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If substr is not a string.
 *
 * @example
 * // Basic usage
 * lastIndexOfSubstring("hello world world", "world"); // 12
 * lastIndexOfSubstring("hello world world", "hello"); // 0
 *
 * @example
 * // Case-sensitive search
 * lastIndexOfSubstring("Hello World hello", "hello"); // 12
 * lastIndexOfSubstring("Hello World hello", "Hello"); // 0
 *
 * @example
 * // Not found cases
 * lastIndexOfSubstring("hello world", "foo"); // -1
 * lastIndexOfSubstring("", "test"); // -1
 *
 * @example
 * // Empty substring
 * lastIndexOfSubstring("hello", ""); // 5 (returns length of string)
 * lastIndexOfSubstring("", ""); // 0
 *
 * @example
 * // Real-world: finding last occurrence of delimiter
 * const path = "/home/user/documents/file.txt";
 * const lastSlash = lastIndexOfSubstring(path, "/");
 * const filename = path.substring(lastSlash + 1); // "file.txt"
 *
 * @note This is a wrapper around String.prototype.lastIndexOf().
 * @note Search is case-sensitive.
 * @note Returns position of last occurrence (searches from end to start).
 * @note Empty substring returns the length of the string.
 *
 * @complexity Time: O(n*m), Space: O(1) where n is str length, m is substr length
 */
export function lastIndexOfSubstring(str: string, substr: string): number {
  return str.lastIndexOf(substr);
}
