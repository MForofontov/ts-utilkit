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

## Available Functions (9)

- **`bytesToSize`** - Converts bytes to human-readable size (KB, MB, GB, etc.)
- **`debounce`** - Creates a debounced function that delays execution
- **`debounceAsync`** - Creates a debounced async function with promise handling
- **`delay`** - Pauses execution for a specified duration (Promise-based)
- **`hexToRgb`** - Converts hex color to RGB object
- **`isNil`** - Checks if value is null or undefined
- **`rgbToHex`** - Converts RGB values to hex color string
- **`safeJSONParse`** - Safely parses JSON with fallback value
- **`throttle`** - Creates a throttled function that limits execution rate

## Quick Example

```typescript
import { debounce, throttle, clamp, noop } from '@ts-utilkit/utility';

debounce(fn, 300);                   // Delay until inactivity
throttle(fn, 100);                   // Limit rate
clamp(5, 0, 10);                     // 5 (within range)
noop();                              // No-op function
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
