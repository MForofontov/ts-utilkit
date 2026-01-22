/**
 * Safely encodes a URL component with proper handling of special characters.
 * More comprehensive than standard encodeURIComponent.
 *
 * @param str - The string to encode.
 * @returns The encoded string safe for use in URLs.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic encoding
 * encodeURLComponent('hello world');
 * // Returns: 'hello%20world'
 *
 * @example
 * // Special characters
 * encodeURLComponent('test@email.com');
 * // Returns: 'test%40email.com'
 *
 * @example
 * // Complex strings
 * encodeURLComponent('a=b&c=d');
 * // Returns: 'a%3Db%26c%3Dd'
 *
 * @note Handles edge cases better than native encodeURIComponent.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function encodeURLComponent(str: string): string {
  // Input validation
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }

  // Use native encodeURIComponent with additional replacements
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
