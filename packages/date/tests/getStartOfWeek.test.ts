import { getStartOfWeek } from '../src/getStartOfWeek';
import { localDate, expectSameCalendarDay } from './dateTestUtils';

/**
 * Unit tests for the getStartOfWeek function.
 */
describe('getStartOfWeek', () => {
  // Test case 1: Get the start date of the week starting on Sunday
  it('1. should return the start date of the week starting on Sunday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 17); // Previous Sunday
    const result: Date = getStartOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 2: Get the start date of the week starting on Monday
  it('2. should return the start date of the week starting on Monday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 18); // Previous Monday
    const result: Date = getStartOfWeek(date, 1);
    expectSameCalendarDay(result, expected);
  });

  // Test case 3: Get the start date of the week starting on Tuesday
  it('3. should return the start date of the week starting on Tuesday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 19); // Same day
    const result: Date = getStartOfWeek(date, 2);
    expectSameCalendarDay(result, expected);
  });

  // Test case 4: Get the start date of the week starting on Wednesday
  it('4. should return the start date of the week starting on Wednesday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 13); // Previous Wednesday
    const result: Date = getStartOfWeek(date, 3);
    expectSameCalendarDay(result, expected);
  });

  // Test case 5: Get the start date of the week starting on Thursday
  it('5. should return the start date of the week starting on Thursday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 14); // Previous Thursday
    const result: Date = getStartOfWeek(date, 4);
    expectSameCalendarDay(result, expected);
  });

  // Test case 6: Get the start date of the week starting on Friday
  it('6. should return the start date of the week starting on Friday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 15); // Previous Friday
    const result: Date = getStartOfWeek(date, 5);
    expectSameCalendarDay(result, expected);
  });

  // Test case 7: Get the start date of the week starting on Saturday
  it('7. should return the start date of the week starting on Saturday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 16); // Previous Saturday
    const result: Date = getStartOfWeek(date, 6);
    expectSameCalendarDay(result, expected);
  });

  // Test case 8: Get the start date of the week for a date with time components
  it('8. should return the start date of the week for a date with time components', () => {
    const date: Date = localDate(2023, 8, 19, 12, 34, 56); // Tuesday
    const expected: Date = localDate(2023, 8, 17, 0, 0, 0); // Previous Sunday
    const result: Date = getStartOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 9: Get the start date of the week for a date at the start of the year
  it('9. should return the start date of the week for a date at the start of the year', () => {
    const date: Date = localDate(2023, 0, 1); // Sunday
    const expected: Date = localDate(2023, 0, 1); // Same day
    const result: Date = getStartOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 10: Get the start date of the week for a date at the end of the year
  it('10. should return the start date of the week for a date at the end of the year', () => {
    const date: Date = localDate(2023, 11, 31); // Sunday
    const expected: Date = localDate(2023, 11, 31); // Same day
    const result: Date = getStartOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 11: Get the start date of the week for a date with zero time components
  it('11. should return the start date of the week for a date with zero time components', () => {
    const date: Date = localDate(2023, 8, 19, 0, 0, 0); // Tuesday
    const expected: Date = localDate(2023, 8, 17, 0, 0, 0); // Previous Sunday
    const result: Date = getStartOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 12: Get the start date of the week for a NaN date (should throw an error)
  it('12. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getStartOfWeek(date)).toThrow('Invalid date');
  });

  // Test case 13: Get the start date of the week for an invalid date (should throw an error)
  it('13. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getStartOfWeek(date)).toThrow('Invalid date');
  });

  // Test case 14: Get the start date of the week for an invalid startOfWeek value (should throw an error)
  it('14. should throw an error for an invalid startOfWeek value', () => {
    const date: Date = localDate(2023, 8, 19);
    expect(() => getStartOfWeek(date, 7)).toThrow(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });

  // Test case 15: Get the start date of the week for a NaN startOfWeek value (should throw an error)
  it('15. should throw an error for a NaN startOfWeek value', () => {
    const date: Date = localDate(2023, 8, 19);
    expect(() => getStartOfWeek(date, NaN)).toThrow(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });
});
