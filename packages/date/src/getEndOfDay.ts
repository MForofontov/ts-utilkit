/**
 * Returns a new Date set to the very end of the given day (23:59:59.999 local time).
 *
 * @param date - The Date object to use as the reference day.
 * @returns A new Date object at 23:59:59.999 on the same calendar day.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Mid-day → end of day
 * getEndOfDay(new Date('2025-06-15T14:30:00')); // 2025-06-15T23:59:59.999
 *
 * @example
 * // Already at midnight → end of same day
 * getEndOfDay(new Date('2025-06-15T00:00:00.000')); // 2025-06-15T23:59:59.999
 *
 * @example
 * // Real-world: check if event is within today
 * const todayEnd = getEndOfDay(new Date());
 * const isToday = eventDate <= todayEnd;
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Uses local timezone.
 * @note Sets time to 23:59:59.999 — the last representable millisecond of the day.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getEndOfDay(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
