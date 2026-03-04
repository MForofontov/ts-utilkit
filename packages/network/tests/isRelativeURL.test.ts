import { isRelativeURL } from '../src/isRelativeURL';

/**
 * Unit tests for the isRelativeURL function.
 */
describe('isRelativeURL', () => {
  // ── Relative URLs (should return true) ───────────────────────────────────

  it('1. should return true for a root-relative path', () => {
    expect(isRelativeURL('/path/to/page')).toBe(true);
  });

  it('2. should return true for a same-directory relative path', () => {
    expect(isRelativeURL('./relative/page.html')).toBe(true);
  });

  it('3. should return true for a parent-directory relative path', () => {
    expect(isRelativeURL('../parent/page.html')).toBe(true);
  });

  it('4. should return true for a bare relative path with no leading slash', () => {
    expect(isRelativeURL('page.html')).toBe(true);
  });

  it('5. should return true for a nested bare path', () => {
    expect(isRelativeURL('api/v1/users')).toBe(true);
  });

  it('6. should return true for a protocol-relative URL', () => {
    // Protocol-relative URLs need a base, so they are relative
    expect(isRelativeURL('//example.com/path')).toBe(true);
  });

  it('7. should return true for a query-string-only URL', () => {
    expect(isRelativeURL('?key=value&page=1')).toBe(true);
  });

  it('8. should return true for a fragment-only URL', () => {
    expect(isRelativeURL('#section-heading')).toBe(true);
  });

  it('9. should return true for a URL with path, query, and fragment (no scheme)', () => {
    expect(isRelativeURL('/search?q=test#results')).toBe(true);
  });

  // ── Absolute URLs (should return false) ──────────────────────────────────

  it('10. should return false for an https URL', () => {
    expect(isRelativeURL('https://example.com/path')).toBe(false);
  });

  it('11. should return false for an http URL', () => {
    expect(isRelativeURL('http://localhost:3000/api')).toBe(false);
  });

  it('12. should return false for an ftp URL', () => {
    expect(isRelativeURL('ftp://files.example.com')).toBe(false);
  });

  it('13. should return false for a mailto URL', () => {
    expect(isRelativeURL('mailto:user@example.com')).toBe(false);
  });

  it('14. should return false for a custom-scheme URL', () => {
    expect(isRelativeURL('myapp://open/route')).toBe(false);
  });

  // ── Error cases ───────────────────────────────────────────────────────────
});
