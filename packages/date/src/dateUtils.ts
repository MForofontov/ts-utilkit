import { calendarDate } from './_calendarDate';

const monthOffsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

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

  const lastDayOfMonth = calendarDate(
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
  const month = date.getMonth();
  if (month === 0) return date.getDate() - 1;
  const year = date.getFullYear();
  const leapDay =
    month > 1 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
      ? 1
      : 0;
  return monthOffsets[month] + date.getDate() - 1 + leapDay;
}
