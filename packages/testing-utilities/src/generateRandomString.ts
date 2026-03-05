import { randomSequence } from '@ts-utilkit/random';

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
 * Generates random strings for testing purposes.
 *
 * @deprecated Use `randomSequence` from `@ts-utilkit/random` directly.
 * Note: this function is NOT cryptographically secure. For secure random strings
 * use `generateRandomString` from `@ts-utilkit/string`.
 * Will be removed in the next major version.
 *
 * @param length - Length of the string.
 * @param charset - Character set to use (default: 'alphanumeric').
 * @returns Random string of specified length.
 *
 * @throws {Error} If length is not a non-negative number.
 *
 * @example
 * const randomEmail = `test${generateRandomString(8)}@example.com`;
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

  const charsets: Record<CharsetType, string> = {
    alphanumeric:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    numeric: '0123456789',
    hex: '0123456789ABCDEF',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  };

  const chars = charsets[charset];
  return randomSequence(Math.floor(length), chars);
}
