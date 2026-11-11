import { joinPath } from '../src/joinPath';

describe('joinPath', () => {
  it('1. should join multiple segments', () => {
    expect(joinPath('a', 'b', 'c')).toBe('a/b/c');
  });

  it('2. should normalize slashes while joining', () => {
    expect(joinPath('/foo/', '/bar')).toBe('/foo/bar');
  });

  it('3. should return . for no segments', () => {
    expect(joinPath()).toBe('.');
  });
});
