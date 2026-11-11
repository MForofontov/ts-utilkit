# @ts-utilkit/encoding

encoding Functions - TypeScript utility functions for encoding operations.

## Installation

```bash
npm install @ts-utilkit/encoding
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (8)

- **`encodeBase64`** - Encodes a string to Base64
- **`decodeBase64`** - Decodes a Base64 string

## Additional exports

- **`decodeBase32`** — Decodes a Base32-encoded string (RFC 4648) back to a UTF-8 string.
- **`decodeBase64URL`** — Decodes a Base64URL-encoded string back to a UTF-8 string.
- **`decodeHex`** — Decodes a hexadecimal string back to a UTF-8 string.
- **`encodeBase32`** — Encodes a UTF-8 string as a Base32 string per RFC 4648.
- **`encodeBase64URL`** — Encodes a UTF-8 string as a URL-safe Base64 string with no padding characters.
- **`encodeHex`** — Encodes a UTF-8 string as a lowercase hexadecimal string.

## Quick Example

```typescript
import { encodeBase64, decodeBase64 } from '@ts-utilkit/encoding';

encodeBase64('Hello, World!'); // "SGVsbG8sIFdvcmxkIQ=="
decodeBase64('SGVsbG8sIFdvcmxkIQ=='); // "Hello, World!"
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
