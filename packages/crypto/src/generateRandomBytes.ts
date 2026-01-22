import { randomBytes } from 'crypto';

/**
 * Generates cryptographically secure random bytes.
 *
 * @param length - The number of bytes to generate (must be positive integer).
 * @returns A Buffer containing cryptographically secure random bytes.
 *
 * @throws {TypeError} If length is not a number.
 * @throws {Error} If length is not a positive integer.
 * @throws {Error} If length is NaN.
 *
 * @example
 * // Generate 16 random bytes
 * const bytes = generateRandomBytes(16);
 * console.log(bytes.toString('hex')); // e.g., 'a3f5b2c8d9e1f4a7b6c5d8e9f1a2b3c4'
 *
 * @example
 * // Generate 32 random bytes for encryption key
 * const key = generateRandomBytes(32);
 *
 * @example
 * // Convert to base64
 * const bytes = generateRandomBytes(24);
 * const base64 = bytes.toString('base64');
 *
 * @note Uses Node.js crypto.randomBytes() which provides cryptographically
 * strong pseudo-random data. Suitable for generating encryption keys, tokens,
 * salts, and other security-sensitive random values.
 *
 * @complexity Time: O(n) where n is the length, Space: O(n)
 */
export function generateRandomBytes(length: number): Buffer {
  if (typeof length !== 'number') {
    throw new TypeError(`length must be a number, got ${typeof length}`);
  }

  if (isNaN(length)) {
    throw new Error('length must be a valid number, not NaN');
  }

  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`length must be a positive integer, got ${length}`);
  }

  return randomBytes(length);
}
