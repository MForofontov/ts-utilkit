# @ts-utilkit/webscraping

web Scraping Functions - TypeScript utility functions for webscraping operations.

## Installation

```bash
npm install @ts-utilkit/webscraping
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (16)

- **`extractComments`** - Extracts HTML comments from content
- **`extractEmails`** - Extracts email addresses from HTML
- **`extractHeaders`** - Extracts header tags (h1-h6) from HTML
- **`extractImages`** - Extracts all image sources from HTML
- **`extractLinks`** - Extracts all hyperlinks from HTML
- **`extractListItems`** - Extracts items from HTML lists (ul, ol)
- **`extractMetaTags`** - Extracts meta tags from HTML
- **`extractPhoneNumbers`** - Extracts phone numbers from HTML
- **`extractScripts`** - Extracts JavaScript from script tags
- **`extractStructuredData`** - Parses JSON-LD structured data
- **`extractStyles`** - Extracts CSS from style tags
- **`extractTables`** - Extracts data from HTML tables
- **`extractText`** - Extracts all text content from HTML
- **`fetchHTML`** - Fetches HTML content from a URL
- **`parseJSON`** - Parses JSON with error handling
- **`sanitizeHTML`** - Removes potentially dangerous HTML content

## Quick Example

```typescript
import { scrapeText } from '@ts-utilkit/webscraping';

// Extract text content from HTML
const html = '<div><p>Hello</p><p>World</p></div>';
const text = scrapeText(html); // 'Hello World'
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
