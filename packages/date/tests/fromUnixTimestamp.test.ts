import { fromUnixTimestamp } from '../src/fromUnixTimestamp';

describe('fromUnixTimestamp', () => {
  it('1. should convert the Unix epoch (0) to 1970-01-01T00:00:00.000Z', () => {
    const result = fromUnixTimestamp(0);
    expect(result.toISOString()).toBe('1970-01-01T00:00:00.000Z');
  });

  it('2. should convert a positive timestamp to the correct date', () => {
    // 1735689600 = 2025-01-01T00:00:00.000Z
    const result = fromUnixTimestamp(1_735_689_600);
    expect(result.toISOString()).toBe('2025-01-01T00:00:00.000Z');
  });

  it('3. should return a Date instance', () => {
    expect(fromUnixTimestamp(0)).toBeInstanceOf(Date);
  });

  it('4. should handle sub-second precision via fractional timestamps', () => {
    const result = fromUnixTimestamp(1_735_689_600.5);
    expect(result.getMilliseconds()).toBe(500);
  });

  it('5. should handle negative timestamps (before epoch)', () => {
    const result = fromUnixTimestamp(-86_400);
    expect(result.toISOString()).toBe('1969-12-31T00:00:00.000Z');
  });

  it('6. should round-trip correctly with toUnixTimestamp', () => {
    const ts = 1_735_689_600;
    const { toUnixTimestamp } = require('../src/toUnixTimestamp');
    expect(toUnixTimestamp(fromUnixTimestamp(ts))).toBe(ts);
  });

  it('7. should convert the Y2K timestamp correctly', () => {
    // 2000-01-01T00:00:00.000Z = 946,684,800 seconds
    const result = fromUnixTimestamp(946_684_800);
    expect(result.toISOString()).toBe('2000-01-01T00:00:00.000Z');
  });

  it('8. should handle a large timestamp (year 2100)', () => {
    // 2100-01-01T00:00:00.000Z = 4,102,444,800 seconds
    const result = fromUnixTimestamp(4_102_444_800);
    expect(result.toISOString()).toBe('2100-01-01T00:00:00.000Z');
  });

  it('9. should throw TypeError when timestamp is not a number', () => {
    expect(() => fromUnixTimestamp('1735689600' as unknown as number)).toThrow(TypeError);
    expect(() => fromUnixTimestamp('1735689600' as unknown as number)).toThrow(
      'timestamp must be a number, got string',
    );
  });

  it('10. should throw Error when timestamp is NaN', () => {
    expect(() => fromUnixTimestamp(NaN)).toThrow(Error);
    expect(() => fromUnixTimestamp(NaN)).toThrow('timestamp must be a valid number, not NaN');
  });
});
