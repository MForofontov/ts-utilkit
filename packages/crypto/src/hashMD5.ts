import { createHash } from 'crypto';

/**
 * Generates an MD5 hash of the input data.
 *
 * @param data - The data to hash (string or Buffer).
 * @returns Hex string representation of the MD5 hash.
 *
 * @throws {TypeError} If data is not a string or Buffer.
 *
 * @example
 * // Hash a string
 * hashMD5('hello world');
 * // Returns: '5eb63bbbe01eeed093cb22bb8f5acdc3'
 *
 * @example
 * // Hash a Buffer
 * hashMD5(Buffer.from('hello world'));
 * // Returns: '5eb63bbbe01eeed093cb22bb8f5acdc3'
 *
 * @example
 * // Hash empty string
 * hashMD5('');
 * // Returns: 'd41d8cd98f00b204e9800998ecf8427e'
 *
 * @warning MD5 is NOT cryptographically secure and should NOT be used for
 * security-sensitive applications (passwords, signatures, etc.). Use SHA-256
 * or SHA-512 instead. MD5 is only suitable for non-cryptographic purposes
 * like checksums or unique identifiers.
 *
 * @note Uses Node.js crypto module. MD5 produces a 128-bit (16-byte) hash.
 * MD5 is vulnerable to collision attacks and has been deprecated for security uses.
 *
 * @complexity Time: O(n) where n is the length of input data, Space: O(1)
 */
export function hashMD5(data: string | Buffer): string {
  if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
    throw new TypeError(`data must be a string or Buffer, got ${typeof data}`);
  }

  return createHash('md5').update(data).digest('hex');
}
