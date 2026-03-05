import { isAbsoluteURL } from '../src/isAbsoluteURL';

/**
 * Unit tests for the isAbsoluteURL function.
 */
describe('isAbsoluteURL', () => {
  // ── Absolute URLs (should return true) ───────────────────────────────────

  it('1. should return true for an https URL', () => {
    // Arrange
    const url = 'https://example.com';

    // Act
    const result = isAbsoluteURL(url);

    // Assert
    expect(result).toBe(true);
  });

  it('2. should return true for an http URL', () => {
    // Arrange
    const url = 'http://example.com/path?query=1';

    // Act
    const result = isAbsoluteURL(url);

    // Assert
    expect(result).toBe(true);
  });

  it('3. should return true for an ftp URL', () => {
    expect(isAbsoluteURL('ftp://files.example.com/resource')).toBe(true);
  });

  it('4. should return true for a mailto URL', () => {
    expect(isAbsoluteURL('mailto:user@example.com')).toBe(true);
  });

  it('5. should return true for a custom scheme URL', () => {
    expect(isAbsoluteURL('myapp://open/route')).toBe(true);
  });

  it('6. should return true for an https URL with port, path, query and fragment', () => {
    expect(
      isAbsoluteURL('https://api.example.com:8080/v1/items?page=2#top'),
    ).toBe(true);
  });

  // ── Relative URLs (should return false) ──────────────────────────────────

  it('7. should return false for a root-relative path', () => {
    expect(isAbsoluteURL('/path/to/page')).toBe(false);
  });

  it('8. should return false for a same-directory relative path', () => {
    expect(isAbsoluteURL('./relative/page.html')).toBe(false);
  });

  it('9. should return false for a parent-directory relative path', () => {
    expect(isAbsoluteURL('../parent/page.html')).toBe(false);
  });

  it('10. should return false for a bare path with no leading slash', () => {
    expect(isAbsoluteURL('page.html')).toBe(false);
  });

  it('11. should return false for a protocol-relative URL', () => {
    // Protocol-relative URLs require a base to resolve the scheme
    expect(isAbsoluteURL('//example.com/path')).toBe(false);
  });

  it('12. should return false for a query-string-only URL', () => {
    expect(isAbsoluteURL('?key=value')).toBe(false);
  });

  it('13. should return false for a fragment-only URL', () => {
    expect(isAbsoluteURL('#section')).toBe(false);
  });

  it('14. should return false for an empty string', () => {
    expect(isAbsoluteURL('')).toBe(false);
  });

  it('15. should return false for a plain word with no scheme', () => {
    expect(isAbsoluteURL('example')).toBe(false);
  });

  // ── Error cases ───────────────────────────────────────────────────────────
});
