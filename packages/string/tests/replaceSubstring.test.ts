import { replaceSubstring } from '../src/replaceSubstring';

describe('replaceSubstring', () => {
  it('1. should replace all occurrences', () => {
    expect(replaceSubstring('hello hello hello', 'hello', 'hi')).toBe('hi hi hi');
  });
  it('2. should return the original string when search not found', () => {
    expect(replaceSubstring('hello world', 'xyz', 'abc')).toBe('hello world');
  });
  it('3. should handle empty replacement (deletion)', () => {
    expect(replaceSubstring('hello world', 'o', '')).toBe('hell wrld');
  });
  it('4. should handle empty source string', () => {
    expect(replaceSubstring('', 'x', 'y')).toBe('');
  });
  it('5. should handle only one occurrence', () => {
    expect(replaceSubstring('hello world', 'world', 'earth')).toBe('hello earth');
  });
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => replaceSubstring(123 as unknown as string, 'x', 'y')).toThrow(TypeError);
    expect(() => replaceSubstring(123 as unknown as string, 'x', 'y')).toThrow('str must be a string, got number');
  });
  it('7. should throw TypeError when search is not a string', () => {
    expect(() => replaceSubstring('hello', 123 as unknown as string, 'y')).toThrow(TypeError);
    expect(() => replaceSubstring('hello', 123 as unknown as string, 'y')).toThrow('search must be a string, got number');
  });
  it('8. should throw TypeError when replacement is not a string', () => {
    expect(() => replaceSubstring('hello', 'x', 123 as unknown as string)).toThrow(TypeError);
    expect(() => replaceSubstring('hello', 'x', 123 as unknown as string)).toThrow('replacement must be a string, got number');
  });
});
