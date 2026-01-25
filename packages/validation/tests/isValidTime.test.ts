import { isValidTime } from '../src/isValidTime';

/**
 * Unit tests for the isValidTime function.
 */
describe('isValidTime', () => {
  // Test case 1: Valid 24-hour format times
  it('1. should return true for valid 24-hour format times', () => {
    expect(isValidTime('14:30')).toBe(true);
    expect(isValidTime('14:30:45')).toBe(true);
    expect(isValidTime('00:00')).toBe(true);
    expect(isValidTime('23:59:59')).toBe(true);
    expect(isValidTime('9:05')).toBe(true);
    expect(isValidTime('09:05:00')).toBe(true);
  });

  // Test case 2: Invalid 24-hour format times
  it('2. should return false for invalid 24-hour format times', () => {
    expect(isValidTime('25:00')).toBe(false);
    expect(isValidTime('14:60')).toBe(false);
    expect(isValidTime('14:30:60')).toBe(false);
    expect(isValidTime('14:30:45', false)).toBe(false);
    expect(isValidTime('24:00')).toBe(false);
    expect(isValidTime('14')).toBe(false);
  });

  // Test case 3: Valid 12-hour format times
  it('3. should return true for valid 12-hour format times', () => {
    expect(isValidTime('2:30 PM', true, false)).toBe(true);
    expect(isValidTime('12:30:45 AM', true, false)).toBe(true);
    expect(isValidTime('11:59 PM', true, false)).toBe(true);
    expect(isValidTime('1:00 AM', true, false)).toBe(true);
  });

  // Test case 4: Invalid 12-hour format times
  it('4. should return false for invalid 12-hour format times', () => {
    expect(isValidTime('2:30', true, false)).toBe(false);
    expect(isValidTime('13:30 PM', true, false)).toBe(false);
    expect(isValidTime('0:30 AM', true, false)).toBe(false);
    expect(isValidTime('12:60 PM', true, false)).toBe(false);
  });

  // Test case 5: Performance with various time strings
  it('5. should validate time strings efficiently', () => {
    const timeStrings = ['14:30', '25:00', '2:30 PM', '12:30:45 AM', 'invalid'];

    const startTime = performance.now();
    const results = timeStrings.map((time, index) => {
      if (index === 2 || index === 3) {
        return isValidTime(time, true, false);
      }
      return isValidTime(time);
    });
    const endTime = performance.now();

    expect(results).toEqual([true, false, true, true, false]);
    expect(endTime - startTime).toBeLessThan(10);
  });

  // Test case 6: Allow seconds parameter validation
  it('6. should enforce allowSeconds parameter correctly', () => {
    // 24-hour format with seconds when not allowed
    expect(isValidTime('14:30:45', false)).toBe(false);
    expect(isValidTime('14:30:45:12', false)).toBe(false); // Extra colon

    // 12-hour format with seconds when not allowed
    expect(isValidTime('2:30:45 PM', false, false)).toBe(false);
    expect(isValidTime('2:30:45:12 PM', false, false)).toBe(false); // Extra colon
  });

  // Test case 7: Test 12-hour validation boundaries
  it('7. should validate 12-hour format hour boundaries', () => {
    // Hour < 1 is invalid
    expect(isValidTime('0:30 AM', true, false)).toBe(false);

    // Hour > 12 is invalid
    expect(isValidTime('13:30 PM', true, false)).toBe(false);
    expect(isValidTime('15:30 AM', true, false)).toBe(false);
  });

  // Test case 8: Test minute validation
  it('8. should validate minute boundaries', () => {
    // Minute > 59 in 24-hour format
    expect(isValidTime('14:60')).toBe(false);
    expect(isValidTime('14:65')).toBe(false);

    // Minute > 59 in 12-hour format
    expect(isValidTime('2:60 PM', true, false)).toBe(false);
  });

  // Test case 9: Test second validation
  it('9. should validate second boundaries', () => {
    // Second > 59 in 24-hour format
    expect(isValidTime('14:30:60')).toBe(false);
    expect(isValidTime('14:30:65')).toBe(false);

    // Second > 59 in 12-hour format
    expect(isValidTime('2:30:60 PM', true, false)).toBe(false);
  });

  // Test case 10: Test 24-hour format hour validation
  it('10. should validate 24-hour format hour boundaries', () => {
    // Hour >= 24 should be invalid
    expect(isValidTime('24:00')).toBe(false);
    expect(isValidTime('25:30')).toBe(false);

    // Hour < 0 would be caught by regex but test edge
    expect(isValidTime('23:59')).toBe(true);
    expect(isValidTime('00:00')).toBe(true);
  });

  // Test case 11: Test with whitespace
  it('11. should handle strings with whitespace', () => {
    expect(isValidTime('  14:30  ')).toBe(true);
    expect(isValidTime('  2:30 PM  ', true, false)).toBe(true);
  });

  // Test case 12: TypeError for invalid input types
  it('12. should throw TypeError for invalid timeString type', () => {
    expect(() => isValidTime(123 as unknown as string)).toThrow(TypeError);
    expect(() => isValidTime(123 as unknown as string)).toThrow(
      'timeString must be a string',
    );
  });

  // Test case 13: TypeError for invalid allowSeconds type
  it('13. should throw TypeError for invalid allowSeconds type', () => {
    expect(() => isValidTime('14:30', 'true' as unknown as boolean)).toThrow(
      TypeError,
    );
    expect(() => isValidTime('14:30', 'true' as unknown as boolean)).toThrow(
      'allowSeconds must be a boolean',
    );
  });

  // Test case 14: TypeError for invalid format24Hour type
  it('14. should throw TypeError for invalid format24Hour type', () => {
    expect(() =>
      isValidTime('14:30', true, 'true' as unknown as boolean),
    ).toThrow(TypeError);
    expect(() =>
      isValidTime('14:30', true, 'true' as unknown as boolean),
    ).toThrow('format24Hour must be a boolean');
  });

  // Test case 15: Edge cases for hour validation in 24-hour format
  it('15. should validate edge cases for 24-hour format hours', () => {
    // Test boundary values
    expect(isValidTime('0:00')).toBe(true);
    expect(isValidTime('23:59')).toBe(true);

    // These should be caught by regex but test anyway
    expect(isValidTime('-1:00')).toBe(false);
    expect(isValidTime('24:00')).toBe(false);
  });

  // Test case 16: Edge cases for minute validation
  it('16. should validate edge cases for minutes', () => {
    expect(isValidTime('14:00')).toBe(true);
    expect(isValidTime('14:59')).toBe(true);
    expect(isValidTime('14:-1')).toBe(false);
    expect(isValidTime('14:60')).toBe(false);
  });

  // Test case 17: Edge cases for second validation
  it('17. should validate edge cases for seconds', () => {
    expect(isValidTime('14:30:00')).toBe(true);
    expect(isValidTime('14:30:59')).toBe(true);
    expect(isValidTime('14:30:-1')).toBe(false);
    expect(isValidTime('14:30:60')).toBe(false);
  });
});
