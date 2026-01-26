# @ts-utilkit/parsing

parsing  Functions - TypeScript utility functions for parsing operations.

## Installation

```bash
npm install @ts-utilkit/parsing
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (7)

- **`parseCSVLine`** - Parses a single CSV line into array of values
- **`parseDataSize`** - Parses human-readable data size to bytes (e.g., "5MB" → 5242880)
- **`parseDuration`** - Parses duration string to milliseconds (e.g., "1h 30m" → 5400000)
- **`parseEnvFile`** - Parses .env file format into key-value object
- **`parseINI`** - Parses INI configuration file format
- **`parseKeyValue`** - Parses key=value format strings
- **`parseLogLine`** - Parses structured log lines into components

## Usage Examples

```typescript
import { parseCSV, parseINI, parseQueryString } from '@ts-utilkit/parsing';

// Parse CSV data
const csv = 'name,age,city\nJohn,30,NYC\nJane,25,LA';
const data = parseCSV(csv);
// Result: [
//   { name: 'John', age: '30', city: 'NYC' },
//   { name: 'Jane', age: '25', city: 'LA' }
// ]

// Parse INI configuration
const ini = `
[database]
host=localhost
port=5432
`;
const config = parseINI(ini);
// Result: { database: { host: 'localhost', port: '5432' } }

// Parse query string
const qs = parseQueryString('page=2&sort=date&order=desc');
// Result: { page: '2', sort: 'date', order: 'desc' }
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
