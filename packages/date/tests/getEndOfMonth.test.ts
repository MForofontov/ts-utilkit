import { getEndOfMonth } from '../src/getEndOfMonth';
import { localDate, expectSameCalendarDay } from './dateTestUtils';

/**
 * Unit tests for the getEndOfMonth function.
 */
describe('getEndOfMonth', () => {
  // Test case 1: Get the last date of the month for January
  it('1. should return the last date of January', () => {
    const date: Date = localDate(2023, 0, 15);
    const expected: Date = localDate(2023, 0, 31);
    const result: Date = getEndOfMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 2: Get the last date of the month for February in a non-leap year
  it('2. should return the last date of February in a non-leap year', () => {
    const date: Date = localDate(2023, 1, 15);
    const expected: Date = localDate(2023, 1, 28);
    const result: Date = getEndOfMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 3: Get the last date of the month for February in a leap year
  it('3. should return the last date of February in a leap year', () => {
    const date: Date = localDate(2024, 1, 15);
    const expected: Date = localDate(2024, 1, 29);
    const result: Date = getEndOfMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 4: Get the last date of the month for April
  it('4. should return the last date of April', () => {
    const date: Date = localDate(2023, 3, 15);
    const expected: Date = localDate(2023, 3, 30);
    const result: Date = getEndOfMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 5: Get the last date of the month for December
  it('5. should return the last date of December', () => {
    const date: Date = localDate(2023, 11, 15);
    const expected: Date = localDate(2023, 11, 31);
    const result: Date = getEndOfMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 6: Get the last date of the month for a date with time components
  it('6. should return the last date of the month for a date with time components', () => {
    const date: Date = localDate(2023, 0, 15, 12, 34, 56);
    const expected: Date = localDate(2023, 0, 31);
    const result: Date = getEndOfMonth(date);
    expectSameCalendarDay(result, expected);
  });

  // Test case 7: Get the last date of the month for a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getEndOfMonth(date)).toThrow('Invalid date');
  });

  // Test case 8: Get the last date of the month for an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getEndOfMonth(date)).toThrow('Invalid date');
  });
});
