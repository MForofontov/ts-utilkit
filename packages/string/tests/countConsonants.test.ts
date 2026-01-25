import { countConsonants } from '../src/countConsonants';

/**
 * Unit tests for the countConsonants function.
 */
describe('countConsonants', () => {
  // Test case 1: Count consonants in a simple string
  it('1. should count consonants in a simple string', () => {
    const str: string = 'hello world';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Count consonants in a string with only vowels
  it('2. should count consonants in a string with only vowels', () => {
    const str: string = 'aeiou';
    const expected: number = 0;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Count consonants in a string with special characters
  it('3. should count consonants in a string with special characters', () => {
    const str: string = 'hello @world!';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Count consonants in a string with numbers
  it('4. should count consonants in a string with numbers', () => {
    const str: string = 'hello 123 world';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Count consonants in a string with mixed characters
  it('5. should count consonants in a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: number = 2;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Count consonants in a string with leading spaces
  it('6. should count consonants in a string with leading spaces', () => {
    const str: string = '  hello world';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Count consonants in a string with trailing spaces
  it('7. should count consonants in a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Count consonants in a string with both leading and trailing spaces
  it('8. should count consonants in a string with both leading and trailing spaces', () => {
    const str: string = '  hello world  ';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Count consonants in a string with newlines
  it('9. should count consonants in a string with newlines', () => {
    const str: string = 'hello\nworld';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Count consonants in a string with tabs
  it('10. should count consonants in a string with tabs', () => {
    const str: string = 'hello\tworld';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Count consonants in an empty string
  it('11. should return 0 when counting consonants in an empty string', () => {
    const str: string = '';
    const expected: number = 0;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Count consonants in a single character string
  it('12. should count consonants in a single character string', () => {
    const str: string = 'b';
    const expected: number = 1;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Count consonants in a string with multiple spaces between words
  it('13. should count consonants in a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Count consonants in a string with mixed case
  it('14. should count consonants in a string with mixed case', () => {
    const str: string = 'Hello World';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Count consonants in a string with punctuation
  it('15. should count consonants in a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: number = 7;
    const result: number = countConsonants(str);
    expect(result).toBe(expected);
  });
});
