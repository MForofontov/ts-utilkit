# Known Issues

Documented limitations and intentional trade-offs in ts-utilkit. Prefer filing an issue for unexpected behavior not listed here.

## Module output

- Packages currently emit CommonJS. Their `import` and `require` export conditions point to the same CommonJS artifact; there is no separate native ESM build. Bundler optimization depends on CommonJS support.

## Crypto (`@ts-utilkit/crypto`)

- **AES ciphertext format (0.3.0+):** `encryptAES256` / `decryptAES256` use `salt:iv:authTag:ciphertext`. Payloads produced by 0.2.x (`iv:authTag:ciphertext` with a fixed scrypt salt) cannot be decrypted and must be re-encrypted.
- **AES key derivation:** `encryptAES256` / `decryptAES256` use synchronous `scryptSync`, which blocks the event loop during each call.

## Object (`@ts-utilkit/object`)

- **`deepEqual`:** Does not support circular references. Map keys are compared with `Map.has` (reference equality for object keys), not deep key equality. Primitive Set matching is linear; object-valued Sets can still require quadratic recursive matching.
- **`deepClone`:** Relies on `structuredClone` when available; JSON fallback drops functions, `undefined`, `Date`, `RegExp`, `Map`, `Set`, symbols, and circular structures. `structuredClone` throws on functions.
- **`deepFreeze`:** Handles cycles and own symbol properties, but freezing a Map or Set does not prevent mutation of its entries. Accessors can execute while traversing values.
- **Recursive transforms:** `deepCloneWith`, `keysToCamelCase`, and `keysToSnakeCase` do not track circular references and can exhaust the call stack on cycles or deeply nested input.

## Encoding (`@ts-utilkit/encoding`)

- **`decodeBase32` / `decodeBase64` / `decodeBase64URL`:** Strict validation rejects truncated, over-padded, or non-canonical encodings.

## Serialization (`@ts-utilkit/serialization`)

- **XML:** `deserializeFromXML` is a basic element/text parser, not a standards-complete XML parser. Attributes, namespaces, comments, CDATA, and document type declarations are outside its supported contract.
- **CSV:** Column names come from the first object's keys. Parsing returns strings, skips unquoted blank lines, and accepts one-character delimiters other than quotes or CR/LF. Null and undefined serialize as empty cells; original value types are not restored.

## Web scraping (`@ts-utilkit/webscraping`)

- **`sanitizeHTML`:** Best-effort string sanitizer. It is **not** a substitute for a dedicated HTML sanitizer (e.g. DOMPurify) when rendering untrusted HTML in production.

## String (`@ts-utilkit/string`)

- **`isValidEmail`:** Pragmatic regex checks, not full RFC 5321/5322 compliance (no IP-literal hosts, limited quoted-local support).
- **`stripHtmlTags`:** Removes tag delimiters and script/style blocks; it is **not** HTML sanitization and may leave text content from removed elements.

## Network (`@ts-utilkit/network`)

- **`isValidURL`:** Syntactic URL validation only. Dangerous schemes (`javascript:`, `data:`, `file:`) are accepted unless you use `sanitizeURL` or restrict schemes at the call site.
- **`normalizeURL`:** The native URL parser canonicalizes special-scheme hostnames and default HTTP(S) ports even when the corresponding normalization options are false. The legacy options remain for signature compatibility.

## Validation (`@ts-utilkit/validation`)

- **`isValidCreditCard`:** Luhn checksum and length checks only; does not validate card issuer or BIN/IIN.
- **`isValidJSON`:** No input size limit; parsing untrusted large payloads can be expensive.
- **`validateConfig`:** Validates presence of keys only; does not validate value types or schemas.

## Regex (`@ts-utilkit/regex`)

- **`combinePatterns` with `and`:** Uses nested positive lookaheads; hostile patterns can still exhibit catastrophic backtracking.
- **`hasBacktracking`:** Heuristic only; false positives and false negatives are possible.

## Utility (`@ts-utilkit/utility`)

- **`debounceAsync`:** Superseded invocations reject with `AbortError` rather than remaining pending.
- **`memoize` default key function:** Cannot handle circular argument references; supply a custom `keyFn`.
- **JSON cache keys:** `memoize`, `asyncMemoize`, and `asyncDeduplication` distinguish undefined, NaN, infinities, negative zero, and marker-like user values. Other JSON limitations remain: functions, symbols, Map/Set contents, custom `toJSON`, and identity-sensitive arguments require a custom `keyFn`; BigInt and cycles throw without one.

## Async (`@ts-utilkit/async`)

- **Concurrency:** `asyncMap`, `asyncParallel`, and `asyncMapSettled` use batch scheduling. Slots become available for the next batch only after the entire current batch finishes; Infinity starts all items together. Rejection does not cancel work already started.

## Date (`@ts-utilkit/date`)

- **`daysBetween`:** Counts elapsed complete 24-hour periods, including time components and DST effects. It does not count local calendar boundaries.
- **`getWeekNumber`:** Retains its simplified January-1-based week calculation. Use `getISOWeekDate` for ISO week dates.
- **Early-year inputs:** Calendar helpers preserve the literal year of their input Date, including years 0–99. JavaScript's numeric Date constructor still rewrites those years before a utility receives the value; use `setFullYear` or an explicitly chosen ISO representation when constructing an early-year input.

## Array (`@ts-utilkit/array`)

- **`cartesianProduct`:** Throws when the result would exceed 1,000,000 combinations.
- **`uniqueElementsWithCounts`:** Primitive counting is O(n). Object counting verifies deep equality and may require O(n²) comparisons; circular objects retain the limitations of `deepEqual`.

## Math (`@ts-utilkit/math`)

- **`fibonacciRecursive`:** Rejects `n > 40` to avoid stack overflow; use `fibonacciIterative` for larger values.
- **Combinatorics precision:** Results are Numbers. Factorials above 170 return Infinity; combinations and permutations avoid intermediate factorial overflow but still cannot represent arbitrary integers exactly. Finite factorial-ratio results through `n = 170` retain their existing rounding.

## Path (`@ts-utilkit/path`)

- Helpers are **POSIX-oriented** (`path.posix`) and perform no filesystem I/O. Windows drive letters and backslash paths are not specially handled.

## Testing utilities (`@ts-utilkit/testing-utilities`)

- **`generateRange`:** Endpoints must be finite. A positive step that cannot advance at the current floating-point magnitude throws instead of looping forever. Infinite steps with finite endpoints retain a single starting value when the range is nonempty.
- **`cloneTestData`:** Supports Date, RegExp, Map, Set, and nested data, but does not track cycles. Map keys retain their original identity; object symbol keys and non-enumerable properties are not copied.
