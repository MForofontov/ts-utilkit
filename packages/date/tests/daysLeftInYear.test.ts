import { daysLeftInYear } from '../src/daysLeftInYear';

/**
 * Unit tests for the daysLeftInYear function.
 */
describe('daysLeftInYear', () => {
  // Test case 1: Get the number of days left in the year for a date in January
  it('1. should return the correct number of days left in the year for a date in January', () => {
    const date: Date = new Date('2023-01-01');
    const expected: number = 364; // 2023 is not a leap year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the number of days left in the year for a date in February (non-leap year)
  it('2. should return the correct number of days left in the year for a date in February (non-leap year)', () => {
    const date: Date = new Date('2023-02-01');
    const expected: number = 333; // 2023 is not a leap year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the number of days left in the year for a date in February (leap year)
  it('3. should return the correct number of days left in the year for a date in February (leap year)', () => {
    const date: Date = new Date('2024-02-01');
    const expected: number = 334; // 2024 is a leap year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the number of days left in the year for a date in December
  it('4. should return the correct number of days left in the year for a date in December', () => {
    const date: Date = new Date('2023-12-01');
    const expected: number = 30; // 2023 is not a leap year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the number of days left in the year for a date with time components
  it('5. should return the correct number of days left in the year for a date with time components', () => {
    const date: Date = new Date('2023-09-19T12:34:56');
    const expected: number = 103; // 2023 is not a leap year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the number of days left in the year for a date at the end of the year
  it('6. should return the correct number of days left in the year for a date at the end of the year', () => {
    const date: Date = new Date('2023-12-31');
    const expected: number = 0; // Last day of the year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of days left in the year for a date at the start of the year
  it('7. should return the correct number of days left in the year for a date at the start of the year', () => {
    const date: Date = new Date('2023-01-01');
    const expected: number = 364; // 2023 is not a leap year
    const result: number = daysLeftInYear(date);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the number of days left in the year for an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => daysLeftInYear(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the number of days left in the year for a NaN date (should throw an error)
  it('9. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => daysLeftInYear(date)).toThrow('Invalid date');
  });
});
