# @ts-utilkit/random

random  Functions - TypeScript utility functions for random operations.

## Installation

```bash
npm install @ts-utilkit/random
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (25)

- **`loremIpsum`** - Generates Lorem Ipsum placeholder text
- **`randomBase64`** - Generates a random Base64 encoded string
- **`randomBetween`** - Generates a random number between min and max
- **`randomBoolean`** - Generates a random boolean value
- **`randomChoice`** - Selects a random element from an array (alias for randomElement)
- **`randomColorFromPalette`** - Selects a random color from a predefined palette
- **`randomDate`** - Generates a random date within a range
- **`randomElement`** - Selects a random element from an array
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

## Usage Examples

```typescript
import { randomInt, randomElement, randomHexColor, randomShuffle } from '@ts-utilkit/random';

// Random integer
const dice = randomInt(1, 6);
// Result: Random number between 1 and 6

// Random element from array
const fruits = ['apple', 'banana', 'orange'];
const randomFruit = randomElement(fruits);
// Result: One random fruit

// Random hex color
const color = randomHexColor();
// Result: "#a3c2f4"

// Shuffle array
const cards = [1, 2, 3, 4, 5];
const shuffled = randomShuffle(cards);
// Result: [3, 1, 5, 2, 4] (random order)
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
