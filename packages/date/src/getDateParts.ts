/**
 * Extracts individual date and time components from a Date object.
 *
 * @param date - The Date object to extract parts from.
 * @returns An object containing year, month (1-12), day, hours, minutes, and seconds.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const date = new Date('2025-01-15T14:30:45');
 * getDateParts(date);
 * // Returns: { year: 2025, month: 1, day: 15, hours: 14, minutes: 30, seconds: 45 }
 *
 * @example
 * // With midnight time
 * const midnight = new Date('2025-12-31T00:00:00');
 * getDateParts(midnight);
 * // Returns: { year: 2025, month: 12, day: 31, hours: 0, minutes: 0, seconds: 0 }
 *
 * @example
 * // Destructuring specific parts
 * const date = new Date('2025-06-15T09:30:00');
 * const { year, month, day } = getDateParts(date);
 * console.log(`Date: ${year}-${month}-${day}`); // "Date: 2025-6-15"
 *
 * @example
 * // Using all components
 * const now = new Date();
 * const parts = getDateParts(now);
 * console.log(`${parts.hours}:${parts.minutes}:${parts.seconds}`);
 *
 * @example
 * // Real-world: custom date formatting
 * const date = new Date();
 * const parts = getDateParts(date);
 * const formatted = `${parts.day}/${parts.month}/${parts.year}`;
 *
 * @note Month is returned as 1-12 (not 0-11 like Date.getMonth()).
 * @note All values are in local time zone.
 * @note Hours are in 24-hour format (0-23).
 * @note Useful for manual date formatting or date component analysis.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getDateParts(date: Date): {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}
