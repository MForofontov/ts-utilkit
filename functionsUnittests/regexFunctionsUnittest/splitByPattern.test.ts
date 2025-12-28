import { splitByPattern } from '../../regexFunctions/splitByPattern';

/**
 * Unit tests for the splitByPattern function.
 */
describe('splitByPattern', () => {
  // Normal usage tests
  it('1. should split by comma', () => {
    const result = splitByPattern('a,b,c', /,/);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('2. should include delimiters when requested', () => {
    const result = splitByPattern('one-two-three', /(-)/, {
      includeDelimiters: true,
    });
    expect(result).toEqual(['one', '-', 'two', '-', 'three']);
  });

  it('3. should work with capture groups', () => {
    const result = splitByPattern('a1b2c3', /(\d)/);
    // Native split includes capture groups in results
    expect(result).toEqual(['a', '1', 'b', '2', 'c', '3', '']);
  });

  it('4. should include capture groups when requested', () => {
    const result = splitByPattern('a1b2c3', /(\d)/, {
      includeDelimiters: true,
    });
    expect(result).toEqual(['a', '1', 'b', '2', 'c', '3', '']);
  });

  it('5. should respect limit option', () => {
    const result = splitByPattern('a,b,c,d,e', /,/, { limit: 3 });
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('6. should work with string pattern', () => {
    const result = splitByPattern('test:value:data', ':');
    expect(result).toEqual(['test', 'value', 'data']);
  });

  it('7. should split by whitespace', () => {
    const result = splitByPattern('hello  world  test', /\s+/);
    expect(result).toEqual(['hello', 'world', 'test']);
  });

  // Edge cases
  it('8. should return array with original string when no matches', () => {
    const result = splitByPattern('no commas here', /,/);
    expect(result).toEqual(['no commas here']);
  });

  it('9. should handle empty string', () => {
    const result = splitByPattern('', /,/);
    expect(result).toEqual(['']);
  });

  it('10. should handle pattern at start', () => {
    const result = splitByPattern(',a,b', /,/);
    expect(result[0]).toBe('');
  });

  it('11. should handle pattern at end', () => {
    const result = splitByPattern('a,b,', /,/);
    expect(result[result.length - 1]).toBe('');
  });

  // Error cases
  it('12. should throw TypeError when text is not a string', () => {
    expect(() => splitByPattern(123 as any, /,/)).toThrow(TypeError);
    expect(() => splitByPattern(123 as any, /,/)).toThrow(
      'text must be a string',
    );
  });

  it('13. should throw TypeError when pattern is invalid type', () => {
    expect(() => splitByPattern('test', 123 as any)).toThrow(TypeError);
    expect(() => splitByPattern('test', 123 as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('14. should throw TypeError when options is not an object', () => {
    expect(() => splitByPattern('test', /,/, 'invalid' as any)).toThrow(
      TypeError,
    );
    expect(() => splitByPattern('test', /,/, 'invalid' as any)).toThrow(
      'options must be an object',
    );
  });

  it('15. should throw Error when pattern is invalid', () => {
    expect(() => splitByPattern('test', '[unclosed')).toThrow(Error);
    expect(() => splitByPattern('test', '[unclosed')).toThrow(
      'Invalid regular expression pattern',
    );
  });
});
