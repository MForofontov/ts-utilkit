import { testPattern } from '../src/testPattern';

/**
 * Unit tests for the testPattern function.
 */
describe('testPattern', () => {
  // Normal usage tests
  it('1. should return true when pattern matches', () => {
    const result = testPattern('hello world', /world/);
    expect(result).toBe(true);
  });

  it('2. should return false when pattern does not match', () => {
    const result = testPattern('hello world', /xyz/);
    expect(result).toBe(false);
  });

  it('3. should work with string pattern', () => {
    const result = testPattern('test@example.com', 'test');
    expect(result).toBe(true);
  });

  it('4. should handle case-insensitive matching', () => {
    const result = testPattern('Hello World', /hello/i);
    expect(result).toBe(true);
  });

  it('5. should test number patterns', () => {
    const result = testPattern('price: $123.45', /\$\d+\.\d{2}/);
    expect(result).toBe(true);
  });

  it('6. should test email pattern', () => {
    const result = testPattern('test@example.com', /^[\w.-]+@[\w.-]+\.\w+$/);
    expect(result).toBe(true);
  });

  it('7. should work without timeout option', () => {
    const result = testPattern('quick test', /test/);
    expect(result).toBe(true);
  });

  it('8. should complete within timeout for simple patterns', () => {
    const result = testPattern('test string', /test/, { timeout: 100 });
    expect(result).toBe(true);
  });

  it('9. should handle multiline matching', () => {
    const result = testPattern('line1\nline2', /^line2$/m);
    expect(result).toBe(true);
  });

  // Edge cases
  it('10. should return false for empty string with non-matching pattern', () => {
    const result = testPattern('', /test/);
    expect(result).toBe(false);
  });

  it('11. should return true when empty string matches pattern', () => {
    const result = testPattern('', /^$/);
    expect(result).toBe(true);
  });

  it('12. should handle patterns with lookaheads', () => {
    const result = testPattern('password123', /^(?=.*\d)(?=.*[a-z]).{8,}$/);
    expect(result).toBe(true);
  });

  it('16. should throw Error when pattern is invalid', () => {
    expect(() => testPattern('test', '[unclosed')).toThrow(Error);
    expect(() => testPattern('test', '[unclosed')).toThrow(
      'Invalid regular expression pattern',
    );
  });
});
