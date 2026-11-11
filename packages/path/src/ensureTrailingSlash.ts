/**
 * Ensures a path ends with a trailing `/`.
 *
 * @param input - The path.
 * @returns The path with a trailing slash.
 *
 * @example
 * ensureTrailingSlash('foo/bar'); // 'foo/bar/'
 * ensureTrailingSlash('foo/bar/'); // 'foo/bar/'
 *
 * @complexity Time: O(1), Space: O(n)
 */
export function ensureTrailingSlash(input: string): string {
  if (input.length === 0) {
    return '/';
  }
  return input.endsWith('/') ? input : `${input}/`;
}
