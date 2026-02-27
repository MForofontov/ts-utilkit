import { truncateWords } from '../src/truncateWords';

/**
 * Unit tests for the truncateWords function.
 */
describe('truncateWords', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should truncate a sentence to the specified word count', () => {
    expect(truncateWords('The quick brown fox jumps', 3)).toBe(
      'The quick brown...',
    );
  });

  it('2. should append the default suffix "..."', () => {
    expect(truncateWords('one two three four', 2)).toBe('one two...');
  });

  it('3. should use a custom suffix when provided', () => {
    expect(truncateWords('The quick brown fox', 2, ' [read more]')).toBe(
      'The quick [read more]',
    );
  });

  it('4. should not truncate when word count is within limit', () => {
    expect(truncateWords('Hello world', 5)).toBe('Hello world');
  });

  it('5. should not truncate when word count equals the limit', () => {
    expect(truncateWords('one two three', 3)).toBe('one two three');
  });

  it('6. should truncate to one word', () => {
    expect(truncateWords('The quick brown fox', 1)).toBe('The...');
  });

  it('7. should truncate a long article excerpt', () => {
    const text =
      'Lorem ipsum dolor sit amet consectetur adipiscing elit';
    expect(truncateWords(text, 4)).toBe('Lorem ipsum dolor sit...');
  });

  it('8. should collapse multiple spaces between words when truncating', () => {
    expect(truncateWords('one   two   three   four', 2)).toBe('one two...');
  });

  it('9. should strip leading and trailing whitespace', () => {
    expect(truncateWords('  hello world  ', 1)).toBe('hello...');
  });

  it('10. should use an empty string suffix (no ellipsis)', () => {
    expect(truncateWords('one two three four', 2, '')).toBe('one two');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('11. should return empty string for empty input', () => {
    expect(truncateWords('', 5)).toBe('');
  });

  it('12. should return empty string for whitespace-only input', () => {
    expect(truncateWords('   ', 3)).toBe('');
  });

  it('13. should handle a single-word string with count=1 (no truncation)', () => {
    expect(truncateWords('hello', 1)).toBe('hello');
  });

  it('14. should handle a single-word string when count exceeds word count', () => {
    expect(truncateWords('hello', 10)).toBe('hello');
  });

  it('15. should handle tabs and newlines as word separators', () => {
    expect(truncateWords('one\ttwo\nthree', 2)).toBe('one two...');
  });

  it('16. should produce correct output with count equal to total words', () => {
    expect(truncateWords('a b c', 3)).toBe('a b c');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('17. should throw TypeError when str is not a string', () => {
    expect(() => truncateWords(123 as unknown as string, 3)).toThrow(TypeError);
    expect(() => truncateWords(123 as unknown as string, 3)).toThrow(
      'str must be a string, got number',
    );
  });

  it('18. should throw TypeError when count is not a number', () => {
    expect(() =>
      truncateWords('hello world', '3' as unknown as number),
    ).toThrow(TypeError);
    expect(() =>
      truncateWords('hello world', '3' as unknown as number),
    ).toThrow('count must be a number, got string');
  });

  it('19. should throw TypeError when suffix is not a string', () => {
    expect(() =>
      truncateWords('hello world', 1, 42 as unknown as string),
    ).toThrow(TypeError);
    expect(() =>
      truncateWords('hello world', 1, 42 as unknown as string),
    ).toThrow('suffix must be a string, got number');
  });

  it('20. should throw Error when count is NaN', () => {
    expect(() => truncateWords('hello world', NaN)).toThrow(Error);
    expect(() => truncateWords('hello world', NaN)).toThrow(
      'count must be a valid number, not NaN',
    );
  });

  it('21. should throw Error when count is 0', () => {
    expect(() => truncateWords('hello world', 0)).toThrow(Error);
    expect(() => truncateWords('hello world', 0)).toThrow(
      'count must be at least 1',
    );
  });

  it('22. should throw Error when count is negative', () => {
    expect(() => truncateWords('hello world', -1)).toThrow(Error);
    expect(() => truncateWords('hello world', -1)).toThrow(
      'count must be at least 1',
    );
  });
});
