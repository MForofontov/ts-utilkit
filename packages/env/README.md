# @ts-utilkit/env

Environment variable utilities for parsing and validation.

## Installation

```bash
npm install @ts-utilkit/env
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe environment variable parsing
- 📖 Extensive JSDoc documentation

## Available Functions (7)

- **`getEnv`** - Gets an environment variable with optional default
- **`requireEnv`** - Gets a required environment variable or throws
- **`parseEnvInt`** - Parses an environment variable as integer
- **`parseEnvBool`** - Parses an environment variable as boolean
- **`parseEnvFloat`** - Parses an environment variable as float
- **`parseEnvArray`** - Parses a comma-separated environment variable as array
- **`parseEnvJSON`** - Parses an environment variable as JSON

## Quick Example

```typescript
import { getEnv, requireEnv, parseEnvInt, parseEnvBool } from '@ts-utilkit/env';

// Get environment variable with default
const port = getEnv('PORT', '3000'); // '3000' if PORT not set

// Require environment variable (throws if missing)
const apiKey = requireEnv('API_KEY'); // Throws if API_KEY not set

// Parse as integer
const maxConnections = parseEnvInt('MAX_CONN', 100); // 100 if not set or invalid

// Parse as boolean (true/false, 1/0, yes/no)
const debugMode = parseEnvBool('DEBUG', false); // false if not set

// Parse JSON
const config = parseEnvJSON('APP_CONFIG', { timeout: 30 });

// Parse array
const allowedHosts = parseEnvArray('ALLOWED_HOSTS', ['localhost']);
```

## Migration from @ts-utilkit/configuration

This package contains the environment variable functions that were previously in `@ts-utilkit/configuration`:

```typescript
// Old (deprecated)
import { getEnv, requireEnv } from '@ts-utilkit/configuration';

// New
import { getEnv, requireEnv } from '@ts-utilkit/env';
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
