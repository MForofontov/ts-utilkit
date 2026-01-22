/**
 * Compares two Date objects and returns their chronological relationship.
 *
 * @param date1 - The first Date object to compare.
 * @param date2 - The second Date object to compare.
 * @returns -1 if date1 is before date2, 1 if date1 is after date2, and 0 if they are equal.
 *
 * @throws {Error} If date1 is invalid (e.g., new Date('invalid')).
 * @throws {Error} If date2 is invalid.
 *
 * @example
 * // date1 is before date2
 * const date1 = new Date('2024-09-19');
 * const date2 = new Date('2024-09-20');
 * compareDates(date1, date2); // -1
 *
 * @example
 * // date1 is after date2
 * compareDates(new Date('2025-01-15'), new Date('2025-01-10')); // 1
 *
 * @example
 * // Dates are equal (down to millisecond)
 * const date = new Date('2025-01-01T12:00:00.000Z');
 * compareDates(date, new Date('2025-01-01T12:00:00.000Z')); // 0
 *
 * @example
 * // Works with different times on same day
 * compareDates(new Date('2025-01-01T08:00:00'), new Date('2025-01-01T12:00:00')); // -1
 *
 * @example
 * // Comparing to same date object
 * const date = new Date('2025-01-01');
 * compareDates(date, date); // 0
 *
 * @note Comparison includes date AND time (down to millisecond precision).
 * @note Uses the underlying timestamp (milliseconds since Unix epoch) for comparison.
 * @note Useful for sorting dates: `dates.sort((a, b) => compareDates(a, b))`.
 * @note Return values compatible with Array.sort() comparator function.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function compareDates(date1: Date, date2: Date): number {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date');
  }

  if (date1 < date2) {
    return -1;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 0;
  }
}
