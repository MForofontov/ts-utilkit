import { isToday } from '../src/isToday';

/**
 * Unit tests for the isToday function.
 */
describe('isToday', () => {
  // Test case 1: Check if today's date is recognized as today
  it("1. should return true for today's date", () => {
    const date: Date = new Date();
    const expected: boolean = true;
    const result: boolean = isToday(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if yesterday's date is not recognized as today
  it("2. should return false for yesterday's date", () => {
    const date: Date = new Date();
    date.setDate(date.getDate() - 1);
    const expected: boolean = false;
    const result: boolean = isToday(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if tomorrow's date is not recognized as today
  it("3. should return false for tomorrow's date", () => {
    const date: Date = new Date();
    date.setDate(date.getDate() + 1);
    const expected: boolean = false;
    const result: boolean = isToday(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a date with time components is recognized as today
  it("4. should return true for today's date with time components", () => {
    const date: Date = new Date();
    date.setHours(12, 34, 56);
    const expected: boolean = true;
    const result: boolean = isToday(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a date from a different year is not recognized as today
  it('5. should return false for a date from a different year', () => {
    const date: Date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const expected: boolean = false;
    const result: boolean = isToday(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a date from a different month is not recognized as today
  it('6. should return false for a date from a different month', () => {
    const date: Date = new Date();
    date.setMonth(date.getMonth() - 1);
    const expected: boolean = false;
    const result: boolean = isToday(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => isToday(date)).toThrow('Invalid date');
  });

  // Test case 8: Check if an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => isToday(date)).toThrow('Invalid date');
  });
});
