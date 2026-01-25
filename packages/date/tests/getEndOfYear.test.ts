import { getEndOfYear } from '../src/getEndOfYear';

/**
 * Unit tests for the getEndOfYear function.
 */
describe('getEndOfYear', () => {
  // Test case 1: Get the end date of the year for a valid date
  it('1. should return the end date of the year for a valid date', () => {
    const date: Date = new Date('2024-09-19');
    const expected: Date = new Date('2024-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the end date of the year for a leap year
  it('2. should return the end date of the year for a leap year', () => {
    const date: Date = new Date('2020-02-29');
    const expected: Date = new Date('2020-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the end date of the year for a date with time components
  it('3. should return the end date of the year for a date with time components', () => {
    const date: Date = new Date('2023-01-01T12:34:56');
    const expected: Date = new Date('2023-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the end date of the year for a date at the start of the year
  it('4. should return the end date of the year for a date at the start of the year', () => {
    const date: Date = new Date('2023-01-01');
    const expected: Date = new Date('2023-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the end date of the year for a date at the end of the year
  it('5. should return the end date of the year for a date at the end of the year', () => {
    const date: Date = new Date('2023-12-31');
    const expected: Date = new Date('2023-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the end date of the year for a date with zero time components
  it('6. should return the end date of the year for a date with zero time components', () => {
    const date: Date = new Date('2023-01-01T00:00:00');
    const expected: Date = new Date('2023-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the end date of the year for a date with a negative year
  it('7. should return the end date of the year for a date with a negative year', () => {
    const date: Date = new Date('-000001-01-01');
    const expected: Date = new Date('-000001-12-31');
    const result: Date = getEndOfYear(date);
    expect(result).toEqual(expected);
  });

  // Test case 8: Get the end date of the year for a NaN date (should throw an error)
  it('8. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getEndOfYear(date)).toThrow('Invalid date');
  });

  // Test case 9: Get the end date of the year for an invalid date (should throw an error)
  it('9. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getEndOfYear(date)).toThrow('Invalid date');
  });
});
