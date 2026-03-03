import { wrapText } from '../src/wrapText';

/**
 * Unit tests for the wrapText function.
 */
describe('wrapText', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should wrap a sentence at the specified max width', () => {
    expect(wrapText('The quick brown fox', 10)).toBe('The quick\nbrown fox');
  });

  it('2. should wrap at exact word boundary', () => {
    expect(wrapText('Hello World', 5)).toBe('Hello\nWorld');
  });

  it('3. should not wrap when text fits in one line', () => {
    expect(wrapText('Hello', 10)).toBe('Hello');
  });

  it('4. should not wrap when text is exactly maxWidth characters', () => {
    expect(wrapText('Hello', 5)).toBe('Hello');
  });

  it('5. should produce multiple lines for long text', () => {
    const result = wrapText('one two three four five', 7);
    // 'one two' (7), 'three' (5), 'four' (4), 'five' (4)
    expect(result).toBe('one two\nthree\nfour\nfive');
  });

  it('6. should place a word longer than maxWidth on its own line', () => {
    expect(wrapText('Hi superlongword there', 5)).toBe('Hi\nsuperlongword\nthere');
  });

  it('7. should handle a single very long word without wrapping it', () => {
    expect(wrapText('superlongword', 5)).toBe('superlongword');
  });

  it('8. should handle multiple spaces between words by collapsing them', () => {
    expect(wrapText('The   quick   brown', 10)).toBe('The quick\nbrown');
  });

  it('9. should handle leading and trailing whitespace', () => {
    expect(wrapText('  hello world  ', 20)).toBe('hello world');
  });

  it('10. should wrap with maxWidth of 1 (each word on its own line)', () => {
    const result = wrapText('a b c', 1);
    expect(result).toBe('a\nb\nc');
  });

  it('11. should correctly span three lines', () => {
    const result = wrapText('alpha beta gamma delta epsilon', 12);
    expect(result).toBe('alpha beta\ngamma delta\nepsilon');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('12. should return empty string for empty input', () => {
    expect(wrapText('', 10)).toBe('');
  });

  it('13. should return empty string for whitespace-only input', () => {
    expect(wrapText('   ', 10)).toBe('');
  });

  it('14. should handle a single word equal to maxWidth', () => {
    expect(wrapText('Hello', 5)).toBe('Hello');
  });

  it('15. should handle two words that each fit exactly on their lines', () => {
    expect(wrapText('Hello World', 11)).toBe('Hello World');
  });

  it('16. should handle tabs as whitespace word separators', () => {
    expect(wrapText('Hello\tWorld', 5)).toBe('Hello\nWorld');
  });

  it('17. should handle newlines in input as whitespace separators', () => {
    expect(wrapText('Hello\nWorld', 20)).toBe('Hello World');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('21. should throw Error when maxWidth is 0', () => {
    expect(() => wrapText('hello', 0)).toThrow(Error);
  });

  it('22. should throw Error when maxWidth is negative', () => {
    expect(() => wrapText('hello', -5)).toThrow(Error);
  });
});
