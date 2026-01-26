# @ts-utilkit/date

date  Functions - TypeScript utility functions for date operations.

## Installation

```bash
npm install @ts-utilkit/date
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (31)

- **`addDays`** - Adds a specified number of days to a date
- **`addMonths`** - Adds a specified number of months to a date
- **`businessDaysBetween`** - Calculates business days between two dates
- **`calculateAge`** - Calculates age from date of birth
- **`compareDates`** - Compares two dates (returns -1, 0, or 1)
- **`daysBetween`** - Calculates days between two dates
- **`daysLeftInYear`** - Calculates days remaining in the year
- **`formatDate`** - Formats a date according to a pattern
- **`getCurrentDateTimeISO`** - Gets current date/time in ISO 8601 format
- **`getDateParts`** - Extracts year, month, day components from date
- **`getDaysInMonth`** - Gets the number of days in a specific month
- **`getDaysOfWeek`** - Gets all days of a specific week
- **`getEndOfMonth`** - Gets the last day of the month
- **`getEndOfWeek`** - Gets the end of the week (Sunday)
- **`getEndOfYear`** - Gets the last day of the year (Dec 31)
- **`getISOWeekDate`** - Gets ISO 8601 week date format
- **`getLastDayOfPreviousMonth`** - Gets the last day of previous month
- **`getNextMonth`** - Advances to next month
- **`getNextOccurrence`** - Finds next occurrence of a specific weekday
- **`getPreviousMonth`** - Goes back to previous month
- **`getQuarter`** - Gets the quarter of the year (1-4)
- **`getStartOfWeek`** - Gets the start of the week (Monday)
- **`getStartOfYear`** - Gets the first day of the year (Jan 1)
- **`getWeekNumber`** - Gets ISO week number (1-53)
- **`getWeekRange`** - Gets start and end dates of a week
- **`getWeekdaysInMonth`** - Gets all weekdays in a specific month
- **`isLeapYear`** - Checks if a year is a leap year
- **`isToday`** - Checks if a date is today
- **`isWeekend`** - Checks if a date falls on a weekend (Sat/Sun)
- **`oneWeekAgo`** - Gets the date from one week ago
- **`toUTCDate`** - Converts a date to UTC

## Usage Examples

```typescript
import { addDays, formatDate, dateDiff, isLeapYear } from '@ts-utilkit/date';

// Date arithmetic
const tomorrow = addDays(new Date(), 1);
// Result: Date object for tomorrow

// Date formatting
const formatted = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
// Result: "2024-03-15 14:30:00"

// Date difference
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-12-31');
const days = dateDiff(date1, date2, 'days');
// Result: 365

// Leap year check
const isLeap = isLeapYear(2024);
// Result: true
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
