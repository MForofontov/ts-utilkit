import { countVowels } from '../src/countVowels';

/**
 * Unit tests for the countVowels function.
 */
describe('countVowels', () => {
  // Test case 1: Count vowels in a simple string
  it('1. should count vowels in a simple string', () => {
    const str: string = 'hello world';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Count vowels in a string with no vowels
  it('2. should count vowels in a string with no vowels', () => {
    const str: string = 'bcdfghjklmnpqrstvwxyz';
    const expected: number = 0;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Count vowels in a string with special characters
  it('3. should count vowels in a string with special characters', () => {
    const str: string = 'hello @world!';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Count vowels in a string with numbers
  it('4. should count vowels in a string with numbers', () => {
    const str: string = 'hello 123 world';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Count vowels in a string with mixed characters
  it('5. should count vowels in a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: number = 1;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Count vowels in a string with leading spaces
  it('6. should count vowels in a string with leading spaces', () => {
    const str: string = '  hello world';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Count vowels in a string with trailing spaces
  it('7. should count vowels in a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Count vowels in a string with both leading and trailing spaces
  it('8. should count vowels in a string with both leading and trailing spaces', () => {
    const str: string = '  hello world  ';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Count vowels in a string with newlines
  it('9. should count vowels in a string with newlines', () => {
    const str: string = 'hello\nworld';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Count vowels in a string with tabs
  it('10. should count vowels in a string with tabs', () => {
    const str: string = 'hello\tworld';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Count vowels in an empty string
  it('11. should return 0 when counting vowels in an empty string', () => {
    const str: string = '';
    const expected: number = 0;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Count vowels in a single character string
  it('12. should count vowels in a single character string', () => {
    const str: string = 'a';
    const expected: number = 1;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Count vowels in a string with multiple spaces between words
  it('13. should count vowels in a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Count vowels in a string with mixed case
  it('14. should count vowels in a string with mixed case', () => {
    const str: string = 'Hello World';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Count vowels in a string with punctuation
  it('15. should count vowels in a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: number = 3;
    const result: number = countVowels(str);
    expect(result).toBe(expected);
  });
});
