# @ts-utilkit/serialization

Data serialization and deserialization utilities for TypeScript.

## Installation

```bash
npm install @ts-utilkit/serialization
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
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
import { serializeJSON, deserializeJSON, serializeXML } from '@ts-utilkit/serialization';

serializeJSON({a: 1});               // '{"a":1}'
deserializeJSON('{"a":1}');          // {a: 1}
serializeXML({root: {item: 'value'}}); // '<root><item>value</item></root>'
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
