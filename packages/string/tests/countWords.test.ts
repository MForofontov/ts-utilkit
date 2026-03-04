import { countWords } from '../src/countWords';

/**
 * Unit tests for the countWords function.
 */
describe('countWords', () => {
  // Test case 1: Count words in a simple string
  it('1. should count words in a simple string', () => {
    const str: string = 'hello world';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Count words in a string with multiple spaces
  it('2. should count words in a string with multiple spaces', () => {
    const str: string = 'hello   world';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Count words in a string with special characters
  it('3. should count words in a string with special characters', () => {
    const str: string = 'hello @world!';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Count words in a string with numbers
  it('4. should count words in a string with numbers', () => {
    const str: string = 'hello 123 world';
    const expected: number = 3;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Count words in a string with mixed characters
  it('5. should count words in a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: number = 3;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Count words in a string with leading spaces
  it('6. should count words in a string with leading spaces', () => {
    const str: string = '  hello world';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Count words in a string with trailing spaces
  it('7. should count words in a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Count words in a string with both leading and trailing spaces
  it('8. should count words in a string with both leading and trailing spaces', () => {
    const str: string = '  hello world  ';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Count words in a string with newlines
  it('9. should count words in a string with newlines', () => {
    const str: string = 'hello\nworld';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Count words in a string with tabs
  it('10. should count words in a string with tabs', () => {
    const str: string = 'hello\tworld';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Count words in an empty string
  it('11. should return 0 when counting words in an empty string', () => {
    const str: string = '';
    const expected: number = 0;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Count words in a single word string
  it('12. should count words in a single word string', () => {
    const str: string = 'hello';
    const expected: number = 1;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Count words in a string with multiple spaces between words
  it('13. should count words in a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Count words in a string with mixed case
  it('14. should count words in a string with mixed case', () => {
    const str: string = 'Hello World';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Count words in a string with punctuation
  it('15. should count words in a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: number = 2;
    const result: number = countWords(str);
    expect(result).toBe(expected);
  });
});
