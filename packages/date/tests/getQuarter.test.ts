import { getQuarter } from '../src/getQuarter';
import { localDate, expectSameCalendarDay } from './dateTestUtils';

/**
 * Unit tests for the getQuarter function.
 */
describe('getQuarter', () => {
  // Test case 1: Get the quarter for a date in Q1
  it('1. should return 1 for a date in Q1', () => {
    const date: Date = localDate(2023, 0, 15);
    const expected: number = 1;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the quarter for a date in Q2
  it('2. should return 2 for a date in Q2', () => {
    const date: Date = localDate(2023, 3, 15);
    const expected: number = 2;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the quarter for a date in Q3
  it('3. should return 3 for a date in Q3', () => {
    const date: Date = localDate(2023, 6, 15);
    const expected: number = 3;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the quarter for a date in Q4
  it('4. should return 4 for a date in Q4', () => {
    const date: Date = localDate(2023, 9, 15);
    const expected: number = 4;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the quarter for a leap year date
  it('5. should return the correct quarter for a leap year date', () => {
    const date: Date = localDate(2020, 1, 29);
    const expected: number = 1;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the quarter for a date with time components
  it('6. should return the correct quarter for a date with time components', () => {
    const date: Date = localDate(2023, 0, 15, 12, 34, 56);
    const expected: number = 1;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the quarter for a date at the start of the year
  it('7. should return the correct quarter for a date at the start of the year', () => {
    const date: Date = localDate(2023, 0, 1);
    const expected: number = 1;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the quarter for a date at the end of the year
  it('8. should return the correct quarter for a date at the end of the year', () => {
    const date: Date = localDate(2023, 11, 31);
    const expected: number = 4;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 9: Get the quarter for a date with zero time components
  it('9. should return the correct quarter for a date with zero time components', () => {
    const date: Date = localDate(2023, 0, 1, 0, 0, 0);
    const expected: number = 1;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 10: Get the quarter for a date with a negative year
  it('10. should return the correct quarter for a date with a negative year', () => {
    const date: Date = localDate(-1, 0, 1);
    const expected: number = 1;
    const result: number = getQuarter(date);
    expect(result).toBe(expected);
  });

  // Test case 11: Get the quarter for a NaN date (should throw an error)
  it('11. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getQuarter(date)).toThrow('Invalid date');
  });

  // Test case 12: Get the quarter for an invalid date (should throw an error)
  it('12. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getQuarter(date)).toThrow('Invalid date');
  });
});
