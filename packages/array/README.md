# @ts-utilkit/array

Version: [0.4.0](https://www.npmjs.com/package/@ts-utilkit/array/v/0.4.0). Requires Node.js 20 or later.

Comprehensive array manipulation utilities with 35 functions for sorting, filtering, transformation, and mathematical operations on arrays.

## Installation

```bash
npm install @ts-utilkit/array
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Repository tests with >95% global coverage
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- ⚡ Performance-optimized implementations
- 📖 Extensive JSDoc documentation

## Available Functions (35)

- **`arrayDifference`** - Find elements in first array not in second
- **`arrayDifferenceBy`** - Find source items whose derived keys are absent from another array
- **`arrayIntersection`** - Find common elements between arrays
- **`arrayIntersectionBy`** - Find source items whose derived keys occur in another array
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

## Additional exports

- **`countBy`** — Counts array elements by grouping them according to a key function. Returns a `Map` where each key is a group identifier produced by `keyFn` and the corresponding value is the number of elements in that group.
- **`dropWhile`** — Drops elements from the beginning of an array while the predicate returns true, then returns the remaining elements. Once the predicate returns false for an element, that element and all subsequent elements are included regardless of whether they satisfy the predicate.
- **`partition`** — Splits an array into two groups based on a predicate function. The first array contains all elements for which the predicate returns true, and the second array contains all elements for which it returns false.
- **`slidingWindow`** — Generates all contiguous sub-arrays (windows) of a fixed size by sliding a window across the input array one element at a time.
- **`takeWhile`** — Returns elements from the beginning of an array while the predicate returns true. Stops collecting elements as soon as the predicate returns false for the first time.

## Quick Example

```typescript
import {
  chunkArray,
  removeDuplicates,
  flattenArray,
  arrayDifferenceBy,
  arrayIntersectionBy,
} from '@ts-utilkit/array';

chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
removeDuplicates([1, 2, 2, 3]); // [1, 2, 3]
flattenArray([1, [2, [3, 4]]]); // [1, 2, 3, 4]
arrayDifferenceBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], (item) => item.id); // [{ id: 2 }]
arrayIntersectionBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], (item) => item.id); // [{ id: 1 }]
```

Both key-based helpers preserve source order, duplicates, and item references;
skip holes in both arrays; and leave inputs unchanged. Keys use Set equality
(NaN matches NaN, signed zeros match, and object keys compare by reference).
The callback runs once per present comparison item, then per present source item;
callback errors propagate. Time and space are O(n + m), excluding callback cost.

`arrayDifference` and `arrayIntersection` retain deep equality. Larger arrays with
data properties and non-object comparison values use a native lookup; small,
object-containing, accessor, and inherited-element inputs retain nested comparisons.

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Added utilities

- **`uniqueBy`** — see the signature, examples, and contract in [uniqueBy.ts](src/uniqueBy.ts).
- **`partitionBy`** — see the signature, examples, and contract in [partitionBy.ts](src/partitionBy.ts).

Full examples and boundary behavior are documented in [FUNCTION_IDEAS.md](../../FUNCTION_IDEAS.md).
