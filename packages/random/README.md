# @ts-utilkit/random

random Functions - TypeScript utility functions for random operations.

## Installation

```bash
npm install @ts-utilkit/random
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (27)

- **`loremIpsum`** - Generates Lorem Ipsum placeholder text
- **`randomBase64`** - Generates a random Base64 encoded string
- **`randomBetween`** - Generates a random number between min and max
- **`randomBoolean`** - Generates a random boolean value
- **`randomChoice`** - Selects an unweighted random element from an array
- **`randomColorFromPalette`** - Selects a random color from a predefined palette
- **`randomDate`** - Generates a random date within a range
- **`randomElement`** - Selects a weighted element while retaining its metadata
- **`randomEnum`** - Selects a random value from an enum
- **`randomFloat`** - Generates a random floating-point number within a range
- **`randomFromRange`** - Generates a random number from a specified range
- **`randomHex`** - Generates a random hexadecimal string
- **`randomHexColor`** - Generates a random color in hex format
- **`randomInt`** - Generates a random integer within a range
- **`randomPattern`** - Generates a string matching a pattern
- **`randomPercentage`** - Generates a random percentage value
- **`randomRGB`** - Generates a random RGB color object
- **`randomSample`** - Takes a random sample of specified size from an array
- **`randomSequence`** - Generates a random sequence of numbers
- **`randomShuffle`** - Randomly shuffles an array (Fisher-Yates algorithm)
- **`randomSubset`** - Selects a random subset from an array
- **`randomUUID`** - Generates a random UUID (v4)
- **`randomWeighted`** - Makes a weighted random choice
- **`randomWord`** - Generates a random word
- **`randomWords`** - Generates multiple random words

## Additional exports

- **`randomExponential`** — Returns a random sample from an exponential distribution using the inverse transform method.
- **`randomGaussian`** — Returns a random sample from a Gaussian (normal) distribution using the Box-Muller transform.

## Quick Example

`randomWeighted` and `randomElement` preserve relative probabilities for finite
weights even when their total overflows or is subnormal. Zero-weight entries are
excluded from selection, including the floating-point rounding fallback. The
input arrays and selected item references are preserved.

`randomFromRange` retains repeated floating-point addition and linear enumeration
of stepped values. Endpoints must be finite, and a step that cannot advance the
current value throws. A positive infinite step with finite endpoints selects the
starting value; a singleton range terminates without needing an increment.

```typescript
import {
  randomInt,
  randomFloat,
  randomSample,
  randomShuffle,
} from '@ts-utilkit/random';

randomInt(1, 6); // 4
randomFloat(0, 1); // 0.7234
randomSample(['a', 'b', 'c'], 1)[0]; // 'b'
randomShuffle([1, 2, 3, 4]); // [3, 1, 4, 2]
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
