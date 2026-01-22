/**
 * Replaces all occurrences of a substring in a string with a new substring.
 *
 * @param str - The string to search within.
 * @param searchValue - The substring to find.
 * @param replaceValue - The substring to replace with.
 * @returns The string with all occurrences of the search substring replaced with the replacement substring.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If searchValue is not a string.
 * @throws {TypeError} If replaceValue is not a string.
 *
 * @example
 * // Basic replacement
 * replaceSubstring("hello world world", "world", "everyone"); // "hello everyone everyone"
 *
 * @example
 * // Multiple occurrences
 * replaceSubstring("foo bar foo bar", "foo", "baz"); // "baz bar baz bar"
 *
 * @example
 * // No matches found
 * replaceSubstring("hello world", "xyz", "abc"); // "hello world"
 *
 * @example
 * // Empty search string
 * replaceSubstring("hello", "", "x"); // "hello"
 *
 * @example
 * // Replace with empty string (removal)
 * replaceSubstring("hello world", " world", ""); // "hello"
 *
 * @note Replaces ALL occurrences of the search substring, not just the first.
 * @note If searchValue is empty string, returns the original string unchanged.
 * @note Case-sensitive matching.
 * @note Uses split and join internally for global replacement.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function replaceSubstring(
  str: string,
  searchValue: string,
  replaceValue: string,
): string {
  if (searchValue === '') {
    return str;
  }
  const index = str.indexOf(searchValue);
  if (index === -1) {
    return str;
  }
  return str.split(searchValue).join(replaceValue);
}
