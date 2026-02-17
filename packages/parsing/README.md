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

## Quick Example

```typescript
import { parseCSV, parseJSON, parseQueryString, parseURL } from '@ts-utilkit/parsing';

parseCSV('a,b\n1,2');                // [{a: '1', b: '2'}]
parseJSON('{"a":1}');                // {a: 1}
parseQueryString('page=2&sort=asc'); // {page: '2', sort: 'asc'}
parseURL('https://example.com/path');// {protocol: 'https:', host: 'example.com', ...}
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
