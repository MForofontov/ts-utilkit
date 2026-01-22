import { oneWeekAgo } from '../src/oneWeekAgo';

/**
 * Unit tests for the oneWeekAgo function.
 */
describe('oneWeekAgo', () => {
  // Test case 1: Get the date one week ago from today
  it('1. should return the date one week ago from today', () => {
    const date: Date = new Date();
    const expected: Date = new Date(date);
    expected.setDate(date.getDate() - 7);
    const result: Date = oneWeekAgo(date);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the date one week ago from a specific date
  it('2. should return the date one week ago from a specific date', () => {
    const date: Date = new Date('2023-09-19');
    const expected: Date = new Date('2023-09-12');
    const result: Date = oneWeekAgo(date);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the date one week ago from a leap year date
  it('3. should return the date one week ago from a leap year date', () => {
    const date: Date = new Date('2020-02-29');
    const expected: Date = new Date('2020-02-22');
    const result: Date = oneWeekAgo(date);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the date one week ago from a date with time components
  it('4. should return the date one week ago from a date with time components', () => {
    const date: Date = new Date('2023-09-19T12:34:56');
    const expected: Date = new Date('2023-09-12T12:34:56');
    const result: Date = oneWeekAgo(date);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the date one week ago from a date at the end of the month
  it('5. should return the date one week ago from a date at the end of the month', () => {
    const date: Date = new Date('2023-09-30');
    const expected: Date = new Date('2023-09-23');
    const result: Date = oneWeekAgo(date);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the date one week ago from a date with zero time components
  it('6. should return the date one week ago from a date with zero time components', () => {
    const date: Date = new Date('2023-09-19T00:00:00');
    const expected: Date = new Date('2023-09-12T00:00:00');
    const result: Date = oneWeekAgo(date);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the date one week ago from a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => oneWeekAgo(date)).toThrow('Invalid date');
  });

  // Test case 8: Get the date one week ago from an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => oneWeekAgo(date)).toThrow('Invalid date');
  });
});
