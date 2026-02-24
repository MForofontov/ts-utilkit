import { isSameYear } from '../src/isSameYear';

describe('isSameYear', () => {
  it('1. should return true for the same year', () => {
    expect(isSameYear(new Date('2025-01-01'), new Date('2025-12-31'))).toBe(true);
  });

  it('2. should return true for identical dates', () => {
    const d = new Date('2025-06-10');
    expect(isSameYear(d, d)).toBe(true);
  });

  it('3. should return false for consecutive years', () => {
    expect(isSameYear(new Date('2024-12-31'), new Date('2025-01-01'))).toBe(false);
  });

  it('4. should return false for years far apart', () => {
    expect(isSameYear(new Date('2000-06-15'), new Date('2025-06-15'))).toBe(false);
  });

  it('5. should ignore month and day when comparing', () => {
    expect(isSameYear(new Date('2025-03-01'), new Date('2025-09-30'))).toBe(true);
  });

  it('6. should ignore time when comparing', () => {
    const d1 = new Date('2025-01-01T00:00:00');
    const d2 = new Date('2025-12-31T23:59:59');
    expect(isSameYear(d1, d2)).toBe(true);
  });

  it('7. should be symmetric (isSameYear(a, b) === isSameYear(b, a))', () => {
    const d1 = new Date('2025-01-01');
    const d2 = new Date('2025-12-31');
    const d3 = new Date('2026-01-01');
    expect(isSameYear(d1, d2)).toBe(isSameYear(d2, d1));
    expect(isSameYear(d1, d3)).toBe(isSameYear(d3, d1));
  });

  it('8. should return true for all dates within the same year', () => {
    // Arrange
    const dates = ['2025-01-15', '2025-04-20', '2025-07-04', '2025-10-31', '2025-12-25'].map(
      (d) => new Date(d),
    );
    // Assert every date compared with the first one belongs to the same year
    for (let i = 1; i < dates.length; i++) {
      expect(isSameYear(dates[0], dates[i])).toBe(true);
    }
  });

  it('9. should throw Error for invalid date1', () => {
    expect(() => isSameYear(new Date('invalid'), new Date('2025-01-01'))).toThrow('Invalid date');
  });

  it('10. should throw Error for invalid date2', () => {
    expect(() => isSameYear(new Date('2025-01-01'), new Date('invalid'))).toThrow('Invalid date');
  });
});
