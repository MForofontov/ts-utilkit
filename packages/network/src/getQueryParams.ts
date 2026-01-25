/**
 * Extracts query parameters from a URL string and returns them as an object.
 * Handles multiple values for the same parameter name.
 *
 * @param url - The URL string containing query parameters.
 * @returns An object where keys are parameter names and values are strings or arrays of strings.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If url is invalid.
 *
 * @example
 * // Single values
 * getQueryParams('https://example.com?foo=bar&baz=qux');
 * // Returns: { foo: 'bar', baz: 'qux' }
 *
 * @example
 * // Multiple values for same parameter
 * getQueryParams('https://example.com?tags=red&tags=blue&tags=green');
 * // Returns: { tags: ['red', 'blue', 'green'] }
 *
 * @example
 * // No query parameters
 * getQueryParams('https://example.com'); // Returns: {}
 *
 * @note Decodes URI-encoded values automatically.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function getQueryParams(url: string): Record<string, string | string[]> {
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }

  try {
    const parsed = new URL(url);
    const params: Record<string, string | string[]> = {};

    // Iterate through all search parameters
    parsed.searchParams.forEach((value, key) => {
      if (params[key]) {
        // Parameter already exists
        if (Array.isArray(params[key])) {
          // Already an array, add to it
          params[key].push(value);
        } else {
          // Convert to array
          params[key] = [params[key], value];
        }
      } else {
        // First occurrence of this parameter
        params[key] = value;
      }
    });

    return params;
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
