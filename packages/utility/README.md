# @ts-utilkit/utility

Version: [0.5.0](https://www.npmjs.com/package/@ts-utilkit/utility/v/0.5.0). Requires Node.js 20 or later.

utility Functions - TypeScript utility functions for utility operations.

## Installation

```bash
npm install @ts-utilkit/utility
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Repository tests with >95% global coverage
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (15)

- **`bytesToSize`** - Converts bytes to human-readable size (KB, MB, GB, etc.)
- **`compose`** - Composes functions right-to-left, returning a new function that passes its
- **`debounce`** - Creates a debounced function that delays execution
- **`debounceAsync`** - Creates a debounced async function with promise handling
- **`delay`** - Pauses execution for a specified duration (Promise-based)
- **`hexToRgb`** - Converts hex color to RGB object
- **`isNil`** - Checks if value is null or undefined
- **`measure`** - Result object returned by `measure`.
- **`memoize`** - Wraps a synchronous function so that repeated calls with identical arguments
- **`pipe`** - Composes functions left-to-right, returning a new function that passes its
- **`rgbToHex`** - Converts RGB values to hex color string
- **`safeJSONParse`** - Safely parses JSON with fallback value
- **`throttle`** - Creates a throttled function that limits execution rate
- **`tryCatch`** - Result object returned by `tryCatch`. Exactly one of `value` or `error`
- **`once`** - Caches the first successful synchronous return value, including undefined.

## Quick Example

```typescript
import { debounce, throttle, once, memoize } from '@ts-utilkit/utility';

const log = (message: string): void => {
  console.log(message);
};
const save = debounce(log, 300);
save('saved');
const report = throttle(log, 100);
report('progress');
const initialize = once(() => ({ ready: true }));
initialize(); // Reuses the first successful result
const square = memoize((n: number) => n * n);
square(5); // 25
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.

## Added utilities

- **`once`** — see the signature, examples, and contract in [once.ts](src/once.ts).

Full examples and boundary behavior are documented in [FUNCTION_IDEAS.md](../../FUNCTION_IDEAS.md).
