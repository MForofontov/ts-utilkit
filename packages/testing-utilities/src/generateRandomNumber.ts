import { randomInt, randomFloat } from '@ts-utilkit/random';

/**
 * Generates a random number within a specified range.
 *
 * @deprecated Use `randomInt` (for integers) or `randomFloat` (for decimals) from
 * `@ts-utilkit/random` directly. Will be removed in the next major version.
 *
 * @param min - Minimum value (inclusive).
 * @param max - Maximum value (inclusive).
 * @param decimals - Number of decimal places (default: 0 for integers).
 * @returns Random number in the specified range.
 *
 * @throws {Error} If min is greater than max.
 * @throws {Error} If decimals is negative.
 *
 * @example
 * const num = generateRandomNumber(1, 100);
 * // Returns: 42
 *
 * @example
 * const decimal = generateRandomNumber(0, 1, 2);
 * // Returns: 0.73
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomNumber(
  min: number,
  max: number,
  decimals: number = 0,
): number {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  if (decimals < 0) {
    throw new Error('decimals must be non-negative');
  }

  if (decimals === 0) {
    return randomInt(min, max);
  }

  return randomFloat(min, max, decimals);
}

