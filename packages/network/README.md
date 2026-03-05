# @ts-utilkit/network

network Functions - TypeScript utility functions for network operations.

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

## Quick Example

```typescript
import { isValidURL, isValidIP, getURLParams } from '@ts-utilkit/network';

isValidURL('https://example.com'); // true
isValidIP('192.168.1.1'); // true
getURLParams('?page=2&sort=date'); // {page: '2', sort: 'date'}
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
