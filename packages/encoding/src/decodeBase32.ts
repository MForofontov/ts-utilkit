import { Buffer } from 'buffer';

/** RFC 4648 Base32 alphabet (A–Z, 2–7). */
const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Decodes a Base32-encoded string (RFC 4648) back to a UTF-8 string.
 *
 * Accepts both uppercase and lowercase input and is tolerant of trailing `=`
 * padding. This is the format produced by encodeBase32 and is the standard
 * encoding for TOTP/HOTP shared secrets used in 2FA authenticator apps.
 *
 * @param str - The Base32 encoded string to decode (case-insensitive, padding optional).
 * @returns The decoded UTF-8 string.
 *
 * @throws {Error} If the string contains characters outside the Base32 alphabet
 *   (A–Z, a–z, 2–7, and `=` padding).
 *
 * @example
 * // Basic usage
 * decodeBase32('NBSWY3DP'); // 'hello'
 * decodeBase32('MY======'); // 'f'
 *
 * @example
 * // Case-insensitive
 * decodeBase32('nbswy3dp'); // 'hello'
 *
 * @example
 * // TOTP seed
 * decodeBase32('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ'); // '12345678901234567890'
 *
 * @example
 * // Invalid character
 * try {
 *   decodeBase32('HELLO!'); // Throws Error — '!' is not in the Base32 alphabet
 * } catch (e) {
 *   console.error(e.message); // 'Invalid Base32 string'
 * }
 *
 * @note Padding `=` characters are optional and will be stripped before decoding.
 * @note Input is case-insensitive (both 'NBSWY3DP' and 'nbswy3dp' decode to 'hello').
 * @note The digits 0, 1, 8, 9 are not part of the Base32 alphabet and will throw.
 * @note To encode, use encodeBase32.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the encoded string
 */
export function decodeBase32(str: string): string {

  const normalized = str.toUpperCase().replace(/=+$/, '');

  if (normalized.length === 0) {
    return '';
  }

  if (!/^[A-Z2-7]+$/.test(normalized)) {
    throw new Error('Invalid Base32 string');
  }

  const bytes: number[] = [];
  let bitsBuffer = 0;
  let bitsCount = 0;

  for (const char of normalized) {
    const index = BASE32_ALPHABET.indexOf(char);
    bitsBuffer = (bitsBuffer << 5) | index;
    bitsCount += 5;

    if (bitsCount >= 8) {
      bitsCount -= 8;
      bytes.push((bitsBuffer >> bitsCount) & 0xff);
    }
  }

  return Buffer.from(bytes).toString('utf8');
}
