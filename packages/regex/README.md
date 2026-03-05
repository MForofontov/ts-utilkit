# @ts-utilkit/regex

regex Functions - TypeScript utility functions for regex operations.

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

## Quick Example

```typescript
import {
  escapeRegExp,
  extractURLsFromText,
  isMatchingPattern,
} from '@ts-utilkit/regex';

escapeRegExp('Price: $10.99'); // 'Price: \$10\.99'
extractURLsFromText('Visit https://a.com'); // ['https://a.com']
isMatchingPattern('test@email.com', /^\S+@\S+\.\S+$/); // true
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
