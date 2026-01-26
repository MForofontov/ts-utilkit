# @ts-utilkit/encoding

encoding  Functions - TypeScript utility functions for encoding operations.

## Installation

```bash
npm install @ts-utilkit/encoding
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (2)

- **`encodeBase64`** - Encodes a string to Base64
- **`decodeBase64`** - Decodes a Base64 string

## Usage Examples

```typescript
import { encodeBase64, decodeBase64 } from '@ts-utilkit/encoding';

// Encode to Base64
const encoded = encodeBase64('Hello, World!');
// Result: "SGVsbG8sIFdvcmxkIQ=="

// Decode from Base64
const decoded = decodeBase64('SGVsbG8sIFdvcmxkIQ==');
// Result: "Hello, World!"

// Use case: API authentication tokens
const credentials = encodeBase64(`${username}:${password}`);
const authHeader = `Basic ${credentials}`;

// Use case: Data URI for images
const imageData = encodeBase64(imageBuffer);
const dataURI = `data:image/png;base64,${imageData}`;
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
