import { randomSequence } from '@ts-utilkit/random';

/**
 * Generates a random alphanumeric string of the specified length.
 *
 * @deprecated Use `randomSequence` from `@ts-utilkit/random` directly with the
 * alphanumeric charset, or `generateRandomString` from this package for a
 * cryptographically-secure alternative.
 * Will be removed in the next major version.
 *
 * @param length - The length of the string to generate (must be non-negative integer).
 * @returns A random alphanumeric string.
 *
 * @throws {RangeError} If length is negative.
 *
 * @example
 * generateRandomAlphanumeric(8); // e.g. 'aB3xKp9Z'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function generateRandomAlphanumeric(length: number): string {
  if (length < 0) {
    throw new RangeError(`length must be non-negative, got ${length}`);
  }
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return randomSequence(Math.floor(length), charset);
}
