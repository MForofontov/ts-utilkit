import { getCurrentDateTimeISO } from '../src/getCurrentDateTimeISO';

/**
 * Unit tests for the getCurrentDateTimeISO function.
 */
describe('getCurrentDateTimeISO', () => {
  // Test case 1: Verify the returned string is in ISO 8601 format
  it('1. should return the current date and time in ISO 8601 format', () => {
    const isoString: string = getCurrentDateTimeISO();
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(isoRegex.test(isoString)).toBe(true);
  });

  // Test case 2: Verify the returned string is a valid date
  it('2. should return a valid date string', () => {
    const isoString: string = getCurrentDateTimeISO();
    const date = new Date(isoString);
    expect(date.toString()).not.toBe('Invalid Date');
  });

  // Test case 3: Verify the returned string is not NaN
  it('3. should not return NaN', () => {
    const isoString: string = getCurrentDateTimeISO();
    expect(isNaN(Date.parse(isoString))).toBe(false);
  });

  // Test case 4: Verify the returned string is not a negative date
  it('4. should not return a negative date', () => {
    const isoString: string = getCurrentDateTimeISO();
    const date = new Date(isoString);
    expect(date.getTime()).toBeGreaterThan(0);
  });

  // Test case 5: Verify the returned string is close to the current date and time
  it('5. should return the current date and time within a reasonable tolerance', () => {
    const isoString: string = getCurrentDateTimeISO();
    const date = new Date(isoString);
    const now = new Date();
    const tolerance = 1000; // 1 second tolerance
    expect(Math.abs(now.getTime() - date.getTime())).toBeLessThan(tolerance);
  });
});
