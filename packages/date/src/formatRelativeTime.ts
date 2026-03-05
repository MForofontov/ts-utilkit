/**
 * Formats the difference between a date and an optional base date as a human-readable
 * relative time string such as `"2 hours ago"` or `"in 3 days"`.
 *
 * @deprecated Use `formatRelativeTime` from `@ts-utilkit/format` instead.
 * The format package version accepts `Date | string | number` and is the canonical implementation.
 * Will be removed in the next major version.
 *
 * @param date - The Date to express relative to `baseDate`.
 * @param baseDate - The reference point for the comparison (default: `new Date()`).
 * @returns A human-readable relative time string.
 *
 * @throws {Error} If `date` is invalid (e.g., new Date('invalid')).
 * @throws {Error} If `baseDate` is invalid.
 *
 * @example
 * // A moment ago
 * const base = new Date('2025-01-01T12:00:00');
 * formatRelativeTime(new Date('2025-01-01T12:00:30'), base); // "just now"
 *
 * @example
 * // Minutes in the past
 * const base = new Date('2025-01-01T12:00:00');
 * formatRelativeTime(new Date('2025-01-01T11:45:00'), base); // "15 minutes ago"
 *
 * @example
 * // Hours in the future
 * const base = new Date('2025-01-01T12:00:00');
 * formatRelativeTime(new Date('2025-01-01T15:00:00'), base); // "in 3 hours"
 *
 * @example
 * // Days in the past
 * const base = new Date('2025-01-10T12:00:00');
 * formatRelativeTime(new Date('2025-01-07T12:00:00'), base); // "3 days ago"
 *
 * @example
 * // Months in the future
 * const base = new Date('2025-01-01');
 * formatRelativeTime(new Date('2025-04-01'), base); // "in 3 months"
 *
 * @example
 * // Years in the past
 * const base = new Date('2025-01-01');
 * formatRelativeTime(new Date('2022-01-01'), base); // "3 years ago"
 *
 * @note Thresholds: <60s → "just now"; <60m → minutes; <24h → hours;
 *   <30d → days; <12mo → months; otherwise → years.
 * @note Singular forms are used automatically (e.g., "1 minute ago", not "1 minutes ago").
 * @note "just now" is returned for differences under 60 seconds in either direction.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatRelativeTime(
  date: Date,
  baseDate: Date = new Date(),
): string {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(baseDate.getTime())) {
    throw new Error('Invalid baseDate');
  }

  const diffMs = date.getTime() - baseDate.getTime();
  const absDiffMs = Math.abs(diffMs);
  const isFuture = diffMs > 0;

  const seconds = Math.round(absDiffMs / 1_000);
  const minutes = Math.round(absDiffMs / 60_000);
  const hours = Math.round(absDiffMs / 3_600_000);
  const days = Math.round(absDiffMs / 86_400_000);
  const months = Math.round(absDiffMs / (30 * 86_400_000));
  const years = Math.round(absDiffMs / (365 * 86_400_000));

  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    const label = minutes === 1 ? '1 minute' : `${minutes} minutes`;
    return isFuture ? `in ${label}` : `${label} ago`;
  } else if (hours < 24) {
    const label = hours === 1 ? '1 hour' : `${hours} hours`;
    return isFuture ? `in ${label}` : `${label} ago`;
  } else if (days < 30) {
    const label = days === 1 ? '1 day' : `${days} days`;
    return isFuture ? `in ${label}` : `${label} ago`;
  } else if (months < 12) {
    const label = months === 1 ? '1 month' : `${months} months`;
    return isFuture ? `in ${label}` : `${label} ago`;
  } else {
    const label = years === 1 ? '1 year' : `${years} years`;
    return isFuture ? `in ${label}` : `${label} ago`;
  }
}
