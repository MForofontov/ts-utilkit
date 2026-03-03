import { subtractMonths } from '../src/subtractMonths';

describe('subtractMonths', () => {
  it('1. should subtract months within the same year', () => {
    // August → May: both in summer DST period, safe to compare components
    const result = subtractMonths(new Date('2025-08-15'), 3);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(4); // May (0-indexed)
    expect(result.getDate()).toBe(15);
  });

  it('2. should cross a year boundary', () => {
    const result = subtractMonths(new Date('2025-02-15'), 3);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(10); // November (0-indexed)
    expect(result.getDate()).toBe(15);
  });

  it('3. should return the same date when subtracting zero months', () => {
    const date = new Date('2025-03-15');
    const result = subtractMonths(date, 0);
    expect(result.getFullYear()).toBe(date.getFullYear());
    expect(result.getMonth()).toBe(date.getMonth());
    expect(result.getDate()).toBe(date.getDate());
  });

  it('4. should preserve the time component after subtraction', () => {
    // Use an explicit local-time constructor to avoid UTC offset issues
    const date = new Date(2025, 0, 15, 12, 30, 0); // Jan 15 2025 12:30 local
    const result = subtractMonths(date, 1);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(12);
    expect(result.getMinutes()).toBe(30);
  });

  it('5. should subtract 12 months (equivalent to one year back)', () => {
    const result = subtractMonths(new Date(2025, 0, 15), 12); // Jan 15 local
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(15);
  });

  it('6. should handle large subtractions spanning multiple years', () => {
    // Jun 2025 − 30 months = Dec 2022 (both same DST month offset class)
    const result = subtractMonths(new Date(2025, 5, 15), 30); // Jun 15 local
    expect(result.getFullYear()).toBe(2022);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(15);
  });

  it('7. should not modify the original date', () => {
    const original = new Date('2025-06-15');
    const originalTime = original.getTime();
    subtractMonths(original, 3);
    expect(original.getTime()).toBe(originalTime);
  });

  it('8. should effectively add months when given a negative value', () => {
    // March 15, 2025 − (−3 months) = June 15, 2025
    const result = subtractMonths(new Date(2025, 2, 15), -3);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
  });

  it('9. should handle a large number of months spanning multiple years', () => {
    // June 2025 − 24 months = June 2023
    const result = subtractMonths(new Date(2025, 5, 15), 24);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
  });

  it('10. should preserve the day component when no overflow occurs', () => {
    // June 20 − 1 month = May 20
    const result = subtractMonths(new Date(2025, 5, 20), 1);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(4); // May
    expect(result.getDate()).toBe(20);
  });

  it('11. should throw Error for invalid date', () => {
    expect(() => subtractMonths(new Date('invalid'), 3)).toThrow('Invalid date');
  });

  it('12. should throw Error when months is NaN', () => {
  });
});
