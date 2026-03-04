# Changelog - @ts-utilkit/date

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files

### Deprecated

- `getCurrentDateTimeISO`: thin wrapper around `new Date().toISOString()`; use that directly. Will be removed in the next major version.
- `oneWeekAgo`: convenience alias for `addDays(date, -7)`; use that call directly. Will be removed in the next major version.
- `formatRelativeTime`: use `formatRelativeTime` from `@ts-utilkit/format` instead. The format package version is the canonical implementation and accepts `Date | string | number`. Will be removed in the next major version.

### Added

- Add `isAfter(d1, d2)` — returns `true` if `d1` is strictly after `d2` (millisecond precision)
- Add `isBefore(d1, d2)` — returns `true` if `d1` is strictly before `d2` (millisecond precision)
- Add `isSameDay(d1, d2)` — returns `true` if both dates share the same year, month, and day (ignores time)
- Add `isSameMonth(d1, d2)` — returns `true` if both dates share the same year and month
- Add `isSameYear(d1, d2)` — returns `true` if both dates share the same year
- Add `isYesterday(date)` — returns `true` if the date falls on yesterday's calendar date
- Add `isTomorrow(date)` — returns `true` if the date falls on tomorrow's calendar date
- Add `addHours(date, hours)` — adds a number of hours (sub-day arithmetic)
- Add `addMinutes(date, minutes)` — adds a number of minutes (sub-day arithmetic)
- Add `addSeconds(date, seconds)` — adds a number of seconds (sub-day arithmetic)
- Add `subtractDays(date, n)` — explicit named complement to `addDays(date, -n)`
- Add `subtractMonths(date, n)` — explicit named complement to `addMonths(date, -n)`
- Add `addYears(date, years)` — adds or subtracts a number of years, handles leap-day overflow
- Add `getStartOfDay(date)` — returns a new Date at 00:00:00.000 of the same day
- Add `getEndOfDay(date)` — returns a new Date at 23:59:59.999 of the same day
- Add `getStartOfMonth(date)` — returns a new Date at the first day of the month at midnight
- Add `formatRelativeTime(date, baseDate?)` — formats the difference as a human-readable string (e.g., "2 hours ago", "in 3 days")
- Add `fromUnixTimestamp(ts)` — converts a Unix timestamp (seconds) to a `Date` object
- Add `toUnixTimestamp(date)` — converts a `Date` to a Unix timestamp (whole seconds, floor)

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/date with 26 functions
- Date arithmetic: `addDays`, `addMonths`, `addYears`, `subtractDays`, `subtractMonths`, `subtractYears`
- Date calculations: `daysBetween`, `minutesBetween`, `monthsBetween`, `secondsBetween`, `yearsBetween`, `calculateAge`
- Date formatting: `formatDate`, `formatToISODate`, `formatToISOTime`, `parseDateToISO`
- Date properties: `getDayOfWeek`, `getDayOfYear`, `getFirstDayOfMonth`, `getLastDayOfMonth`, `getQuarter`, `getWeekOfYear`
- Date validation: `isValidDate`, `isLeapYear`
- Date manipulation: `setDayOfMonth`, `parseDate`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
