/**
 * Helpers for date package tests — use local-time constructors to avoid
 * UTC-vs-local mismatches from `new Date('YYYY-MM-DD')` ISO parsing.
 */
export function localDate(
  year: number,
  month: number,
  day: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
  ms = 0,
): Date {
  return new Date(year, month, day, hours, minutes, seconds, ms);
}

export function expectSameCalendarDay(actual: Date, expected: Date): void {
  expect(actual.getFullYear()).toBe(expected.getFullYear());
  expect(actual.getMonth()).toBe(expected.getMonth());
  expect(actual.getDate()).toBe(expected.getDate());
}

export function expectSameDateTime(actual: Date, expected: Date): void {
  expectSameCalendarDay(actual, expected);
  expect(actual.getHours()).toBe(expected.getHours());
  expect(actual.getMinutes()).toBe(expected.getMinutes());
  expect(actual.getSeconds()).toBe(expected.getSeconds());
}

export function expectSameWeekRange(
  actual: { start: Date; end: Date },
  expected: { start: Date; end: Date },
): void {
  expectSameDateTime(actual.start, expected.start);
  expectSameDateTime(actual.end, expected.end);
}
