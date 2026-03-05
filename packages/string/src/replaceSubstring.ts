/**
 * Replaces all occurrences of a search string with a replacement string.
 *
 * @deprecated Use native `str.replaceAll(search, replacement)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The source string.
 * @param search - The string to search for (all occurrences).
 * @param replacement - The string to replace with.
 * @returns A new string with all occurrences replaced.
 *
 * @example
 * replaceSubstring('hello hello hello', 'hello', 'hi'); // 'hi hi hi'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function replaceSubstring(
  str: string,
  search: string,
  replacement: string,
): string {
  return str.split(search).join(replacement);
}
