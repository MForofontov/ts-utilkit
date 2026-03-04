import { capitalizeEachWord } from '../src/capitalizeEachWord';

/**
 * Unit tests for the capitalizeEachWord function.
 */
describe('capitalizeEachWord', () => {
  // Test case 1: Capitalize each word in a simple string
  it('1. should capitalize each word in a simple string', () => {
    const str: string = 'hello world';
    const expected: string = 'Hello World';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Capitalize each word in a string with multiple spaces
  it('2. should capitalize each word in a string with multiple spaces', () => {
    const str: string = 'hello   world';
    const expected: string = 'Hello   World';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Capitalize each word in a string with special characters
  it('3. should capitalize each word in a string with special characters', () => {
    const str: string = 'hello @world!';
    const expected: string = 'Hello @World!';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Capitalize each word in a string with numbers
  it('4. should capitalize each word in a string with numbers', () => {
    const str: string = 'hello 123 world';
    const expected: string = 'Hello 123 World';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Capitalize each word in a string with mixed characters
  it('5. should capitalize each word in a string with mixed characters', () => {
    const str: string = 'hello a1@ b2# c3$';
    const expected: string = 'Hello A1@ B2# C3$';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Capitalize each word in a string with leading spaces
  it('6. should capitalize each word in a string with leading spaces', () => {
    const str: string = '  hello world';
    const expected: string = '  Hello World';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Capitalize each word in a string with trailing spaces
  it('7. should capitalize each word in a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const expected: string = 'Hello World  ';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Capitalize each word in a string with both leading and trailing spaces
  it('8. should capitalize each word in a string with both leading and trailing spaces', () => {
    const str: string = '  hello world  ';
    const expected: string = '  Hello World  ';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Capitalize each word in a string with newlines
  it('9. should capitalize each word in a string with newlines', () => {
    const str: string = 'hello\nworld';
    const expected: string = 'Hello\nWorld';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Capitalize each word in a string with tabs
  it('10. should capitalize each word in a string with tabs', () => {
    const str: string = 'hello\tworld';
    const expected: string = 'Hello\tWorld';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Capitalize each word in an empty string
  it('11. should return an empty string when capitalizing each word in an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Capitalize each word in a single word string
  it('12. should capitalize a single word string', () => {
    const str: string = 'hello';
    const expected: string = 'Hello';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Capitalize each word in a string with multiple spaces between words
  it('13. should capitalize each word in a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const expected: string = 'Hello   World';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Capitalize each word in a string with mixed case
  it('14. should capitalize each word in a string with mixed case', () => {
    const str: string = 'hello World';
    const expected: string = 'Hello World';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Capitalize each word in a string with punctuation
  it('15. should capitalize each word in a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: string = 'Hello, World!';
    const result: string = capitalizeEachWord(str);
    expect(result).toBe(expected);
  });
});
