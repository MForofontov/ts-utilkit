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
 * @throws {TypeError} If any argument is not a string.
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
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  if (typeof search !== 'string') {
    throw new TypeError(`search must be a string, got ${typeof search}`);
  }
  if (typeof replacement !== 'string') {
    throw new TypeError(
      `replacement must be a string, got ${typeof replacement}`,
    );
  }
  return str.replace(search, replacement);
}
