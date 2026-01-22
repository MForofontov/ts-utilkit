import { isValidISODate } from '../src/isValidISODate';

/**
 * Unit tests for the isValidISODate function.
 */
describe('isValidISODate', () => {
  // Test case 1: Valid ISO 8601 dates
  it('1. should return true for valid ISO 8601 dates', () => {
    expect(isValidISODate('2023-12-25')).toBe(true);
    expect(isValidISODate('2023-12-25T10:30:00')).toBe(true);
    expect(isValidISODate('2023-12-25T10:30:00Z')).toBe(true);
    expect(isValidISODate('2023-12-25T10:30:00+05:30')).toBe(true);
    expect(isValidISODate('2023-12-25T10:30:00.123Z')).toBe(true);
    expect(isValidISODate('2000-02-29')).toBe(true); // Leap year
  });

  // Test case 2: Invalid ISO 8601 dates
  it('2. should return false for invalid ISO 8601 dates', () => {
    expect(isValidISODate('2023/12/25')).toBe(false);
    expect(isValidISODate('25-12-2023')).toBe(false);
    expect(isValidISODate('2023-13-25')).toBe(false);
    expect(isValidISODate('2023-12-32')).toBe(false);
    expect(isValidISODate('2023-12-25T25:30:00')).toBe(false);
    expect(isValidISODate('2023-02-29')).toBe(false); // Not leap year
  });

  // Test case 3: Time component control
  it('3. should handle allowTime parameter correctly', () => {
    expect(isValidISODate('2023-12-25T10:30:00', false)).toBe(false);
    expect(isValidISODate('2023-12-25', false)).toBe(true);
    expect(isValidISODate('2023-12-25T10:30:00', true)).toBe(true);
    expect(isValidISODate('2023-12-25', true)).toBe(true);
  });

  // Test case 4: Edge cases and boundary values
  it('4. should handle edge cases correctly', () => {
    expect(isValidISODate('1900-01-01')).toBe(true);
    expect(isValidISODate('2100-12-31')).toBe(true);
    expect(isValidISODate('2023-01-01T00:00:00Z')).toBe(true);
    expect(isValidISODate('2023-12-31T23:59:59Z')).toBe(true);
  });

  // Test case 5: Performance with various date strings
  it('5. should validate dates efficiently', () => {
    const dateStrings = [
      '2023-12-25',
      '2023-12-25T10:30:00Z',
      '2023/12/25',
      '2023-13-25',
      '2023-12-25T10:30:00',
    ];

    const startTime = performance.now();
    const results = dateStrings.map((date) => isValidISODate(date));
    const endTime = performance.now();

    expect(results).toEqual([true, true, false, false, true]);
    expect(endTime - startTime).toBeLessThan(10);
  });

  // Test case 6: Date range validation
  it('6. should validate month and day ranges', () => {
    // Invalid months
    expect(isValidISODate('2023-00-15')).toBe(false); // Month < 1
    expect(isValidISODate('2023-13-15')).toBe(false); // Month > 12

    // Invalid days
    expect(isValidISODate('2023-12-00')).toBe(false); // Day < 1
    expect(isValidISODate('2023-12-32')).toBe(false); // Day > 31

    // Valid boundaries
    expect(isValidISODate('2023-01-01')).toBe(true); // Min month/day
    expect(isValidISODate('2023-12-31')).toBe(true); // Max month/day
  });

  // Test case 7: Time component validation
  it('7. should validate time component ranges', () => {
    // Invalid hours
    expect(isValidISODate('2023-12-25T24:00:00Z')).toBe(false); // Hour > 23
    expect(isValidISODate('2023-12-25T-1:00:00Z')).toBe(false); // Hour < 0

    // Invalid minutes
    expect(isValidISODate('2023-12-25T10:60:00Z')).toBe(false); // Minute > 59
    expect(isValidISODate('2023-12-25T10:-1:00Z')).toBe(false); // Minute < 0

    // Invalid seconds
    expect(isValidISODate('2023-12-25T10:30:60Z')).toBe(false); // Second > 59
    expect(isValidISODate('2023-12-25T10:30:-1Z')).toBe(false); // Second < 0

    // Valid boundaries
    expect(isValidISODate('2023-12-25T00:00:00Z')).toBe(true);
    expect(isValidISODate('2023-12-25T23:59:59Z')).toBe(true);
  });

  // Test case 8: TypeError for invalid input types
  it('8. should throw TypeError for invalid dateString type', () => {
    expect(() => isValidISODate(123 as unknown as string)).toThrow(TypeError);
    expect(() => isValidISODate(123 as unknown as string)).toThrow(
      'dateString must be a string',
    );
  });

  // Test case 9: TypeError for invalid allowTime type
  it('9. should throw TypeError for invalid allowTime type', () => {
    expect(() =>
      isValidISODate('2023-12-25', 'invalid' as unknown as boolean),
    ).toThrow(TypeError);
    expect(() =>
      isValidISODate('2023-12-25', 'invalid' as unknown as boolean),
    ).toThrow('allowTime must be a boolean');
  });
});
