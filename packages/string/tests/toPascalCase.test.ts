import { toPascalCase } from '../src/toPascalCase';

/**
 * Unit tests for the toPascalCase function.
 */
describe('toPascalCase', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should convert space-separated words to PascalCase', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });

  it('2. should convert kebab-case to PascalCase', () => {
    expect(toPascalCase('foo-bar-baz')).toBe('FooBarBaz');
  });

  it('3. should convert snake_case to PascalCase', () => {
    expect(toPascalCase('foo_bar_baz')).toBe('FooBarBaz');
  });

  it('4. should convert camelCase to PascalCase', () => {
    expect(toPascalCase('fooBarBaz')).toBe('FooBarBaz');
  });

  it('5. should keep PascalCase as PascalCase', () => {
    expect(toPascalCase('FooBarBaz')).toBe('FooBarBaz');
  });

  it('6. should capitalise a single word', () => {
    expect(toPascalCase('hello')).toBe('Hello');
    expect(toPascalCase('WORLD')).toBe('World');
  });

  it('7. should handle mixed delimiters (spaces, hyphens, underscores)', () => {
    expect(toPascalCase('foo-bar_baz qux')).toBe('FooBarBazQux');
  });

  it('8. should keep numbers in place', () => {
    expect(toPascalCase('item 1 value')).toBe('Item1Value');
    expect(toPascalCase('step-2-go')).toBe('Step2Go');
  });

  it('9. should split on acronyms (uppercase followed by lowercase)', () => {
    expect(toPascalCase('XMLParser')).toBe('XmlParser');
    expect(toPascalCase('parseHTML')).toBe('ParseHtml');
  });

  it('10. should handle all-uppercase words', () => {
    expect(toPascalCase('HTTP_REQUEST')).toBe('HttpRequest');
  });

  it('11. should strip leading and trailing whitespace', () => {
    expect(toPascalCase('  hello world  ')).toBe('HelloWorld');
  });

  it('12. should collapse multiple consecutive delimiters', () => {
    expect(toPascalCase('multiple   spaces')).toBe('MultipleSpaces');
    expect(toPascalCase('__snake__case__')).toBe('SnakeCase');
    expect(toPascalCase('---kebab---case---')).toBe('KebabCase');
  });

  it('13. should handle a three-word phrase', () => {
    expect(toPascalCase('the quick brown')).toBe('TheQuickBrown');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('14. should return empty string for empty input', () => {
    expect(toPascalCase('')).toBe('');
  });

  it('15. should return empty string for whitespace-only input', () => {
    expect(toPascalCase('   ')).toBe('');
  });

  it('16. should handle a single-character string', () => {
    expect(toPascalCase('a')).toBe('A');
    expect(toPascalCase('A')).toBe('A');
  });

  it('17. should handle strings with only delimiters', () => {
    expect(toPascalCase('---')).toBe('');
    expect(toPascalCase('___')).toBe('');
  });

  it('18. should preserve digits at the start', () => {
    expect(toPascalCase('123 abc')).toBe('123Abc');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────
});
