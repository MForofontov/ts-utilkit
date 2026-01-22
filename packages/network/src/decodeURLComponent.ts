/**
 * Safely decodes a URL component with error handling for malformed strings.
 *
 * @param str - The encoded string to decode.
 * @returns The decoded string, or the original string if decoding fails.
 *
 * @throws {TypeError} If str is not a string.
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
  // Input validation
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }

  try {
    // Attempt to decode
    return decodeURIComponent(str);
  } catch {
    // If decoding fails, return original string
    // This handles malformed percent encodings gracefully
    return str;
  }
}
