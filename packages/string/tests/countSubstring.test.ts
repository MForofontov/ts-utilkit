import { countSubstring } from '../src/countSubstring';

/**
 * Unit tests for the countSubstring function.
 */
describe('countSubstring', () => {
  // Test case 1: Count occurrences of a substring in a simple string
  it('1. should count occurrences of a substring in a simple string', () => {
    const str: string = 'hello world, hello universe';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 2: Count occurrences of a substring that appears once
  it('2. should count occurrences of a substring that appears once', () => {
    const str: string = 'hello world';
    const substring: string = 'world';
    const expected: number = 1;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 3: Count occurrences of a substring that does not appear
  it('3. should count occurrences of a substring that does not appear', () => {
    const str: string = 'hello world';
    const substring: string = 'planet';
    const expected: number = 0;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 4: Count occurrences of a special character substring
  it('4. should count occurrences of a special character substring', () => {
    const str: string = 'hello @world, hello @universe';
    const substring: string = '@';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 5: Count occurrences of a number substring
  it('5. should count occurrences of a number substring', () => {
    const str: string = 'hello 123, hello 456';
    const substring: string = '123';
    const expected: number = 1;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 6: Count occurrences of a mixed character substring
  it('6. should count occurrences of a mixed character substring', () => {
    const str: string = 'a1@ b2# c3$';
    const substring: string = 'a1@';
    const expected: number = 1;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 7: Count occurrences of a substring in a string with leading spaces
  it('7. should count occurrences of a substring in a string with leading spaces', () => {
    const str: string = '  hello world, hello universe';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 8: Count occurrences of a substring in a string with trailing spaces
  it('8. should count occurrences of a substring in a string with trailing spaces', () => {
    const str: string = 'hello world, hello universe  ';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 9: Count occurrences of a substring in a string with both leading and trailing spaces
  it('9. should count occurrences of a substring in a string with both leading and trailing spaces', () => {
    const str: string = '  hello world, hello universe  ';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 10: Count occurrences of a substring in a string with newlines
  it('10. should count occurrences of a substring in a string with newlines', () => {
    const str: string = 'hello\nworld, hello\nuniverse';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 11: Count occurrences of a substring in a string with tabs
  it('11. should count occurrences of a substring in a string with tabs', () => {
    const str: string = 'hello\tworld, hello\tuniverse';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 12: Count occurrences of a substring in an empty string
  it('12. should return 0 when counting occurrences of a substring in an empty string', () => {
    const str: string = '';
    const substring: string = 'hello';
    const expected: number = 0;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 13: Count occurrences of an empty substring
  it('13. should return 0 when counting occurrences of an empty substring', () => {
    const str: string = 'hello world';
    const substring: string = '';
    const expected: number = 0;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 14: Count occurrences of a substring in a string with multiple spaces between words
  it('14. should count occurrences of a substring in a string with multiple spaces between words', () => {
    const str: string = 'hello   world, hello   universe';
    const substring: string = 'hello';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 15: Count occurrences of a substring in a string with mixed case
  it('15. should count occurrences of a substring in a string with mixed case', () => {
    const str: string = 'Hello world, hello universe';
    const substring: string = 'hello';
    const expected: number = 1;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });

  // Test case 16: Count occurrences of a substring containing regex metacharacters
  it('16. should treat regex metacharacters in the substring literally', () => {
    const str: string = 'values: a.*b, c+d, a.*b';
    const substring: string = 'a.*b';
    const expected: number = 2;
    const result: number = countSubstring(str, substring);
    expect(result).toBe(expected);
  });
});
