import { replaceFirst } from '../src/replaceFirst';

describe('replaceFirst', () => {
  it('1. should replace only the first occurrence', () => {
    expect(replaceFirst('hello hello hello', 'hello', 'hi')).toBe('hi hello hello');
  });
  it('2. should return the original string when search not found', () => {
    expect(replaceFirst('hello world', 'xyz', 'abc')).toBe('hello world');
  });
  it('3. should handle empty search string', () => {
    expect(replaceFirst('hello', '', 'x')).toBe('xhello');
  });
  it('4. should handle empty replacement', () => {
    expect(replaceFirst('hello world', 'hello ', '')).toBe('world');
  });
  it('5. should handle empty source string', () => {
    expect(replaceFirst('', 'x', 'y')).toBe('');
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => replaceFirst(123 as unknown as string, 'x', 'y')).toThrow(TypeError);
    expect(() => replaceFirst(123 as unknown as string, 'x', 'y')).toThrow('str must be a string, got number');
  });
  it('7. should throw TypeError when search is not a string', () => {
    expect(() => replaceFirst('hello', 123 as unknown as string, 'y')).toThrow(TypeError);
    expect(() => replaceFirst('hello', 123 as unknown as string, 'y')).toThrow('search must be a string, got number');
  });
  it('8. should throw TypeError when replacement is not a string', () => {
    expect(() => replaceFirst('hello', 'x', 123 as unknown as string)).toThrow(TypeError);
    expect(() => replaceFirst('hello', 'x', 123 as unknown as string)).toThrow('replacement must be a string, got number');
  });
});
