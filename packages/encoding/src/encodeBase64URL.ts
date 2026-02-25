import { Buffer } from 'buffer';

/**
 * Encodes a UTF-8 string as a URL-safe Base64 string with no padding characters.
 *
 * This is the canonical encoding used in JWTs (JSON Web Tokens), OAuth 2.0
 * authorization codes, and other web security protocols that embed Base64 in URLs
 * or HTTP headers without percent-encoding.
 *
 * @param str - The UTF-8 string to encode.
 * @returns The Base64URL encoded string (uses `-` and `_` instead of `+` and `/`,
 *   with no `=` padding).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * encodeBase64URL('hello'); // 'aGVsbG8'
 * encodeBase64URL('hello world'); // 'aGVsbG8gd29ybGQ'
 *
 * @example
 * // JWT header
 * encodeBase64URL('{"alg":"HS256","typ":"JWT"}'); // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
 *
 * @example
 * // Characters that differ from standard Base64
 * encodeBase64URL('\xfb\xff'); // '---' — no '+', '/', or '=' in output
 *
 * @example
 * // UTF-8 characters
 * encodeBase64URL('café'); // 'Y2Fmw6k'
 * encodeBase64URL(''); // ''
 *
 * @note Always uses UTF-8 encoding, making it predictable for all Unicode input.
 * @note Compatible with RFC 4648 §5 (base64url) and RFC 7515 (JWS/JWT).
 * @note To decode, use decodeBase64URL.
 *
 * @complexity Time: O(n), Space: O(n) where n is the byte length of the UTF-8 string
 */
export function encodeBase64URL(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }

  return Buffer.from(str, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
