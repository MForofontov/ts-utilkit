import { ensureTrailingSlash } from '../src/ensureTrailingSlash';

describe('ensureTrailingSlash', () => {
  it('1. should append a slash when missing', () => {
    expect(ensureTrailingSlash('foo/bar')).toBe('foo/bar/');
  });

  it('2. should leave an existing trailing slash', () => {
    expect(ensureTrailingSlash('foo/bar/')).toBe('foo/bar/');
  });

  it('3. should return / for empty input', () => {
    expect(ensureTrailingSlash('')).toBe('/');
  });
});
