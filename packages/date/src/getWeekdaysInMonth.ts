/**
 * Counts the number of weekdays (Monday through Friday) in a given month.
 *
 * @param date - The Date object representing any day in the target month.
 * @returns The count of weekdays (excludes Saturday and Sunday) in the month.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const jan2025 = new Date('2025-01-15');
 * getWeekdaysInMonth(jan2025); // Returns 23
 *
 * @example
 * // February in regular year
 * const feb2025 = new Date('2025-02-01');
 * getWeekdaysInMonth(feb2025); // Returns 20
 *
 * @example
 * // February in leap year
 * const feb2024 = new Date('2024-02-15');
 * getWeekdaysInMonth(feb2024); // Returns 21
 *
 * @example
 * // Current month weekdays
 * const today = new Date();
 * const workDays = getWeekdaysInMonth(today);
 * console.log(`This month has ${workDays} working days`);
 *
 * @example
 * // Real-world: payroll calculation
 * const month = new Date('2025-01-01');
 * const workingDays = getWeekdaysInMonth(month);
 * const dailyRate = monthlySalary / workingDays;
 *
 * @note Only counts Monday (1) through Friday (5).
 * @note Excludes Saturday (6) and Sunday (0).
 * @note Useful for business day calculations and payroll.
 * @note Does not account for holidays or custom business days.
 *
 * @complexity Time: O(n) where n is the number of days in the month, Space: O(1)
 */
export function getWeekdaysInMonth(date: Date): number {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  let weekdayCount = 0;

  // Loop through all days of the month
  for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
    const currentDay = new Date(year, month, day).getDay();
    // Check if the day is Monday to Friday
    if (currentDay >= 1 && currentDay <= 5) {
      weekdayCount++;
    }
  }

  return weekdayCount;
}
