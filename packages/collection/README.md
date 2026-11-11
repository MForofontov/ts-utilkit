# @ts-utilkit/collection

collection Functions - TypeScript utility functions for collection operations.

## Installation

```bash
npm install @ts-utilkit/collection
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (19)

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

## Additional exports

- **`createCounterMap`** — Counts the occurrences of each item in an array and returns a Map of item → count.
- **`createMultiMap`** — Creates a new empty multi-map — a Map where each key holds an ordered array of values. Supports method chaining and provides helpers for common multi-map operations.

## Quick Example

```typescript
import { setUnion, setIntersection, mapToObject } from '@ts-utilkit/collection';

// Set operations
setUnion(new Set([1, 2]), new Set([2, 3])); // Set {1, 2, 3}
setIntersection(new Set([1, 2]), new Set([2, 3])); // Set {2}

// Map conversions
mapToObject(
  new Map([
    ['a', 1],
    ['b', 2],
  ]),
); // {a: 1, b: 2}
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
