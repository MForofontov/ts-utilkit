import { createHash } from 'crypto';

/**
 * Generates a SHA-512 hash of the input data.
 *
 * @param data - The data to hash (string or Buffer).
 * @returns Hex string representation of the SHA-512 hash.
 *
 * @throws {TypeError} If data is not a string or Buffer.
 *
 * @example
 * // Hash a string
 * hashSHA512('hello world');
 * // Returns: '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f'
 *
 * @example
 * // Hash a Buffer
 * hashSHA512(Buffer.from('hello world'));
 * // Returns: '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f'
 *
 * @example
 * // Hash empty string
 * hashSHA512('');
 * // Returns: 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e'
 *
 * @note Uses Node.js crypto module for cryptographic operations.
 * SHA-512 is part of the SHA-2 family and produces a 512-bit (64-byte) hash,
 * providing stronger security than SHA-256 at the cost of computational overhead.
 *
 * @complexity Time: O(n) where n is the length of input data, Space: O(1)
 */
export function hashSHA512(data: string | Buffer): string {
  if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
    throw new TypeError(`data must be a string or Buffer, got ${typeof data}`);
  }

  return createHash('sha512').update(data).digest('hex');
}
