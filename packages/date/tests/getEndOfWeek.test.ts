import { getEndOfWeek } from '../src/getEndOfWeek';
import { localDate, expectSameCalendarDay } from './dateTestUtils';

/**
 * Unit tests for the getEndOfWeek function.
 */
describe('getEndOfWeek', () => {
  // Test case 1: Get the end date of the week starting on Sunday
  it('1. should return the end date of the week starting on Sunday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 23, 23, 59, 59); // Next Saturday
    const result: Date = getEndOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 2: Get the end date of the week starting on Monday
  it('2. should return the end date of the week starting on Monday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 24, 23, 59, 59); // Next Sunday
    const result: Date = getEndOfWeek(date, 1);
    expectSameCalendarDay(result, expected);
  });

  // Test case 3: Get the end date of the week starting on Tuesday
  it('3. should return the end date of the week starting on Tuesday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 25, 23, 59, 59); // Next Monday
    const result: Date = getEndOfWeek(date, 2);
    expectSameCalendarDay(result, expected);
  });

  // Test case 4: Get the end date of the week starting on Wednesday
  it('4. should return the end date of the week starting on Wednesday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 19, 23, 59, 59); // Next Tuesday
    const result: Date = getEndOfWeek(date, 3);
    expectSameCalendarDay(result, expected);
  });

  // Test case 5: Get the end date of the week starting on Thursday
  it('5. should return the end date of the week starting on Thursday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 20, 23, 59, 59); // Next Wednesday
    const result: Date = getEndOfWeek(date, 4);
    expectSameCalendarDay(result, expected);
  });

  // Test case 6: Get the end date of the week starting on Friday
  it('6. should return the end date of the week starting on Friday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 21, 23, 59, 59); // Next Thursday
    const result: Date = getEndOfWeek(date, 5);
    expectSameCalendarDay(result, expected);
  });

  // Test case 7: Get the end date of the week starting on Saturday
  it('7. should return the end date of the week starting on Saturday', () => {
    const date: Date = localDate(2023, 8, 19); // Tuesday
    const expected: Date = localDate(2023, 8, 22, 23, 59, 59); // Next Friday
    const result: Date = getEndOfWeek(date, 6);
    expectSameCalendarDay(result, expected);
  });

  // Test case 8: Get the end date of the week for a date with time components
  it('8. should return the end date of the week for a date with time components', () => {
    const date: Date = localDate(2023, 8, 19, 12, 34, 56); // Tuesday
    const expected: Date = localDate(2023, 8, 23, 23, 59, 59); // Next Saturday
    const result: Date = getEndOfWeek(date, 0);
    expectSameCalendarDay(result, expected);
  });

  // Test case 9: Get the end date of the week for a NaN date (should throw an error)
  it('9. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getEndOfWeek(date)).toThrow('Invalid date');
  });

  // Test case 10: Get the end date of the week for an invalid date (should throw an error)
  it('10. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getEndOfWeek(date)).toThrow('Invalid date');
  });

  // Test case 11: Get the end date of the week for an invalid startOfWeek value (should throw an error)
  it('11. should throw an error for an invalid startOfWeek value', () => {
    const date: Date = localDate(2023, 8, 19);
    expect(() => getEndOfWeek(date, 7)).toThrow(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });

  // Test case 12: Get the end date of the week for a NaN startOfWeek value (should throw an error)
  it('12. should throw an error for a NaN startOfWeek value', () => {
    const date: Date = localDate(2023, 8, 19);
    expect(() => getEndOfWeek(date, NaN)).toThrow(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });
});
