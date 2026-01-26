# @ts-utilkit/object

object  Functions - TypeScript utility functions for object operations.

## Installation

```bash
npm install @ts-utilkit/object
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (39)

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

## Usage Examples

```typescript
import { deepMerge, safeGet, flattenObject, pickKeys } from '@ts-utilkit/object';

// Deep merge objects
const config = deepMerge(
  { api: { timeout: 5000 }, features: { auth: true } },
  { api: { retries: 3 }, features: { logging: true } }
);
// Result: { api: { timeout: 5000, retries: 3 }, features: { auth: true, logging: true } }

// Safe property access
const user = { profile: { name: 'John' } };
const name = safeGet(user, 'profile.name', 'Anonymous'); // 'John'
const email = safeGet(user, 'profile.email', 'no-email'); // 'no-email'

// Flatten nested objects
const nested = { a: { b: { c: 1 } }, d: 2 };
const flat = flattenObject(nested); // { 'a.b.c': 1, 'd': 2 }

// Pick specific keys
const data = { id: 1, name: 'Alice', email: 'alice@example.com', password: 'secret' };
const safe = pickKeys(data, ['id', 'name', 'email']); // { id: 1, name: 'Alice', email: 'alice@example.com' }
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
