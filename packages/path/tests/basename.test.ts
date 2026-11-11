import { basename } from '../src/basename';

describe('basename', () => {
  it('1. should return the last path segment', () => {
    expect(basename('/foo/bar.txt')).toBe('bar.txt');
  });

  it('2. should strip a matching extension', () => {
    expect(basename('/foo/bar.txt', '.txt')).toBe('bar');
  });

  it('3. should handle trailing slashes', () => {
    expect(basename('/foo/bar/')).toBe('bar');
  });
});
