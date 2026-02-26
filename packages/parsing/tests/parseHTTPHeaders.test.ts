import { parseHTTPHeaders } from '../src/parseHTTPHeaders';

/**
 * Unit tests for the parseHTTPHeaders function.
 */
describe('parseHTTPHeaders', () => {
  // ── Normal usage ──────────────────────────────────────────────────────────

  it('1. should parse a single header line', () => {
    // Arrange & Act
    const result = parseHTTPHeaders('Content-Type: application/json');

    // Assert
    expect(result).toEqual({ 'content-type': 'application/json' });
  });

  it('2. should parse multiple headers separated by CRLF', () => {
    const raw = 'Content-Type: application/json\r\nX-Request-Id: abc-123';
    expect(parseHTTPHeaders(raw)).toEqual({
      'content-type': 'application/json',
      'x-request-id': 'abc-123',
    });
  });

  it('3. should parse multiple headers separated by LF only', () => {
    const raw = 'Authorization: Bearer token\nAccept: application/json';
    expect(parseHTTPHeaders(raw)).toEqual({
      'authorization': 'Bearer token',
      'accept': 'application/json',
    });
  });

  it('4. should normalise header names to lowercase', () => {
    const result = parseHTTPHeaders('Content-Length: 42');
    expect(result).toHaveProperty('content-length', '42');
  });

  it('5. should ignore an HTTP status line prefix', () => {
    const raw = 'HTTP/1.1 200 OK\r\nContent-Length: 42\r\nConnection: keep-alive';
    expect(parseHTTPHeaders(raw)).toEqual({
      'content-length': '42',
      'connection': 'keep-alive',
    });
  });

  it('6. should handle headers with colons in the value', () => {
    const result = parseHTTPHeaders('Location: https://example.com/path');
    expect(result).toEqual({ 'location': 'https://example.com/path' });
  });

  it('7. should keep the last value for duplicate header names', () => {
    const raw = 'Set-Cookie: a=1\r\nSet-Cookie: b=2';
    expect(parseHTTPHeaders(raw)).toEqual({ 'set-cookie': 'b=2' });
  });

  it('8. should trim whitespace from header values', () => {
    const result = parseHTTPHeaders('Content-Type:   text/html   ');
    expect(result).toEqual({ 'content-type': 'text/html' });
  });

  // ── Edge cases ────────────────────────────────────────────────────────────

  it('9. should skip blank lines in the header block', () => {
    const raw = 'Content-Type: text/html\r\n\r\nAccept: */*';
    const result = parseHTTPHeaders(raw);
    expect(result).toEqual({ 'content-type': 'text/html', 'accept': '*/*' });
  });

  it('10. should skip malformed lines without a colon', () => {
    const raw = 'Content-Type: text/html\r\nmalformed-line\r\nAccept: */*';
    const result = parseHTTPHeaders(raw);
    expect(result).toEqual({ 'content-type': 'text/html', 'accept': '*/*' });
  });

  it('11. should handle a header block with only a status line and blank lines', () => {
    const raw = 'HTTP/1.1 204 No Content\r\n\r\n';
    const result = parseHTTPHeaders(raw);
    expect(result).toEqual({});
  });

  it('12. should handle a header with an empty value', () => {
    const result = parseHTTPHeaders('X-Custom:');
    expect(result).toEqual({ 'x-custom': '' });
  });

  it('13. should parse an HTTP/2 style header', () => {
    const raw = 'HTTP/2 301\r\nlocation: https://example.com/\r\ncontent-length: 0';
    const result = parseHTTPHeaders(raw);
    expect(result).toEqual({
      'location': 'https://example.com/',
      'content-length': '0',
    });
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('14. should throw Error for an empty string', () => {
    expect(() => parseHTTPHeaders('')).toThrow(Error);
    expect(() => parseHTTPHeaders('')).toThrow('raw header string cannot be empty');
  });

  it('15. should throw Error for a whitespace-only string', () => {
    expect(() => parseHTTPHeaders('   ')).toThrow(Error);
    expect(() => parseHTTPHeaders('   ')).toThrow('raw header string cannot be empty');
  });

  it('16. should throw TypeError when raw is not a string', () => {
    expect(() => parseHTTPHeaders(42 as unknown as string)).toThrow(TypeError);
    expect(() => parseHTTPHeaders(42 as unknown as string)).toThrow(
      'raw must be a string, got number',
    );
  });

  it('17. should throw TypeError when raw is null', () => {
    expect(() => parseHTTPHeaders(null as unknown as string)).toThrow(TypeError);
    expect(() => parseHTTPHeaders(null as unknown as string)).toThrow(
      'raw must be a string, got object',
    );
  });
});
