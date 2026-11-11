/** Constructs local midnight with literal years, including normalized month/day overflow. */
export function calendarDate(year: number, month: number, day: number): Date {
  const earlyYear = year >= 0 && year < 100;
  // The Gregorian 400-year cycle preserves leap days before correcting the year.
  const result = new Date(earlyYear ? year + 400 : year, month, day);
  if (earlyYear) result.setFullYear(result.getFullYear() - 400);
  return result;
}
