import { Buffer } from 'buffer';

/** RFC 4648 Base32 alphabet (A–Z, 2–7). */
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Encodes a UTF-8 string as a Base32 string per RFC 4648.
 *
 * Base32 represents every 5 bytes (40 bits) as 8 characters from the alphabet
 * `A–Z` and `2–7`, padding the output with `=` to a multiple of 8 characters.
 * It is the encoding used by TOTP (RFC 6238) and HOTP (RFC 4226) shared secrets,
 * making it the standard format for 2FA/authenticator app seeds (Google
 * Authenticator, Authy, etc.).
 *
 * @param str - The UTF-8 string to encode.
 * @returns The Base32 encoded string in uppercase with `=` padding.
 *
 * @throws {TypeError} If str is not a string.
 *
 * @example
 * // Basic usage
 * encodeBase32('hello'); // 'NBSWY3DP'  (no padding needed for 5 bytes)
 * encodeBase32('f'); // 'MY======'
 *
 * @example
 * // TOTP shared secret (encode a raw key as Base32 for QR codes)
 * encodeBase32('12345678901234567890'); // 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ'
 *
 * @example
 * // Empty string
 * encodeBase32(''); // ''
 *
 * @example
 * // Round-trip
 * decodeBase32(encodeBase32('secret')); // 'secret'
 *
 * @note Output alphabet is uppercase A–Z and digits 2–7 (no 0, 1, 8, 9).
 * @note Padding characters `=` are added to make the output length a multiple of 8.
 * @note To decode, use decodeBase32.
 *
 * @complexity Time: O(n), Space: O(n) where n is the byte length of the UTF-8 string
 */
export function encodeBase32(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }

  if (str.length === 0) {
    return '';
  }

  const bytes = Buffer.from(str, 'utf8');
  let result = '';
  let bitsBuffer = 0;
  let bitsCount = 0;

  for (const byte of bytes) {
    bitsBuffer = (bitsBuffer << 8) | byte;
    bitsCount += 8;

    while (bitsCount >= 5) {
      bitsCount -= 5;
      result += BASE32_ALPHABET[(bitsBuffer >> bitsCount) & 0x1f];
    }
  }

  // Handle remaining bits (left-pad with zeros to form last 5-bit group)
  if (bitsCount > 0) {
    result += BASE32_ALPHABET[(bitsBuffer << (5 - bitsCount)) & 0x1f];
  }

  // Pad output to a multiple of 8 characters
  while (result.length % 8 !== 0) {
    result += '=';
  }

  return result;
}
