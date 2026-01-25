# @ts-utilkit/utility

utility  Functions - TypeScript utility functions for utility operations.

## Installation

```bash
npm install @ts-utilkit/utility
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (10)

- **`bytesToSize`** - Converts bytes to human-readable size (KB, MB, GB, etc.)
- **`debounce`** - Creates a debounced function that delays execution
- **`debounceAsync`** - Creates a debounced async function with promise handling
- **`delay`** - Pauses execution for a specified duration (Promise-based)
- **`hexToRgb`** - Converts hex color to RGB object
- **`isNil`** - Checks if value is null or undefined
- **`parseQueryString`** - Parses URL query string to object
- **`rgbToHex`** - Converts RGB values to hex color string
- **`safeJSONParse`** - Safely parses JSON with fallback value
- **`throttle`** - Creates a throttled function that limits execution rate

## Usage Examples

```typescript
import { debounce, throttle, retry, memoize } from '@ts-utilkit/utility';

// Debounce: Delays execution until after inactivity
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

// Throttle: Limits execution rate
const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

// Retry with backoff
const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
};
const data = await retry(fetchData, { maxAttempts: 3, delay: 1000 });

// Memoization for expensive calculations
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
const result = fibonacci(40); // Cached for performance
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
