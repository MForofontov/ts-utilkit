# @ts-utilkit/format

format Functions - TypeScript utility functions for format operations.

## Installation

```bash
npm install @ts-utilkit/format
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (11)

- **`formatBytes`** - Formats a byte count as human-readable file size (KB, MB, GB)
- **`formatCurrency`** - Formats a number as currency with symbol
- **`formatDuration`** - Formats milliseconds as duration (e.g., "1h 23m 45s")
- **`formatNumber`** - Formats a number with thousands separators and decimals
- **`formatOrdinal`** - Formats a number as ordinal (1st, 2nd, 3rd, etc.)
- **`formatPercentage`** - Formats a number as a percentage
- **`formatPlural`** - Pluralizes a word based on count
- **`formatScientific`** - Formats a number in scientific notation

## Additional exports

- **`formatList`** — Formats an array of strings into a human-readable list using locale-aware conjunction rules. Wraps `Intl.ListFormat` to produce natural-language list strings like "Alice, Bob, and Carol".
- **`formatRelativeTime`** — Formats the difference between two dates into a human-friendly relative time string. Returns natural-language phrases such as "just now", "3 minutes ago", "yesterday", "last week", "in 2 hours", and "next month".
- **`formatTemperature`** — Converts a temperature value between Celsius, Fahrenheit, and Kelvin and returns a formatted string with the appropriate unit symbol.

## Quick Example

```typescript
import {
  formatNumber,
  formatCurrency,
  formatBytes,
  formatPlural,
} from '@ts-utilkit/format';

formatNumber(1234567.89, 2); // "1,234,567.89"
formatCurrency(99.99, 'USD'); // "$99.99"
formatBytes(1536000); // "1.46 MB"
formatPlural(5, 'item', undefined, false); // "items"
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
