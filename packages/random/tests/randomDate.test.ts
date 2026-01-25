import { randomDate } from '../src/randomDate';

/**
 * Unit tests for the randomDate function.
 */
describe('randomDate', () => {
  // Test case 1: Returns Date object
  it('1. should return a Date object', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    const result = randomDate(start, end);

    expect(result).toBeInstanceOf(Date);
  });

  // Test case 2: Date within range
  it('2. should return date within specified range', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    const result = randomDate(start, end);

    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // Test case 3: Same start and end date
  it('3. should return the exact date when start equals end', () => {
    const date = new Date('2024-06-15');
    const result = randomDate(date, date);

    expect(result.getTime()).toBe(date.getTime());
  });

  // Test case 4: Random distribution
  it('4. should produce varied dates over multiple calls', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    const dates = new Set<number>();

    for (let i = 0; i < 100; i++) {
      dates.add(randomDate(start, end).getTime());
    }

    // Should have many different dates
    expect(dates.size).toBeGreaterThan(90);
  });

  // Test case 5: Recent dates (next 7 days)
  it('5. should work with recent date ranges', () => {
    const now = new Date();
    const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const result = randomDate(now, week);

    expect(result.getTime()).toBeGreaterThanOrEqual(now.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(week.getTime());
  });

  // Test case 6: Historical dates
  it('6. should work with historical dates', () => {
    const start = new Date('1900-01-01');
    const end = new Date('1999-12-31');
    const result = randomDate(start, end);

    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // Test case 7: Future dates
  it('7. should work with future dates', () => {
    const start = new Date('2030-01-01');
    const end = new Date('2040-12-31');
    const result = randomDate(start, end);

    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // Test case 8: One day range
  it('8. should work with single day range', () => {
    const start = new Date('2024-06-15T00:00:00');
    const end = new Date('2024-06-15T23:59:59');
    const result = randomDate(start, end);

    expect(result.getDate()).toBe(15);
    expect(result.getMonth()).toBe(5); // June is month 5
    expect(result.getFullYear()).toBe(2024);
  });

  // Test case 9: Large time range
  it('9. should handle large time ranges', () => {
    const start = new Date('1970-01-01');
    const end = new Date('2100-12-31');
    const result = randomDate(start, end);

    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // Error Test case 10: TypeError for non-Date start
  it('10. should throw TypeError when start is not a Date', () => {
    const end = new Date('2024-12-31');

    expect(() => randomDate('2024-01-01' as any, end)).toThrow(TypeError);
    expect(() => randomDate('2024-01-01' as any, end)).toThrow(
      'start must be a Date object',
    );
  });

  // Error Test case 11: TypeError for non-Date end
  it('11. should throw TypeError when end is not a Date', () => {
    const start = new Date('2024-01-01');

    expect(() => randomDate(start, '2024-12-31' as any)).toThrow(TypeError);
    expect(() => randomDate(start, '2024-12-31' as any)).toThrow(
      'end must be a Date object',
    );
  });

  // Error Test case 12: Error for invalid start date
  it('12. should throw Error when start is invalid', () => {
    const start = new Date('invalid');
    const end = new Date('2024-12-31');

    expect(() => randomDate(start, end)).toThrow(Error);
    expect(() => randomDate(start, end)).toThrow('start must be a valid date');
  });

  // Error Test case 13: Error for invalid end date
  it('13. should throw Error when end is invalid', () => {
    const start = new Date('2024-01-01');
    const end = new Date('invalid');

    expect(() => randomDate(start, end)).toThrow(Error);
    expect(() => randomDate(start, end)).toThrow('end must be a valid date');
  });

  // Error Test case 14: Error when start > end
  it('14. should throw Error when start is after end', () => {
    const start = new Date('2024-12-31');
    const end = new Date('2024-01-01');

    expect(() => randomDate(start, end)).toThrow(Error);
    expect(() => randomDate(start, end)).toThrow(
      'start date must be before or equal to end date',
    );
  });
});
