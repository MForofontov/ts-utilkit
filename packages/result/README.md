# @ts-utilkit/result

Discriminated `Result<T, E>` helpers for explicit success/failure without relying on thrown exceptions.

## Installation

```bash
npm install @ts-utilkit/result
```

## Quick Example

```typescript
import { ok, err, map, unwrapOr, fromThrowable } from '@ts-utilkit/result';

const doubled = map(ok(21), (n) => n * 2); // ok(42)
unwrapOr(err('missing'), 0); // 0

const parsed = fromThrowable(() => JSON.parse('{"a":1}'));
```

## Available Functions

- `ok` / `err` — construct results
- `isOk` / `isErr` — type guards
- `map` / `mapErr` / `andThen` — transforms
- `unwrap` / `unwrapOr` / `match` — extract values
- `fromThrowable` — wrap throwing sync functions

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
