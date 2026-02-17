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

## Quick Example

```typescript
import { isValidIPv4, isValidUUID, isInRange, isValidJSON } from '@ts-utilkit/validation';

isValidIPv4('192.168.1.1');          // true
isValidUUID('550e8400-...');         // true
isInRange(50, 0, 100);               // true
isValidJSON('{"a":1}');              // true
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
