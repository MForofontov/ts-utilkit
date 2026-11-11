/**
 * Shifts a date by a number of months, clamping the day to the last day of the
 * target month when the original day does not exist (e.g. Jan 31 + 1 month → Feb 28).
 */
export function shiftMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const day = result.getDate();
  const targetMonth = result.getMonth() + months;

  result.setDate(1);
  result.setMonth(targetMonth);

  const lastDayOfMonth = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();
  result.setDate(Math.min(day, lastDayOfMonth));

  return result;
}

/**
 * Returns the 0-based day-of-year index for a local calendar date.
 */
export function dayOfYear(date: Date): number {
  const year = date.getFullYear();
  let days = date.getDate() - 1;

  for (let month = 0; month < date.getMonth(); month++) {
    days += new Date(year, month + 1, 0).getDate();
  }

  return days;
}
