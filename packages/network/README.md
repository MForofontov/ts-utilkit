# @ts-utilkit/network

network  Functions - TypeScript utility functions for network operations.

## Installation

```bash
npm install @ts-utilkit/network
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (18)

- **`addQueryParams`** - Adds query parameters to a URL
- **`buildURL`** - Constructs a URL from components
- **`decodeURLComponent`** - Decodes a URL component
- **`encodeURLComponent`** - Encodes a URL component
- **`extractDomain`** - Extracts the domain from a URL
- **`getDomainParts`** - Parses domain into subdomain, domain, and TLD
- **`getQueryParams`** - Extracts query parameters from a URL
- **`getURLPath`** - Extracts the path from a URL
- **`getURLsFromText`** - Extracts all URLs from text
- **`isLocalhost`** - Checks if URL is localhost
- **`isSameOrigin`** - Checks if two URLs have the same origin
- **`isSubdomain`** - Checks if URL is a subdomain of another
- **`isValidURL`** - Validates if a string is a valid URL
- **`joinURLPaths`** - Joins URL path segments
- **`normalizeURL`** - Normalizes a URL (removes trailing slashes, etc.)
- **`parseURL`** - Parses a URL into its components
- **`removeQueryParams`** - Removes query parameters from a URL
- **`sanitizeURL`** - Sanitizes URL by removing dangerous protocols

## Usage Examples

```typescript
import { parseURL, addQueryParams, getQueryParams, normalizeURL } from '@ts-utilkit/network';

// Parse URL
const parsed = parseURL('https://example.com/path?foo=bar#section');
// Result: { protocol: 'https:', host: 'example.com', path: '/path', ... }

// Add query parameters
const url = addQueryParams('https://api.example.com/search', {
  q: 'typescript',
  limit: 10
});
// Result: "https://api.example.com/search?q=typescript&limit=10"

// Extract query parameters
const params = getQueryParams('https://example.com?page=2&sort=date');
// Result: { page: '2', sort: 'date' }

// Normalize URL
const normalized = normalizeURL('https://example.com//path///to//page/');
// Result: "https://example.com/path/to/page"
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
