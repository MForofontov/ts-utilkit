# @ts-utilkit/format

format  Functions - TypeScript utility functions for format operations.

## Installation

```bash
npm install @ts-utilkit/format
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (8)

- **`formatBytes`** - Formats a byte count as human-readable file size (KB, MB, GB)
- **`formatCurrency`** - Formats a number as currency with symbol
- **`formatDuration`** - Formats milliseconds as duration (e.g., "1h 23m 45s")
- **`formatNumber`** - Formats a number with thousands separators and decimals
- **`formatOrdinal`** - Formats a number as ordinal (1st, 2nd, 3rd, etc.)
- **`formatPercentage`** - Formats a number as a percentage
- **`formatPlural`** - Pluralizes a word based on count
- **`formatScientific`** - Formats a number in scientific notation

## Usage Examples

```typescript
import { formatNumber, formatCurrency, formatFileSize, pluralize } from '@ts-utilkit/format';

// Number formatting with thousands separators
const formatted = formatNumber(1234567.89, { decimals: 2 });
// Result: "1,234,567.89"

// Currency formatting
const price = formatCurrency(99.99, { currency: 'USD', locale: 'en-US' });
// Result: "$99.99"

// File size formatting
const size = formatFileSize(1536000);
// Result: "1.46 MB"

// Pluralization
const message = `You have ${count} ${pluralize('item', count)}`;
// Result: "You have 5 items" or "You have 1 item"
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
