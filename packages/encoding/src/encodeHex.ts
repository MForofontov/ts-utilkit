import { Buffer } from 'buffer';

/**
 * Encodes a UTF-8 string as a lowercase hexadecimal string.
 *
 * Each byte of the UTF-8 representation is encoded as two hex digits, producing
 * a string of length `2 × byteLength`. This is useful for binary-to-text encoding
 * in protocols, debug output, cryptographic key representation, and anywhere
 * a printable, compact byte dump is needed.
 *
 * @param str - The UTF-8 string to encode.
 * @returns A lowercase hex string (e.g. `'68656c6c6f'` for `'hello'`).
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * encodeHex('hello'); // '68656c6c6f'
 * encodeHex('Hi'); // '4869'
 *
 * @example
 * // Empty string
 * encodeHex(''); // ''
 *
 * @example
 * // UTF-8 multi-byte characters
 * encodeHex('é'); // 'c3a9'  (2 UTF-8 bytes for U+00E9)
 * encodeHex('€'); // 'e282ac' (3 UTF-8 bytes for U+20AC)
 *
 * @example
 * // Useful for debug / key display
 * encodeHex('\x00\x01\x02'); // '000102'
 *
 * @note Always uses UTF-8 encoding, so multi-byte characters produce more than 2 hex digits.
 * @note Output is always lowercase; use `.toUpperCase()` if uppercase is required.
 * @note To decode, use decodeHex.
 *
 * @complexity Time: O(n), Space: O(n) where n is the byte length of the UTF-8 string
 */
export function encodeHex(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }

  return Buffer.from(str, 'utf8').toString('hex');
}
