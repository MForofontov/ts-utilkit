# @ts-utilkit/result

Version: [0.3.0](https://www.npmjs.com/package/@ts-utilkit/result/v/0.3.0). Requires Node.js 20 or later.

Discriminated `Result<T, E>` helpers for explicit success/failure without relying on thrown exceptions.

## Installation

```bash
npm install @ts-utilkit/result
```

## Quick Example

```typescript
import {
  ok,
  err,
  map,
  unwrapOr,
  fromThrowable,
  fromAsyncThrowable,
} from '@ts-utilkit/result';

const doubled = map(ok(21), (n) => n * 2); // ok(42)
unwrapOr(err('missing'), 0); // 0

const parsed = fromThrowable(() => JSON.parse('{"a":1}'));
const loaded = await fromAsyncThrowable(() => Promise.resolve({ id: 1 }));
// ok({ id: 1 })
```

## Available Functions

- `ok` / `err` — construct results
- `isOk` / `isErr` — type guards
- `map` / `mapErr` / `andThen` — transforms
- `unwrap` / `unwrapOr` / `match` — extract values
- `fromThrowable` — wrap throwing sync functions
- `fromAsyncThrowable` — wrap values, promises, and thenables; capture throws and rejections

`fromAsyncThrowable<T>(fn: () => PromiseLike<T> | T): Promise<Result<T, unknown>>`
invokes the callback once and awaits its result. Success values and error reasons
retain their identity, including non-Error rejection values. The returned promise
resolves to `ok(value)` or `err(reason)`.

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Added utilities

- **`collectResults`** — see the signature, examples, and contract in [collectResults.ts](src/collectResults.ts).

Full examples and boundary behavior are documented in [FUNCTION_IDEAS.md](../../FUNCTION_IDEAS.md).
