# @ts-utilkit/validation

validation  Functions - TypeScript utility functions for validation operations.

## Installation

```bash
npm install @ts-utilkit/validation
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (13)

- **`isInRange`** - Checks if a number is within a specified range
- **`isValidCreditCard`** - Validates credit card number format (Luhn algorithm)
- **`isValidHexColor`** - Validates hexadecimal color format (#RGB, #RRGGBB)
- **`isValidIPv4`** - Validates IPv4 address format
- **`isValidIPv6`** - Validates IPv6 address format
- **`isValidISODate`** - Validates ISO 8601 date format
- **`isValidJSON`** - Checks if a string is valid JSON
- **`isValidMACAddress`** - Validates MAC address format
- **`isValidPattern`** - Tests if a string matches a custom regex pattern
- **`isValidRegex`** - Checks if a string is a valid regular expression
- **`isValidSlug`** - Validates URL-friendly slug format
- **`isValidTime`** - Validates time format (HH:MM or HH:MM:SS)
- **`isValidUUID`** - Validates UUID format (v1, v3, v4, v5)

## Usage Examples

```typescript
import { isValidIPv4, isValidUUID, isInRange, isValidJSON } from '@ts-utilkit/validation';

// IP address validation
const isValid = isValidIPv4('192.168.1.1');
// Result: true

// UUID validation
const isValidId = isValidUUID('550e8400-e29b-41d4-a716-446655440000');
// Result: true

// Range validation
const isInBounds = isInRange(50, 0, 100);
// Result: true

// JSON validation
const jsonStr = '{"name": "John", "age": 30}';
const isValidJsonStr = isValidJSON(jsonStr);
// Result: true
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
