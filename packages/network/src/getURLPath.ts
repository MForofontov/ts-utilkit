/**
 * Extracts the pathname from a URL.
 * Returns the path component without query string or hash.
 *
 * @param url - The URL to extract the path from.
 * @returns The pathname of the URL.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If url is invalid.
 *
 * @example
 * // Basic path
 * getURLPath('https://example.com/api/users');
 * // Returns: '/api/users'
 *
 * @example
 * // Path with query and hash
 * getURLPath('https://example.com/api/users?id=1#section');
 * // Returns: '/api/users'
 *
 * @example
 * // Root path
 * getURLPath('https://example.com');
 * // Returns: '/'
 *
 * @note Returns '/' for URLs without a specific path.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getURLPath(url: string): string {
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }

  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
