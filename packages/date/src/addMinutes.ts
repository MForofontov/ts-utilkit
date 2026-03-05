/**
 * Adds a specified number of minutes to a Date object.
 *
 * @param date - The original Date object.
 * @param minutes - The number of minutes to add (can be negative to subtract minutes).
 * @returns A new Date object with the specified minutes added.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If minutes is NaN.
 *
 * @example
 * // Add minutes
 * addMinutes(new Date('2025-01-01T10:00:00'), 30); // 2025-01-01T10:30:00
 *
 * @example
 * // Crosses hour boundary
 * addMinutes(new Date('2025-01-01T10:45:00'), 30); // 2025-01-01T11:15:00
 *
 * @example
 * // Subtract minutes with negative value
 * addMinutes(new Date('2025-01-01T10:10:00'), -10); // 2025-01-01T10:00:00
 *
 * @example
 * // Zero minutes returns same time
 * addMinutes(new Date('2025-01-01T12:00:00'), 0); // 2025-01-01T12:00:00
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Automatically handles hour, day, month, and year rollovers.
 * @note Fractional minutes are supported (e.g., 1.5 = 1 minute 30 seconds).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function addMinutes(date: Date, minutes: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(minutes)) {
    throw new Error('Minutes must be a number');
  }

  const result = new Date(date);
  result.setTime(result.getTime() + minutes * 60_000);
  return result;
}
