# @ts-utilkit/webscraping

web Scraping  Functions - TypeScript utility functions for webscraping operations.

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

## Usage Examples

```typescript
import { extractLinks, extractMetaTags, extractTable, querySelector } from '@ts-utilkit/webscraping';

// Extract all links from a webpage
const html = '<a href="/about">About</a><a href="https://example.com">External</a>';
const links = extractLinks(html);
// Result: ['/about', 'https://example.com']

// Extract meta tags
const metaTags = extractMetaTags(html);
// Result: { description: '...', keywords: '...', author: '...' }

// Extract table data
const tableHtml = `
<table>
  <tr><th>Name</th><th>Age</th></tr>
  <tr><td>John</td><td>30</td></tr>
  <tr><td>Jane</td><td>25</td></tr>
</table>
`;
const tableData = extractTable(tableHtml);
// Result: [
//   { Name: 'John', Age: '30' },
//   { Name: 'Jane', Age: '25' }
// ]

// CSS selector querying
const element = querySelector(html, '.article-title');
const title = getElementText(element);
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
