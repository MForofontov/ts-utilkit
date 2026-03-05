import { getEndOfDay } from '../src/getEndOfDay';

describe('getEndOfDay', () => {
  it('1. should set time to 23:59:59.999 for a mid-day date', () => {
    const result = getEndOfDay(new Date('2025-06-15T14:30:00'));
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
    expect(result.getDate()).toBe(15);
  });

  it('2. should keep the same calendar day', () => {
    const result = getEndOfDay(new Date('2025-03-20T08:00:00'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(2); // March (0-indexed)
    expect(result.getDate()).toBe(20);
  });

  it('3. should return 23:59:59.999 when already at midnight', () => {
    const result = getEndOfDay(new Date('2025-01-01T00:00:00.000'));
    expect(result.getHours()).toBe(23);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it('4. should return same end-of-day when already at 23:59:59.999', () => {
    const result = getEndOfDay(new Date('2025-01-15T23:59:59.999'));
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
    expect(result.getDate()).toBe(15);
  });

  it('5. should not modify the original date', () => {
    const original = new Date('2025-06-15T14:30:00');
    const originalTime = original.getTime();
    getEndOfDay(original);
    expect(original.getTime()).toBe(originalTime);
  });

  it('6. should return a new Date instance', () => {
    const date = new Date('2025-06-15T12:00:00');
    const result = getEndOfDay(date);
    expect(result).not.toBe(date);
  });

  it("7. should keep New Year's Eve in December, not roll into Jan 1", () => {
    const result = getEndOfDay(new Date('2025-12-31T08:00:00'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it('8. should keep Feb 28 in February in a non-leap year', () => {
    const result = getEndOfDay(new Date('2025-02-28T12:00:00'));
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(28);
    expect(result.getHours()).toBe(23);
    expect(result.getMilliseconds()).toBe(999);
  });

  it('9. should throw Error for invalid date', () => {
    expect(() => getEndOfDay(new Date('invalid'))).toThrow('Invalid date');
  });
});
