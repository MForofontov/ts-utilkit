import { getDaysInMonth } from '../src/getDaysInMonth';

/**
 * Unit tests for the getDaysInMonth function.
 */
describe('getDaysInMonth', () => {
  // Test case 1: Get the number of days in January (31 days)
  it('1. should return 31 for January', () => {
    const date: Date = new Date('2023-01-01');
    const expected: number = 31;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the number of days in February (28 days in a non-leap year)
  it('2. should return 28 for February in a non-leap year', () => {
    const date: Date = new Date('2023-02-01');
    const expected: number = 28;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the number of days in February (29 days in a leap year)
  it('3. should return 29 for February in a leap year', () => {
    const date: Date = new Date('2024-02-01');
    const expected: number = 29;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the number of days in April (30 days)
  it('4. should return 30 for April', () => {
    const date: Date = new Date('2023-04-01');
    const expected: number = 30;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the number of days in December (31 days)
  it('5. should return 31 for December', () => {
    const date: Date = new Date('2023-12-01');
    const expected: number = 31;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the number of days in a month with 30 days
  it('6. should return 30 for June', () => {
    const date: Date = new Date('2023-06-01');
    const expected: number = 30;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of days in a month with time components
  it('7. should return the correct number of days for a date with time components', () => {
    const date: Date = new Date('2023-01-15T12:34:56');
    const expected: number = 31;
    const result: number = getDaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Error test case 1: Get the number of days in a month for a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getDaysInMonth(date)).toThrow('Invalid date');
  });

  // Error test case 2: Get the number of days in a month for an invalid date (should throw an error)
  it('7. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getDaysInMonth(date)).toThrow('Invalid date');
  });
});
