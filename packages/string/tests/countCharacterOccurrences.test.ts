import { countCharacterOccurrences } from '../src/countCharacterOccurrences';

/**
 * Unit tests for the countCharacterOccurrences function.
 */
describe('countCharacterOccurrences', () => {
  // Test case 1: Count occurrences of a character in a simple string
  it('1. should count occurrences of a character in a simple string', () => {
    const str: string = 'hello world';
    const char: string = 'l';
    const expected: number = 3;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 2: Count occurrences of a character that appears once
  it('2. should count occurrences of a character that appears once', () => {
    const str: string = 'hello world';
    const char: string = 'h';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 3: Count occurrences of a character that does not appear
  it('3. should count occurrences of a character that does not appear', () => {
    const str: string = 'hello world';
    const char: string = 'z';
    const expected: number = 0;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 4: Count occurrences of a special character
  it('4. should count occurrences of a special character', () => {
    const str: string = 'hello @world!';
    const char: string = '@';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  it('4a. should treat regular expression characters literally', () => {
    const str: string = 'a.b';
    const char: string = '.';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 5: Count occurrences of a number
  it('5. should count occurrences of a number', () => {
    const str: string = 'hello 123 world 123';
    const char: string = '1';
    const expected: number = 2;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 6: Count occurrences of a character in a string with mixed characters
  it('6. should count occurrences of a character in a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const char: string = '1';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 7: Count occurrences of a character in a string with leading spaces
  it('7. should count occurrences of a character in a string with leading spaces', () => {
    const str: string = '  hello world';
    const char: string = ' ';
    const expected: number = 3;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 8: Count occurrences of a character in a string with trailing spaces
  it('8. should count occurrences of a character in a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const char: string = ' ';
    const expected: number = 3;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 9: Count occurrences of a character in a string with both leading and trailing spaces
  it('9. should count occurrences of a character in a string with both leading and trailing spaces', () => {
    const str: string = '  hello world  ';
    const char: string = ' ';
    const expected: number = 5;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 10: Count occurrences of a character in a string with newlines
  it('10. should count occurrences of a character in a string with newlines', () => {
    const str: string = 'hello\nworld';
    const char: string = '\n';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 11: Count occurrences of a character in a string with tabs
  it('11. should count occurrences of a character in a string with tabs', () => {
    const str: string = 'hello\tworld';
    const char: string = '\t';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 12: Count occurrences of a character in an empty string
  it('12. should return 0 when counting occurrences of a character in an empty string', () => {
    const str: string = '';
    const char: string = 'a';
    const expected: number = 0;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  it('12a. should return 0 when the character to count is empty', () => {
    const str: string = 'hello world';
    const char: string = '';
    const expected: number = 0;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 13: Count occurrences of a character in a single character string
  it('13. should count occurrences of a character in a single character string', () => {
    const str: string = 'a';
    const char: string = 'a';
    const expected: number = 1;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 14: Count occurrences of a character in a string with multiple spaces between words
  it('14. should count occurrences of a character in a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const char: string = ' ';
    const expected: number = 3;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });

  // Test case 15: Count occurrences of a character in a string with mixed case
  it('15. should count occurrences of a character in a string with mixed case', () => {
    const str: string = 'Hello World';
    const char: string = 'o';
    const expected: number = 2;
    const result: number = countCharacterOccurrences(str, char);
    expect(result).toBe(expected);
  });
});
