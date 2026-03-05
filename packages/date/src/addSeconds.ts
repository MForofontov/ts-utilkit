/**
 * Adds a specified number of seconds to a Date object.
 *
 * @param date - The original Date object.
 * @param seconds - The number of seconds to add (can be negative to subtract seconds).
 * @returns A new Date object with the specified seconds added.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If seconds is NaN.
 *
 * @example
 * // Add seconds
 * addSeconds(new Date('2025-01-01T10:00:00'), 30); // 2025-01-01T10:00:30
 *
 * @example
 * // Crosses minute boundary
 * addSeconds(new Date('2025-01-01T10:00:45'), 30); // 2025-01-01T10:01:15
 *
 * @example
 * // Subtract seconds with negative value
 * addSeconds(new Date('2025-01-01T10:01:00'), -30); // 2025-01-01T10:00:30
 *
 * @example
 * // Zero seconds returns same time
 * addSeconds(new Date('2025-01-01T12:00:00'), 0); // 2025-01-01T12:00:00
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Automatically handles minute, hour, day, month, and year rollovers.
 * @note Fractional seconds are supported (e.g., 1.5 = 1500 milliseconds).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function addSeconds(date: Date, seconds: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(seconds)) {
    throw new Error('Seconds must be a number');
  }

  const result = new Date(date);
  result.setTime(result.getTime() + seconds * 1_000);
  return result;
}
