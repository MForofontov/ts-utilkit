import { replaceMultiple } from '../src/replaceMultiple';

/**
 * Unit tests for the replaceMultiple function.
 */
describe('replaceMultiple', () => {
  // Test case 1: Replace multiple substrings in a simple string
  it('1. should replace multiple substrings in a simple string', () => {
    const str: string = 'hello world';
    const replacements: { [key: string]: string } = {
      hello: 'hi',
      world: 'everyone',
    };
    const expected: string = 'hi everyone';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 2: Replace multiple substrings when they appear multiple times
  it('2. should replace multiple substrings when they appear multiple times', () => {
    const str: string = 'foo bar foo bar';
    const replacements: { [key: string]: string } = { foo: 'qux', bar: 'quux' };
    const expected: string = 'qux quux qux quux';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 3: Replace multiple substrings with empty strings
  it('3. should replace multiple substrings with empty strings', () => {
    const str: string = 'hello world';
    const replacements: { [key: string]: string } = { hello: '', world: '' };
    const expected: string = ' ';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 4: Replace multiple substrings with special characters
  it('4. should replace multiple substrings with special characters', () => {
    const str: string = 'hello @world!';
    const replacements: { [key: string]: string } = {
      hello: '@hi@',
      '@world': '@everyone',
    };
    const expected: string = '@hi@ @everyone!';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 5: Replace multiple substrings with numbers
  it('5. should replace multiple substrings with numbers', () => {
    const str: string = 'foo 123 bar 456';
    const replacements: { [key: string]: string } = { foo: '789', bar: '012' };
    const expected: string = '789 123 012 456';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 6: Replace multiple substrings with mixed characters
  it('6. should replace multiple substrings with mixed characters', () => {
    const str: string = 'a1@b2#c3$';
    const replacements: { [key: string]: string } = {
      'a1@': 'd4%',
      'b2#': 'e5^',
    };
    const expected: string = 'd4%e5^c3$';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 7: Replace multiple substrings with leading spaces
  it('7. should replace multiple substrings with leading spaces', () => {
    const str: string = '   hello world';
    const replacements: { [key: string]: string } = {
      hello: 'hi',
      world: 'everyone',
    };
    const expected: string = '   hi everyone';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 8: Replace multiple substrings with trailing spaces
  it('8. should replace multiple substrings with trailing spaces', () => {
    const str: string = 'hello world   ';
    const replacements: { [key: string]: string } = {
      hello: 'hi',
      world: 'everyone',
    };
    const expected: string = 'hi everyone   ';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 9: Replace multiple substrings with both leading and trailing spaces
  it('9. should replace multiple substrings with both leading and trailing spaces', () => {
    const str: string = '   hello world   ';
    const replacements: { [key: string]: string } = {
      hello: 'hi',
      world: 'everyone',
    };
    const expected: string = '   hi everyone   ';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 10: Replace multiple substrings with mixed case
  it('10. should replace multiple substrings with mixed case', () => {
    const str: string = 'Hello World';
    const replacements: { [key: string]: string } = {
      Hello: 'Hi',
      World: 'Everyone',
    };
    const expected: string = 'Hi Everyone';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 11: Replace multiple substrings with punctuation
  it('11. should replace multiple substrings with punctuation', () => {
    const str: string = 'hello, world!';
    const replacements: { [key: string]: string } = {
      hello: 'hi',
      world: 'everyone',
    };
    const expected: string = 'hi, everyone!';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 12: Replace multiple substrings with longer strings
  it('12. should replace multiple substrings with longer strings', () => {
    const str: string = 'hello world';
    const replacements: { [key: string]: string } = {
      hello: 'greetings',
      world: 'everyone in the world',
    };
    const expected: string = 'greetings everyone in the world';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 13: Replace multiple substrings with shorter strings
  it('13. should replace multiple substrings with shorter strings', () => {
    const str: string = 'hello world';
    const replacements: { [key: string]: string } = {
      hello: 'hi',
      world: 'all',
    };
    const expected: string = 'hi all';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 14: Replace multiple substrings that do not exist
  it('14. should return the original string when the substrings do not exist', () => {
    const str: string = 'hello world';
    const replacements: { [key: string]: string } = { foo: 'bar', baz: 'qux' };
    const expected: string = 'hello world';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 15: Replace multiple substrings with overlapping replacements
  it('15. should replace multiple substrings with overlapping replacements', () => {
    const str: string = 'abcabc';
    const replacements: { [key: string]: string } = { abc: 'def', def: 'ghi' };
    const expected: string = 'defdef';
    const result: string = replaceMultiple(str, replacements);
    expect(result).toBe(expected);
  });

  // Test case 16: Return the original string when replacements object is empty
  it('16. should return the original string when replacements object is empty', () => {
    const str: string = 'abc';

    expect(replaceMultiple(str, {})).toBe(str);

    const replacementsWithoutPrototype = Object.create(null) as {
      [key: string]: string;
    };
    expect(replaceMultiple(str, replacementsWithoutPrototype)).toBe(str);
  });
});
