# @ts-utilkit/event

event Functions - TypeScript utility functions for event operations.

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

## Quick Example

```typescript
import { EventEmitter, createEventBus, waitForEvent } from '@ts-utilkit/event';

// Event emitter
const emitter = new EventEmitter();
emitter.on('data', (payload) => console.log(payload));
emitter.emit('data', { message: 'Hello' });

// Event bus
const bus = createEventBus();
bus.subscribe('event', handler);
bus.publish('event', data);
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
