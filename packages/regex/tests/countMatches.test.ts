import { countMatches } from '../src/countMatches';

/**
 * Unit tests for the countMatches function.
 */
describe('countMatches', () => {
  // Normal usage tests
  it('1. should count numbers in text', () => {
    const result = countMatches('test123test456test', /\d+/);
    expect(result).toBe(2);
  });

  it('2. should count words', () => {
    const result = countMatches('one two three four', /\w+/);
    expect(result).toBe(4);
  });

  it('3. should work with string pattern', () => {
    const result = countMatches('test,test,test', 'test');
    expect(result).toBe(3);
  });

  it('4. should handle case-insensitive matching', () => {
    const result = countMatches('Test TEST test', 'test', 'i');
    expect(result).toBe(3);
  });

  it('5. should count email addresses', () => {
    const text = 'Contact us at test@example.com or support@example.com';
    const result = countMatches(text, /[\w.-]+@[\w.-]+\.\w+/);
    expect(result).toBe(2);
  });

  it('6. should count single characters', () => {
    const result = countMatches('hello', /l/);
    expect(result).toBe(2);
  });

  it('7. should automatically add global flag', () => {
    const result = countMatches('a a a', /a/);
    expect(result).toBe(3);
  });

  // Edge cases
  it('8. should return 0 when no matches found', () => {
    const result = countMatches('no numbers here', /\d+/);
    expect(result).toBe(0);
  });

  it('9. should return 0 for empty string', () => {
    const result = countMatches('', /\w+/);
    expect(result).toBe(0);
  });

  it('10. should count overlapping potential matches correctly', () => {
    // JavaScript regex doesn't match overlapping patterns by default
    const result = countMatches('aaaa', /aa/);
    expect(result).toBe(2); // Matches "aa" at positions 0 and 2
  });

  // Error cases
  it('11. should throw TypeError when text is not a string', () => {
    expect(() => countMatches(123 as any, /test/)).toThrow(TypeError);
    expect(() => countMatches(123 as any, /test/)).toThrow(
      'text must be a string',
    );
  });

  it('12. should throw TypeError when pattern is invalid type', () => {
    expect(() => countMatches('test', 123 as any)).toThrow(TypeError);
    expect(() => countMatches('test', 123 as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('13. should throw TypeError when flags is not a string', () => {
    expect(() => countMatches('test', 'pattern', 123 as any)).toThrow(
      TypeError,
    );
    expect(() => countMatches('test', 'pattern', 123 as any)).toThrow(
      'flags must be a string',
    );
  });

  it('14. should throw Error when pattern is invalid', () => {
    expect(() => countMatches('test', '[unclosed')).toThrow(Error);
    expect(() => countMatches('test', '[unclosed')).toThrow(
      'Invalid regular expression pattern',
    );
  });
});
