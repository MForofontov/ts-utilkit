/**
 * Adds or updates query parameters in a URL.
 * If a parameter already exists, it will be updated with the new value.
 *
 * @param url - The URL to add parameters to.
 * @param params - Object containing key-value pairs to add/update.
 * @returns The URL with updated query parameters.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {TypeError} If params is not an object.
 * @throws {Error} If url is invalid.
 *
 * @example
 * // Add single parameter
 * addQueryParams('https://example.com', { token: 'abc123' });
 * // Returns: 'https://example.com?token=abc123'
 *
 * @example
 * // Add multiple parameters
 * addQueryParams('https://example.com/api', { page: 1, limit: 10 });
 * // Returns: 'https://example.com/api?page=1&limit=10'
 *
 * @example
 * // Update existing parameter
 * addQueryParams('https://example.com?page=1', { page: 2 });
 * // Returns: 'https://example.com?page=2'
 *
 * @note Preserves existing query parameters that are not being updated.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function addQueryParams(
  url: string,
  params: Record<string, string | number | boolean>,
): string {
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }
  if (typeof params !== 'object' || params === null || Array.isArray(params)) {
    throw new TypeError(`params must be an object, got ${typeof params}`);
  }

  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;

    // Add or update parameters
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, String(value));
    }

    return urlObj.toString();
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}
