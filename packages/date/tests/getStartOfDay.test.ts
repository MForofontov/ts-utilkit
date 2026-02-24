import { getStartOfDay } from '../src/getStartOfDay';

describe('getStartOfDay', () => {
  it('1. should set time to 00:00:00.000 for a mid-day date', () => {
    const result = getStartOfDay(new Date('2025-06-15T14:30:45.500'));
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('2. should keep the same calendar day', () => {
    const result = getStartOfDay(new Date('2025-03-20T23:59:59'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(2); // March (0-indexed)
    expect(result.getDate()).toBe(20);
  });

  it('3. should return midnight when already at midnight', () => {
    const date = new Date('2025-01-01T00:00:00.000');
    const result = getStartOfDay(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('4. should set time to midnight for end-of-day (23:59:59.999)', () => {
    const result = getStartOfDay(new Date('2025-01-15T23:59:59.999'));
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
    expect(result.getDate()).toBe(15);
  });

  it('5. should not modify the original date', () => {
    const original = new Date('2025-06-15T14:30:00');
    const originalTime = original.getTime();
    getStartOfDay(original);
    expect(original.getTime()).toBe(originalTime);
  });

  it('6. should return a new Date instance', () => {
    const date = new Date('2025-06-15T12:00:00');
    const result = getStartOfDay(date);
    expect(result).not.toBe(date);
  });

  it('7. should work correctly at year boundaries (Dec 31)', () => {
    const result = getStartOfDay(new Date('2025-12-31T18:00:00'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('8. should preserve the year, month and day components', () => {
    const date = new Date(2025, 3, 20, 15, 45, 30, 500); // April 20, 2025 15:45:30.500 local
    const result = getStartOfDay(date);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(3); // April
    expect(result.getDate()).toBe(20);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('9. should throw Error for invalid date', () => {
    expect(() => getStartOfDay(new Date('invalid'))).toThrow('Invalid date');
  });
});
