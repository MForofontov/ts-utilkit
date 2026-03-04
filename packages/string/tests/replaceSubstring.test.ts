import { replaceSubstring } from '../src/replaceSubstring';

describe('replaceSubstring', () => {
  it('1. should replace all occurrences', () => {
    expect(replaceSubstring('hello hello hello', 'hello', 'hi')).toBe(
      'hi hi hi',
    );
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
    expect(replaceSubstring('hello world', 'world', 'earth')).toBe(
      'hello earth',
    );
  });
});
