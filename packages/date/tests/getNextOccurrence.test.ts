import { getNextOccurrence } from '../src/getNextOccurrence';

/**
 * Unit tests for the getNextOccurrence function.
 */
describe('getNextOccurrence', () => {
  // Test case 1: Get the next occurrence of Monday from a valid date
  it('1. should return the next occurrence of Monday from a valid date', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const expected: Date = new Date('2023-09-25'); // Next Monday
    const result: Date = getNextOccurrence(date, 1);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the next occurrence of Sunday from a valid date
  it('2. should return the next occurrence of Sunday from a valid date', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const expected: Date = new Date('2023-09-24'); // Next Sunday
    const result: Date = getNextOccurrence(date, 0);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the next occurrence of the same day
  it('3. should return the next occurrence of the same day', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const expected: Date = new Date('2023-09-26'); // Next Tuesday
    const result: Date = getNextOccurrence(date, 2);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the next occurrence of a day with time components
  it('4. should return the next occurrence of a day with time components', () => {
    const date: Date = new Date('2023-09-19T12:34:56'); // Tuesday
    const expected: Date = new Date('2023-09-25T12:34:56'); // Next Monday
    const result: Date = getNextOccurrence(date, 1);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the next occurrence of a day at the start of the year
  it('5. should return the next occurrence of a day at the start of the year', () => {
    const date: Date = new Date('2023-01-01'); // Sunday
    const expected: Date = new Date('2023-01-02'); // Next Monday
    const result: Date = getNextOccurrence(date, 1);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the next occurrence of a day at the end of the year
  it('6. should return the next occurrence of a day at the end of the year', () => {
    const date: Date = new Date('2023-12-31'); // Sunday
    const expected: Date = new Date('2024-01-01'); // Next Monday
    const result: Date = getNextOccurrence(date, 1);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the next occurrence of a day with zero time components
  it('7. should return the next occurrence of a day with zero time components', () => {
    const date: Date = new Date('2023-09-19T00:00:00'); // Tuesday
    const expected: Date = new Date('2023-09-25T00:00:00'); // Next Monday
    const result: Date = getNextOccurrence(date, 1);
    expect(result).toEqual(expected);
  });

  // Test case 8: Get the next occurrence of a day with a negative year
  it('8. should return the next occurrence of a day with a negative year', () => {
    const date: Date = new Date('-000001-01-01'); // Saturday
    const expected: Date = new Date('-000001-01-04'); // Next Monday
    const result: Date = getNextOccurrence(date, 1);
    expect(result).toEqual(expected);
  });

  // Test case 9: Get the next occurrence of a day for a NaN date (should throw an error)
  it('9. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => getNextOccurrence(date, 1)).toThrow('Invalid date');
  });

  // Test case 10: Get the next occurrence of a day for an invalid date (should throw an error)
  it('10. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => getNextOccurrence(date, 1)).toThrow('Invalid date');
  });

  // Test case 11: Get the next occurrence of a day for an invalid day value (should throw an error)
  it('11. should throw an error for an invalid day value', () => {
    const date: Date = new Date('2023-09-19');
    expect(() => getNextOccurrence(date, 7)).toThrow(
      'Invalid dayOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });

  // Test case 12: Get the next occurrence of a day for a NaN day value (should throw an error)
  it('12. should throw an error for a NaN day value', () => {
    const date: Date = new Date('2023-09-19');
    expect(() => getNextOccurrence(date, NaN)).toThrow(
      'Invalid dayOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });
});
