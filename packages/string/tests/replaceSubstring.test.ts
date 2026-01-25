import { replaceSubstring } from '../src/replaceSubstring';

/**
 * Unit tests for the replaceSubstring function.
 */
describe('replaceSubstring', () => {
  // Test case 1: Replace all occurrences of a substring in a simple string
  it('1. should replace all occurrences of a substring in a simple string', () => {
    const str: string = 'hello world world';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello everyone everyone';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 2: Replace all occurrences of a substring with an empty string
  it('2. should replace all occurrences of a substring with an empty string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = '';
    const expected: string = 'hello ';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 3: Replace all occurrences of an empty substring
  it('3. should return the original string when the search substring is empty', () => {
    const str: string = 'hello world';
    const searchValue: string = '';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello world';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 4: Replace all occurrences of a substring with special characters
  it('4. should replace all occurrences of a substring with special characters', () => {
    const str: string = 'hello @world! @world!';
    const searchValue: string = '@world';
    const replaceValue: string = '@everyone';
    const expected: string = 'hello @everyone! @everyone!';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 5: Replace all occurrences of a substring with numbers
  it('5. should replace all occurrences of a substring with numbers', () => {
    const str: string = 'foo 123 bar 123';
    const searchValue: string = '123';
    const replaceValue: string = '456';
    const expected: string = 'foo 456 bar 456';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 6: Replace all occurrences of a substring with mixed characters
  it('6. should replace all occurrences of a substring with mixed characters', () => {
    const str: string = 'a1@b2#c3$';
    const searchValue: string = 'b2#';
    const replaceValue: string = 'd4%';
    const expected: string = 'a1@d4%c3$';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 7: Replace all occurrences of a substring with leading spaces
  it('7. should replace all occurrences of a substring with leading spaces', () => {
    const str: string = '   hello world';
    const searchValue: string = 'hello';
    const replaceValue: string = 'hi';
    const expected: string = '   hi world';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 8: Replace all occurrences of a substring with trailing spaces
  it('8. should replace all occurrences of a substring with trailing spaces', () => {
    const str: string = 'hello world   ';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello everyone   ';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 9: Replace all occurrences of a substring with both leading and trailing spaces
  it('9. should replace all occurrences of a substring with both leading and trailing spaces', () => {
    const str: string = '   hello world   ';
    const searchValue: string = 'hello';
    const replaceValue: string = 'hi';
    const expected: string = '   hi world   ';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 10: Replace all occurrences of a substring with mixed case
  it('10. should replace all occurrences of a substring with mixed case', () => {
    const str: string = 'Hello World World';
    const searchValue: string = 'World';
    const replaceValue: string = 'Everyone';
    const expected: string = 'Hello Everyone Everyone';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 11: Replace all occurrences of a substring with punctuation
  it('11. should replace all occurrences of a substring with punctuation', () => {
    const str: string = 'hello, world! world!';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello, everyone! everyone!';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 12: Replace all occurrences of a substring with a longer string
  it('12. should replace all occurrences of a substring with a longer string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone in the world';
    const expected: string = 'hello everyone in the world';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 13: Replace all occurrences of a substring with a shorter string
  it('13. should replace all occurrences of a substring with a shorter string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = 'all';
    const expected: string = 'hello all';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 14: Replace all occurrences of a substring that does not exist
  it('14. should return the original string when the substring does not exist', () => {
    const str: string = 'hello world';
    const searchValue: string = 'foo';
    const replaceValue: string = 'bar';
    const expected: string = 'hello world';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 15: Replace all occurrences of a substring with overlapping replacements
  it('15. should replace all occurrences of a substring with overlapping replacements', () => {
    const str: string = 'abcabc';
    const searchValue: string = 'abc';
    const replaceValue: string = 'def';
    const expected: string = 'defdef';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 16: Replace the first occurrence of a substring in an empty string
  it('16. should return empty string when the string to search substring is empty', () => {
    const str: string = '';
    const searchValue: string = 'foo';
    const replaceValue: string = 'bar';
    const expected: string = '';
    const result: string = replaceSubstring(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });
});
