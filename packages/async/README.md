# @ts-utilkit/async

Asynchronous operation utilities for retry logic, timeouts, parallel execution, and promise management.

## Installation

```bash
npm install @ts-utilkit/async
```

## Features

- 🚀 Production-ready async patterns
- ⚡ Retry with exponential backoff
- ⏱️ Promise timeout handling
- 🔄 Controlled parallel execution
- 📦 Series execution with error handling
- ✅ Comprehensive test coverage

## Available Functions (6)

- **`asyncFilter`** - Filter array with async predicate
- **`asyncMap`** - Map array with async function
- **`asyncParallel`** - Execute multiple async operations with concurrency limit
- **`asyncRetry`** - Retry failed operations with exponential backoff
- **`asyncSeries`** - Execute async operations sequentially
- **`asyncTimeout`** - Add timeout to any promise

## Quick Example

```typescript
import { asyncRetry, asyncTimeout, asyncParallel } from '@ts-utilkit/async';

// Retry with exponential backoff
await asyncRetry(() => fetchAPI(), 3, 1000);

// Add timeout to promise
await asyncTimeout(slowPromise, 5000);

// Control parallel execution
await asyncParallel([fn1, fn2, fn3], 2);
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
