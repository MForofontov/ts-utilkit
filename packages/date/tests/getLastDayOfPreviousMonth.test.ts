import { getLastDayOfPreviousMonth } from '../src/getLastDayOfPreviousMonth';
import { localDate, expectSameCalendarDay } from './dateTestUtils';

/**
 * Unit tests for the getLastDayOfPreviousMonth function.
 */
describe('getLastDayOfPreviousMonth', () => {
  // Test case 1: Get the last day of the previous month for a valid date
  it('1. should return the last day of the previous month for a valid date', () => {
    const date: Date = localDate(2023, 8, 19);
    const expected: Date = localDate(2023, 7, 31);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 2: Get the last day of the previous month for a leap year date
  it('2. should return the last day of the previous month for a leap year date', () => {
    const date: Date = localDate(2020, 2, 15);
    const expected: Date = localDate(2020, 1, 29);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 3: Get the last day of the previous month for a date with time components
  it('3. should return the last day of the previous month for a date with time components', () => {
    const date: Date = localDate(2023, 0, 15, 12, 34, 56);
    const expected: Date = localDate(2022, 11, 31);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 4: Get the last day of the previous month for a date at the start of the year
  it('4. should return the last day of the previous month for a date at the start of the year', () => {
    const date: Date = localDate(2023, 0, 1);
    const expected: Date = localDate(2022, 11, 31);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 5: Get the last day of the previous month for a date at the end of the year
  it('5. should return the last day of the previous month for a date at the end of the year', () => {
    const date: Date = localDate(2023, 11, 31);
    const expected: Date = localDate(2023, 10, 30);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 6: Get the last day of the previous month for a date with zero time components
  it('6. should return the last day of the previous month for a date with zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 0, 0, 0);
    const expected: Date = localDate(2022, 11, 31);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 7: Get the last day of the previous month for a date with a negative year
  it('7. should return the last day of the previous month for a date with a negative year', () => {
    const date: Date = localDate(-1, 0, 1);
    const expected: Date = localDate(-2, 11, 31);
    const result: Date = getLastDayOfPreviousMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 8: Get the last day of the previous month for a NaN date (should throw an error)
  it('8. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getLastDayOfPreviousMonth(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the last day of the previous month for an invalid date (should throw an error)
  it('9. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getLastDayOfPreviousMonth(date)).toThrow('Invalid date');
  });
});
