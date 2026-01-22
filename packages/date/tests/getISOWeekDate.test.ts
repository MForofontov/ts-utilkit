import { getISOWeekDate } from '../src/getISOWeekDate';

/**
 * Unit tests for the getISOWeekDate function.
 */
describe('getISOWeekDate', () => {
  // Test case 1: Get the ISO week date for a valid date
  it('1. should return the ISO week date for a valid date', () => {
    const date: Date = new Date('2024-09-19');
    const expected: string = '2024-W38-4';
    const result: string = getISOWeekDate(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the ISO week date for a leap year date
  it('2. should return the ISO week date for a leap year date', () => {
    const date: Date = new Date('2020-02-29');
    const expected: string = '2020-W09-6';
    const result: string = getISOWeekDate(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the ISO week date for a date with time components
  it('3. should return the ISO week date for a date with time components', () => {
    const date: Date = new Date('2023-01-01T12:34:56');
    const expected: string = '2022-W52-7';
    const result: string = getISOWeekDate(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the ISO week date for a date at the start of the year
  it('4. should return the ISO week date for a date at the start of the year', () => {
    const date: Date = new Date('2023-01-01');
    const expected: string = '2022-W52-7';
    const result: string = getISOWeekDate(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the ISO week date for a date at the end of the year
  it('5. should return the ISO week date for a date at the end of the year', () => {
    const date: Date = new Date('2023-12-31');
    const expected: string = '2023-W52-7';
    const result: string = getISOWeekDate(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the ISO week date for a date with zero time components
  it('6. should return the ISO week date for a date with zero time components', () => {
    const date: Date = new Date('2023-01-01T00:00:00');
    const expected: string = '2022-W52-7';
    const result: string = getISOWeekDate(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the ISO week date for a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getISOWeekDate(date)).toThrow('Invalid date');
  });

  // Test case 8: Get the ISO week date for an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getISOWeekDate(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the ISO week date for a date with a negative year
  it('9. should return the ISO week date for a date with a negative year', () => {
    const date: Date = new Date('-000001-01-01');
    expect(() => getISOWeekDate(date)).toThrow(
      'Negative years are not supported',
    );
  });
});
