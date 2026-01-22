import { reverseString } from '../src/reverseString';

/**
 * Unit tests for the reverseString function.
 */
describe('reverseString', () => {
  // Test case 1: Reverse a simple string
  it('1. should reverse a simple string', () => {
    const str: string = 'hello';
    const expected: string = 'olleh';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Reverse a string with spaces
  it('2. should reverse a string with spaces', () => {
    const str: string = 'hello world';
    const expected: string = 'dlrow olleh';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Reverse a string with special characters
  it('3. should reverse a string with special characters', () => {
    const str: string = '@hello!';
    const expected: string = '!olleh@';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Reverse a string with numbers
  it('4. should reverse a string with numbers', () => {
    const str: string = '12345';
    const expected: string = '54321';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Reverse a string with mixed characters
  it('5. should reverse a string with mixed characters', () => {
    const str: string = 'a1@b2#';
    const expected: string = '#2b@1a';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Reverse a string with leading spaces
  it('6. should reverse a string with leading spaces', () => {
    const str: string = '  hello';
    const expected: string = 'olleh  ';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Reverse a string with trailing spaces
  it('7. should reverse a string with trailing spaces', () => {
    const str: string = 'hello  ';
    const expected: string = '  olleh';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Reverse a string with both leading and trailing spaces
  it('8. should reverse a string with both leading and trailing spaces', () => {
    const str: string = '  hello  ';
    const expected: string = '  olleh  ';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Reverse a string with mixed case
  it('9. should reverse a string with mixed case', () => {
    const str: string = 'Hello World';
    const expected: string = 'dlroW olleH';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Reverse a string with punctuation
  it('10. should reverse a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: string = '!dlrow ,olleh';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Reverse an empty string
  it('11. should return an empty string when reversing an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Reverse a single character string
  it('12. should return the same string when reversing a single character string', () => {
    const str: string = 'a';
    const expected: string = 'a';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Reverse a string with multiple spaces
  it('13. should reverse a string with multiple spaces', () => {
    const str: string = 'a b c';
    const expected: string = 'c b a';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Reverse a string with newline characters
  it('14. should reverse a string with newline characters', () => {
    const str: string = 'hello\nworld';
    const expected: string = 'dlrow\nolleh';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Reverse a string with tab characters
  it('15. should reverse a string with tab characters', () => {
    const str: string = 'hello\tworld';
    const expected: string = 'dlrow\tolleh';
    const result: string = reverseString(str);
    expect(result).toBe(expected);
  });
});
