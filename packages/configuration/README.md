# @ts-utilkit/configuration

configuration  Functions - TypeScript utility functions for configuration operations.

## Installation

```bash
npm install @ts-utilkit/configuration
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (12)

- **`deepMergeConfig`** - Deep merges multiple configuration objects
- **`freezeConfig`** - Recursively freezes a configuration object
- **`getConfigValue`** - Gets a configuration value by key path
- **`getEnv`** - Gets an environment variable with optional default
- **`parseEnvArray`** - Parses a comma-separated environment variable as array
- **`parseEnvBool`** - Parses an environment variable as boolean
- **`parseEnvFloat`** - Parses an environment variable as float
- **`parseEnvInt`** - Parses an environment variable as integer
- **`parseEnvJSON`** - Parses an environment variable as JSON
- **`requireEnv`** - Gets a required environment variable or throws
- **`setConfigValue`** - Sets a configuration value by key path
- **`validateConfig`** - Validates configuration object against schema

## Quick Example

```typescript
import { getEnv, requireEnv, parseEnvInt, parseEnvBool } from '@ts-utilkit/configuration';

getEnv('PORT', '3000');              // Get with default
requireEnv('API_KEY');               // Required or throws
parseEnvInt('MAX_CONN', 100);        // Parse as integer
parseEnvBool('DEBUG', false);        // Parse as boolean
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
