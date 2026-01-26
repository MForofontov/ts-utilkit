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

## Usage Examples

```typescript
import { 
  getEnv, 
  getEnvRequired, 
  parseEnvInt, 
  parseEnvBoolean 
} from '@ts-utilkit/configuration';

// Get environment variable with default
const port = getEnv('PORT', '3000');
// Result: '3000' if PORT is not set

// Require environment variable
const apiKey = getEnvRequired('API_KEY');
// Throws if API_KEY is not set

// Parse as integer
const maxConnections = parseEnvInt('MAX_CONNECTIONS', 100);
// Result: 100 if not set or invalid

// Parse as boolean
const debug = parseEnvBoolean('DEBUG', false);
// Supports: 'true', '1', 'yes', 'on' → true
//          'false', '0', 'no', 'off' → false

// Real-world configuration setup
const config = {
  server: {
    port: parseEnvInt('PORT', 3000),
    host: getEnv('HOST', 'localhost')
  },
  database: {
    url: getEnvRequired('DATABASE_URL'),
    poolSize: parseEnvInt('DB_POOL_SIZE', 10)
  },
  features: {
    enableCache: parseEnvBoolean('ENABLE_CACHE', true)
  }
};
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
