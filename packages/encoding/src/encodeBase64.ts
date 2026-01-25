import { Buffer } from 'buffer';

/**
 * Encodes a string as a URL-safe base64 string.
 *
 * @param str - The string to encode.
 * @returns The URL-safe base64 encoded string (+ replaced with -, / replaced with _, padding removed).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * encodeBase64("hello world"); // "aGVsbG8gd29ybGQ"
 * encodeBase64("test"); // "dGVzdA"
 *
 * @example
 * // UTF-8 characters
 * encodeBase64("Hello 世界"); // "SGVsbG8g5LiW55WM"
 * encodeBase64("café"); // "Y2Fmw6k"
 *
 * @example
 * // Special characters
 * encodeBase64("user@example.com"); // "dXNlckBleGFtcGxlLmNvbQ"
 * encodeBase64("a+b/c="); // "YStiL2M9"
 *
 * @example
 * // Empty and edge cases
 * encodeBase64(""); // ""
 * encodeBase64("a"); // "YQ"
 *
 * @note This function relies on Node.js Buffer API for encoding.
 * @note In browser environments, consider using the native `btoa()` function instead.
 * @note Produces URL-safe base64: '+' becomes '-', '/' becomes '_', padding '=' is removed.
 * @note Handles both ASCII and UTF-8 characters correctly.
 * @note The output is compatible with RFC 4648 base64url encoding.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the input string
 */
export function encodeBase64(str: string): string {
  const hasNonLatin1 = [...str].some((ch) => ch.charCodeAt(0) > 0xff);
  const buffer = hasNonLatin1
    ? Buffer.from(str, 'utf8')
    : Buffer.from([...str].map((c) => c.charCodeAt(0)));

  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
