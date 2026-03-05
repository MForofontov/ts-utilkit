/**
 * Replaces the first occurrence of a search string with a replacement string.
 *
 * @deprecated Use native `str.replace(search, replacement)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The source string.
 * @param search - The string to search for.
 * @param replacement - The string to replace with.
 * @returns A new string with the first occurrence replaced.
 *
 * @example
 * replaceFirst('hello world hello', 'hello', 'hi'); // 'hi world hello'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function replaceFirst(
  str: string,
  search: string,
  replacement: string,
): string {
  return str.replace(search, replacement);
}
