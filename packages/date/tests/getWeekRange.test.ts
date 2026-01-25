import { getWeekRange } from '../src/getWeekRange';

/**
 * Unit tests for the getWeekRange function.
 */
describe('getWeekRange', () => {
  // Test case 1: Get the week range for a date with the week starting on Sunday
  it('1. should return the correct week range for a date with the week starting on Sunday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 0; // Sunday
    const expected = {
      start: new Date('2023-09-17'),
      end: new Date('2023-09-23T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 2: Get the week range for a date with the week starting on Monday
  it('2. should return the correct week range for a date with the week starting on Monday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 1; // Monday
    const expected = {
      start: new Date('2023-09-18'),
      end: new Date('2023-09-24T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 3: Get the week range for a date with the week starting on Tuesday
  it('3. should return the correct week range for a date with the week starting on Tuesday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 2; // Tuesday
    const expected = {
      start: new Date('2023-09-19'),
      end: new Date('2023-09-25T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 4: Get the week range for a date with the week starting on Wednesday
  it('4. should return the correct week range for a date with the week starting on Wednesday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 3; // Wednesday
    const expected = {
      start: new Date('2023-09-13'),
      end: new Date('2023-09-19T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 5: Get the week range for a date with the week starting on Thursday
  it('5. should return the correct week range for a date with the week starting on Thursday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 4; // Thursday
    const expected = {
      start: new Date('2023-09-14'),
      end: new Date('2023-09-20T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 6: Get the week range for a date with the week starting on Friday
  it('6. should return the correct week range for a date with the week starting on Friday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 5; // Friday
    const expected = {
      start: new Date('2023-09-15'),
      end: new Date('2023-09-21T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 7: Get the week range for a date with the week starting on Saturday
  it('7. should return the correct week range for a date with the week starting on Saturday', () => {
    const date: Date = new Date('2023-09-19'); // Tuesday
    const startOfWeek: number = 6; // Saturday
    const expected = {
      start: new Date('2023-09-16'),
      end: new Date('2023-09-22T23:59:59.999Z'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 8: Get the week range for a date with time components
  it('8. should return the correct week range for a date with time components', () => {
    const date: Date = new Date('2023-09-19T12:34:56'); // Tuesday
    const startOfWeek: number = 0; // Sunday
    const expected = {
      start: new Date('2023-09-17T00:00:00'),
      end: new Date('2023-09-23T23:59:59.999'),
    };
    const result = getWeekRange(date, startOfWeek);
    expect(result).toEqual(expected);
  });

  // Test case 9: Get the week range for a NaN date (should throw an error)
  it('9. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    const startOfWeek: number = 0; // Sunday
    expect(() => getWeekRange(date, startOfWeek)).toThrow('Invalid date');
  });

  // Test case 10: Get the week range for an invalid date (should throw an error)
  it('10. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    const startOfWeek: number = 0; // Sunday
    expect(() => getWeekRange(date, startOfWeek)).toThrow('Invalid date');
  });

  // Test case 11: Get the week range for an invalid startOfWeek value (should throw an error)
  it('11. should throw an error for an invalid startOfWeek value', () => {
    const date: Date = new Date('2023-09-19');
    const startOfWeek: number = 7; // Invalid value
    expect(() => getWeekRange(date, startOfWeek)).toThrow(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });

  // Test case 12: Get the week range for a NaN startOfWeek value (should throw an error)
  it('12. should throw an error for a NaN startOfWeek value', () => {
    const date: Date = new Date('2023-09-19');
    const startOfWeek: number = NaN; // NaN value
    expect(() => getWeekRange(date, startOfWeek)).toThrow(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  });
});
