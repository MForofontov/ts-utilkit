import { randomInt } from 'crypto';

/**
 * Generates a cryptographically secure random string.
 *
 * @param length - The length of the string to generate (must be positive integer).
 * @param charset - Optional custom character set. Defaults to alphanumeric (a-zA-Z0-9).
 * @returns A random string of the specified length.
 *
 * @throws {Error} If length is not a positive integer.
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
 * @note Uses Node.js crypto.randomInt() for unbiased character selection.
 * The default charset includes: a-z, A-Z, 0-9 (62 characters).
 * Suitable for generating passwords, tokens, session IDs, and API keys.
 *
 * @complexity Time: O(n) where n is the length, Space: O(n)
 */
export function generateRandomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`length must be a positive integer, got ${length}`);
  }

  if (charset.length === 0) {
    throw new Error('charset cannot be empty');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomInt(charset.length)];
  }

  return result;
}
