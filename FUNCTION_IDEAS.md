# Added utility functions

All eleven functions below are implemented, exported from their named packages, and
covered by focused tests. They follow the existing one-function-per-file, JSDoc,
runtime-validation, and numbered Jest test conventions.

## 1. Array: uniqueBy

```ts
uniqueBy<T, K>(items: T[], keyFn: (item: T, index: number) => K): T[];
uniqueBy([{ id: 1, name: 'A' }, { id: 1, name: 'B' }], x => x.id);
// [{ id: 1, name: 'A' }]
```

Complements `removeDuplicates` with caller-defined identity and first-occurrence
ordering. Use Map/Set key equality, document that object keys compare by reference.

## 2. Async: asyncMapSettled

```ts
asyncMapSettled<T, R>(items: T[], mapper: (item: T, index: number) => Promise<R>, concurrency?: number): Promise<PromiseSettledResult<R>[]>;
await asyncMapSettled([1, 2], id => fetchUser(id), 2);
// Ordered fulfilled/rejected results, even if one lookup fails.
```

Complements `asyncMap` when partial success matters. Reuse its concurrency rules;
capture each callback's synchronous throws and promise rejections independently.

## 3. Async: asyncReduce

```ts
asyncReduce<T, R>(items: T[], reducer: (acc: R, item: T, index: number) => Promise<R>, initialValue: R): Promise<R>;
await asyncReduce([1, 2], (total, id) => getPrice(id).then(price => total + price), 0);
```

Complements `asyncSeries` and `asyncWaterfall` with typed, sequential accumulation.
Require an initial value so empty inputs have an unambiguous result.

## 4. Array: partitionBy

```ts
partitionBy<T, K>(items: T[], keyFn: (item: T, index: number) => K): T[][];
partitionBy([1, 3, 2, 4, 5], n => n % 2);
// [[1, 3], [2, 4], [5]]
```

Complements `partition` and `groupBy` by grouping adjacent runs, useful for logs,
time-series segments, and ordered event streams. Preserve order and use
SameValueZero equality for derived keys.

## 5. Date: addBusinessDays

```ts
addBusinessDays(date: Date, amount: number): Date;
addBusinessDays(new Date(2026, 9, 23), 1); // Monday, October 26, 2026
```

Complements `businessDaysBetween`. Preserve local time, leave the input unchanged,
allow signed safe-integer amounts, and count Monday–Friday. Holidays remain outside
the initial API; zero returns a copy of the original date.

## 6. Result: collectResults

```ts
collectResults<T, E>(results: Result<T, E>[]): Result<T[], E>;
collectResults([ok(1), ok(2)]); // ok([1, 2])
collectResults([ok(1), err('invalid')]); // err('invalid')
```

Complements `map`, `andThen`, and `match` by combining a collection. Preserve value
order, return the first error, and return `ok([])` for empty input.

## 7. Object: omitDeep

```ts
omitDeep<T extends Record<string, unknown>>(object: T, paths: string[]): Partial<T>;
omitDeep({ user: { name: 'A', token: 'secret' } }, ['user.token']);
// { user: { name: 'A' } }
```

Complements `omitKeys` and the nested-path utilities. Only plain objects are
traversed; arrays, class instances, and accessors are atomic, although their
containing properties can still be removed. Missing and empty paths leave the
original unchanged; empty segments and bracket notation throw. Untouched branches
and property descriptors are preserved, getters are never invoked, and finite
paths through cycles are supported.

## 8. Utility: once (cache successful executions)

```ts
once<Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R;
const initialize = once(() => loadConfiguration());
initialize();
initialize(); // Reuses the first successful result, including undefined.
```

Retry if the function throws; cache only after a successful synchronous return and
preserve the receiver for the first successful call. Recursive calls before the
first return throw. A returned promise is cached immediately even if it later
rejects; use asyncMemoize for retry-on-rejection caching.

### Related existing helper: onceEvent

`@ts-utilkit/event` already exports `onceEvent<T extends unknown[], R>(handler)`.
Use it when consuming the first invocation is the desired behavior.
Its current behavior marks the call consumed before invoking the handler, including
when the handler throws. The new utility `once` provides the distinct
successful-return contract without changing `onceEvent`.

## 9. Array: arrayDifferenceBy

```ts
arrayDifferenceBy<T, K>(items: T[], other: T[], keyFn: (item: T) => K): T[];
arrayDifferenceBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], item => item.id);
// [{ id: 2 }]
```

## 10. Array: arrayIntersectionBy

```ts
arrayIntersectionBy<T, K>(items: T[], other: T[], keyFn: (item: T) => K): T[];
arrayIntersectionBy([{ id: 1 }, { id: 2 }], [{ id: 1 }], item => item.id);
// [{ id: 1 }]
```

Both helpers use SameValueZero keys, preserve source order, duplicates, and
references, skip holes in both arrays, and leave inputs unchanged. Object keys
compare by reference. Key callbacks run once for each present comparison item,
then each present source item; errors propagate. Time and space are O(n + m).

## 11. Result: fromAsyncThrowable

```ts
fromAsyncThrowable<T>(fn: () => PromiseLike<T> | T): Promise<Result<T, unknown>>;
await fromAsyncThrowable(() => Promise.resolve(42)); // ok(42)
await fromAsyncThrowable(() => Promise.reject('missing')); // err('missing')
```

Invokes the callback once, awaits values/promises/thenables, and captures both
synchronous throws and rejections. Success values and error reasons retain their
identity, including undefined and non-Error rejection values.
