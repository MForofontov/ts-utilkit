# @ts-utilkit/async

Version: [0.3.0](https://www.npmjs.com/package/@ts-utilkit/async/v/0.3.0). Requires Node.js 20 or later.

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

## Available Functions (13)

- **`asyncBatch`** - Processes an array of items in sequential batches by calling `batchFn` once
- **`asyncDeduplication`** - Wraps an async function so that concurrent calls with identical arguments
- **`asyncFilter`** - Filter array with async predicate
- **`asyncMap`** - Map array with async function
- **`asyncMapSettled`** - Maps items in bounded batches, retaining successes and failures in input order.
- **`asyncReduce`** - Accumulates items sequentially, awaiting each reducer result before continuing.
- **`asyncMemoize`** - Internal cache entry holding a resolved value and optional expiry timestamp.
- **`asyncParallel`** - Execute multiple async operations with concurrency limit
- **`asyncPoll`** - Repeatedly calls an async function at a fixed interval until a condition
- **`asyncRetry`** - Retry failed operations with exponential backoff
- **`asyncSeries`** - Execute async operations sequentially
- **`asyncTimeout`** - Add timeout to any promise
- **`asyncWaterfall`** - Executes an array of async tasks in sequence, piping the resolved output of

## Quick Example

```typescript
import { asyncRetry, asyncTimeout, asyncParallel } from '@ts-utilkit/async';

const fetchStatus = () => Promise.resolve('ready');
await asyncRetry(fetchStatus, {
  maxAttempts: 3,
  delay: 1000,
  backoff: 'exponential',
});
await asyncTimeout(fetchStatus(), 5000);
await asyncParallel([() => Promise.resolve(1), () => Promise.resolve(2)], 2); // [1, 2]
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Added utilities

- **`asyncMapSettled`** — see the signature, examples, and contract in [asyncMapSettled.ts](src/asyncMapSettled.ts).
- **`asyncReduce`** — see the signature, examples, and contract in [asyncReduce.ts](src/asyncReduce.ts).

Full examples and boundary behavior are documented in [FUNCTION_IDEAS.md](../../FUNCTION_IDEAS.md).
