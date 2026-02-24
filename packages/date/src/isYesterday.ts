/**
 * Returns `true` if the given date falls on yesterday's calendar date (ignoring time).
 *
 * @param date - The Date object to check.
 * @returns `true` if the date is yesterday, `false` otherwise.
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Yesterday
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * isYesterday(yesterday); // true
 *
 * @example
 * // Today is not yesterday
 * isYesterday(new Date()); // false
 *
 * @example
 * // Tomorrow is not yesterday
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * isYesterday(tomorrow); // false
 *
 * @example
 * // Yesterday at a different time
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * yesterday.setHours(23, 59, 59, 999);
 * isYesterday(yesterday); // true (time is ignored)
 *
 * @note Only compares year, month, and day — time is ignored.
 * @note "Yesterday" is computed relative to the moment the function is called.
 * @note Uses local timezone.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isYesterday(date: Date): boolean {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
}
