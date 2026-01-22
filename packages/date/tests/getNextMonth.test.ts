import { getNextMonth } from '../src/getNextMonth';

/**
 * Unit tests for the getNextMonth function.
 */
describe('getNextMonth', () => {
  // Test case 1: Get the same day of the next month for a valid date
  it('1. should return the same day of the next month for a valid date', () => {
    const date: Date = new Date('2023-09-19');
    const expected: Date = new Date('2023-10-19');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the same day of the next month for a leap year date
  it('2. should return the same day of the next month for a leap year date', () => {
    const date: Date = new Date('2020-02-29');
    const expected: Date = new Date('2020-03-29');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the same day of the next month for a date with time components
  it('3. should return the same day of the next month for a date with time components', () => {
    const date: Date = new Date('2023-01-15T12:34:56');
    const expected: Date = new Date('2023-02-15T12:34:56');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the same day of the next month for a date at the start of the year
  it('4. should return the same day of the next month for a date at the start of the year', () => {
    const date: Date = new Date('2023-01-01');
    const expected: Date = new Date('2023-02-01');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the same day of the next month for a date at the end of the year
  it('5. should return the same day of the next month for a date at the end of the year', () => {
    const date: Date = new Date('2023-12-31');
    const expected: Date = new Date('2024-01-31');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the same day of the next month for a date with zero time components
  it('6. should return the same day of the next month for a date with zero time components', () => {
    const date: Date = new Date('2023-01-01T00:00:00');
    const expected: Date = new Date('2023-02-01T00:00:00');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the same day of the next month for a date with a negative year
  it('7. should return the same day of the next month for a date with a negative year', () => {
    const date: Date = new Date('-000001-01-01');
    const expected: Date = new Date('-000001-02-01');
    const result: Date = getNextMonth(date);
    expect(result).toEqual(expected);
  });

  // Test case 8: Get the same day of the next month for a NaN date (should throw an error)
  it('8. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getNextMonth(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the same day of the next month for an invalid date (should throw an error)
  it('9. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getNextMonth(date)).toThrow('Invalid date');
  });
});
