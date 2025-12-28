import { combinePatterns } from '../../regexFunctions/combinePatterns';

/**
 * Unit tests for the combinePatterns function.
 */
describe('combinePatterns', () => {
  // OR operator tests
  it('1. should combine patterns with OR operator', () => {
    const pattern = combinePatterns([/cat/, /dog/, /bird/], 'or');
    expect(pattern.test('cat')).toBe(true);
    expect(pattern.test('dog')).toBe(true);
    expect(pattern.test('bird')).toBe(true);
    expect(pattern.test('fish')).toBe(false);
  });

  it('2. should combine string patterns with OR', () => {
    const pattern = combinePatterns(['test', 'demo', 'sample'], 'or');
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('demo')).toBe(true);
    expect(pattern.test('invalid')).toBe(false);
  });

  it('3. should combine mixed patterns with OR', () => {
    const pattern = combinePatterns([/\d+/, 'test', /[a-z]+/], 'or');
    expect(pattern.test('123')).toBe(true);
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('abc')).toBe(true);
  });

  // AND operator tests
  it('4. should combine patterns with AND operator', () => {
    const pattern = combinePatterns([/\d/, /[a-z]/], 'and');
    expect(pattern.test('a1')).toBe(true);
    expect(pattern.test('1a')).toBe(true);
    expect(pattern.test('123')).toBe(false);
    expect(pattern.test('abc')).toBe(false);
  });

  it('5. should require all AND patterns to match', () => {
    const pattern = combinePatterns([/uppercase/, /lowercase/, /\d+/], 'and');
    expect(pattern.test('uppercase lowercase 123')).toBe(true);
    expect(pattern.test('uppercase lowercase')).toBe(false);
  });

  it('6. should combine string patterns with AND', () => {
    const pattern = combinePatterns(['hello', 'world'], 'and');
    expect(pattern.test('hello world')).toBe(true);
    expect(pattern.test('world hello')).toBe(true);
    expect(pattern.test('hello')).toBe(false);
  });

  // Flags tests
  it('7. should apply flags to combined pattern', () => {
    const pattern = combinePatterns([/test/, /demo/], 'or', 'i');
    expect(pattern.test('TEST')).toBe(true);
    expect(pattern.test('DEMO')).toBe(true);
  });

  it('8. should handle global flag', () => {
    const pattern = combinePatterns([/cat/, /dog/], 'or', 'g');
    const matches = 'cat dog cat'.match(pattern);
    expect(matches?.length).toBe(3);
  });

  // Single pattern tests
  it('9. should handle single pattern', () => {
    const pattern = combinePatterns([/test/], 'or');
    expect(pattern.test('test')).toBe(true);
  });

  // Complex pattern tests
  it('10. should combine complex patterns', () => {
    const pattern = combinePatterns([/^[a-z]+$/, /^\d+$/], 'or');
    expect(pattern.test('abc')).toBe(true);
    expect(pattern.test('123')).toBe(true);
    expect(pattern.test('abc123')).toBe(false);
  });

  // Error cases
  it('11. should throw TypeError when patterns is not an array', () => {
    expect(() => combinePatterns('invalid' as any, 'or')).toThrow(TypeError);
    expect(() => combinePatterns('invalid' as any, 'or')).toThrow(
      'patterns must be an array',
    );
  });

  it('12. should throw Error when patterns array is empty', () => {
    expect(() => combinePatterns([], 'or')).toThrow(Error);
    expect(() => combinePatterns([], 'or')).toThrow(
      'patterns array cannot be empty',
    );
  });

  it('13. should throw TypeError when operator is invalid', () => {
    expect(() => combinePatterns([/test/], 'invalid' as any)).toThrow(
      TypeError,
    );
    expect(() => combinePatterns([/test/], 'invalid' as any)).toThrow(
      "operator must be 'and' or 'or'",
    );
  });

  it('14. should throw TypeError when flags is not a string', () => {
    expect(() => combinePatterns([/test/], 'or', 123 as any)).toThrow(
      TypeError,
    );
    expect(() => combinePatterns([/test/], 'or', 123 as any)).toThrow(
      'flags must be a string',
    );
  });

  it('15. should throw Error when pattern array contains invalid types', () => {
    expect(() => combinePatterns([123 as any, /test/], 'or')).toThrow(Error);
    expect(() => combinePatterns([123 as any, /test/], 'or')).toThrow(
      'Each pattern must be a string or RegExp',
    );
  });
});
