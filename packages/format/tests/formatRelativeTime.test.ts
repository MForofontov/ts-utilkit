import { formatRelativeTime } from '../src/formatRelativeTime';

/**
 * Unit tests for the formatRelativeTime function.
 */
describe('formatRelativeTime', () => {
  // Helper: create a Date offset by `ms` from a fixed base date
  const BASE = new Date('2024-06-15T12:00:00.000Z');
  const at = (offsetMs: number) => new Date(BASE.getTime() + offsetMs);

  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  // ─── Past: "ago" strings ───────────────────────────────────────────────────

  // Test case 1: Just now (< 45 s in the past)
  it('1. should return "just now" for a date less than 45 seconds ago', () => {
    expect(formatRelativeTime(at(-10 * SEC), BASE)).toBe('just now');
  });

  // Test case 2: Just now boundary (exactly 0 s)
  it('2. should return "just now" when date equals the base date', () => {
    expect(formatRelativeTime(BASE, BASE)).toBe('just now');
  });

  // Test case 3: 1 minute ago (45 s – 90 s)
  it('3. should return "1 minute ago" for a date 60 seconds ago', () => {
    expect(formatRelativeTime(at(-60 * SEC), BASE)).toBe('1 minute ago');
  });

  // Test case 4: X minutes ago (90 s – 45 min)
  it('4. should return "5 minutes ago" for a date 5 minutes ago', () => {
    expect(formatRelativeTime(at(-5 * MIN), BASE)).toBe('5 minutes ago');
  });

  // Test case 5: 1 hour ago (45 min – 90 min)
  it('5. should return "1 hour ago" for a date 75 minutes ago', () => {
    expect(formatRelativeTime(at(-75 * MIN), BASE)).toBe('1 hour ago');
  });

  // Test case 6: X hours ago (90 min – 22 h)
  it('6. should return "3 hours ago" for a date 3 hours ago', () => {
    expect(formatRelativeTime(at(-3 * HOUR), BASE)).toBe('3 hours ago');
  });

  // Test case 7: Yesterday (22 h – 36 h)
  it('7. should return "yesterday" for a date 25 hours ago', () => {
    expect(formatRelativeTime(at(-25 * HOUR), BASE)).toBe('yesterday');
  });

  // Test case 8: X days ago (36 h – 26 d)
  it('8. should return "5 days ago" for a date 5 days ago', () => {
    expect(formatRelativeTime(at(-5 * DAY), BASE)).toBe('5 days ago');
  });

  // Test case 9: Last month (26 d – 45 d)
  it('9. should return "last month" for a date 30 days ago', () => {
    expect(formatRelativeTime(at(-30 * DAY), BASE)).toBe('last month');
  });

  // Test case 10: X months ago (45 d – 345 d)
  it('10. should return "3 months ago" for a date 91 days ago', () => {
    expect(formatRelativeTime(at(-91 * DAY), BASE)).toBe('3 months ago');
  });

  // Test case 11: Last year (345 d – 545 d)
  it('11. should return "last year" for a date 400 days ago', () => {
    expect(formatRelativeTime(at(-400 * DAY), BASE)).toBe('last year');
  });

  // Test case 12: X years ago (≥ 545 d)
  it('12. should return "2 years ago" for a date 730 days ago', () => {
    expect(formatRelativeTime(at(-730 * DAY), BASE)).toBe('2 years ago');
  });

  // ─── Future: "in X" strings ────────────────────────────────────────────────

  // Test case 13: In 1 minute (future 45 s – 90 s)
  it('13. should return "in 1 minute" for a date 60 seconds in the future', () => {
    expect(formatRelativeTime(at(60 * SEC), BASE)).toBe('in 1 minute');
  });

  // Test case 14: In X minutes (future 90 s – 45 min)
  it('14. should return "in 5 minutes" for a date 5 minutes in the future', () => {
    expect(formatRelativeTime(at(5 * MIN), BASE)).toBe('in 5 minutes');
  });

  // Test case 15: In 1 hour (future 45 min – 90 min)
  it('15. should return "in 1 hour" for a date 75 minutes in the future', () => {
    expect(formatRelativeTime(at(75 * MIN), BASE)).toBe('in 1 hour');
  });

  // Test case 16: In X hours (future 90 min – 22 h)
  it('16. should return "in 4 hours" for a date 4 hours in the future', () => {
    expect(formatRelativeTime(at(4 * HOUR), BASE)).toBe('in 4 hours');
  });

  // Test case 17: Tomorrow (future 22 h – 36 h)
  it('17. should return "tomorrow" for a date 25 hours in the future', () => {
    expect(formatRelativeTime(at(25 * HOUR), BASE)).toBe('tomorrow');
  });

  // Test case 18: In X days (future 36 h – 26 d)
  it('18. should return "in 7 days" for a date 7 days in the future', () => {
    expect(formatRelativeTime(at(7 * DAY), BASE)).toBe('in 7 days');
  });

  // Test case 19: Next month (future 26 d – 45 d)
  it('19. should return "next month" for a date 31 days in the future', () => {
    expect(formatRelativeTime(at(31 * DAY), BASE)).toBe('next month');
  });

  // Test case 20: In X months (future 45 d – 345 d)
  it('20. should return "in 3 months" for a date 91 days in the future', () => {
    expect(formatRelativeTime(at(91 * DAY), BASE)).toBe('in 3 months');
  });

  // Test case 21: Next year (future 345 d – 545 d)
  it('21. should return "next year" for a date 400 days in the future', () => {
    expect(formatRelativeTime(at(400 * DAY), BASE)).toBe('next year');
  });

  // Test case 22: In X years (future ≥ 545 d)
  it('22. should return "in 2 years" for a date 730 days in the future', () => {
    expect(formatRelativeTime(at(730 * DAY), BASE)).toBe('in 2 years');
  });

  // ─── Input type flexibility ────────────────────────────────────────────────

  // Test case 23: Accepts ISO string as date
  it('23. should accept an ISO string as the date argument', () => {
    // Arrange
    const isoDate = new Date(BASE.getTime() - 5 * MIN).toISOString();

    // Act
    const result = formatRelativeTime(isoDate, BASE);

    // Assert
    expect(result).toBe('5 minutes ago');
  });

  // Test case 24: Accepts Unix timestamp (number) as date
  it('24. should accept a Unix timestamp (ms) as the date argument', () => {
    // Arrange
    const ts = BASE.getTime() - 3 * HOUR;

    // Act
    const result = formatRelativeTime(ts, BASE);

    // Assert
    expect(result).toBe('3 hours ago');
  });

  // Test case 25: Accepts ISO string as baseDate
  it('25. should accept an ISO string as the baseDate argument', () => {
    // Act
    const result = formatRelativeTime(BASE, BASE.toISOString());

    // Assert
    expect(result).toBe('just now');
  });

  // ─── Error Cases ───────────────────────────────────────────────────────────

  // Test case 26: Throws TypeError if date is null
  it('26. should throw TypeError if date is null', () => {
    expect(() =>
      formatRelativeTime(null as unknown as Date),
    ).toThrow(TypeError);
    expect(() =>
      formatRelativeTime(null as unknown as Date),
    ).toThrow('date must be a Date, string, or number, got null');
  });

  // Test case 27: Throws TypeError if date is an object that is not a Date
  it('27. should throw Error if date is an invalid date string', () => {
    expect(() => formatRelativeTime('not-a-date', BASE)).toThrow(Error);
    expect(() => formatRelativeTime('not-a-date', BASE)).toThrow(
      'Invalid date value: not-a-date',
    );
  });

  // Test case 28: Throws Error if baseDate is an invalid date string
  it('28. should throw Error if baseDate is an invalid date string', () => {
    expect(() => formatRelativeTime(BASE, 'bad-base')).toThrow(Error);
    expect(() => formatRelativeTime(BASE, 'bad-base')).toThrow(
      'Invalid date value: bad-base',
    );
  });
});
