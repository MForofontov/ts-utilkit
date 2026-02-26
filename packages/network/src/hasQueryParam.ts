import { _parseURL } from './_parseURL';

/**
 * Checks whether a query parameter with the given key exists in a URL.
 *
 * @param url - The URL string to inspect.
 * @param key - The query parameter key to check for.
 * @returns `true` if the parameter exists in the URL's query string, `false` otherwise.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {TypeError} If key is not a string.
 * @throws {Error} If url is not a valid absolute URL.
 *
 * @example
 * // Parameter exists
 * hasQueryParam('https://example.com?page=1&limit=10', 'page');   // true
 * hasQueryParam('https://example.com?page=1&limit=10', 'limit');  // true
 *
 * @example
 * // Parameter does not exist
 * hasQueryParam('https://example.com?page=1', 'offset');  // false
 * hasQueryParam('https://example.com', 'page');           // false
 *
 * @example
 * // Parameters with no value (key-only)
 * hasQueryParam('https://example.com?debug', 'debug');  // true
 *
 * @note Parameter lookup is case-sensitive: "Page" and "page" are different keys.
 * Use getQueryParams to retrieve all parameters if you need a case-insensitive search.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function hasQueryParam(url: string, key: string): boolean {
  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }
  const urlObj = _parseURL(url);
  return urlObj.searchParams.has(key);
}
