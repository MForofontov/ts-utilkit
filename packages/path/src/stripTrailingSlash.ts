/**
 * Removes a trailing `/` from a path, except for the root `/`.
 *
 * @param input - The path.
 * @returns The path without a trailing slash.
 *
 * @example
 * stripTrailingSlash('foo/bar/'); // 'foo/bar'
 * stripTrailingSlash('/'); // '/'
 *
 * @complexity Time: O(1), Space: O(n)
 */
export function stripTrailingSlash(input: string): string {
  if (input === '/') {
    return '/';
  }
  return input.endsWith('/') ? input.slice(0, -1) : input;
}
