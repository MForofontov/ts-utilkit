import { dirname } from '../src/dirname';

describe('dirname', () => {
  it('1. should return the parent directory', () => {
    expect(dirname('/foo/bar/baz.txt')).toBe('/foo/bar');
  });

  it('2. should return . for a bare filename', () => {
    expect(dirname('file.txt')).toBe('.');
  });

  it('3. should return / for root files', () => {
    expect(dirname('/file.txt')).toBe('/');
  });
});
