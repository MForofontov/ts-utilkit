import { replaceFirst } from '../src/replaceFirst';

/**
 * Unit tests for the replaceFirst function.
 */
describe('replaceFirst', () => {
  // Test case 1: Replace the first occurrence of a substring in a simple string
  it('1. should replace the first occurrence of a substring in a simple string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello everyone';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 2: Replace the first occurrence of a substring when it appears multiple times
  it('2. should replace the first occurrence of a substring when it appears multiple times', () => {
    const str: string = 'hello world world';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello everyone world';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 3: Replace the first occurrence of a substring with an empty string
  it('3. should replace the first occurrence of a substring with an empty string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = '';
    const expected: string = 'hello ';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 4: Replace the first occurrence of an empty substring
  it('4. should return the original string when the search substring is empty', () => {
    const str: string = 'hello world';
    const searchValue: string = '';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello world';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 5: Replace the first occurrence of a substring with special characters
  it('5. should replace the first occurrence of a substring with special characters', () => {
    const str: string = 'hello @world!';
    const searchValue: string = '@world';
    const replaceValue: string = '@everyone';
    const expected: string = 'hello @everyone!';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 6: Replace the first occurrence of a substring with numbers
  it('6. should replace the first occurrence of a substring with numbers', () => {
    const str: string = 'hello 123 world';
    const searchValue: string = '123';
    const replaceValue: string = '456';
    const expected: string = 'hello 456 world';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 7: Replace the first occurrence of a substring with mixed characters
  it('7. should replace the first occurrence of a substring with mixed characters', () => {
    const str: string = 'a1@b2#c3$';
    const searchValue: string = 'b2#';
    const replaceValue: string = 'd4%';
    const expected: string = 'a1@d4%c3$';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 8: Replace the first occurrence of a substring with leading spaces
  it('8. should replace the first occurrence of a substring with leading spaces', () => {
    const str: string = '   hello world';
    const searchValue: string = 'hello';
    const replaceValue: string = 'hi';
    const expected: string = '   hi world';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 9: Replace the first occurrence of a substring with trailing spaces
  it('9. should replace the first occurrence of a substring with trailing spaces', () => {
    const str: string = 'hello world   ';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello everyone   ';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 10: Replace the first occurrence of a substring with both leading and trailing spaces
  it('10. should replace the first occurrence of a substring with both leading and trailing spaces', () => {
    const str: string = '   hello world   ';
    const searchValue: string = 'hello';
    const replaceValue: string = 'hi';
    const expected: string = '   hi world   ';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 11: Replace the first occurrence of a substring with mixed case
  it('11. should replace the first occurrence of a substring with mixed case', () => {
    const str: string = 'Hello World';
    const searchValue: string = 'World';
    const replaceValue: string = 'Everyone';
    const expected: string = 'Hello Everyone';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 12: Replace the first occurrence of a substring with punctuation
  it('12. should replace the first occurrence of a substring with punctuation', () => {
    const str: string = 'hello, world!';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone';
    const expected: string = 'hello, everyone!';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 13: Replace the first occurrence of a substring with a longer string
  it('13. should replace the first occurrence of a substring with a longer string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = 'everyone in the world';
    const expected: string = 'hello everyone in the world';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 14: Replace the first occurrence of a substring with a shorter string
  it('14. should replace the first occurrence of a substring with a shorter string', () => {
    const str: string = 'hello world';
    const searchValue: string = 'world';
    const replaceValue: string = 'all';
    const expected: string = 'hello all';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 15: Replace the first occurrence of a substring that does not exist
  it('15. should return the original string when the substring does not exist', () => {
    const str: string = 'hello world';
    const searchValue: string = 'foo';
    const replaceValue: string = 'bar';
    const expected: string = 'hello world';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });

  // Test case 16: Replace the first occurrence of a substring in an empty string
  it('16. should return empty string when the string to search substring is empty', () => {
    const str: string = '';
    const searchValue: string = 'foo';
    const replaceValue: string = 'bar';
    const expected: string = '';
    const result: string = replaceFirst(str, searchValue, replaceValue);
    expect(result).toBe(expected);
  });
});
