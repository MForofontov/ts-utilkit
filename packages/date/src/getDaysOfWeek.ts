/**
 * Returns an array of all weekday names in order from Sunday to Saturday.
 *
 * @returns An array of 7 strings representing the days of the week.
 *
 * @example
 * // Basic usage
 * getDaysOfWeek();
 * // Returns: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 *
 * @example
 * // Access specific day
 * const days = getDaysOfWeek();
 * console.log(days[0]); // 'Sunday'
 * console.log(days[6]); // 'Saturday'
 *
 * @example
 * // Iterate over days
 * getDaysOfWeek().forEach((day, index) => {
 *   console.log(`Day ${index}: ${day}`);
 * });
 *
 * @example
 * // Get weekdays only (Monday-Friday)
 * const weekdays = getDaysOfWeek().slice(1, 6);
 * // Returns: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
 *
 * @example
 * // Real-world: dropdown options
 * const dayOptions = getDaysOfWeek().map(day => ({
 *   value: day.toLowerCase(),
 *   label: day
 * }));
 *
 * @note Days are ordered starting with Sunday (index 0) following JavaScript Date convention.
 * @note Returns full English names (not abbreviations).
 * @note Always returns the same array content (pure function).
 * @note Useful for calendar UI, dropdown menus, or date validation.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getDaysOfWeek(): string[] {
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
}
