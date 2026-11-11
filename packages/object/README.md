# @ts-utilkit/object

object Functions - TypeScript utility functions for object operations.

## Installation

```bash
npm install @ts-utilkit/object
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (44)

- **`applyDefaults`** - Apply default values to object
- **`compactObject`** - Remove undefined/null values
- **`countProperties`** - Count object properties
- **`deepClone`** - Deep clone objects
- **`deepCloneWith`** - Deep clone with custom handler
- **`deepEqual`** - Deep equality comparison
- **`deepFreeze`** - Recursively freeze object
- **`deepMerge`** - Deep merge objects
- **`differenceBy`** - Get object difference by key
- **`entriesToObject`** - Convert entries to object
- **`flattenObject`** - Flatten nested objects
- **`flipObject`** - Swap keys and values
- **`fromDotNotation`** - Convert dot notation to nested object
- **`getDeepEqualityHash`** - Generate equality hash
- **`getObjectDifference`** - Get difference between objects
- **`groupByObject`** - Group array into object
- **`hasKey`** - Check if object has key
- **`invertObject`** - Invert object keys/values
- **`isDeepSubset`** - Check if object is subset
- **`isObjectEmpty`** - Check if object is empty
- **`keyBy`** - Convert array to object keyed by field
- **`keysToCamelCase`** - Convert keys to camelCase
- **`keysToSnakeCase`** - Convert keys to snake_case
- **`objectMap`** - Map object values
- **`objectSize`** - Get number of properties
- **`objectToQueryString`** - Convert object to query string
- **`omitBy`** - Omit properties by predicate
- **`omitKeys`** - Omit specific keys
- **`pickBy`** - Pick properties by predicate
- **`pickKeys`** - Pick specific keys
- **`queryStringToObject`** - Parse query string to object
- **`removeEmptyValues`** - Remove empty values
- **`safeGet`** - Safe property access with default
- **`safeSet`** - Safe property setting
- **`setNestedValue`** - Set nested property value
- **`shallowEqual`** - Shallow equality comparison
- **`sortObjectKeys`** - Sort object keys alphabetically
- **`unflattenObject`** - Unflatten dot notation object
- **`uniqueValues`** - Get unique values from object

## Additional exports

- **`findKey`** — Returns the first key in an object whose value satisfies the given predicate. Returns `undefined` if no key matches.
- **`renameKey`** — Returns a new object with a single key renamed, preserving all other keys and values unchanged. The key order in the result follows the original object's insertion order, with the renamed key at its original position.
- **`transformKeys`** — Returns a new object with all keys transformed by a given function, while keeping values unchanged.
- **`zipObject`** — Creates an object from two separate arrays: one of keys and one of values. Pairs each key with the value at the same index.

## Quick Example

```typescript
import {
  deepMerge,
  safeGet,
  flattenObject,
  pickKeys,
} from '@ts-utilkit/object';

deepMerge({ a: 1 }, { b: 2 }); // {a: 1, b: 2}
safeGet({ a: { b: 'c' } }, 'a.b'); // 'c'
flattenObject({ a: { b: { c: 1 } } }); // {'a.b.c': 1}
const obj = { id: 1, name: 'Alice', active: true };
pickKeys(obj, ['id', 'name']); // {id: 1, name: 'Alice'}
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.

## Added utilities

- **`omitDeep`** — see the signature, examples, and contract in [omitDeep.ts](src/omitDeep.ts).

Full examples and boundary behavior are documented in [FUNCTION_IDEAS.md](../../FUNCTION_IDEAS.md).
