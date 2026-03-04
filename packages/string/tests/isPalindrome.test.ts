import { isPalindrome } from '../src/isPalindrome';

/**
 * Unit tests for the isPalindrome function.
 */
describe('isPalindrome', () => {
  // Test case 1: Check if a simple palindrome returns true
  it('1. should return true for a simple palindrome', () => {
    const str: string = 'madam';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a non-palindrome returns false
  it('2. should return false for a non-palindrome', () => {
    const str: string = 'hello';
    const expected: boolean = false;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a palindrome with mixed case returns true
  it('3. should return true for a palindrome with mixed case', () => {
    const str: string = 'MadAm';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a palindrome with spaces returns true
  it('4. should return true for a palindrome with spaces', () => {
    const str: string = 'A man a plan a canal Panama';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a palindrome with punctuation returns true
  it('5. should return true for a palindrome with punctuation', () => {
    const str: string = 'A man, a plan, a canal, Panama!';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if an empty string returns true
  it('6. should return true for an empty string', () => {
    const str: string = '';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a single character string returns true
  it('7. should return true for a single character string', () => {
    const str: string = 'a';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with numbers returns true
  it('8. should return true for a string with numbers', () => {
    const str: string = '12321';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with mixed characters returns true
  it('9. should return true for a string with mixed characters', () => {
    const str: string = 'A1b2B1a';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with leading spaces returns true
  it('10. should return true for a string with leading spaces', () => {
    const str: string = '   madam';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with trailing spaces returns true
  it('11. should return true for a string with trailing spaces', () => {
    const str: string = 'madam   ';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with both leading and trailing spaces returns true
  it('12. should return true for a string with both leading and trailing spaces', () => {
    const str: string = '   madam   ';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with mixed case and spaces returns true
  it('13. should return true for a string with mixed case and spaces', () => {
    const str: string = 'A man A plan A canal Panama';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string with mixed case and punctuation returns true
  it('14. should return true for a string with mixed case and punctuation', () => {
    const str: string = 'A man, A plan, A canal, Panama!';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string with mixed case, punctuation, and numbers returns true
  it('15. should return true for a string with mixed case, punctuation, and numbers', () => {
    const str: string = 'A1b2B1a!';
    const expected: boolean = true;
    const result: boolean = isPalindrome(str);
    expect(result).toBe(expected);
  });
});
