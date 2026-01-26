# @ts-utilkit/event

event  Functions - TypeScript utility functions for event operations.

## Installation

```bash
npm install @ts-utilkit/event
```

## Features

- 🚀 TypeScript-first with complete type definitions
- ✅ Comprehensive test coverage (>95%)
- 📦 Tree-shakeable ESM and CommonJS support
- 🔒 Type-safe with strict TypeScript configuration
- 📖 Extensive JSDoc documentation

## Available Functions (7)

- **`EventEmitter`** - Custom event emitter class with on, off, emit, once methods
- **`debounceEvent`** - Debounces event handlers to delay execution
- **`throttleEvent`** - Throttles event handlers to limit execution rate
- **`createEventBus`** - Creates a publish-subscribe event bus for loose coupling
- **`delegateEvent`** - Event delegation for handling events on dynamic content
- **`waitForEvent`** - Returns a Promise that resolves when an event is emitted
- **`onceEvent`** - Wraps an event handler to execute only once

## Usage Examples

```typescript
import { EventEmitter, createEventBus, waitForEvent } from '@ts-utilkit/event';

// Custom event emitter
const emitter = new EventEmitter();
emitter.on('data', (payload) => {
  console.log('Received:', payload);
});
emitter.emit('data', { message: 'Hello' });

// Event bus for decoupled communication
const bus = createEventBus();
bus.subscribe('user:login', (user) => {
  console.log('User logged in:', user.name);
});
bus.publish('user:login', { name: 'John' });

// Wait for event (Promise-based)
const result = await waitForEvent(emitter, 'response', 5000);
console.log('Response received:', result);

// Execute handler only once
const handler = onceEvent((data) => {
  console.log('First call:', data);
});
handler('data1'); // Executes
handler('data2'); // Ignored
```

## API Documentation

For complete API documentation, please visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

MIT © MForofontov

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/MForofontov/ts-utilkit) for contribution guidelines.
