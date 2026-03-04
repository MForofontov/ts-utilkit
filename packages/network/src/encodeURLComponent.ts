/**
 * Safely encodes a URL component with proper handling of special characters.
 * More comprehensive than standard encodeURIComponent.
 *
 * @param str - The string to encode.
 * @returns The encoded string safe for use in URLs.
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
  // Use native encodeURIComponent with additional replacements
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
