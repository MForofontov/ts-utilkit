import { highlightMatches } from '../src/highlightMatches';

/**
 * Unit tests for the highlightMatches function.
 */
describe('highlightMatches', () => {
  // Normal usage tests
  it('1. should highlight numbers with default mark tags', () => {
    const result = highlightMatches('test 123 and 456', /\d+/);
    expect(result).toBe('test <mark>123</mark> and <mark>456</mark>');
  });

  it('2. should highlight with custom tags', () => {
    const result = highlightMatches('hello world', /world/, {
      before: '<strong>',
      after: '</strong>',
    });
    expect(result).toBe('hello <strong>world</strong>');
  });

  it('3. should work with string pattern', () => {
    const result = highlightMatches('test test test', 'test');
    expect(result).toBe(
      '<mark>test</mark> <mark>test</mark> <mark>test</mark>',
    );
  });

  it('4. should highlight case-insensitive matches', () => {
    const result = highlightMatches('Test TEST test', 'test', {}, 'i');
    expect(result).toBe(
      '<mark>Test</mark> <mark>TEST</mark> <mark>test</mark>',
    );
  });

  it('5. should highlight email addresses', () => {
    const text = 'Contact: test@example.com';
    const result = highlightMatches(text, /[\w.-]+@[\w.-]+\.\w+/);
    expect(result).toBe('Contact: <mark>test@example.com</mark>');
  });

  it('6. should use custom class name', () => {
    const result = highlightMatches('highlight this', /this/, {
      before: '<span class="highlight">',
      after: '</span>',
    });
    expect(result).toBe('highlight <span class="highlight">this</span>');
  });

  it('7. should automatically add global flag', () => {
    const result = highlightMatches('a a a', /a/);
    expect(result).toBe('<mark>a</mark> <mark>a</mark> <mark>a</mark>');
  });

  it('8. should highlight single characters', () => {
    const result = highlightMatches('hello', /l/);
    expect(result).toBe('he<mark>l</mark><mark>l</mark>o');
  });

  // Edge cases
  it('9. should return original text when no matches found', () => {
    const result = highlightMatches('no numbers here', /\d+/);
    expect(result).toBe('no numbers here');
  });

  it('10. should return empty string for empty input', () => {
    const result = highlightMatches('', /test/);
    expect(result).toBe('');
  });

  it('11. should handle matches at start and end', () => {
    const result = highlightMatches('123test456', /\d+/);
    expect(result).toBe('<mark>123</mark>test<mark>456</mark>');
  });

  // Error cases
  it('12. should throw TypeError when text is not a string', () => {
    expect(() => highlightMatches(123 as any, /test/)).toThrow(TypeError);
    expect(() => highlightMatches(123 as any, /test/)).toThrow(
      'text must be a string',
    );
  });

  it('13. should throw TypeError when pattern is invalid type', () => {
    expect(() => highlightMatches('test', 123 as any)).toThrow(TypeError);
    expect(() => highlightMatches('test', 123 as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('14. should throw TypeError when options is not an object', () => {
    expect(() => highlightMatches('test', /test/, 'invalid' as any)).toThrow(
      TypeError,
    );
    expect(() => highlightMatches('test', /test/, 'invalid' as any)).toThrow(
      'options must be an object',
    );
  });

  it('15. should throw Error when pattern is invalid', () => {
    expect(() => highlightMatches('test', '[unclosed')).toThrow(Error);
    expect(() => highlightMatches('test', '[unclosed')).toThrow(
      'Invalid regular expression pattern',
    );
  });
});
