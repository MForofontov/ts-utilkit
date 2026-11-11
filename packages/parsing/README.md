# @ts-utilkit/parsing

parsing Functions - TypeScript utility functions for parsing operations.

## Installation

```bash
npm install @ts-utilkit/parsing
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (8)

- **`parseCSVLine`** - Parses a single CSV line into array of values
- **`parseDataSize`** - Parses human-readable data size to bytes (e.g., "5MB" → 5242880)
- **`parseDuration`** - Parses duration string to milliseconds (e.g., "1h 30m" → 5400000)
- **`parseEnvFile`** - Parses .env file format into key-value object
- **`parseHTTPHeaders`** - Parses a raw HTTP header block (a multi-line string of `"Name: Value"` lines)
- **`parseINI`** - Parses INI configuration file format
- **`parseKeyValue`** - Parses key=value format strings
- **`parseLogLine`** - Parses structured log lines into components

## Quick Example

```typescript
import {
  parseCSVLine,
  parseDuration,
  parseDataSize,
  parseKeyValue,
} from '@ts-utilkit/parsing';

parseCSVLine('a,"b,c"'); // ['a', 'b,c']
parseDuration('1h 30m'); // 5400000
parseDataSize('5MB'); // 5242880
parseKeyValue('name=Alice'); // { name: 'Alice' }
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
