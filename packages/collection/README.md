# @ts-utilkit/collection

collection  Functions - TypeScript utility functions for collection operations.

## Installation

```bash
npm install @ts-utilkit/collection
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (17)

- **`arrayToSet`** - Converts an array to a Set
- **`isDisjoint`** - Checks if two Sets have no common elements
- **`isSubset`** - Checks if one Set is a subset of another
- **`isSuperset`** - Checks if one Set is a superset of another
- **`mapFilter`** - Filters a Map based on a predicate function
- **`mapInvert`** - Inverts keys and values in a Map
- **`mapMap`** - Transforms Map values using a mapping function
- **`mapMerge`** - Merges multiple Maps into one
- **`mapReduce`** - Reduces Map values to a single value
- **`mapToObject`** - Converts a Map to a plain object
- **`objectToMap`** - Converts a plain object to a Map
- **`setDifference`** - Computes the difference between two Sets
- **`setEquals`** - Checks if two Sets are equal
- **`setIntersection`** - Computes the intersection of two or more Sets
- **`setSymmetricDifference`** - Computes the symmetric difference of two Sets
- **`setToArray`** - Converts a Set to an array
- **`setUnion`** - Computes the union of two or more Sets

## Usage Examples

```typescript
import { setUnion, setIntersection, mapToObject, filterSet } from '@ts-utilkit/collection';

// Set operations
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);
const union = setUnion(set1, set2);
// Result: Set { 1, 2, 3, 4 }

const intersection = setIntersection(set1, set2);
// Result: Set { 2, 3 }

// Map operations
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
const obj = mapToObject(map);
// Result: { a: 1, b: 2, c: 3 }

// Filtering Sets
const numbers = new Set([1, 2, 3, 4, 5]);
const evens = filterSet(numbers, n => n % 2 === 0);
// Result: Set { 2, 4 }
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
