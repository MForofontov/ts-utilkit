import { formatRelativeTime } from '../src/formatRelativeTime';

describe('formatRelativeTime', () => {
  const base = new Date('2025-06-15T12:00:00.000');

  it('1. should return "just now" for identical timestamps', () => {
    expect(formatRelativeTime(base, base)).toBe('just now');
  });

  it('2. should return "just now" for a difference under 60 seconds (past)', () => {
    const date = new Date(base.getTime() - 30_000); // 30 seconds ago
    expect(formatRelativeTime(date, base)).toBe('just now');
  });

  it('3. should return "just now" for a difference under 60 seconds (future)', () => {
    const date = new Date(base.getTime() + 30_000); // 30 seconds ahead
    expect(formatRelativeTime(date, base)).toBe('just now');
  });

  it('4. should return "X minutes ago" for minutes in the past', () => {
    const date = new Date(base.getTime() - 15 * 60_000); // 15 minutes ago
    expect(formatRelativeTime(date, base)).toBe('15 minutes ago');
  });

  it('5. should return "1 minute ago" (singular) for ~1 minute in the past', () => {
    const date = new Date(base.getTime() - 60_000); // exactly 1 minute
    expect(formatRelativeTime(date, base)).toBe('1 minute ago');
  });

  it('6. should return "in X minutes" for minutes in the future', () => {
    const date = new Date(base.getTime() + 20 * 60_000); // 20 minutes ahead
    expect(formatRelativeTime(date, base)).toBe('in 20 minutes');
  });

  it('7. should return "X hours ago" for hours in the past', () => {
    const date = new Date(base.getTime() - 3 * 3_600_000); // 3 hours ago
    expect(formatRelativeTime(date, base)).toBe('3 hours ago');
  });

  it('8. should return "1 hour ago" (singular)', () => {
    const date = new Date(base.getTime() - 3_600_000); // exactly 1 hour
    expect(formatRelativeTime(date, base)).toBe('1 hour ago');
  });

  it('9. should return "in X hours" for hours in the future', () => {
    const date = new Date(base.getTime() + 5 * 3_600_000); // 5 hours ahead
    expect(formatRelativeTime(date, base)).toBe('in 5 hours');
  });

  it('10. should return "X days ago" for days in the past', () => {
    const date = new Date(base.getTime() - 3 * 86_400_000); // 3 days ago
    expect(formatRelativeTime(date, base)).toBe('3 days ago');
  });

  it('11. should return "in X months" for months in the future', () => {
    const date = new Date(base.getTime() + 3 * 30 * 86_400_000); // ~3 months ahead
    expect(formatRelativeTime(date, base)).toBe('in 3 months');
  });

  it('12. should return "X years ago" for years in the past', () => {
    const date = new Date(base.getTime() - 3 * 365 * 86_400_000); // ~3 years ago
    expect(formatRelativeTime(date, base)).toBe('3 years ago');
  });

  it('13. should return "1 day ago" (singular)', () => {
    const date = new Date(base.getTime() - 86_400_000); // exactly 1 day ago
    expect(formatRelativeTime(date, base)).toBe('1 day ago');
  });

  it('14. should return "in 1 day" (singular, future)', () => {
    const date = new Date(base.getTime() + 86_400_000); // exactly 1 day ahead
    expect(formatRelativeTime(date, base)).toBe('in 1 day');
  });

  it('15. should return "in X days" (plural, future)', () => {
    const date = new Date(base.getTime() + 5 * 86_400_000); // 5 days ahead
    expect(formatRelativeTime(date, base)).toBe('in 5 days');
  });

  it('16. should return "1 month ago" (singular)', () => {
    const date = new Date(base.getTime() - 30 * 86_400_000); // ~1 month ago
    expect(formatRelativeTime(date, base)).toBe('1 month ago');
  });

  it('17. should return "in 1 month" (singular, future)', () => {
    const date = new Date(base.getTime() + 30 * 86_400_000); // ~1 month ahead
    expect(formatRelativeTime(date, base)).toBe('in 1 month');
  });

  it('18. should return "in X months" (plural, future)', () => {
    const date = new Date(base.getTime() + 4 * 30 * 86_400_000); // ~4 months ahead
    expect(formatRelativeTime(date, base)).toBe('in 4 months');
  });

  it('19. should return "1 year ago" (singular)', () => {
    const date = new Date(base.getTime() - 365 * 86_400_000); // ~1 year ago
    expect(formatRelativeTime(date, base)).toBe('1 year ago');
  });

  it('20. should return "in 1 year" (singular, future)', () => {
    const date = new Date(base.getTime() + 365 * 86_400_000); // ~1 year ahead
    expect(formatRelativeTime(date, base)).toBe('in 1 year');
  });

  it('21. should return "in X years" (plural, future)', () => {
    const date = new Date(base.getTime() + 3 * 365 * 86_400_000); // ~3 years ahead
    expect(formatRelativeTime(date, base)).toBe('in 3 years');
  });

  it('22. should use current time as default baseDate', () => {
    // A date 2 hours ago relative to now
    const twoHoursAgo = new Date(Date.now() - 2 * 3_600_000);
    expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');
  });

  it('23. should throw Error for invalid date', () => {
    expect(() => formatRelativeTime(new Date('invalid'), base)).toThrow(
      'Invalid date',
    );
  });

  it('24. should throw Error for invalid baseDate', () => {
    expect(() => formatRelativeTime(base, new Date('invalid'))).toThrow(
      'Invalid baseDate',
    );
  });
});
