import { replaceAll } from '../src/replaceAll';

/**
 * Unit tests for the replaceAll function.
 */
describe('replaceAll', () => {
  // Normal usage tests
  it('1. should replace all occurrences with string', () => {
    const result = replaceAll('test test test', 'test', 'demo');
    expect(result).toBe('demo demo demo');
  });

  it('2. should replace with regex pattern', () => {
    const result = replaceAll('abc123def456', /\d+/, 'NUM');
    expect(result).toBe('abcNUMdefNUM');
  });

  it('3. should replace with function', () => {
    const result = replaceAll(
      'test1 test2 test3',
      /test(\d)/,
      (match, num) => `demo${num}`,
    );
    expect(result).toBe('demo1 demo2 demo3');
  });

  it('4. should handle case-insensitive replacement', () => {
    const result = replaceAll('Test TEST test', 'test', 'demo', 'i');
    expect(result).toBe('demo demo demo');
  });

  it('5. should replace special characters', () => {
    const result = replaceAll('a.b.c.d', '.', '-');
    expect(result).toBe('a-b-c-d');
  });

  it('6. should replace with empty string', () => {
    const result = replaceAll('remove this remove that', 'remove ', '');
    expect(result).toBe('this that');
  });

  it('7. should handle function with multiple capture groups', () => {
    const result = replaceAll(
      '2024-01-15',
      /(\d{4})-(\d{2})-(\d{2})/,
      (_, year, month, day) => {
        return `${month}/${day}/${year}`;
      },
    );
    expect(result).toBe('01/15/2024');
  });

  it('8. should automatically add global flag to regex', () => {
    const result = replaceAll('aaa', /a/, 'b');
    expect(result).toBe('bbb');
  });

  // Edge cases
  it('9. should return original string when no matches', () => {
    const result = replaceAll('no match here', 'xyz', 'replacement');
    expect(result).toBe('no match here');
  });

  it('10. should handle empty string', () => {
    const result = replaceAll('', 'test', 'demo');
    expect(result).toBe('');
  });

  it('11. should handle replacement at start and end', () => {
    const result = replaceAll('test middle test', 'test', 'X');
    expect(result).toBe('X middle X');
  });

  it('12. should handle consecutive matches', () => {
    const result = replaceAll('aaa', 'a', 'b');
    expect(result).toBe('bbb');
  });

  // Error cases
  it('13. should throw TypeError when text is not a string', () => {
    expect(() => replaceAll(123 as any, 'test', 'demo')).toThrow(TypeError);
    expect(() => replaceAll(123 as any, 'test', 'demo')).toThrow(
      'text must be a string',
    );
  });

  it('14. should throw TypeError when pattern is invalid type', () => {
    expect(() => replaceAll('test', 123 as any, 'demo')).toThrow(TypeError);
    expect(() => replaceAll('test', 123 as any, 'demo')).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('15. should throw TypeError when replacement is invalid type', () => {
    expect(() => replaceAll('test', 'test', 123 as any)).toThrow(TypeError);
    expect(() => replaceAll('test', 'test', 123 as any)).toThrow(
      'replacement must be a string or function',
    );
  });

  it('16. should escape special characters in string patterns', () => {
    // String patterns are escaped, so special chars are treated literally
    const result = replaceAll('test[unclosed', '[unclosed', 'demo');
    expect(result).toBe('testdemo');
  });
});
