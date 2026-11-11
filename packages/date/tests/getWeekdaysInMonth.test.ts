import { getWeekdaysInMonth } from '../src/getWeekdaysInMonth';
import { localDate, expectSameCalendarDay } from './dateTestUtils';

/**
 * Unit tests for the getWeekdaysInMonth function.
 */
describe('getWeekdaysInMonth', () => {
  // Test case 1: Get the number of weekdays in January 2023
  it('1. should return the number of weekdays in January 2023', () => {
    const date: Date = localDate(2023, 0, 1);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the number of weekdays in February 2023 (non-leap year)
  it('2. should return the number of weekdays in February 2023 (non-leap year)', () => {
    const date: Date = localDate(2023, 1, 1);
    const expected: number = 20;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the number of weekdays in February 2024 (leap year)
  it('3. should return the number of weekdays in February 2024 (leap year)', () => {
    const date: Date = localDate(2024, 1, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the number of weekdays in April 2023
  it('4. should return the number of weekdays in April 2023', () => {
    const date: Date = localDate(2023, 3, 1);
    const expected: number = 20;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the number of weekdays in December 2023
  it('5. should return the number of weekdays in December 2023', () => {
    const date: Date = localDate(2023, 11, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the number of weekdays in a month with 30 days
  it('6. should return the number of weekdays in June 2023', () => {
    const date: Date = localDate(2023, 5, 1);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of weekdays in a month with 31 days
  it('7. should return the number of weekdays in July 2023', () => {
    const date: Date = localDate(2023, 6, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the number of weekdays in a month with zero time components
  it('8. should return the number of weekdays in January 2023 with zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 0, 0, 0);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 9: Get the number of weekdays in a month with non-zero time components
  it('9. should return the number of weekdays in January 2023 with non-zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 12, 34, 56);
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 10: Get the number of weekdays in a month with a negative year
  it('10. should return the number of weekdays in January -000001', () => {
    const date: Date = localDate(-1, 0, 1);
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 11: Get the number of weekdays in a month for a NaN date (should throw an error)
  it('11. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getWeekdaysInMonth(date)).toThrow('Invalid date');
  });

  // Test case 12: Get the number of weekdays in a month for an invalid date (should throw an error)
  it('12. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getWeekdaysInMonth(date)).toThrow('Invalid date');
  });
});
