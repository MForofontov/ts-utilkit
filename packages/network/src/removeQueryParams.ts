import { _parseURL } from './_parseURL';

/**
 * Removes specific query parameters from a URL.
 * If a parameter doesn't exist, it is silently ignored.
 *
 * @param url - The URL to remove parameters from.
 * @param keys - Array of parameter keys to remove.
 * @returns The URL with specified parameters removed.
 *
 * @throws {Error} If url is invalid.
 *
 * @example
 * // Remove single parameter
 * removeQueryParams('https://example.com?a=1&b=2', ['b']);
 * // Returns: 'https://example.com?a=1'
 *
 * @example
 * // Remove multiple parameters
 * removeQueryParams('https://example.com?a=1&b=2&c=3', ['a', 'c']);
 * // Returns: 'https://example.com?b=2'
 *
 * @example
 * // Remove all parameters
 * removeQueryParams('https://example.com?a=1&b=2', ['a', 'b']);
 * // Returns: 'https://example.com'
 *
 * @note Preserves the URL structure even if parameters don't exist.
 *
 * @complexity Time: O(n), Space: O(n)
 */

export function removeQueryParams(url: string, keys: string[]): string {
  const urlObj = _parseURL(url);
  const searchParams = urlObj.searchParams;

  // Remove specified parameters
  for (const key of keys) {
    searchParams.delete(key);
  }

  return urlObj.toString();
}
