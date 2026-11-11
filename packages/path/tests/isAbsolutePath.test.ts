import { isAbsolutePath } from '../src/isAbsolutePath';

describe('isAbsolutePath', () => {
  it('1. should return true for absolute paths', () => {
    expect(isAbsolutePath('/usr/bin')).toBe(true);
  });

  it('2. should return false for relative paths', () => {
    expect(isAbsolutePath('relative/path')).toBe(false);
  });

  it('3. should return false for empty string', () => {
    expect(isAbsolutePath('')).toBe(false);
  });
});
