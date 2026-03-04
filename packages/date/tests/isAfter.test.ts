import { isAfter } from '../src/isAfter';

describe('isAfter', () => {
  it('1. should return true when date1 is after date2', () => {
    const d1 = new Date('2025-06-01');
    const d2 = new Date('2025-01-01');
    expect(isAfter(d1, d2)).toBe(true);
  });

  it('2. should return false when date1 is before date2', () => {
    const d1 = new Date('2025-01-01');
    const d2 = new Date('2025-06-01');
    expect(isAfter(d1, d2)).toBe(false);
  });

  it('3. should return false when dates are equal', () => {
    const d = new Date('2025-03-15T12:00:00.000Z');
    expect(isAfter(d, d)).toBe(false);
  });

  it('4. should compare time-level precision on the same day', () => {
    const morning = new Date('2025-03-15T08:00:00');
    const evening = new Date('2025-03-15T20:00:00');
    expect(isAfter(evening, morning)).toBe(true);
    expect(isAfter(morning, evening)).toBe(false);
  });

  it('5. should return true across year boundaries', () => {
    expect(isAfter(new Date('2025-01-01'), new Date('2024-12-31'))).toBe(true);
  });

  it('6. should return false for dates identical to the millisecond', () => {
    const ts = 1_735_689_600_000;
    expect(isAfter(new Date(ts), new Date(ts))).toBe(false);
  });

  it('7. should handle dates far apart', () => {
    expect(isAfter(new Date('2099-12-31'), new Date('2000-01-01'))).toBe(true);
  });

  it('8. should not modify the original date objects', () => {
    const d1 = new Date('2025-06-01');
    const d2 = new Date('2025-01-01');
    const t1 = d1.getTime();
    const t2 = d2.getTime();
    isAfter(d1, d2);
    expect(d1.getTime()).toBe(t1);
    expect(d2.getTime()).toBe(t2);
  });

  it('9. should return true when date1 is later by just 1 millisecond', () => {
    const ts = 1_735_689_600_000;
    expect(isAfter(new Date(ts + 1), new Date(ts))).toBe(true);
  });

  it('10. should return false when date1 is earlier by just 1 millisecond', () => {
    const ts = 1_735_689_600_000;
    expect(isAfter(new Date(ts), new Date(ts + 1))).toBe(false);
  });

  it('11. should compare correctly when same month/day but different year', () => {
    expect(isAfter(new Date('2025-03-15'), new Date('2020-03-15'))).toBe(true);
    expect(isAfter(new Date('2020-03-15'), new Date('2025-03-15'))).toBe(false);
  });

  it('12. should throw Error for invalid date1', () => {
    expect(() => isAfter(new Date('invalid'), new Date('2025-01-01'))).toThrow(
      Error,
    );
    expect(() => isAfter(new Date('invalid'), new Date('2025-01-01'))).toThrow(
      'Invalid date',
    );
  });

  it('13. should throw Error for invalid date2', () => {
    expect(() => isAfter(new Date('2025-01-01'), new Date('invalid'))).toThrow(
      Error,
    );
    expect(() => isAfter(new Date('2025-01-01'), new Date('invalid'))).toThrow(
      'Invalid date',
    );
  });
});
