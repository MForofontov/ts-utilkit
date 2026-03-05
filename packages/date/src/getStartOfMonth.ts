/**
 * Returns a new Date set to the first day of the given date's month at midnight (00:00:00.000).
 *
 * @param date - The Date object to use as the reference month.
 * @returns A new Date object at the first day of the month at 00:00:00.000.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Mid-month → first of month
 * getStartOfMonth(new Date('2025-06-15')); // 2025-06-01T00:00:00.000
 *
 * @example
 * // Already the first day
 * getStartOfMonth(new Date('2025-01-01T12:00:00')); // 2025-01-01T00:00:00.000
 *
 * @example
 * // February in a leap year
 * getStartOfMonth(new Date('2024-02-29')); // 2024-02-01T00:00:00.000
 *
 * @example
 * // Last day of month → first of same month
 * getStartOfMonth(new Date('2025-01-31')); // 2025-01-01T00:00:00.000
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Complements `getEndOfMonth` which returns the last day of the month.
 * @note Time is set to 00:00:00.000 (midnight, including milliseconds).
 * @note Uses local timezone.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getStartOfMonth(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}
