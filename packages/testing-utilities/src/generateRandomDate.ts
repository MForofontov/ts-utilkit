import { randomDate } from '@ts-utilkit/random';

/**
 * Generates a random date for testing.
 *
 * @deprecated Use `randomDate` from `@ts-utilkit/random` directly.
 * Will be removed in the next major version.
 *
 * @param start - Start date (default: 2000-01-01).
 * @param end - End date (default: current date).
 * @returns Random date between start and end.
 *
 * @example
 * const date = generateRandomDate();
 * // Returns: Date object between 2000 and now
 *
 * @example
 * const futureDate = generateRandomDate(new Date(), new Date('2030-12-31'));
 * // Returns: Date object between now and 2030
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomDate(
  start: Date = new Date('2000-01-01'),
  end: Date = new Date(),
): Date {
  return randomDate(start, end);
}
