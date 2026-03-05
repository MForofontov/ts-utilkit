import { hasQueryParam } from '../src/hasQueryParam';

/**
 * Unit tests for the hasQueryParam function.
 */
describe('hasQueryParam', () => {
  // ── Parameter present ─────────────────────────────────────────────────────

  it('1. should return true when the parameter exists', () => {
    // Arrange
    const url = 'https://example.com?page=1&limit=10';

    // Act & Assert
    expect(hasQueryParam(url, 'page')).toBe(true);
  });

  it('2. should return true for a second existing parameter', () => {
    expect(hasQueryParam('https://example.com?page=1&limit=10', 'limit')).toBe(
      true,
    );
  });

  it('3. should return true for a key-only parameter (no value)', () => {
    // "?debug" is a valid key with an empty string value
    expect(hasQueryParam('https://example.com?debug', 'debug')).toBe(true);
  });

  it('4. should return true for a parameter with an empty value', () => {
    expect(hasQueryParam('https://example.com?q=', 'q')).toBe(true);
  });

  it('5. should return true for a multi-value parameter', () => {
    expect(hasQueryParam('https://example.com?tag=a&tag=b&tag=c', 'tag')).toBe(
      true,
    );
  });

  it('6. should return true when there is only one parameter', () => {
    expect(hasQueryParam('https://example.com?sort=asc', 'sort')).toBe(true);
  });

  // ── Parameter absent ──────────────────────────────────────────────────────

  it('7. should return false when the parameter does not exist', () => {
    expect(hasQueryParam('https://example.com?page=1', 'offset')).toBe(false);
  });

  it('8. should return false when the URL has no query string', () => {
    expect(hasQueryParam('https://example.com/path', 'page')).toBe(false);
  });

  it('9. should return false for a case-mismatched key', () => {
    // Lookup is case-sensitive
    expect(hasQueryParam('https://example.com?Page=1', 'page')).toBe(false);
  });

  it('10. should return false when key is an empty string and no blank key exists', () => {
    expect(hasQueryParam('https://example.com?page=1', '')).toBe(false);
  });

  it('11. should return true when an empty-string key actually exists in the query', () => {
    expect(hasQueryParam('https://example.com?=value', '')).toBe(true);
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('14. should throw Error when url is not a valid URL', () => {
    expect(() => hasQueryParam('not-a-valid-url', 'key')).toThrow(Error);
    expect(() => hasQueryParam('not-a-valid-url', 'key')).toThrow(
      'Invalid URL: not-a-valid-url',
    );
  });
});
