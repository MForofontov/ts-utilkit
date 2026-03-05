import { toUnixTimestamp } from '../src/toUnixTimestamp';

describe('toUnixTimestamp', () => {
  it('1. should return 0 for the Unix epoch', () => {
    expect(toUnixTimestamp(new Date('1970-01-01T00:00:00.000Z'))).toBe(0);
  });

  it('2. should return the correct timestamp for a known date', () => {
    // 2025-01-01T00:00:00.000Z = 1735689600
    expect(toUnixTimestamp(new Date('2025-01-01T00:00:00.000Z'))).toBe(
      1_735_689_600,
    );
  });

  it('3. should truncate milliseconds (floor behaviour)', () => {
    // 2025-01-01T00:00:00.999Z should still be 1735689600
    expect(toUnixTimestamp(new Date('2025-01-01T00:00:00.999Z'))).toBe(
      1_735_689_600,
    );
  });

  it('4. should return a negative number for dates before epoch', () => {
    expect(toUnixTimestamp(new Date('1969-12-31T00:00:00.000Z'))).toBe(-86_400);
  });

  it('5. should return a number (integer)', () => {
    const result = toUnixTimestamp(new Date('2025-06-15T12:00:00.500Z'));
    expect(typeof result).toBe('number');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('6. should round-trip correctly with fromUnixTimestamp', () => {
    const { fromUnixTimestamp } = require('../src/fromUnixTimestamp');
    const date = new Date('2025-06-15T00:00:00.000Z');
    expect(fromUnixTimestamp(toUnixTimestamp(date))).toEqual(date);
  });

  it('7. should return the correct timestamp for the Y2K date', () => {
    // 2000-01-01T00:00:00.000Z = 946,684,800 seconds
    expect(toUnixTimestamp(new Date('2000-01-01T00:00:00.000Z'))).toBe(
      946_684_800,
    );
  });

  it('8. should handle a date far in the future (year 2100)', () => {
    // 2100-01-01T00:00:00.000Z = 4,102,444,800 seconds
    expect(toUnixTimestamp(new Date('2100-01-01T00:00:00.000Z'))).toBe(
      4_102_444_800,
    );
  });

  it('9. should throw Error for invalid date', () => {
    expect(() => toUnixTimestamp(new Date('invalid'))).toThrow(Error);
    expect(() => toUnixTimestamp(new Date('invalid'))).toThrow('Invalid date');
  });
});
