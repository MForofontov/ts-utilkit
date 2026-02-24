import { subtractDays } from '../src/subtractDays';

describe('subtractDays', () => {
  it('1. should subtract days within the same month', () => {
    const result = subtractDays(new Date('2025-01-15'), 5);
    expect(result).toEqual(new Date('2025-01-10'));
  });

  it('2. should cross a month boundary', () => {
    const result = subtractDays(new Date('2025-03-05'), 10);
    expect(result).toEqual(new Date('2025-02-23'));
  });

  it('3. should cross a year boundary', () => {
    const result = subtractDays(new Date('2025-01-03'), 5);
    expect(result).toEqual(new Date('2024-12-29'));
  });

  it('4. should return the same date when subtracting zero days', () => {
    const date = new Date('2025-06-01');
    expect(subtractDays(date, 0)).toEqual(date);
  });

  it('5. should handle leap year: subtract 1 from March 1 in non-leap year', () => {
    // 2025 is not a leap year — Feb has 28 days
    expect(subtractDays(new Date('2025-03-01'), 1)).toEqual(new Date('2025-02-28'));
  });

  it('6. should handle leap year: subtract 1 from March 1 in leap year', () => {
    // 2024 is a leap year — Feb has 29 days
    expect(subtractDays(new Date('2024-03-01'), 1)).toEqual(new Date('2024-02-29'));
  });

  it('7. should not modify the original date', () => {
    const original = new Date('2025-06-15');
    const originalTime = original.getTime();
    subtractDays(original, 5);
    expect(original.getTime()).toBe(originalTime);
  });

  it('8. should preserve the time component', () => {
    const date = new Date(2025, 5, 15, 14, 30, 0); // June 15 14:30 local
    const result = subtractDays(date, 5);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(10);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });

  it('9. should handle subtracting more than 365 days spanning a leap year', () => {
    // Jan 1, 2025 − 366 days = Jan 1, 2024 (2024 is a leap year with 366 days)
    const result = subtractDays(new Date(2025, 0, 1), 366);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
  });

  it('10. should effectively add days when given a negative value', () => {
    const result = subtractDays(new Date(2025, 0, 1), -5); // Jan 1 + 5 days
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(6);
  });

  it('11. should throw Error for invalid date', () => {
    expect(() => subtractDays(new Date('invalid'), 5)).toThrow('Invalid date');
  });

  it('12. should throw Error when days is NaN', () => {
    expect(() => subtractDays(new Date('2025-01-01'), NaN)).toThrow('Days must be a number');
  });
});
