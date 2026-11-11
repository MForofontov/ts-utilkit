import { getWeekNumber } from '../src/getWeekNumber';
import { localDate } from './dateTestUtils';

/**
 * Unit tests for the getWeekNumber function.
 */
describe('getWeekNumber', () => {
  // Test case 1: Get the week number for a valid date
  it('1. should return the week number for a valid date', () => {
    const date: Date = localDate(2024, 8, 19);
    const expected: number = 38;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the week number for a leap year date
  it('2. should return the week number for a leap year date', () => {
    const date: Date = localDate(2020, 1, 29);
    const expected: number = 9;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the week number for a date with time components
  it('3. should return the week number for a date with time components', () => {
    const date: Date = localDate(2023, 0, 15, 12, 34, 56);
    const expected: number = 3;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the week number for a date at the start of the year
  it('4. should return the week number for a date at the start of the year', () => {
    const date: Date = localDate(2023, 0, 1);
    const expected: number = 1;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the week number for a date at the end of the year
  it('5. should return the week number for a date at the end of the year', () => {
    const date: Date = localDate(2023, 11, 31);
    const expected: number = 53;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the week number for a date with zero time components
  it('6. should return the week number for a date with zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 0, 0, 0);
    const expected: number = 1;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the week number for a date with a negative year
  it('7. should return the week number for a date with a negative year', () => {
    const date: Date = localDate(-1, 0, 1);
    const expected: number = 1;
    const result: number = getWeekNumber(date);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the week number for a NaN date (should throw an error)
  it('8. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getWeekNumber(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the week number for an invalid date (should throw an error)
  it('9. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getWeekNumber(date)).toThrow('Invalid date');
  });
});

it.each([0, 4, 42, 99])(
  'matches the Gregorian 400-year cycle for literal year %i',
  (year) => {
    for (let month = 0; month < 12; month++) {
      const input = new Date(2000, month, 15);
      input.setFullYear(year);
      const reference = new Date(year + 400, month, 15);
      const before = input.getTime();
      expect(getWeekNumber(input)).toBe(getWeekNumber(reference));
      expect(input.getTime()).toBe(before);
    }
  },
);

it('matches an independent UTC day-count oracle across a Gregorian cycle', () => {
  for (let year = 2000; year < 2400; year++) {
    const first = new Date(Date.UTC(year, 0, 1));
    for (let month = 0; month < 12; month++) {
      const input = new Date(year, month, 15, 12);
      const days = (Date.UTC(year, month, 15) - first.getTime()) / 86400000;
      expect(getWeekNumber(input)).toBe(
        Math.ceil((days + first.getUTCDay() + 1) / 7),
      );
    }
  }
});
