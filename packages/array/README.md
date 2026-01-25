# @ts-utilkit/array

Comprehensive array manipulation utilities with 27+ functions for sorting, filtering, transformation, and mathematical operations on arrays.

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

## Key Functions

### Array Manipulation
- **chunkArray** - Split array into chunks of specified size
- **flattenArray** - Flatten nested arrays completely
- **flattenArrayDepth** - Flatten arrays to specified depth
- **shuffleArray** - Randomize array elements (Fisher-Yates)
- **rotateArrayLeft** / **rotateArrayRight** - Rotate array elements

### Array Analysis
- **findDuplicates** - Find duplicate elements
- **findUniqueElements** - Find unique elements
- **removeDuplicates** - Remove duplicate values
- **uniqueElementsWithCounts** - Get unique elements with occurrence counts
- **findMax** / **findMin** - Find maximum/minimum values
- **sumArrayElements** - Sum all numeric elements

### Array Operations
- **arrayDifference** - Find elements in first array not in second
- **arrayIntersection** - Find common elements between arrays
- **mergeUnique** - Merge arrays with unique elements only
- **cartesianProduct** - Generate Cartesian product of arrays
- **zipMultiple** - Zip multiple arrays together

### Array Filtering & Searching
- **removeByIndex** - Remove element at specific index
- **removeByCondition** - Remove elements matching condition
- **removeFalsyValues** - Remove falsy values (null, undefined, false, 0, '')
- **findIndexOfElement** - Find index with custom comparison
- **findCommonWithCondition** - Find common elements with custom logic

### Array Transformation
- **groupBy** - Group array elements by key or function
- **sortBy** - Sort objects by property or custom function
- **joinStrings** - Join array elements into string

### Advanced Operations
- **generatePrimes** - Generate array of prime numbers up to limit

## Usage Examples

### Basic Array Manipulation

```typescript
import { chunkArray, shuffleArray, rotateArrayLeft } from '@ts-utilkit/array';

// Chunk array into smaller arrays
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const chunks = chunkArray(numbers, 3);
// Result: [[1, 2, 3], [4, 5, 6], [7, 8]]

// Shuffle array randomly
const shuffled = shuffleArray([1, 2, 3, 4, 5]);
// Result: [3, 1, 5, 2, 4] (random order)

// Rotate array left
const rotated = rotateArrayLeft([1, 2, 3, 4, 5], 2);
// Result: [3, 4, 5, 1, 2]
```

### Working with Duplicates

```typescript
import { findDuplicates, removeDuplicates, uniqueElementsWithCounts } from '@ts-utilkit/array';

const data = [1, 2, 2, 3, 4, 4, 4, 5];

// Find duplicate values
const duplicates = findDuplicates(data);
// Result: [2, 4]

// Remove duplicates
const unique = removeDuplicates(data);
// Result: [1, 2, 3, 4, 5]

// Count occurrences
const counts = uniqueElementsWithCounts(data);
// Result: [
//   { element: 1, count: 1 },
//   { element: 2, count: 2 },
//   { element: 3, count: 1 },
//   { element: 4, count: 3 },
//   { element: 5, count: 1 }
// ]
```

### Array Set Operations

```typescript
import { arrayDifference, arrayIntersection, mergeUnique } from '@ts-utilkit/array';

const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

// Find difference
const diff = arrayDifference(arr1, arr2);
// Result: [1, 2]

// Find intersection
const common = arrayIntersection(arr1, arr2);
// Result: [3, 4]

// Merge unique
const merged = mergeUnique(arr1, arr2);
// Result: [1, 2, 3, 4, 5, 6]
```

### Flattening Arrays

```typescript
import { flattenArray, flattenArrayDepth } from '@ts-utilkit/array';

// Flatten completely
const nested = [1, [2, [3, [4, 5]]]];
const flat = flattenArray(nested);
// Result: [1, 2, 3, 4, 5]

// Flatten to specific depth
const partialFlat = flattenArrayDepth(nested, 2);
// Result: [1, 2, 3, [4, 5]]
```

### Grouping and Sorting

```typescript
import { groupBy, sortBy } from '@ts-utilkit/array';

const users = [
  { name: 'Alice', age: 30, role: 'admin' },
  { name: 'Bob', age: 25, role: 'user' },
  { name: 'Charlie', age: 30, role: 'user' }
];

// Group by property
const byAge = groupBy(users, 'age');
// Result: {
//   '30': [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   '25': [{ name: 'Bob', ... }]
// }

// Sort by property
const sorted = sortBy(users, 'age');
// Result: [Bob (25), Alice (30), Charlie (30)]
```

### Mathematical Operations

```typescript
import { findMax, findMin, sumArrayElements, generatePrimes } from '@ts-utilkit/array';

const numbers = [5, 2, 8, 1, 9];

console.log(findMax(numbers));        // 9
console.log(findMin(numbers));        // 1
console.log(sumArrayElements(numbers)); // 25

// Generate prime numbers
const primes = generatePrimes(20);
// Result: [2, 3, 5, 7, 11, 13, 17, 19]
```

## API Documentation

All functions include:
- Complete TypeScript type definitions
- JSDoc documentation with examples
- Runtime type validation
- Descriptive error messages
- Time/space complexity notes

For detailed API documentation, visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions welcome! See the [main repository](https://github.com/MForofontov/ts-utilkit) for guidelines.
