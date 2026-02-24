import { getStartOfMonth } from '../src/getStartOfMonth';

describe('getStartOfMonth', () => {
  it('1. should return the 1st of the month at midnight for a mid-month date', () => {
    const result = getStartOfMonth(new Date('2025-06-15T14:30:00'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(5); // June (0-indexed)
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('2. should return the same date when already on the 1st', () => {
    const result = getStartOfMonth(new Date('2025-01-01T12:00:00'));
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(0);
    expect(result.getHours()).toBe(0);
  });

  it('3. should handle February in a non-leap year', () => {
    const result = getStartOfMonth(new Date('2025-02-28'));
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(1);
    expect(result.getFullYear()).toBe(2025);
  });

  it('4. should handle February in a leap year', () => {
    const result = getStartOfMonth(new Date('2024-02-29'));
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(1);
    expect(result.getFullYear()).toBe(2024);
  });

  it('5. should handle the last day of a month', () => {
    const result = getStartOfMonth(new Date('2025-01-31'));
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(0);
  });

  it('6. should not modify the original date', () => {
    const original = new Date('2025-06-15');
    const originalTime = original.getTime();
    getStartOfMonth(original);
    expect(original.getTime()).toBe(originalTime);
  });

  it('7. should return December 1st for dates in December', () => {
    const result = getStartOfMonth(new Date('2025-12-25T15:00:00'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('8. should return the 1st with zeroed time for the last day of the year', () => {
    const result = getStartOfMonth(new Date('2025-12-31T23:59:59.999'));
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('9. should throw Error for invalid date', () => {
    expect(() => getStartOfMonth(new Date('invalid'))).toThrow('Invalid date');
  });
});
