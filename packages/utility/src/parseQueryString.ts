/**
 * Parses a query string into an object of key-value pairs.
 *
 * @param queryString - The query string to parse (with or without leading '?').
 * @returns An object representing the query parameters as string key-value pairs.
 *
 * @throws {TypeError} If queryString is not a string.
 *
 * @example
 * // Basic usage
 * parseQueryString('?name=John&age=30'); // { name: 'John', age: '30' }
 * parseQueryString('name=John&age=30'); // { name: 'John', age: '30' }
 *
 * @example
 * // Multiple parameters
 * parseQueryString('?search=typescript&page=1&limit=10');
 * // { search: 'typescript', page: '1', limit: '10' }
 *
 * @example
 * // Encoded values
 * parseQueryString('?name=John+Doe&city=New%20York');
 * // { name: 'John Doe', city: 'New York' }
 *
 * @example
 * // Special characters
 * parseQueryString('?email=test%40example.com&tag=%23typescript');
 * // { email: 'test@example.com', tag: '#typescript' }
 *
 * @example
 * // Edge cases
 * parseQueryString(''); // {}
 * parseQueryString('?'); // {}
 * parseQueryString('?key='); // { key: '' }
 * parseQueryString('?key1=value1&key2=value2=extra'); // { key1: 'value1', key2: 'value2=extra' }
 *
 * @note The leading '?' is optional and will be automatically removed.
 * @note Decodes percent-encoded characters (e.g., %20 becomes space).
 * @note Replaces '+' characters with spaces (standard URL encoding).
 * @note Returns an empty object for empty or '?' only query strings.
 * @note If a key has no value (e.g., '?key'), the value will be an empty string.
 * @note Handles multiple '=' signs by treating everything after the first '=' as the value.
 *
 * @complexity Time: O(n), Space: O(n) where n is the number of parameters
 */
export function parseQueryString(queryString: string): Record<string, string> {
  if (!queryString || queryString === '?') {
    return {};
  }

  return queryString
    .replace(/^\?/, '')
    .replace(/\+/g, ' ')
    .split('&')
    .filter(Boolean)
    .reduce(
      (acc, queryParam) => {
        const [key, ...rest] = queryParam.split('=');

        if (!key) {
          return acc;
        }

        const value = rest.join('=');

        acc[decodeURIComponent(key)] = decodeURIComponent(value);

        return acc;
      },
      {} as Record<string, string>,
    );
}
