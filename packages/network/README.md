# @ts-utilkit/network

network Functions - TypeScript utility functions for network operations.

## Installation

```bash
npm install @ts-utilkit/network
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (22)

- **`addQueryParams`** - Adds query parameters to a URL
- **`buildURL`** - Constructs a URL from components
- **`decodeURLComponent`** - Decodes a URL component
- **`encodeURLComponent`** - Encodes a URL component
- **`extractDomain`** - Extracts the domain from a URL
- **`getDomainParts`** - Parses domain into subdomain, domain, and TLD
- **`getQueryParams`** - Extracts query parameters from a URL
- **`getURLPath`** - Extracts the path from a URL
- **`getURLsFromText`** - Extracts all URLs from text
- **`hasQueryParam`** - Checks whether a query parameter with the given key exists in a URL.
- **`isAbsoluteURL`** - Determines whether a URL string is absolute (has a scheme/protocol).
- **`isLocalhost`** - Checks if URL is localhost
- **`isRelativeURL`** - Determines whether a URL string is relative (has no scheme/protocol).
- **`isSameOrigin`** - Checks if two URLs have the same origin
- **`isSubdomain`** - Checks if URL is a subdomain of another
- **`isValidURL`** - Validates if a string is a valid URL
- **`joinURLPaths`** - Joins URL path segments
- **`normalizeURL`** - Normalizes a URL (removes trailing slashes, etc.)
- **`parseURL`** - Parses a URL into its components
- **`removeQueryParams`** - Removes query parameters from a URL
- **`sanitizeURL`** - Sanitizes URL by removing dangerous protocols
- **`setURLFragment`** - Sets or replaces the fragment (hash) of a URL and returns the updated URL string.

## Quick Example

```typescript
import {
  isValidURL,
  getQueryParams,
  joinURLPaths,
  normalizeURL,
} from '@ts-utilkit/network';

isValidURL('https://example.com'); // true
getQueryParams('https://example.com/?page=2&sort=date'); // {page: '2', sort: 'date'}
joinURLPaths('/api//v1', 'users'); // '/api/v1/users'
normalizeURL('https://example.com/?tag=&tag=one&b=2'); // 'https://example.com/?b=2&tag=one'
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
