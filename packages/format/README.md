# @ts-utilkit/format

format Functions - TypeScript utility functions for format operations.

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

## Quick Example

```typescript
import {
  formatNumber,
  formatCurrency,
  formatBytes,
  pluralize,
} from '@ts-utilkit/format';

formatNumber(1234567.89); // "1,234,567.89"
formatCurrency(99.99, 'USD'); // "$99.99"
formatBytes(1536000); // "1.46 MB"
pluralize('item', 5); // "items"
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
