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

  it('4. should handle case-insensitive matching via flags param', () => {
    const result = testPattern('HELLO', '^hello$', undefined, 'i');
    expect(result).toBe(true);
  });

  it('5. should handle case-insensitive matching via RegExp flag', () => {
    const result = testPattern('Hello World', /hello/i);
    expect(result).toBe(true);
  });

  it('6. should test number patterns', () => {
    const result = testPattern('price: $123.45', /\$\d+\.\d{2}/);
    expect(result).toBe(true);
  });

  it('7. should test email pattern', () => {
    const result = testPattern('test@example.com', /^[\w.-]+@[\w.-]+\.\w+$/);
    expect(result).toBe(true);
  });

  it('8. should work without timeout option', () => {
    const result = testPattern('quick test', /test/);
    expect(result).toBe(true);
  });

  it('9. should complete within timeout for simple patterns (no timeout error)', () => {
    // Arrange: a simple, fast pattern with a generous timeout
    const result = testPattern('test string', /test/, { timeout: 2000 });
    // Act & Assert: fast pattern must complete well within 2 s
    expect(result).toBe(true);
  });

  it('10. should return false within timeout for non-matching simple pattern', () => {
    const result = testPattern('hello', /world/, { timeout: 2000 });
    expect(result).toBe(false);
  });

  it('11. should handle multiline matching', () => {
    const result = testPattern('line1\nline2', /^line2$/m);
    expect(result).toBe(true);
  });

  // Edge cases
  it('12. should return false for empty string with non-matching pattern', () => {
    const result = testPattern('', /test/);
    expect(result).toBe(false);
  });

  it('13. should return true when empty string matches pattern', () => {
    const result = testPattern('', /^$/);
    expect(result).toBe(true);
  });

  it('14. should handle patterns with lookaheads', () => {
    const result = testPattern('password123', /^(?=.*\d)(?=.*[a-z]).{8,}$/);
    expect(result).toBe(true);
  });

  it('15. should throw Error and interrupt catastrophic backtracking via vm timeout', () => {
    // (a+)+b is a classic catastrophic backtracking pattern: on a string of
    // 30 'a' characters with no trailing 'b', naive backtracking is super-exponential.
    // vm.runInContext uses V8's hard script execution timer to truly interrupt it.
    const evil = 'a'.repeat(30);
    expect(() =>
      testPattern(evil, '(a+)+b', { timeout: 200 }),
    ).toThrow('Pattern test exceeded timeout of 200ms');
  }, 10000);

  // Error cases
  it('16. should throw Error when pattern is invalid', () => {
    expect(() => testPattern('test', '[unclosed')).toThrow(Error);
    expect(() => testPattern('test', '[unclosed')).toThrow(
      'Invalid regular expression pattern',
    );
  });
});
