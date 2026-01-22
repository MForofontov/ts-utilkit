import { getWeekdaysInMonth } from '../src/getWeekdaysInMonth';

/**
 * Unit tests for the getWeekdaysInMonth function.
 */
describe('getWeekdaysInMonth', () => {
  // Test case 1: Get the number of weekdays in January 2023
  it('1. should return the number of weekdays in January 2023', () => {
    const date: Date = new Date('2023-01-01');
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the number of weekdays in February 2023 (non-leap year)
  it('2. should return the number of weekdays in February 2023 (non-leap year)', () => {
    const date: Date = new Date('2023-02-01');
    const expected: number = 20;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the number of weekdays in February 2024 (leap year)
  it('3. should return the number of weekdays in February 2024 (leap year)', () => {
    const date: Date = new Date('2024-02-01');
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the number of weekdays in April 2023
  it('4. should return the number of weekdays in April 2023', () => {
    const date: Date = new Date('2023-04-01');
    const expected: number = 20;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the number of weekdays in December 2023
  it('5. should return the number of weekdays in December 2023', () => {
    const date: Date = new Date('2023-12-01');
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the number of weekdays in a month with 30 days
  it('6. should return the number of weekdays in June 2023', () => {
    const date: Date = new Date('2023-06-01');
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of weekdays in a month with 31 days
  it('7. should return the number of weekdays in July 2023', () => {
    const date: Date = new Date('2023-07-01');
    const expected: number = 21;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the number of weekdays in a month with zero time components
  it('8. should return the number of weekdays in January 2023 with zero time components', () => {
    const date: Date = new Date('2023-01-01T00:00:00');
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 9: Get the number of weekdays in a month with non-zero time components
  it('9. should return the number of weekdays in January 2023 with non-zero time components', () => {
    const date: Date = new Date('2023-01-01T12:34:56');
    const expected: number = 22;
    const result: number = getWeekdaysInMonth(date);
    expect(result).toBe(expected);
  });

  // Test case 10: Get the number of weekdays in a month with a negative year
  it('10. should return the number of weekdays in January -000001', () => {
    const date: Date = new Date('-000001-01-01');
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
