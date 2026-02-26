/**
 * Converts a date-like value into a Date object.
 * Accepts a Date, ISO/timestamp string, or Unix timestamp (milliseconds).
 */
function toDate(value: Date | string | number): Date {
  if (value instanceof Date) {
    return value;
  }
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date value: ${String(value)}`);
  }
  return d;
}

/**
 * Formats the difference between two dates into a human-friendly relative time string.
 * Returns natural-language phrases such as "just now", "3 minutes ago", "yesterday",
 * "last week", "in 2 hours", and "next month".
 *
 * This function is string/display focused and distinct from the `@ts-utilkit/date` package's
 * relative time utilities; it emphasises natural-language labels (yesterday, last month, etc.)
 * over precise numeric deltas.
 *
 * @param date - The date to describe. Accepts a `Date`, ISO 8601 string, or Unix timestamp (ms).
 * @param baseDate - The reference "now" date (default: current time). Accepts the same types as `date`.
 * @returns A human-friendly relative time string.
 *
 * @throws {TypeError} If date is not a Date, string, or number.
 * @throws {TypeError} If baseDate is provided but is not a Date, string, or number.
 * @throws {Error} If date represents an invalid date.
 * @throws {Error} If baseDate represents an invalid date.
 *
 * @example
 * // Just now (< 45 seconds)
 * formatRelativeTime(new Date(Date.now() - 10_000)); // Returns "just now"
 *
 * @example
 * // Minutes ago
 * formatRelativeTime(new Date(Date.now() - 5 * 60 * 1000)); // Returns "5 minutes ago"
 *
 * @example
 * // Yesterday
 * formatRelativeTime(new Date(Date.now() - 25 * 3600 * 1000)); // Returns "yesterday"
 *
 * @example
 * // Future: in X days
 * formatRelativeTime(new Date(Date.now() + 3 * 24 * 3600 * 1000)); // Returns "in 3 days"
 *
 * @note Thresholds (all relative to the absolute second difference):
 *  - < 45 s          → "just now"
 *  - < 90 s          → "1 minute ago" / "in 1 minute"
 *  - < 45 min        → "X minutes ago" / "in X minutes"
 *  - < 90 min        → "1 hour ago" / "in 1 hour"
 *  - < 22 h          → "X hours ago" / "in X hours"
 *  - < 36 h          → "yesterday" / "tomorrow"
 *  - < 26 days       → "X days ago" / "in X days"
 *  - < 45 days       → "last month" / "next month"
 *  - < 345 days      → "X months ago" / "in X months"
 *  - < 545 days      → "last year" / "next year"
 *  - else            → "X years ago" / "in X years"
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatRelativeTime(
  date: Date | string | number,
  baseDate: Date | string | number = new Date(),
): string {
  // Input validation
  const validTypes = ['object', 'string', 'number'];
  if (!validTypes.includes(typeof date) || date === null) {
    throw new TypeError(
      `date must be a Date, string, or number, got ${date === null ? 'null' : typeof date}`,
    );
  }
  if (
    baseDate !== undefined &&
    (!validTypes.includes(typeof baseDate) || baseDate === null)
  ) {
    throw new TypeError(
      `baseDate must be a Date, string, or number, got ${baseDate === null ? 'null' : typeof baseDate}`,
    );
  }

  const target = toDate(date);
  const base = toDate(baseDate);

  const diffMs = target.getTime() - base.getTime();
  const diffSec = diffMs / 1000;
  const absSec = Math.abs(diffSec);
  const isPast = diffSec < 0;

  // ── Thresholds ─────────────────────────────────────────────────────────────

  // < 45 seconds
  if (absSec < 45) {
    return 'just now';
  }

  // < 90 seconds → "1 minute"
  if (absSec < 90) {
    return isPast ? '1 minute ago' : 'in 1 minute';
  }

  // < 45 minutes → "X minutes"
  const absMin = absSec / 60;
  if (absMin < 45) {
    const minutes = Math.round(absMin);
    return isPast ? `${minutes} minutes ago` : `in ${minutes} minutes`;
  }

  // < 90 minutes → "1 hour"
  if (absMin < 90) {
    return isPast ? '1 hour ago' : 'in 1 hour';
  }

  // < 22 hours → "X hours"
  const absHours = absMin / 60;
  if (absHours < 22) {
    const hours = Math.round(absHours);
    return isPast ? `${hours} hours ago` : `in ${hours} hours`;
  }

  // < 36 hours → "yesterday" / "tomorrow"
  if (absHours < 36) {
    return isPast ? 'yesterday' : 'tomorrow';
  }

  // < 26 days → "X days"
  const absDays = absHours / 24;
  if (absDays < 26) {
    const days = Math.round(absDays);
    return isPast ? `${days} days ago` : `in ${days} days`;
  }

  // < 45 days → "last month" / "next month"
  if (absDays < 45) {
    return isPast ? 'last month' : 'next month';
  }

  // < 345 days → "X months"
  if (absDays < 345) {
    const months = Math.round(absDays / 30.4375);
    return isPast ? `${months} months ago` : `in ${months} months`;
  }

  // < 545 days → "last year" / "next year"
  if (absDays < 545) {
    return isPast ? 'last year' : 'next year';
  }

  // ≥ 545 days → "X years"
  const years = Math.round(absDays / 365.25);
  return isPast ? `${years} years ago` : `in ${years} years`;
}
