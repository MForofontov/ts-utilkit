import { normalizePath } from '../src/normalizePath';

describe('normalizePath', () => {
  it('1. should resolve parent segments', () => {
    expect(normalizePath('a/b/../c')).toBe('a/c');
  });

  it('2. should collapse duplicate slashes', () => {
    expect(normalizePath('a//b///c')).toBe('a/b/c');
  });

  it('3. should preserve absolute roots', () => {
    expect(normalizePath('/a/../b')).toBe('/b');
  });
});
