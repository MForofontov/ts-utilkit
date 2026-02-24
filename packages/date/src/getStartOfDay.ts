/**
 * Returns a new Date set to the very start of the given day (00:00:00.000 local time).
 *
 * @param date - The Date object to use as the reference day.
 * @returns A new Date object at midnight (00:00:00.000) on the same calendar day.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Mid-day → start of day
 * getStartOfDay(new Date('2025-06-15T14:30:00')); // 2025-06-15T00:00:00.000
 *
 * @example
 * // Already at midnight stays at midnight
 * getStartOfDay(new Date('2025-06-15T00:00:00.000')); // 2025-06-15T00:00:00.000
 *
 * @example
 * // End of day → start of same day
 * getStartOfDay(new Date('2025-06-15T23:59:59.999')); // 2025-06-15T00:00:00.000
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Uses local timezone.
 * @note Milliseconds are also zeroed (00:00:00.000, not just 00:00:00).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getStartOfDay(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
