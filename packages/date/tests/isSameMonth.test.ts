import { isSameMonth } from '../src/isSameMonth';

describe('isSameMonth', () => {
  it('1. should return true for different days in the same month and year', () => {
    expect(isSameMonth(new Date('2025-03-01'), new Date('2025-03-31'))).toBe(
      true,
    );
  });

  it('2. should return true for identical dates', () => {
    const d = new Date('2025-06-10');
    expect(isSameMonth(d, d)).toBe(true);
  });

  it('3. should return false for the same month in different years', () => {
    expect(isSameMonth(new Date('2024-03-15'), new Date('2025-03-15'))).toBe(
      false,
    );
  });

  it('4. should return false for adjacent months in the same year', () => {
    expect(isSameMonth(new Date('2025-03-15'), new Date('2025-04-15'))).toBe(
      false,
    );
  });

  it('5. should return false for the first and last months of the year', () => {
    expect(isSameMonth(new Date('2025-01-01'), new Date('2025-12-31'))).toBe(
      false,
    );
  });

  it('6. should ignore time when comparing', () => {
    const d1 = new Date('2025-05-10T00:00:00');
    const d2 = new Date('2025-05-20T23:59:59');
    expect(isSameMonth(d1, d2)).toBe(true);
  });

  it('7. should be symmetric (isSameMonth(a, b) === isSameMonth(b, a))', () => {
    const d1 = new Date('2025-03-01');
    const d2 = new Date('2025-03-31');
    const d3 = new Date('2025-04-01');
    expect(isSameMonth(d1, d2)).toBe(isSameMonth(d2, d1));
    expect(isSameMonth(d1, d3)).toBe(isSameMonth(d3, d1));
  });

  it('8. should return false for the same month number in different years', () => {
    expect(isSameMonth(new Date('2000-12-15'), new Date('2025-12-15'))).toBe(
      false,
    );
  });

  it('9. should throw Error for invalid date1', () => {
    expect(() =>
      isSameMonth(new Date('invalid'), new Date('2025-01-01')),
    ).toThrow('Invalid date');
  });

  it('10. should throw Error for invalid date2', () => {
    expect(() =>
      isSameMonth(new Date('2025-01-01'), new Date('invalid')),
    ).toThrow('Invalid date');
  });
});
