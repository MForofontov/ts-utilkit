import { extname } from '../src/extname';

describe('extname', () => {
  it('1. should return the extension including the dot', () => {
    expect(extname('file.tar.gz')).toBe('.gz');
  });

  it('2. should return empty string when no extension', () => {
    expect(extname('README')).toBe('');
  });

  it('3. should handle hidden files without an extension', () => {
    expect(extname('.gitignore')).toBe('');
  });
});
