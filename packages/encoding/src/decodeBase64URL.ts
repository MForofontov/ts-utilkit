import { Buffer } from 'buffer';

/**
 * Decodes a Base64URL-encoded string back to a UTF-8 string.
 *
 * Accepts the URL-safe Base64 alphabet (`-` and `_` instead of `+` and `/`)
 * and is tolerant of missing `=` padding. This is the format produced by
 * encodeBase64URL and used in JWTs, OAuth tokens, and similar web security
 * protocols.
 *
 * @param str - The Base64URL encoded string to decode.
 * @returns The decoded UTF-8 string.
 *
 * @throws {Error} If the string contains characters outside the Base64URL alphabet.
 *
 * @example
 * // Basic usage
 * decodeBase64URL('aGVsbG8'); // 'hello'
 * decodeBase64URL('aGVsbG8gd29ybGQ'); // 'hello world'
 *
 * @example
 * // JWT header
 * decodeBase64URL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
 * // '{"alg":"HS256","typ":"JWT"}'
 *
 * @example
 * // Accepts optional padding
 * decodeBase64URL('aGVsbG8='); // 'hello'
 *
 * @example
 * // Invalid input
 * try {
 *   decodeBase64URL('hello world!'); // Throws Error (space and ! are invalid)
 * } catch (e) {
 *   console.error(e.message); // 'Invalid Base64URL string'
 * }
 *
 * @note Accepts both padded and unpadded input.
 * @note Only the characters A–Z, a–z, 0–9, `-`, `_`, and `=` (padding) are valid.
 * @note To encode, use encodeBase64URL.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the encoded string
 */
export function decodeBase64URL(str: string): string {
  if (!/^[A-Za-z0-9\-_=]*$/.test(str)) {
    throw new Error('Invalid Base64URL string');
  }

  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf8');
}
