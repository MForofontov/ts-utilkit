import { getPreviousMonth } from '../src/getPreviousMonth';

/**
 * Unit tests for the getPreviousMonth function.
 */
describe('getPreviousMonth', () => {
  // Test case 1: Get the same day of the previous month for a valid date
  it('1. should return the same day of the previous month for a valid date', () => {
    const date: Date = new Date('2023-09-19');
    const expected: Date = new Date('2023-08-19');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the same day of the previous month for a leap year date
  it('2. should return the same day of the previous month for a leap year date', () => {
    const date: Date = new Date('2020-03-29');
    const expected: Date = new Date('2020-02-29');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the same day of the previous month for a date with time components
  it('3. should return the same day of the previous month for a date with time components', () => {
    const date: Date = new Date('2023-01-15T12:34:56');
    const expected: Date = new Date('2022-12-15T12:34:56');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the same day of the previous month for a date at the start of the year
  it('4. should return the same day of the previous month for a date at the start of the year', () => {
    const date: Date = new Date('2023-01-01');
    const expected: Date = new Date('2022-12-01');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the same day of the previous month for a date at the end of the year
  it('5. should return the same day of the previous month for a date at the end of the year', () => {
    const date: Date = new Date('2023-12-31');
    const expected: Date = new Date('2023-11-30');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the same day of the previous month for a date with zero time components
  it('6. should return the same day of the previous month for a date with zero time components', () => {
    const date: Date = new Date('2023-01-01T00:00:00');
    const expected: Date = new Date('2022-12-01T00:00:00');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the same day of the previous month for a date with a negative year
  it('7. should return the same day of the previous month for a date with a negative year', () => {
    const date: Date = new Date('-000001-01-01');
    const expected: Date = new Date('-000002-12-01');
    const result: Date = getPreviousMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 8: Get the same day of the previous month for a NaN date (should throw an error)
  it('8. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getPreviousMonth(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the same day of the previous month for an invalid date (should throw an error)
  it('9. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getPreviousMonth(date)).toThrow('Invalid date');
  });
});
