/**
 * Returns `true` if two dates fall within the same calendar year.
 *
 * @param date1 - The first Date to compare.
 * @param date2 - The second Date to compare.
 * @returns `true` if both dates share the same year; `false` otherwise.
 *
 * @throws {Error} If either date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Same year
 * isSameYear(new Date('2025-01-01'), new Date('2025-12-31')); // true
 *
 * @example
 * // Different years
 * isSameYear(new Date('2024-12-31'), new Date('2025-01-01')); // false
 *
 * @example
 * // Identical dates
 * const d = new Date('2025-06-10');
 * isSameYear(d, d); // true
 *
 * @example
 * // Same year regardless of month/day
 * isSameYear(new Date('2025-03-15'), new Date('2025-09-20')); // true
 *
 * @note Only the year portion is compared; month, day, and time are ignored.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date');
  }

  return date1.getFullYear() === date2.getFullYear();
}
