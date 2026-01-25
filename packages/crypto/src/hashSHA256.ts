import { createHash } from 'crypto';

/**
 * Generates a SHA-256 hash of the input data.
 *
 * @param data - The data to hash (string or Buffer).
 * @returns Hex string representation of the SHA-256 hash.
 *
 * @throws {TypeError} If data is not a string or Buffer.
 *
 * @example
 * // Hash a string
 * hashSHA256('hello world');
 * // Returns: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
 *
 * @example
 * // Hash a Buffer
 * hashSHA256(Buffer.from('hello world'));
 * // Returns: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
 *
 * @example
 * // Hash empty string
 * hashSHA256('');
 * // Returns: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
 *
 * @note Uses Node.js crypto module for cryptographic operations.
 * SHA-256 is part of the SHA-2 family and produces a 256-bit (32-byte) hash.
 *
 * @complexity Time: O(n) where n is the length of input data, Space: O(1)
 */
export function hashSHA256(data: string | Buffer): string {
  if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
    throw new TypeError(`data must be a string or Buffer, got ${typeof data}`);
  }

  return createHash('sha256').update(data).digest('hex');
}
