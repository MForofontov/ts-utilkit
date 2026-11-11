import { relativePath } from '../src/relativePath';

describe('relativePath', () => {
  it('1. should compute a relative path between directories', () => {
    expect(
      relativePath('/data/orandea/test/aaa', '/data/orandea/impl/bbb'),
    ).toBe('../../impl/bbb');
  });

  it('2. should return . for identical paths', () => {
    expect(relativePath('/a/b', '/a/b')).toBe('');
  });

  it('3. should handle relative inputs', () => {
    expect(relativePath('a/b', 'a/c')).toBe('../c');
  });
});
