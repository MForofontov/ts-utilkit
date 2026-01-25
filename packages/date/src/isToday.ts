/**
 * Checks if a given Date object represents today's date (ignoring time).
 *
 * @param date - The Date object to check.
 * @returns True if the date is today, false otherwise.
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Check if date is today
 * const date = new Date();
 * isToday(date); // true
 *
 * @example
 * // Yesterday
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * isToday(yesterday); // false
 *
 * @example
 * // Tomorrow
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * isToday(tomorrow); // false
 *
 * @example
 * // Today but different time
 * const todayMorning = new Date();
 * todayMorning.setHours(8, 0, 0, 0);
 * isToday(todayMorning); // true (time is ignored)
 *
 * @example
 * // Specific date check
 * isToday(new Date('2025-12-02')); // true only on December 2, 2025
 *
 * @note Only compares the date portion (year, month, day); time is ignored.
 * @note Uses local timezone for comparison.
 * @note "Today" is determined by calling `new Date()` at execution time.
 * @note For UTC-based comparison, convert both dates to UTC first.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isToday(date: Date): boolean {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
