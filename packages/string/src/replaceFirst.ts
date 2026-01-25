/**
 * Replaces only the first occurrence of a substring in a string (case-sensitive).
 *
 * @param str - The string to perform replacement in.
 * @param searchValue - The substring to find and replace.
 * @param replaceValue - The substring to insert in place of searchValue.
 * @returns A new string with the first occurrence replaced, or original if not found.
 *
 * @throws {TypeError} If str, searchValue, or replaceValue is not a string.
 *
 * @example
 * // Basic usage
 * replaceFirst("hello world", "world", "everyone"); // "hello everyone"
 * replaceFirst("hello world world", "world", "everyone"); // "hello everyone world"
 *
 * @example
 * // Case-sensitive replacement
 * replaceFirst("Hello World", "world", "there"); // "Hello World" (not found)
 * replaceFirst("Hello World", "World", "there"); // "Hello there"
 *
 * @example
 * // Empty search value
 * replaceFirst("hello", "", "X"); // "hello" (no replacement)
 *
 * @example
 * // Not found
 * replaceFirst("hello world", "xyz", "abc"); // "hello world"
 *
 * @example
 * // Real-world: replacing first tag
 * const html = "<div>First</div><div>Second</div>";
 * const updated = replaceFirst(html, "<div>", "<span>");
 * // Result: "<span>First</div><div>Second</div>"
 *
 * @note Only replaces the first occurrence; subsequent matches are unchanged.
 * @note Replacement is case-sensitive.
 * @note Returns original string if searchValue is empty or not found.
 * @note For replacing all occurrences, use replaceSubstring().
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the string
 */
export function replaceFirst(
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
  return str.replace(searchValue, replaceValue);
}
