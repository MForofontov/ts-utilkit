import { randomBytes } from 'crypto';

/**
 * Generates a cryptographically secure random string.
 *
 * @param length - The length of the string to generate (must be positive integer).
 * @param charset - Optional custom character set. Defaults to alphanumeric (a-zA-Z0-9).
 * @returns A random string of the specified length.
 *
 * @throws {TypeError} If length is not a number.
 * @throws {TypeError} If charset is not a string.
 * @throws {Error} If length is not a positive integer.
 * @throws {Error} If length is NaN.
 * @throws {Error} If charset is empty.
 *
 * @example
 * // Generate 16-character alphanumeric string
 * generateRandomString(16);
 * // Returns: e.g., 'aB3xK9mPq2Ln5Yz7'
 *
 * @example
 * // Generate numeric PIN
 * generateRandomString(6, '0123456789');
 * // Returns: e.g., '847203'
 *
 * @example
 * // Generate hex string
 * generateRandomString(32, '0123456789abcdef');
 * // Returns: e.g., 'a3f5b2c8d9e1f4a7b6c5d8e9f1a2b3c4'
 *
 * @example
 * // Generate URL-safe token
 * generateRandomString(24, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_');
 *
 * @note Uses Node.js crypto.randomBytes() for cryptographic strength.
 * The default charset includes: a-z, A-Z, 0-9 (62 characters).
 * Suitable for generating passwords, tokens, session IDs, and API keys.
 *
 * @complexity Time: O(n) where n is the length, Space: O(n)
 */
export function generateRandomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  if (typeof length !== 'number') {
    throw new TypeError(`length must be a number, got ${typeof length}`);
  }

  if (isNaN(length)) {
    throw new Error('length must be a valid number, not NaN');
  }

  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`length must be a positive integer, got ${length}`);
  }

  if (typeof charset !== 'string') {
    throw new TypeError(`charset must be a string, got ${typeof charset}`);
  }

  if (charset.length === 0) {
    throw new Error('charset cannot be empty');
  }

  // Generate enough random bytes to ensure uniform distribution
  // We need more bytes than the string length to avoid bias
  const randomBytesLength = Math.ceil(length * 1.5);
  const bytes = randomBytes(randomBytesLength);

  let result = '';
  for (let i = 0; i < bytes.length && result.length < length; i++) {
    // Use modulo bias mitigation: only use bytes that don't cause bias
    const maxValidValue = Math.floor(256 / charset.length) * charset.length;
    if (bytes[i] < maxValidValue) {
      result += charset[bytes[i] % charset.length];
    }
  }

  // If we didn't get enough characters (very unlikely), recursively generate more
  if (result.length < length) {
    result += generateRandomString(length - result.length, charset);
  }

  return result;
}
