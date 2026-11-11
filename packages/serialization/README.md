# @ts-utilkit/serialization

Version: [0.2.3](https://www.npmjs.com/package/@ts-utilkit/serialization/v/0.2.3). Requires Node.js 20 or later.

Data serialization and deserialization utilities for TypeScript.

## Installation

```bash
npm install @ts-utilkit/serialization
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Repository tests with >95% global coverage
- 📦 CommonJS builds with import and require entry points
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation
- 🔄 Multiple format support (JSON, CSV, XML, YAML, Binary, Buffer, Query String)
- 🛡️ Circular reference handling
- 🗜️ Flattening/unflattening for complex structures

## Available Functions (18)

### Serialization Functions

- **`serializeToJSON`** - Serialize data to JSON string
- **`serializeToCSV`** - Serialize array of objects to CSV format
- **`serializeToXML`** - Serialize data to XML format
- **`serializeToYAML`** - Serialize data to YAML format
- **`serializeToBinary`** - Serialize data to binary format
- **`serializeToBuffer`** - Serialize data to Node.js Buffer
- **`serializeToQueryString`** - Serialize object to URL query string

### Deserialization Functions

- **`deserializeFromJSON`** - Deserialize from JSON string with type safety
- **`deserializeFromCSV`** - Deserialize from CSV format to array of objects
- **`deserializeFromXML`** - Deserialize from XML format
- **`deserializeFromBinary`** - Deserialize from binary format
- **`deserializeFromBuffer`** - Deserialize from Node.js Buffer
- **`deserializeFromQueryString`** - Deserialize from URL query string

### Utility Functions

- **`cloneViaSerialization`** - Deep clone by serializing and deserializing
- **`handleCircularReferences`** - Handle circular references in objects
- **`sanitizeForSerialization`** - Sanitize data before serialization
- **`flattenForSerialization`** - Flatten nested structures for serialization
- **`unflattenFromSerialization`** - Unflatten serialized data back to nested structure

## Quick Example

```typescript
import {
  serializeToJSON,
  deserializeFromJSON,
  serializeToXML,
} from '@ts-utilkit/serialization';

serializeToJSON({ a: 1 }); // '{"a":1}'
deserializeFromJSON('{"a":1}'); // {a: 1}
serializeToXML({ item: 'value' }); // '<root><item>value</item></root>'
```

CSV serialization quotes single-column blank values, whitespace-delimited blank
cells, and carriage returns so rows and headers survive parsing. Ordinary blank
cells in comma-separated multi-column output retain their existing representation.
CSV parsing returns strings; null and undefined serialize as empty cells.

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
