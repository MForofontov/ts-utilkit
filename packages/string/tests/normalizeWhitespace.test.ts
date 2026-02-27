import { normalizeWhitespace } from '../src/normalizeWhitespace';

/**
 * Unit tests for the normalizeWhitespace function.
 */
describe('normalizeWhitespace', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should collapse multiple spaces between words', () => {
    expect(normalizeWhitespace('hello   world')).toBe('hello world');
  });

  it('2. should trim leading whitespace', () => {
    expect(normalizeWhitespace('   hello')).toBe('hello');
  });

  it('3. should trim trailing whitespace', () => {
    expect(normalizeWhitespace('hello   ')).toBe('hello');
  });

  it('4. should trim both leading and trailing whitespace', () => {
    expect(normalizeWhitespace('  hello world  ')).toBe('hello world');
  });

  it('5. should collapse tabs between words', () => {
    expect(normalizeWhitespace('hello\t\tworld')).toBe('hello world');
  });

  it('6. should collapse newlines between words', () => {
    expect(normalizeWhitespace('hello\n\nworld')).toBe('hello world');
  });

  it('7. should handle mixed whitespace characters', () => {
    expect(normalizeWhitespace('\t hello \n world \t')).toBe('hello world');
  });

  it('8. should handle three or more words', () => {
    expect(normalizeWhitespace('  one   two   three  ')).toBe('one two three');
  });

  it('9. should leave a single-space-separated sentence unchanged', () => {
    expect(normalizeWhitespace('the quick brown fox')).toBe(
      'the quick brown fox',
    );
  });

  it('10. should handle a single word with surrounding whitespace', () => {
    expect(normalizeWhitespace('  hello  ')).toBe('hello');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('11. should return empty string for an empty input', () => {
    expect(normalizeWhitespace('')).toBe('');
  });

  it('12. should return empty string for whitespace-only input', () => {
    expect(normalizeWhitespace('   ')).toBe('');
    expect(normalizeWhitespace('\t\n\r')).toBe('');
  });

  it('13. should handle a string with no whitespace unchanged', () => {
    expect(normalizeWhitespace('helloworld')).toBe('helloworld');
  });

  it('14. should handle a single space between words (no change needed)', () => {
    expect(normalizeWhitespace('hello world')).toBe('hello world');
  });

  it('15. should handle very long runs of whitespace', () => {
    const input = 'a' + ' '.repeat(100) + 'b';
    expect(normalizeWhitespace(input)).toBe('a b');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('16. should throw TypeError when str is a number', () => {
    expect(() => normalizeWhitespace(42 as unknown as string)).toThrow(TypeError);
    expect(() => normalizeWhitespace(42 as unknown as string)).toThrow(
      'str must be a string, got number',
    );
  });

  it('17. should throw TypeError when str is null', () => {
    expect(() => normalizeWhitespace(null as unknown as string)).toThrow(TypeError);
    expect(() => normalizeWhitespace(null as unknown as string)).toThrow(
      'str must be a string, got object',
    );
  });

  it('18. should throw TypeError when str is undefined', () => {
    expect(() =>
      normalizeWhitespace(undefined as unknown as string),
    ).toThrow(TypeError);
    expect(() =>
      normalizeWhitespace(undefined as unknown as string),
    ).toThrow('str must be a string, got undefined');
  });

  it('19. should throw TypeError when str is an array', () => {
    expect(() =>
      normalizeWhitespace(['hello'] as unknown as string),
    ).toThrow(TypeError);
    expect(() =>
      normalizeWhitespace(['hello'] as unknown as string),
    ).toThrow('str must be a string, got object');
  });
});
