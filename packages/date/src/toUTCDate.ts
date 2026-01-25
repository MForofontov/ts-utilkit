/**
 * Converts a local Date object to a UTC Date object with the same calendar values.
 *
 * @param date - The local Date object to convert.
 * @returns A new Date object representing the same calendar date/time but interpreted as UTC.
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Convert local time to UTC
 * const localDate = new Date('2024-09-19T15:45:30');
 * toUTCDate(localDate); // Date object: 2024-09-19T15:45:30.000Z
 *
 * @example
 * // Preserves calendar values
 * const local = new Date(2024, 8, 19, 15, 45, 30); // Sep 19, 2024, 3:45:30 PM local
 * const utc = toUTCDate(local);
 * // UTC representation: Sep 19, 2024, 3:45:30 PM UTC (same numbers, different timezone)
 *
 * @example
 * // Use for timestamp normalization
 * const userDate = new Date('2024-12-25T10:00:00'); // Local timezone
 * const normalizedDate = toUTCDate(userDate); // Same values in UTC
 *
 * @example
 * // Compare dates from different timezones
 * const date1 = toUTCDate(new Date('2024-01-01T12:00:00'));
 * const date2 = toUTCDate(new Date('2024-01-01T12:00:00'));
 * // Both represent exact same moment in UTC
 *
 * @note This does NOT convert timezone; it reinterprets the same calendar values as UTC.
 * @note Example: "2024-09-19 3:45 PM local" becomes "2024-09-19 3:45 PM UTC".
 * @note For actual timezone conversion, use date.toUTCString() or Intl.DateTimeFormat.
 * @note Creates a new Date object; does not modify the original.
 * @note Preserves milliseconds precision.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function toUTCDate(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );
}
