/**
 * Returns `true` if `date1` is strictly before `date2` (millisecond precision).
 *
 * @param date1 - The first Date to compare.
 * @param date2 - The second Date to compare.
 * @returns `true` if date1 < date2, `false` otherwise.
 *
 * @throws {Error} If either date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // date1 is earlier
 * isBefore(new Date('2025-01-01'), new Date('2025-06-01')); // true
 *
 * @example
 * // date1 is later
 * isBefore(new Date('2025-06-01'), new Date('2025-01-01')); // false
 *
 * @example
 * // Identical dates
 * const d = new Date('2025-01-01');
 * isBefore(d, d); // false
 *
 * @example
 * // Time-level comparison
 * isBefore(new Date('2025-01-01T08:00:00'), new Date('2025-01-01T12:00:00')); // true
 *
 * @note Comparison includes time down to millisecond precision.
 * @note Returns `false` for equal timestamps (use `compareDates` for ≤ behaviour).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isBefore(date1: Date, date2: Date): boolean {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date');
  }

  return date1.getTime() < date2.getTime();
}
