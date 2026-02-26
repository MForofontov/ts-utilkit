/**
 * Parses a raw HTTP header block (a multi-line string of `"Name: Value"` lines)
 * into a key-value record with lower-cased header names.
 *
 * @param raw - The raw header block string. Each header occupies one line in the
 *   format `"Header-Name: header value"`. Lines are separated by `"\r\n"` or
 *   `"\n"`. An optional HTTP status line (e.g. `"HTTP/1.1 200 OK"`) at the
 *   start is silently ignored.
 * @returns A `Record<string, string>` mapping lower-cased header names to their
 *   trimmed values.
 *
 * @throws {TypeError} If raw is not a string.
 * @throws {Error} If raw is an empty string.
 *
 * @example
 * // Typical response header block
 * parseHTTPHeaders('Content-Type: application/json\r\nX-Request-Id: abc-123');
 * // { 'content-type': 'application/json', 'x-request-id': 'abc-123' }
 *
 * @example
 * // With an HTTP status line prefix
 * parseHTTPHeaders('HTTP/1.1 200 OK\r\nContent-Length: 42\r\nConnection: keep-alive');
 * // { 'content-length': '42', 'connection': 'keep-alive' }
 *
 * @example
 * // Headers separated by "\n" instead of "\r\n"
 * parseHTTPHeaders('Authorization: Bearer token\nAccept: application/json');
 * // { 'authorization': 'Bearer token', 'accept': 'application/json' }
 *
 * @example
 * // Multi-value folded headers (last value wins for duplicate names)
 * parseHTTPHeaders('Set-Cookie: a=1\r\nSet-Cookie: b=2');
 * // { 'set-cookie': 'b=2' }
 *
 * @note Header names are normalised to lowercase for case-insensitive access.
 * @note Duplicate header names are resolved by keeping the last occurrence.
 * @note Header folding (a deprecated RFC 7230 feature) is not supported.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the raw string
 */
export function parseHTTPHeaders(raw: string): Record<string, string> {
  if (typeof raw !== 'string') {
    throw new TypeError(`raw must be a string, got ${typeof raw}`);
  }
  if (raw.trim().length === 0) {
    throw new Error('raw header string cannot be empty');
  }

  const result: Record<string, string> = {};
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip blank lines and HTTP status lines (e.g. "HTTP/1.1 200 OK")
    if (trimmed.length === 0 || /^HTTP\/\d/.test(trimmed)) {
      continue;
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) {
      continue; // Skip malformed lines without a colon
    }

    const name = trimmed.slice(0, colonIndex).trim().toLowerCase();
    const value = trimmed.slice(colonIndex + 1).trim();

    if (name.length > 0) {
      result[name] = value;
    }
  }

  return result;
}
