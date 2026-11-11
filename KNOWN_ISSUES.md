# Known Issues

Documented limitations and intentional trade-offs in ts-utilkit. Prefer filing an issue for unexpected behavior not listed here.

## Crypto (`@ts-utilkit/crypto`)

- **AES ciphertext format (0.3.0+):** `encryptAES256` / `decryptAES256` use `salt:iv:authTag:ciphertext`. Payloads produced by 0.2.x (`iv:authTag:ciphertext` with a fixed scrypt salt) cannot be decrypted and must be re-encrypted.

## Object (`@ts-utilkit/object`)

- **`deepEqual`:** Does not support circular references. Map keys are compared with `Map.has` (reference equality for object keys), not deep key equality.
- **`deepClone`:** Relies on `structuredClone` when available; JSON fallback drops functions, `undefined`, `Date`, `RegExp`, `Map`, `Set`, symbols, and circular structures.

## Web scraping (`@ts-utilkit/webscraping`)

- **`sanitizeHTML`:** Best-effort string sanitizer. It is **not** a substitute for a dedicated HTML sanitizer (e.g. DOMPurify) when rendering untrusted HTML in production.

## String / validation

- **Email validation** (`isValidEmail` in `@ts-utilkit/string` and related checks): pragmatic regex checks, not full RFC 5321/5322 compliance (no IP-literal hosts, limited quoted-local support).

## Math (`@ts-utilkit/math`)

- **Geometric mean:** Product of many large values can overflow to `Infinity` before the root is taken.

## Path (`@ts-utilkit/path`)

- Helpers are **POSIX-oriented** (`path.posix`) and perform no filesystem I/O. Windows drive letters and backslash paths are not specially handled.
