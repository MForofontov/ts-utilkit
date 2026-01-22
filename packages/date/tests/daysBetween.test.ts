import { daysBetween } from '../src/daysBetween';

/**
 * Unit tests for the daysBetween function.
 */
describe('daysBetween', () => {
  // Test case 1: Days between two dates where the first date is before the second date
  it('1. should return the correct number of days when the first date is before the second date', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('2023-01-10');
    const expected: number = 9;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 2: Days between two dates that are the same
  it('2. should return 0 when the two dates are the same', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('2023-01-01');
    const expected: number = 0;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 3: Days between two dates spanning multiple months
  it('3. should return the correct number of days spanning multiple months', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('2023-03-01');
    const expected: number = 59;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 4: Days between two dates spanning multiple years
  it('4. should return the correct number of days spanning multiple years', () => {
    const date1: Date = new Date('2022-12-01');
    const date2: Date = new Date('2023-01-31');
    const expected: number = 61;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 5: Days between two dates with the first date being a leap day
  it('5. should return the correct number of days when the first date is a leap day', () => {
    const date1: Date = new Date('2020-02-29');
    const date2: Date = new Date('2020-03-01');
    const expected: number = 1;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 6: Days between two dates with the second date being a leap day
  it('6. should return the correct number of days when the second date is a leap day', () => {
    const date1: Date = new Date('2020-02-28');
    const date2: Date = new Date('2020-02-29');
    const expected: number = 1;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of days between two dates with time components
  it('7. should return the correct number of days between two dates with time components', () => {
    const date1: Date = new Date('2023-09-01T12:34:56');
    const date2: Date = new Date('2023-09-10T15:45:30');
    const expected: number = 9;
    const result: number = daysBetween(date1, date2);
    expect(result).toBe(expected);
  });

  // Test case 8: Days between two dates where the first date is after the second date (should throw an error)
  it('8. should throw an error when the first date is after the second date', () => {
    const date1: Date = new Date('2023-01-10');
    const date2: Date = new Date('2023-01-01');
    expect(() => daysBetween(date1, date2)).toThrow(
      'The first date must be earlier than the second date',
    );
  });

  // Test case 9: Days between two dates with invalid first date (should throw an error)
  it('9. should throw an error for an invalid first date', () => {
    const date1: Date = new Date('invalid-date');
    const date2: Date = new Date('2023-01-01');
    expect(() => daysBetween(date1, date2)).toThrow('Invalid date');
  });

  // Test case 10: Days between two dates with invalid second date (should throw an error)
  it('10. should throw an error for an invalid second date', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date('invalid-date');
    expect(() => daysBetween(date1, date2)).toThrow('Invalid date');
  });

  // Test case 11: Days between two dates with NaN first date (should throw an error)
  it('11. should throw an error for a NaN first date', () => {
    const date1: Date = new Date(NaN);
    const date2: Date = new Date('2023-01-01');
    expect(() => daysBetween(date1, date2)).toThrow('Invalid date');
  });

  // Test case 12: Days between two dates with NaN second date (should throw an error)
  it('12. should throw an error for a NaN second date', () => {
    const date1: Date = new Date('2023-01-01');
    const date2: Date = new Date(NaN);
    expect(() => daysBetween(date1, date2)).toThrow('Invalid date');
  });
});
