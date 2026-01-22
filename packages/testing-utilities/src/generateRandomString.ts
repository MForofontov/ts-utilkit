/**
 * Type for character set options.
 */
export type CharsetType =
  | 'alphanumeric'
  | 'alpha'
  | 'numeric'
  | 'hex'
  | 'special';

/**
 * Generates random strings for testing.
 *
 * @param length - Length of the string.
 * @param charset - Character set to use (default: 'alphanumeric').
 * @returns Random string of specified length.
 *
 * @throws {Error} If length is not a non-negative number.
 *
 * @example
 * const randomEmail = `test${generateRandomString(8)}@example.com`;
 * const result = validateEmail(randomEmail);
 *
 * @example
 * // Generate hex string
 * const hexId = generateRandomString(16, 'hex');
 * expect(hexId).toMatch(/^[0-9A-F]{16}$/);
 *
 * @complexity Time: O(n) where n is length, Space: O(n)
 */
export function generateRandomString(
  length: number,
  charset: CharsetType = 'alphanumeric',
): string {
  if (typeof length !== 'number' || length < 0) {
    throw new Error('length must be a non-negative number');
  }

  const charsets = {
    alphanumeric:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    hex: '0123456789ABCDEF',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  const chars = charsets[charset];
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
