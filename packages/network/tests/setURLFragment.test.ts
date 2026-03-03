import { setURLFragment } from '../src/setURLFragment';

/**
 * Unit tests for the setURLFragment function.
 */
describe('setURLFragment', () => {
  // ── Setting a new fragment ────────────────────────────────────────────────

  it('1. should add a fragment to a URL that has none', () => {
    // Arrange & Act
    const result = setURLFragment('https://example.com/page', 'section');

    // Assert
    expect(result).toBe('https://example.com/page#section');
  });

  it('2. should add a fragment to the origin URL', () => {
    expect(setURLFragment('https://example.com', 'top')).toBe(
      'https://example.com/#top',
    );
  });

  it('3. should add a fragment with hyphens', () => {
    expect(setURLFragment('https://example.com/page', 'section-3')).toBe(
      'https://example.com/page#section-3',
    );
  });

  // ── Replacing an existing fragment ───────────────────────────────────────

  it('4. should replace an existing fragment', () => {
    expect(setURLFragment('https://example.com/page#old', 'new')).toBe(
      'https://example.com/page#new',
    );
  });

  it('5. should replace a fragment while preserving the query string', () => {
    expect(
      setURLFragment('https://example.com?page=1#old-section', 'new-section'),
    ).toBe('https://example.com/?page=1#new-section');
  });

  // ── Clearing the fragment ─────────────────────────────────────────────────

  it('6. should clear the fragment when an empty string is passed', () => {
    const result = setURLFragment('https://example.com/page#section', '');
    expect(result).toBe('https://example.com/page');
  });

  it('7. should return the URL unchanged when no fragment existed and empty string passed', () => {
    const result = setURLFragment('https://example.com/page', '');
    expect(result).toBe('https://example.com/page');
  });

  // ── Edge cases ────────────────────────────────────────────────────────────

  it('8. should handle a fragment value that includes a leading "#"', () => {
    // The URL constructor handles the double-hash correctly
    const result = setURLFragment('https://example.com', '#top');
    // '#top' as the hash value — browser normalises to '#top'
    expect(result).toContain('#top');
  });

  it('9. should preserve path and query when setting a fragment', () => {
    const result = setURLFragment(
      'https://api.example.com/v1/items?sort=asc&page=2',
      'item-42',
    );
    expect(result).toBe(
      'https://api.example.com/v1/items?sort=asc&page=2#item-42',
    );
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('12. should throw Error when url is not a valid URL', () => {
    expect(() => setURLFragment('not-a-url', 'frag')).toThrow(Error);
    expect(() => setURLFragment('not-a-url', 'frag')).toThrow(
      'Invalid URL: not-a-url',
    );
  });
});
