/**
 * Converts a URL query string into an object with parameter names as keys.
 *
 * @param queryString - The URL query string to parse (without the leading '?').
 * @returns An object containing the parsed query parameters.
 *
 * @throws {TypeError} If queryString is not a string.
 *
 * @example
 * // Basic usage
 * queryStringToObject('name=John%20Doe&age=30');
 * // { name: 'John Doe', age: '30' }
 *
 * @example
 * // With special characters
 * queryStringToObject('search=price%3E100&tags=promo%2Csale');
 * // { search: 'price>100', tags: 'promo,sale' }
 *
 * @example
 * // Empty string
 * queryStringToObject(''); // {}
 *
 * @example
 * // With leading question mark (automatically removed)
 * queryStringToObject('?name=Alice&city=NY');
 * // { name: 'Alice', city: 'NY' }
 *
 * @example
 * // Real-world: Parse URL parameters
 * const url = 'https://example.com/search?q=laptop&category=electronics&sort=price';
 * const params = queryStringToObject(url.split('?')[1]);
 * // { q: 'laptop', category: 'electronics', sort: 'price' }
 *
 * @note If a parameter appears multiple times, only the last value is preserved.
 * @note All values are returned as strings, even if they represent numbers or other types.
 * @note Automatically decodes URL-encoded components (spaces, special characters, etc).
 * @note Removes leading '?' if present for convenience.
 * @note Inverse operation of objectToQueryString.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the number of parameters
 */
export function queryStringToObject(
  queryString: string,
): Record<string, string> {
  if (typeof queryString !== 'string') {
    throw new TypeError('Input must be a string');
  }
  const str = queryString.replace(/^\?/, '').trim();
  if (str === '') return {};

  return str
    .split('&')
    .filter(Boolean)
    .reduce(
      (acc, param) => {
        const [key, ...rest] = param.split('=');
        if (key) {
          const value = rest.length > 0 ? rest.join('=') : undefined;
          acc[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
        }
        return acc;
      },
      {} as Record<string, string>,
    );
}
