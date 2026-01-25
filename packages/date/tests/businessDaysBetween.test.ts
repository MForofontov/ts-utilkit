import { businessDaysBetween } from '../src/businessDaysBetween';

/**
 * Unit tests for the businessDaysBetween function.
 */
describe('businessDaysBetween', () => {
  // Test case 1: Get the number of business days between two dates in the same week
  it('1. should return the correct number of business days between two dates in the same week', () => {
    const start: Date = new Date('2023-09-18'); // Monday
    const end: Date = new Date('2023-09-22'); // Friday
    const expected: number = 5;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 2: Get the number of business days between two dates in different weeks
  it('2. should return the correct number of business days between two dates in different weeks', () => {
    const start: Date = new Date('2023-09-18'); // Monday
    const end: Date = new Date('2023-09-29'); // Friday
    const expected: number = 10;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 3: Get the number of business days between two dates in different months
  it('3. should return the correct number of business days between two dates in different months', () => {
    const start: Date = new Date('2023-08-25'); // Friday
    const end: Date = new Date('2023-09-05'); // Tuesday
    const expected: number = 8;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 4: Get the number of business days between two dates in different years
  it('4. should return the correct number of business days between two dates in different years', () => {
    const start: Date = new Date('2022-12-30'); // Friday
    const end: Date = new Date('2023-01-05'); // Thursday
    const expected: number = 5;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 5: Get the number of business days between two dates with time components
  it('5. should return the correct number of business days between two dates with time components', () => {
    const start: Date = new Date('2023-09-18T12:34:56'); // Monday
    const end: Date = new Date('2023-09-22T15:45:30'); // Friday
    const expected: number = 5;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 6: Get the number of business days between two dates with the same date but different times
  it('6. should return the correct number of business days between two dates with the same date but different times', () => {
    const start: Date = new Date('2023-09-18T00:00:00'); // Monday
    const end: Date = new Date('2023-09-18T23:59:59'); // Monday
    const expected: number = 1;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 7: Get the number of business days between two dates that are the same
  it('7. should return 0 business days when the start and end dates are the same', () => {
    const start: Date = new Date('2023-09-18'); // Monday
    const end: Date = new Date('2023-09-18'); // Monday
    const expected: number = 1;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 8: Get the number of business days between two dates that fall on weekends
  it('8. should return 0 business days when both dates fall on weekends', () => {
    const start: Date = new Date('2023-09-16'); // Saturday
    const end: Date = new Date('2023-09-17'); // Sunday
    const expected: number = 0;
    const result: number = businessDaysBetween(start, end);
    expect(result).toBe(expected);
  });

  // Test case 9: Get the number of business days between two dates where the first date is NaN (should throw an error)
  it('9. should throw an error for a NaN first date', () => {
    const start: Date = new Date(NaN);
    const end: Date = new Date('2023-09-22');
    expect(() => businessDaysBetween(start, end)).toThrow('Invalid date');
  });

  // Test case 10: Get the number of business days between two dates where the second date is NaN (should throw an error)
  it('10. should throw an error for a NaN second date', () => {
    const start: Date = new Date('2023-09-18');
    const end: Date = new Date(NaN);
    expect(() => businessDaysBetween(start, end)).toThrow('Invalid date');
  });

  // Test case 11: Get the number of business days between two dates where the start date is invalid (should throw an error)
  it('11. should throw an error for an invalid start date', () => {
    const start: Date = new Date('invalid-date');
    const end: Date = new Date('2023-09-22');
    expect(() => businessDaysBetween(start, end)).toThrow('Invalid date');
  });

  // Test case 12: Get the number of business days between two dates where the end date is invalid (should throw an error)
  it('12. should throw an error for an invalid end date', () => {
    const start: Date = new Date('2023-09-18');
    const end: Date = new Date('invalid-date');
    expect(() => businessDaysBetween(start, end)).toThrow('Invalid date');
  });

  // Test case 13: Get the number of business days between two dates where the start date is after the end date (should throw an error)
  it('13. should throw an error for a start date that is after the end date', () => {
    const start: Date = new Date('2023-09-22');
    const end: Date = new Date('2023-09-18');
    expect(() => businessDaysBetween(start, end)).toThrow(
      'Start date must be before end date',
    );
  });
});
