/**
 * Converts a `Date` object to a Unix timestamp (whole seconds since the Unix epoch).
 *
 * @param date - The Date object to convert.
 * @returns The number of whole seconds elapsed since 1970-01-01T00:00:00.000Z (floor).
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Epoch zero
 * toUnixTimestamp(new Date('1970-01-01T00:00:00.000Z')); // 0
 *
 * @example
 * // A real-world date
 * toUnixTimestamp(new Date('2025-01-01T00:00:00.000Z')); // 1735689600
 *
 * @example
 * // Sub-second part is truncated (floor)
 * toUnixTimestamp(new Date('2025-01-01T00:00:00.999Z')); // 1735689600
 *
 * @example
 * // Negative timestamp (before epoch)
 * toUnixTimestamp(new Date('1969-12-31T00:00:00.000Z')); // -86400
 *
 * @note Returns a whole-second integer (milliseconds are truncated via `Math.floor`).
 * @note Pairs with `fromUnixTimestamp` for round-trip conversion.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function toUnixTimestamp(date: Date): number {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return Math.floor(date.getTime() / 1_000);
}
