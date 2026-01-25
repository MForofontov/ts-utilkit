import { toUTCDate } from '../src/toUTCDate';

/**
 * Unit tests for the toUTCDate function.
 */
describe('toUTCDate', () => {
  // Test case 1: Convert a local date to UTC
  it('1. should convert a local date to UTC', () => {
    const date: Date = new Date('2023-09-19T15:45:30');
    const expected: Date = new Date(Date.UTC(2023, 8, 19, 15, 45, 30));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 2: Convert a local date with time components to UTC
  it('2. should convert a local date with time components to UTC', () => {
    const date: Date = new Date('2023-09-19T12:34:56');
    const expected: Date = new Date(Date.UTC(2023, 8, 19, 12, 34, 56));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 3: Convert a local date at the end of the month to UTC
  it('3. should convert a local date at the end of the month to UTC', () => {
    const date: Date = new Date('2023-09-30T23:59:59');
    const expected: Date = new Date(Date.UTC(2023, 8, 30, 23, 59, 59));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 4: Convert a local date with zero time components to UTC
  it('4. should convert a local date with zero time components to UTC', () => {
    const date: Date = new Date('2023-09-19T00:00:00');
    const expected: Date = new Date(Date.UTC(2023, 8, 19, 0, 0, 0));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 5: Convert a local date from a leap year to UTC
  it('5. should convert a local date from a leap year to UTC', () => {
    const date: Date = new Date('2020-02-29T12:34:56');
    const expected: Date = new Date(Date.UTC(2020, 1, 29, 12, 34, 56));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 6: Convert a local date with a negative year to UTC
  it('6. should convert a local date with a negative year to UTC', () => {
    const date: Date = new Date('-000001-01-01T00:00:00');
    const expected: Date = new Date(Date.UTC(-1, 0, 1, 0, 0, 0));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 7: Convert a local date with only date components to UTC
  it('7. should convert a local date with only date components to UTC', () => {
    const date: Date = new Date('2023-09-19');
    const expected: Date = new Date(Date.UTC(2023, 8, 19, 0, 0, 0));
    const result: Date = toUTCDate(date);
    expect(result).toEqual(expected);
  });

  // Test case 8: Convert a NaN date to UTC (should throw an error)
  it('8. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => toUTCDate(date)).toThrow('Invalid date');
  });

  // Test case 9: Convert an invalid date to UTC (should throw an error)
  it('9. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => toUTCDate(date)).toThrow('Invalid date');
  });
});
