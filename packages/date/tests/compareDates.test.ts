import { compareDates } from '../src/compareDates';

/**
 * Unit tests for the compareDates function.
 */
describe('compareDates', () => {
  // Test case 1: Compare two dates where the first date is before the second date
  it('1. should return -1 if the first date is before the second date', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('2023-01-02');
    const expected: number = -1;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 2: Compare two dates where the first date is after the second date
  it('2. should return 1 if the first date is after the second date', () => {
    const date1: Date = new Date('2023-01-02');
    const date2: Date = new Date('2023-01-01');
    const expected: number = 1;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 3: Compare two dates that are the same
  it('3. should return 0 if the two dates are the same', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('2023-01-01');
    const expected: number = 0;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 4: Compare two dates with different times on the same day
  it('4. should return -1 if the first date is earlier on the same day', () => {
    const date1: Date = new Date('2023-01-01T10:00:00');
    const date2: Date = new Date('2023-01-01T12:00:00');
    const expected: number = -1;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 5: Compare two dates with different times on the same day
  it('5. should return 1 if the first date is later on the same day', () => {
    const date1: Date = new Date('2023-01-01T12:00:00');
    const date2: Date = new Date('2023-01-01T10:00:00');
    const expected: number = 1;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 6: Compare two dates with the first date being a leap day
  it('6. should return -1 if the first date is a leap day and before the second date', () => {
    const date1: Date = new Date('2020-02-29');
    const date2: Date = new Date('2020-03-01');
    const expected: number = -1;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 7: Compare two dates with the second date being a leap day
  it('7. should return -1 if the first date is before the second date which is a leap day', () => {
    const date1: Date = new Date('2020-02-28');
    const date2: Date = new Date('2020-02-29');
    const expected: number = -1;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 8: Compare two dates with different time zones
  it('8. should return 0 if the two dates are the same but in different time zones', () => {
    const date1: Date = new Date('2023-01-01T00:00:00Z'); // UTC
    const date2: Date = new Date('2022-12-31T19:00:00-05:00'); // EST (UTC-5)
    const expected: number = 0;
    const result: number = compareDates(date1, date2);
    expect(result).toBe(expected);
  });

  // Error test case 1: Compare two dates with invalid first date (should throw an error)
  it('8. should throw an error for an invalid first date', () => {
    const date1: Date = new Date('invalid-date');
    const date2: Date = new Date('2023-01-01');
    expect(() => compareDates(date1, date2)).toThrow('Invalid date');
  });

  // Error test case 2: Compare two dates with invalid second date (should throw an error)
  it('8. should throw an error for an invalid second date', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('invalid-date');
    expect(() => compareDates(date1, date2)).toThrow('Invalid date');
  });

  // Error test case 3: Compare two dates with NaN first date (should throw an error)
  it('8. should throw an error for a NaN first date', () => {
    const date1: Date = new Date(NaN);
    const date2: Date = new Date('2023-01-01');
    expect(() => compareDates(date1, date2)).toThrow('Invalid date');
  });

  // Error test case 4: Compare two dates with NaN second date (should throw an error)
  it('8. should throw an error for a NaN second date', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date(NaN);
    expect(() => compareDates(date1, date2)).toThrow('Invalid date');
  });
});
