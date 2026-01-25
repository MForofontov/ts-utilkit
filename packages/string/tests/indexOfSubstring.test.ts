import { indexOfSubstring } from '../src/indexOfSubstring';

/**
 * Unit tests for the indexOfSubstring function.
 */
describe('indexOfSubstring', () => {
  // Test case 1: Find the index of a substring in a simple string
  it('1. should find the index of a substring in a simple string', () => {
    const str: string = 'hello world';
    const substr: string = 'world';
    const expected: number = 6;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 2: Find the index of a substring that does not exist
  it('2. should return -1 if the substring does not exist', () => {
    const str: string = 'hello world';
    const substr: string = 'foo';
    const expected: number = -1;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 3: Find the index of an empty substring
  it('3. should return 0 if the substring is empty', () => {
    const str: string = 'hello world';
    const substr: string = '';
    const expected: number = 0;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 4: Find the index of a substring at the beginning of the string
  it('4. should find the index of a substring at the beginning of the string', () => {
    const str: string = 'hello world';
    const substr: string = 'hello';
    const expected: number = 0;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 5: Find the index of a substring at the end of the string
  it('5. should find the index of a substring at the end of the string', () => {
    const str: string = 'hello world';
    const substr: string = 'world';
    const expected: number = 6;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 6: Find the index of a substring with special characters
  it('6. should find the index of a substring with special characters', () => {
    const str: string = 'hello @world!';
    const substr: string = '@world';
    const expected: number = 6;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 7: Find the index of a substring with numbers
  it('7. should find the index of a substring with numbers', () => {
    const str: string = 'hello 123 world';
    const substr: string = '123';
    const expected: number = 6;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 8: Find the index of a substring with mixed characters
  it('8. should find the index of a substring with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const substr: string = 'b2#';
    const expected: number = 4;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 9: Find the index of a substring in an empty string
  it('9. should return -1 if the string is empty', () => {
    const str: string = '';
    const substr: string = 'hello';
    const expected: number = -1;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 10: Find the index of an empty substring in an empty string
  it('10. should return 0 if both the string and substring are empty', () => {
    const str: string = '';
    const substr: string = '';
    const expected: number = 0;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 11: Find the index of a substring with leading spaces
  it('11. should find the index of a substring with leading spaces', () => {
    const str: string = '   hello world';
    const substr: string = 'hello';
    const expected: number = 3;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 12: Find the index of a substring with trailing spaces
  it('12. should find the index of a substring with trailing spaces', () => {
    const str: string = 'hello world   ';
    const substr: string = 'world';
    const expected: number = 6;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 13: Find the index of a substring with both leading and trailing spaces
  it('13. should find the index of a substring with both leading and trailing spaces', () => {
    const str: string = '   hello world   ';
    const substr: string = 'hello';
    const expected: number = 3;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 14: Find the index of a substring with mixed case
  it('14. should find the index of a substring with mixed case', () => {
    const str: string = 'Hello World';
    const substr: string = 'World';
    const expected: number = 6;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });

  // Test case 15: Find the index of a substring with punctuation
  it('15. should find the index of a substring with punctuation', () => {
    const str: string = 'hello, world!';
    const substr: string = 'world';
    const expected: number = 7;
    const result: number = indexOfSubstring(str, substr);
    expect(result).toBe(expected);
  });
});
