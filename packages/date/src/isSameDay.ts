/**
 * Returns `true` if two dates fall on the same calendar day (year, month, and day of month),
 * regardless of the time component.
 *
 * @param date1 - The first Date to compare.
 * @param date2 - The second Date to compare.
 * @returns `true` if both dates share the same year, month, and day; `false` otherwise.
 *
 * @throws {Error} If either date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Same day, different times
 * isSameDay(new Date('2025-03-15T08:00:00'), new Date('2025-03-15T23:59:59')); // true
 *
 * @example
 * // Different days
 * isSameDay(new Date('2025-03-15'), new Date('2025-03-16')); // false
 *
 * @example
 * // Same day and time (identical)
 * const d = new Date('2025-01-01');
 * isSameDay(d, d); // true
 *
 * @example
 * // Same day of month but different month
 * isSameDay(new Date('2025-01-15'), new Date('2025-02-15')); // false
 *
 * @note Ignores the time portion — only year, month, and day-of-month are compared.
 * @note Uses local timezone.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date');
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
