import { buildPattern, PatternBuilder } from '../src/buildPattern';

/**
 * Unit tests for the buildPattern function and PatternBuilder class.
 */
describe('buildPattern', () => {
  // Factory function tests
  it('1. should create a new PatternBuilder instance', () => {
    const builder = buildPattern();
    expect(builder).toBeInstanceOf(PatternBuilder);
  });

  // literal() tests
  it('2. should escape special characters in literal', () => {
    const pattern = buildPattern().literal('test.com').build();
    expect(pattern.test('test.com')).toBe(true);
    expect(pattern.test('testXcom')).toBe(false);
  });

  it('3. should chain multiple literal calls', () => {
    const pattern = buildPattern()
      .literal('hello')
      .literal(' ')
      .literal('world')
      .build();
    expect(pattern.test('hello world')).toBe(true);
  });

  // raw() tests
  it('4. should add raw pattern fragments', () => {
    const pattern = buildPattern().raw('\\d+').build();
    expect(pattern.test('123')).toBe(true);
    expect(pattern.test('abc')).toBe(false);
  });

  // charClass() tests
  it('5. should create character class', () => {
    const pattern = buildPattern().charClass('aeiou').build();
    expect(pattern.test('a')).toBe(true);
    expect(pattern.test('e')).toBe(true);
    expect(pattern.test('x')).toBe(false);
  });

  it('6. should create negated character class', () => {
    const pattern = buildPattern().charClass('aeiou', true).build();
    expect(pattern.test('x')).toBe(true);
    expect(pattern.test('a')).toBe(false);
  });

  // optional() tests
  it('7. should make last pattern optional', () => {
    const pattern = buildPattern().literal('test').optional().build();
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('')).toBe(true);
  });

  // repeat() tests
  it('8. should add repeat quantifier', () => {
    const pattern = buildPattern().raw('\\d').repeat(3, 5).build();
    expect(pattern.test('123')).toBe(true);
    expect(pattern.test('12345')).toBe(true);
    expect(pattern.test('12')).toBe(false);
  });

  it('9. should handle repeat without max', () => {
    const pattern = buildPattern().raw('\\d').repeat(2).build();
    expect(pattern.test('12')).toBe(true);
    expect(pattern.test('12345')).toBe(true);
    expect(pattern.test('1')).toBe(false);
  });

  // group() tests
  it('10. should create capture group', () => {
    const pattern = buildPattern().literal('test').group().build();
    const match = 'test'.match(pattern);
    expect(match?.[1]).toBe('test');
  });

  it('11. should create named capture group', () => {
    const pattern = buildPattern().raw('\\w+').group('word').build();
    const match = 'hello'.match(pattern);
    expect(match?.groups?.word).toBe('hello');
  });

  // or() tests
  it('12. should create alternation', () => {
    const pattern = buildPattern().or('cat', 'dog', 'bird').build();
    expect(pattern.test('cat')).toBe(true);
    expect(pattern.test('dog')).toBe(true);
    expect(pattern.test('bird')).toBe(true);
    expect(pattern.test('fish')).toBe(false);
  });

  // anchor() tests
  it('13. should add start anchor', () => {
    const pattern = buildPattern().anchor('start').literal('test').build();
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('prefix test')).toBe(false);
  });

  it('14. should add end anchor', () => {
    const pattern = buildPattern().literal('test').anchor('end').build();
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('test suffix')).toBe(false);
  });

  it('15. should add word boundary', () => {
    const pattern = buildPattern()
      .anchor('word')
      .literal('test')
      .anchor('word')
      .build();
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('testing')).toBe(false);
  });

  // flags() tests
  it('16. should set flags', () => {
    const pattern = buildPattern().literal('test').flags('i').build();
    expect(pattern.test('TEST')).toBe(true);
    expect(pattern.test('test')).toBe(true);
  });

  // Complex pattern tests
  it('17. should build email pattern', () => {
    const pattern = buildPattern()
      .raw('[\\w.-]+')
      .literal('@')
      .raw('[\\w.-]+')
      .literal('.')
      .raw('\\w+')
      .build();
    expect(pattern.test('test@example.com')).toBe(true);
    expect(pattern.test('invalid@')).toBe(false);
  });

  it('18. should build phone number pattern', () => {
    const pattern = buildPattern()
      .anchor('start')
      .raw('\\d')
      .repeat(3)
      .literal('-')
      .raw('\\d')
      .repeat(3)
      .literal('-')
      .raw('\\d')
      .repeat(4)
      .anchor('end')
      .build();
    expect(pattern.test('555-123-4567')).toBe(true);
    expect(pattern.test('555-12-4567')).toBe(false);
  });

  // toString() tests
  it('19. should return pattern string', () => {
    const builder = buildPattern().literal('test').raw('\\d+');
    expect(builder.toString()).toBe('test\\d+');
  });

  // Error cases
  it('20. should throw Error when trying to make optional without previous pattern', () => {
    expect(() => buildPattern().optional()).toThrow(Error);
    expect(() => buildPattern().optional()).toThrow(
      'Cannot make optional: no pattern parts added yet',
    );
  });

  it('21. should throw Error when trying to repeat without previous pattern', () => {
    expect(() => buildPattern().repeat(2)).toThrow(Error);
    expect(() => buildPattern().repeat(2)).toThrow(
      'Cannot add repeat: no pattern parts added yet',
    );
  });
});
