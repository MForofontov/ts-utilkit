/**
 * Returns `true` if two dates fall within the same calendar month of the same year.
 *
 * @param date1 - The first Date to compare.
 * @param date2 - The second Date to compare.
 * @returns `true` if both dates share the same year and month; `false` otherwise.
 *
 * @throws {Error} If either date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Same month and year
 * isSameMonth(new Date('2025-03-01'), new Date('2025-03-31')); // true
 *
 * @example
 * // Same month, different year
 * isSameMonth(new Date('2024-03-15'), new Date('2025-03-15')); // false
 *
 * @example
 * // Different months, same year
 * isSameMonth(new Date('2025-03-15'), new Date('2025-04-15')); // false
 *
 * @example
 * // Identical dates
 * const d = new Date('2025-06-10');
 * isSameMonth(d, d); // true
 *
 * @note Day-of-month and time are ignored — only year and month are compared.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date');
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}
