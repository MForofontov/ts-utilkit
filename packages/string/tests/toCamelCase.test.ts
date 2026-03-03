import { toCamelCase } from '../src/toCamelCase';

/**
 * Unit tests for the toCamelCase function.
 */
describe('toCamelCase', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should convert space-separated words to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  it('2. should convert kebab-case to camelCase', () => {
    expect(toCamelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  it('3. should convert snake_case to camelCase', () => {
    expect(toCamelCase('foo_bar_baz')).toBe('fooBarBaz');
  });

  it('4. should convert PascalCase to camelCase', () => {
    expect(toCamelCase('FooBarBaz')).toBe('fooBarBaz');
  });

  it('5. should convert a single word to lowercase', () => {
    expect(toCamelCase('Hello')).toBe('hello');
    expect(toCamelCase('WORLD')).toBe('world');
  });

  it('6. should handle mixed delimiters (spaces, hyphens, underscores)', () => {
    expect(toCamelCase('foo-bar_baz qux')).toBe('fooBarBazQux');
  });

  it('7. should keep numbers in place', () => {
    expect(toCamelCase('item 1 value')).toBe('item1Value');
    expect(toCamelCase('step-2-go')).toBe('step2Go');
  });

  it('8. should handle camelCase input (already camelCase)', () => {
    expect(toCamelCase('fooBarBaz')).toBe('fooBarBaz');
  });

  it('9. should split on consecutive uppercase followed by lowercase (acronyms)', () => {
    expect(toCamelCase('XMLParser')).toBe('xmlParser');
    expect(toCamelCase('parseHTML')).toBe('parseHtml');
  });

  it('10. should handle all-uppercase words as a single word', () => {
    expect(toCamelCase('HTTP_REQUEST')).toBe('httpRequest');
  });

  it('11. should strip leading and trailing whitespace', () => {
    expect(toCamelCase('  hello world  ')).toBe('helloWorld');
  });

  it('12. should collapse multiple consecutive delimiters', () => {
    expect(toCamelCase('multiple   spaces')).toBe('multipleSpaces');
    expect(toCamelCase('__snake__case__')).toBe('snakeCase');
    expect(toCamelCase('---kebab---case---')).toBe('kebabCase');
  });

  it('13. should handle a three-word phrase', () => {
    expect(toCamelCase('the quick brown')).toBe('theQuickBrown');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('14. should return empty string for empty input', () => {
    expect(toCamelCase('')).toBe('');
  });

  it('15. should return empty string for whitespace-only input', () => {
    expect(toCamelCase('   ')).toBe('');
  });

  it('16. should handle a single-character string', () => {
    expect(toCamelCase('a')).toBe('a');
    expect(toCamelCase('A')).toBe('a');
  });

  it('17. should handle strings with only delimiters', () => {
    expect(toCamelCase('---')).toBe('');
    expect(toCamelCase('___')).toBe('');
  });

  it('18. should preserve digits at the start', () => {
    expect(toCamelCase('123 abc')).toBe('123Abc');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

});
