# @ts-utilkit/regex

Version: [0.3.1](https://www.npmjs.com/package/@ts-utilkit/regex/v/0.3.1). Requires Node.js 20 or later.

regex Functions - TypeScript utility functions for regex operations.

## Installation

```bash
npm install @ts-utilkit/regex
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Repository tests with >95% global coverage
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (18)

- **`buildPattern`** - Builds a regex pattern from components
- **`combinePatterns`** - Combines multiple regex patterns with alternation
- **`CommonPatterns`** - Provides common regex patterns (email, URL, phone, etc.)
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

## Additional exports

- **`PatternBuilder`** — Fluent builder for constructing regular expression patterns safely.
- **`getCommonPattern`** — Gets a common regex pattern by name.
- **`testCommonPattern`** — Tests if a string matches a common pattern.

## Quick Example

```typescript
import {
  extractMatches,
  testCommonPattern,
  testPattern,
} from '@ts-utilkit/regex';

extractMatches('Visit https://a.com', /https?:\/\/\S+/g); // ['https://a.com']
testCommonPattern('test@email.com', 'email'); // true
testPattern('abc123', /\d+/); // true
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
