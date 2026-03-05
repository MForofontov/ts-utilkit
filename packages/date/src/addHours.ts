/**
 * Adds a specified number of hours to a Date object.
 *
 * @param date - The original Date object.
 * @param hours - The number of hours to add (can be negative to subtract hours).
 * @returns A new Date object with the specified hours added.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If hours is NaN.
 *
 * @example
 * // Add hours
 * addHours(new Date('2025-01-01T10:00:00'), 3); // 2025-01-01T13:00:00
 *
 * @example
 * // Crosses midnight
 * addHours(new Date('2025-01-01T22:00:00'), 4); // 2025-01-02T02:00:00
 *
 * @example
 * // Subtract hours with negative value
 * addHours(new Date('2025-01-01T06:00:00'), -2); // 2025-01-01T04:00:00
 *
 * @example
 * // Zero hours returns same time
 * addHours(new Date('2025-01-01T12:00:00'), 0); // 2025-01-01T12:00:00
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Automatically handles day, month, and year rollovers.
 * @note Fractional hours are supported (e.g., 1.5 = 1 hour 30 minutes).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function addHours(date: Date, hours: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(hours)) {
    throw new Error('Hours must be a number');
  }

  const result = new Date(date);
  result.setTime(result.getTime() + hours * 3_600_000);
  return result;
}
