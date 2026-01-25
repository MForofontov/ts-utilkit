import { getDaysOfWeek } from '../src/getDaysOfWeek';

/**
 * Unit tests for the getDaysOfWeek function.
 */
describe('getDaysOfWeek', () => {
  // Test case 1: Verify the returned array contains the correct days of the week
  it('1. should return an array with the correct days of the week', () => {
    const expected: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const result: string[] = getDaysOfWeek();
    expect(result).toEqual(expected);
  });

  // Test case 2: Verify the returned array has a length of 7
  it('2. should return an array with a length of 7', () => {
    const result: string[] = getDaysOfWeek();
    expect(result.length).toBe(7);
  });

  // Test case 3: Verify the first day of the week is 'Sunday'
  it('3. should return "Sunday" as the first day of the week', () => {
    const result: string[] = getDaysOfWeek();
    expect(result[0]).toBe('Sunday');
  });

  // Test case 4: Verify the last day of the week is 'Saturday'
  it('4. should return "Saturday" as the last day of the week', () => {
    const result: string[] = getDaysOfWeek();
    expect(result[6]).toBe('Saturday');
  });

  // Test case 5: Verify the returned array contains 'Wednesday'
  it('5. should contain "Wednesday" in the array', () => {
    const result: string[] = getDaysOfWeek();
    expect(result).toContain('Wednesday');
  });

  // Test case 6: Verify the returned array does not contain 'Funday'
  it('6. should not contain "Funday" in the array', () => {
    const result: string[] = getDaysOfWeek();
    expect(result).not.toContain('Funday');
  });

  // Test case 7: Verify the function does not throw an error
  it('7. should not throw an error', () => {
    expect(() => getDaysOfWeek()).not.toThrow();
  });
});
