import { isWeekend } from '../src/isWeekend';

/**
 * Unit tests for the isWeekend function.
 */
describe('isWeekend', () => {
  // Test case 1: Check if a Saturday is recognized as a weekend
  it('1. should return true for a Saturday', () => {
    const date: Date = new Date('2023-09-23'); // Saturday
    const expected: boolean = true;
    const result: boolean = isWeekend(date);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a Sunday is recognized as a weekend
  it('2. should return true for a Sunday', () => {
    const date: Date = new Date('2023-09-24'); // Sunday
    const expected: boolean = true;
    const result: boolean = isWeekend(date);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a Monday is not recognized as a weekend
  it('3. should return false for a Monday', () => {
    const date: Date = new Date('2023-09-25'); // Monday
    const expected: boolean = false;
    const result: boolean = isWeekend(date);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a date with time components on a Saturday is recognized as a weekend
  it('4. should return true for a Saturday with time components', () => {
    const date: Date = new Date('2023-09-23T12:34:56'); // Saturday
    const expected: boolean = true;
    const result: boolean = isWeekend(date);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a date with time components on a Sunday is recognized as a weekend
  it('5. should return true for a Sunday with time components', () => {
    const date: Date = new Date('2023-09-24T12:34:56'); // Sunday
    const expected: boolean = true;
    const result: boolean = isWeekend(date);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a date with time components on a Monday is not recognized as a weekend
  it('6. should return false for a Monday with time components', () => {
    const date: Date = new Date('2023-09-25T12:34:56'); // Monday
    const expected: boolean = false;
    const result: boolean = isWeekend(date);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a NaN date (should throw an error)
  it('7. should throw an error for a NaN date', () => {
    const date: Date = new Date(NaN);
    expect(() => isWeekend(date)).toThrow('Invalid date');
  });

  // Test case 8: Check if an invalid date (should throw an error)
  it('8. should throw an error for an invalid date', () => {
    const date: Date = new Date('invalid-date');
    expect(() => isWeekend(date)).toThrow('Invalid date');
  });
});
