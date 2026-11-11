# Known Issues

Documented limitations and intentional trade-offs in ts-utilkit. Prefer filing an issue for unexpected behavior not listed here.

## Crypto (`@ts-utilkit/crypto`)

- **AES ciphertext format (0.3.0+):** `encryptAES256` / `decryptAES256` use `salt:iv:authTag:ciphertext`. Payloads produced by 0.2.x (`iv:authTag:ciphertext` with a fixed scrypt salt) cannot be decrypted and must be re-encrypted.
- **AES key derivation:** `encryptAES256` / `decryptAES256` use synchronous `scryptSync`, which blocks the event loop during each call.

## Object (`@ts-utilkit/object`)

- **`deepEqual`:** Does not support circular references. Map keys are compared with `Map.has` (reference equality for object keys), not deep key equality.
- **`deepClone`:** Relies on `structuredClone` when available; JSON fallback drops functions, `undefined`, `Date`, `RegExp`, `Map`, `Set`, symbols, and circular structures. `structuredClone` throws on functions.

## Encoding (`@ts-utilkit/encoding`)

- **`decodeBase32` / `decodeBase64` / `decodeBase64URL`:** Strict validation rejects truncated, over-padded, or non-canonical encodings.

## Web scraping (`@ts-utilkit/webscraping`)

- **`sanitizeHTML`:** Best-effort string sanitizer. It is **not** a substitute for a dedicated HTML sanitizer (e.g. DOMPurify) when rendering untrusted HTML in production.

## String (`@ts-utilkit/string`)

- **`isValidEmail`:** Pragmatic regex checks, not full RFC 5321/5322 compliance (no IP-literal hosts, limited quoted-local support).
- **`stripHtmlTags`:** Removes tag delimiters and script/style blocks; it is **not** HTML sanitization and may leave text content from removed elements.

## Network (`@ts-utilkit/network`)

- **`isValidURL`:** Syntactic URL validation only. Dangerous schemes (`javascript:`, `data:`, `file:`) are accepted unless you use `sanitizeURL` or restrict schemes at the call site.

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

## Array (`@ts-utilkit/array`)

- **`cartesianProduct`:** Throws when the result would exceed 1,000,000 combinations.

## Math (`@ts-utilkit/math`)

- **`fibonacciRecursive`:** Rejects `n > 40` to avoid stack overflow; use `fibonacciIterative` for larger values.

## Path (`@ts-utilkit/path`)

- Helpers are **POSIX-oriented** (`path.posix`) and perform no filesystem I/O. Windows drive letters and backslash paths are not specially handled.
