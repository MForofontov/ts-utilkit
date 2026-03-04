import { isSameDay } from '../src/isSameDay';

describe('isSameDay', () => {
  it('1. should return true for the same day at different times', () => {
    const d1 = new Date('2025-03-15T08:00:00');
    const d2 = new Date('2025-03-15T23:59:59');
    expect(isSameDay(d1, d2)).toBe(true);
  });

  it('2. should return true for identical dates', () => {
    const d = new Date('2025-06-10');
    expect(isSameDay(d, d)).toBe(true);
  });

  it('3. should return false for consecutive days', () => {
    expect(isSameDay(new Date('2025-03-15'), new Date('2025-03-16'))).toBe(
      false,
    );
  });

  it('4. should return false for the same day-of-month in different months', () => {
    expect(isSameDay(new Date('2025-01-15'), new Date('2025-02-15'))).toBe(
      false,
    );
  });

  it('5. should return false for the same month/day in different years', () => {
    expect(isSameDay(new Date('2024-06-15'), new Date('2025-06-15'))).toBe(
      false,
    );
  });

  it('6. should return true at midnight boundaries', () => {
    const start = new Date('2025-01-01T00:00:00.000');
    const end = new Date('2025-01-01T23:59:59.999');
    expect(isSameDay(start, end)).toBe(true);
  });

  it('7. should not modify the original date objects', () => {
    const d1 = new Date('2025-01-01');
    const d2 = new Date('2025-01-01');
    const t1 = d1.getTime();
    const t2 = d2.getTime();
    isSameDay(d1, d2);
    expect(d1.getTime()).toBe(t1);
    expect(d2.getTime()).toBe(t2);
  });

  it('8. should return false for the last day of a month vs the first of the next', () => {
    expect(isSameDay(new Date('2025-01-31'), new Date('2025-02-01'))).toBe(
      false,
    );
  });

  it('9. should return false for Dec 31 vs Jan 1 of the next year', () => {
    expect(isSameDay(new Date('2024-12-31'), new Date('2025-01-01'))).toBe(
      false,
    );
  });

  it('10. should be symmetric (isSameDay(a, b) === isSameDay(b, a))', () => {
    const same1 = new Date('2025-06-15T08:00:00');
    const same2 = new Date('2025-06-15T20:00:00');
    const diff = new Date('2025-06-16T08:00:00');
    expect(isSameDay(same1, same2)).toBe(isSameDay(same2, same1));
    expect(isSameDay(same1, diff)).toBe(isSameDay(diff, same1));
  });

  it('11. should throw Error for invalid date1', () => {
    expect(() =>
      isSameDay(new Date('invalid'), new Date('2025-01-01')),
    ).toThrow('Invalid date');
  });

  it('12. should throw Error for invalid date2', () => {
    expect(() =>
      isSameDay(new Date('2025-01-01'), new Date('invalid')),
    ).toThrow('Invalid date');
  });
});
