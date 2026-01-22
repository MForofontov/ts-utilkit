/**
 * Converts an object into a URL-encoded query string suitable for HTTP requests.
 *
 * @param obj - The object whose properties will be converted to query parameters.
 * @returns A URL-encoded query string without the leading '?'.
 *
 * @throws {TypeError} If obj is not an object or is null.
 *
 * @example
 * // Basic usage
 * objectToQueryString({ name: 'John Doe', age: 30 });
 * // 'name=John%20Doe&age=30'
 *
 * @example
 * // With special characters
 * objectToQueryString({ search: 'price>100', tags: 'promo,sale' });
 * // 'search=price%3E100&tags=promo%2Csale'
 *
 * @example
 * // Boolean and number values
 * objectToQueryString({ active: true, page: 1, limit: 50 });
 * // 'active=true&page=1&limit=50'
 *
 * @example
 * // Empty object
 * objectToQueryString({}); // ''
 *
 * @example
 * // Real-world: Building API request URLs
 * const filters = { category: 'books', minPrice: 10, maxPrice: 50 };
 * const url = `https://api.example.com/products?${objectToQueryString(filters)}`;
 * // 'https://api.example.com/products?category=books&minPrice=10&maxPrice=50'
 *
 * @note All values are converted to strings before encoding using String(value).
 * @note Does not handle nested objects or arrays specially - they'll be converted using toString().
 * @note Does not include the leading '?' character used in URLs.
 * @note Uses encodeURIComponent() for proper URL encoding of keys and values.
 * @note For complex nested structures, consider using URLSearchParams or specialized libraries.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is the number of properties
 */
export function objectToQueryString(obj: Record<string, unknown>): string {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Input must be a non-null object');
  }
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');
}
