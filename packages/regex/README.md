# @ts-utilkit/regex

regex  Functions - TypeScript utility functions for regex operations.

## Installation

```bash
npm install @ts-utilkit/regex
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (15)

- **`buildPattern`** - Builds a regex pattern from components
- **`combinePatterns`** - Combines multiple regex patterns with alternation
- **`commonPatterns`** - Provides common regex patterns (email, URL, phone, etc.)
- **`countMatches`** - Counts the number of pattern matches in a string
- **`extractMatchGroups`** - Extracts capture groups from regex matches
- **`extractMatches`** - Extracts all matches of a pattern from text
- **`findAll`** - Finds all occurrences of a pattern with positions
- **`getPatternComplexity`** - Analyzes regex pattern complexity
- **`hasBacktracking`** - Checks if a regex pattern has potential backtracking issues
- **`highlightMatches`** - Highlights pattern matches in text with markers
- **`optimizePattern`** - Optimizes regex pattern for better performance
- **`replaceAll`** - Replaces all occurrences matching a pattern
- **`replaceWithCallback`** - Replaces matches using a callback function
- **`splitByPattern`** - Splits a string by a regex pattern
- **`testPattern`** - Tests if a string matches a regex pattern

## Usage Examples

```typescript
import { extractEmails, extractURLs, escapeRegex, matchAll } from '@ts-utilkit/regex';

// Extract emails from text
const text = 'Contact us at info@example.com or support@example.com';
const emails = extractEmails(text);
// Result: ['info@example.com', 'support@example.com']

// Extract URLs
const content = 'Visit https://example.com or http://test.org';
const urls = extractURLs(content);
// Result: ['https://example.com', 'http://test.org']

// Escape special characters for regex
const userInput = 'Price: $10.99';
const escaped = escapeRegex(userInput);
// Result: 'Price: \$10\.99'

// Find all matches with capture groups
const pattern = /(\d{4})-(\d{2})-(\d{2})/g;
const dates = matchAll('2024-01-15 and 2024-12-31', pattern);
// Result: [['2024-01-15', '2024', '01', '15'], ['2024-12-31', '2024', '12', '31']]
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
