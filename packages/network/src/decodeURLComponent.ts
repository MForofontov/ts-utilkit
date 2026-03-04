/**
 * Safely decodes a URL component with error handling for malformed strings.
 *
 * @param str - The encoded string to decode.
 * @returns The decoded string, or the original string if decoding fails.
 *
 * @example
 * // Basic decoding
 * decodeURLComponent('hello%20world');
 * // Returns: 'hello world'
 *
 * @example
 * // Special characters
 * decodeURLComponent('test%40email.com');
 * // Returns: 'test@email.com'
 *
 * @example
 * // Malformed encoding (graceful handling)
 * decodeURLComponent('hello%world');
 * // Returns: 'hello%world' (original string)
 *
 * @note Returns original string if decoding fails instead of throwing.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function decodeURLComponent(str: string): string {
  try {
    // Attempt to decode
    return decodeURIComponent(str);
  } catch {
    // If decoding fails, return original string
    // This handles malformed percent encodings gracefully
    return str;
  }
}
