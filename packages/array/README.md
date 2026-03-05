# @ts-utilkit/array

Comprehensive array manipulation utilities with 26 functions for sorting, filtering, transformation, and mathematical operations on arrays.

## Installation

```bash
npm install @ts-utilkit/array
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- ⚡ Performance-optimized implementations
- 📖 Extensive JSDoc documentation

## Available Functions (26)

- **`arrayDifference`** - Find elements in first array not in second
- **`arrayIntersection`** - Find common elements between arrays
- **`cartesianProduct`** - Generate Cartesian product of arrays
- **`chunkArray`** - Split array into chunks of specified size
- **`findCommonWithCondition`** - Find common elements with custom logic
- **`findDuplicates`** - Find duplicate elements
- **`findIndexOfElement`** - Find index with custom comparison
- **`findMax`** - Find maximum value in array
- **`findMin`** - Find minimum value in array
- **`findUniqueElements`** - Find unique elements
- **`flattenArray`** - Flatten nested arrays completely
- **`flattenArrayDepth`** - Flatten arrays to specified depth
- **`generatePrimes`** - Generate array of prime numbers up to limit
- **`groupBy`** - Group array elements by key or function
- **`joinStrings`** - Join array elements into string
- **`mergeUnique`** - Merge arrays with unique elements only
- **`removeByCondition`** - Remove elements matching condition
- **`removeByIndex`** - Remove element at specific index
- **`removeDuplicates`** - Remove duplicate values
- **`removeFalsyValues`** - Remove falsy values (null, undefined, false, 0, '')
- **`rotateArrayLeft`** - Rotate array elements to the left
- **`rotateArrayRight`** - Rotate array elements to the right
- **`sortBy`** - Sort objects by property or custom function
- **`sumArrayElements`** - Sum all numeric elements
- **`uniqueElementsWithCounts`** - Get unique elements with occurrence counts
- **`zipMultiple`** - Zip multiple arrays together

## Quick Example

```typescript
import { chunkArray, removeDuplicates, flattenArray } from '@ts-utilkit/array';

chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
removeDuplicates([1, 2, 2, 3]); // [1, 2, 3]
flattenArray([1, [2, [3, 4]]]); // [1, 2, 3, 4]
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
