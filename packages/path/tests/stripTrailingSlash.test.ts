import { stripTrailingSlash } from '../src/stripTrailingSlash';

describe('stripTrailingSlash', () => {
  it('1. should remove a trailing slash', () => {
    expect(stripTrailingSlash('foo/bar/')).toBe('foo/bar');
  });

  it('2. should leave paths without a trailing slash', () => {
    expect(stripTrailingSlash('foo/bar')).toBe('foo/bar');
  });

  it('3. should preserve the root slash', () => {
    expect(stripTrailingSlash('/')).toBe('/');
  });
});
