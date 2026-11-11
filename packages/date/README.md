# @ts-utilkit/date

date Functions - TypeScript utility functions for date operations.

## Installation

```bash
npm install @ts-utilkit/date
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (51)

- **`addBusinessDays`** - Adds signed Monday–Friday business days, preserving local time and the input.
- **`addDays`** - Adds a specified number of days to a date
- **`addHours`** - Adds a specified number of hours to a Date object.
- **`addMinutes`** - Adds a specified number of minutes to a Date object.
- **`addMonths`** - Adds a specified number of months to a date
- **`addSeconds`** - Adds a specified number of seconds to a Date object.
- **`addYears`** - Adds a specified number of years to a Date object.
- **`businessDaysBetween`** - Calculates business days between two dates
- **`calculateAge`** - Calculates age from date of birth
- **`compareDates`** - Compares two dates (returns -1, 0, or 1)
- **`daysBetween`** - Calculates days between two dates
- **`daysLeftInYear`** - Counts elapsed 24-hour periods to December 31 midnight, rounded upward.
- **`formatDate`** - Formats a date according to a pattern
- **`formatRelativeTime`** - Formats the difference between a date and an optional base date as a human-readable
- **`fromUnixTimestamp`** - Converts a Unix timestamp (seconds since the Unix epoch) to a `Date` object.
- **`getCurrentDateTimeISO`** - Gets current date/time in ISO 8601 format
- **`getDateParts`** - Extracts year, month, day components from date
- **`getDaysInMonth`** - Gets the number of days in a specific month
- **`getDaysOfWeek`** - Gets all days of a specific week
- **`getEndOfDay`** - Returns a new Date set to the very end of the given day (23:59:59.999 local time).
- **`getEndOfMonth`** - Gets the last day of the month
- **`getEndOfWeek`** - Gets the end of the week (Sunday)
- **`getEndOfYear`** - Gets the last day of the year (Dec 31)
- **`getISOWeekDate`** - Gets ISO 8601 week date format
- **`getLastDayOfPreviousMonth`** - Gets the last day of previous month
- **`getNextMonth`** - Advances to next month
- **`getNextOccurrence`** - Finds next occurrence of a specific weekday
- **`getPreviousMonth`** - Goes back to previous month
- **`getQuarter`** - Gets the quarter of the year (1-4)
- **`getStartOfDay`** - Returns a new Date set to the very start of the given day (00:00:00.000 local time).
- **`getStartOfMonth`** - Returns a new Date set to the first day of the given date's month at midnight (00:00:00.000).
- **`getStartOfWeek`** - Gets the start of the week (Monday)
- **`getStartOfYear`** - Gets the first day of the year (Jan 1)
- **`getWeekNumber`** - Gets the simplified January-1-based week number (not ISO).
- **`getWeekRange`** - Gets start and end dates of a week
- **`getWeekdaysInMonth`** - Counts Monday-through-Friday dates in the month.
- **`isAfter`** - Returns `true` if `date1` is strictly after `date2` (millisecond precision).
- **`isBefore`** - Returns `true` if `date1` is strictly before `date2` (millisecond precision).
- **`isLeapYear`** - Checks if a year is a leap year
- **`isSameDay`** - Returns `true` if two dates fall on the same calendar day (year, month, and day of month),
- **`isSameMonth`** - Returns `true` if two dates fall within the same calendar month of the same year.
- **`isSameYear`** - Returns `true` if two dates fall within the same calendar year.
- **`isToday`** - Checks if a date is today
- **`isTomorrow`** - Returns `true` if the given date falls on tomorrow's calendar date (ignoring time).
- **`isWeekend`** - Checks if a date falls on a weekend (Sat/Sun)
- **`isYesterday`** - Returns `true` if the given date falls on yesterday's calendar date (ignoring time).
- **`oneWeekAgo`** - Gets the date from one week ago
- **`subtractDays`** - Subtracts a specified number of days from a Date object.
- **`subtractMonths`** - Subtracts a specified number of months from a Date object.
- **`toUTCDate`** - Reinterprets local calendar values as UTC.
- **`toUnixTimestamp`** - Converts a `Date` object to a Unix timestamp (whole seconds since the Unix epoch).

## Quick Example

```typescript
import {
  addDays,
  formatDate,
  daysBetween,
  getWeekNumber,
  isLeapYear,
} from '@ts-utilkit/date';

const start = new Date(2024, 0, 1);
const end = addDays(start, 7);
formatDate(start, 'YYYY-MM-DD'); // '2024-01-01'
daysBetween(start, end); // 7
getWeekNumber(start); // 1 (simplified week numbering)
isLeapYear(2024); // true
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Added utilities

- **`addBusinessDays`** — see the signature, examples, and contract in [addBusinessDays.ts](src/addBusinessDays.ts).

Full examples and boundary behavior are documented in [FUNCTION_IDEAS.md](../../FUNCTION_IDEAS.md).
