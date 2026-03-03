import { Buffer } from 'buffer';

/**
 * Decodes a hexadecimal string back to a UTF-8 string.
 *
 * Accepts both lowercase and uppercase hex digits. The input must contain
 * an even number of valid hex characters (0–9, a–f, A–F); any other content
 * throws an error.
 *
 * @param str - The hexadecimal string to decode (e.g. `'68656c6c6f'`).
 * @returns The decoded UTF-8 string.
 *
 * @throws {Error} If str has an odd length (cannot form complete byte pairs).
 * @throws {Error} If str contains characters outside the hex alphabet.
 *
 * @example
 * // Basic usage
 * decodeHex('68656c6c6f'); // 'hello'
 * decodeHex('4869'); // 'Hi'
 *
 * @example
 * // Empty string
 * decodeHex(''); // ''
 *
 * @example
 * // Case-insensitive
 * decodeHex('48656C6C6F'); // 'Hello'
 * decodeHex('c3a9'); // 'é'
 *
 * @example
 * // Invalid input
 * try {
 *   decodeHex('xyz'); // Throws Error — non-hex characters
 * } catch (e) {
 *   console.error(e.message); // 'Invalid hex string: contains non-hex characters'
 * }
 *
 * @note Accepts both uppercase and lowercase hex digits.
 * @note A hex string of length n decodes to n/2 bytes.
 * @note To encode, use encodeHex.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the hex string
 */
export function decodeHex(str: string): string {

  if (str.length % 2 !== 0) {
    throw new Error('Invalid hex string: length must be even');
  }

  if (str.length > 0 && !/^[0-9a-fA-F]+$/.test(str)) {
    throw new Error('Invalid hex string: contains non-hex characters');
  }

  return Buffer.from(str, 'hex').toString('utf8');
}
