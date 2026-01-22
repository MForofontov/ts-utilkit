import { areAnagrams } from '../src/areAnagrams';

/**
 * Unit tests for the areAnagrams function.
 */
describe('areAnagrams', () => {
  // Test case 1: Check if two simple strings are anagrams
  it('1. should return true for two simple anagram strings', () => {
    const str1: string = 'listen';
    const str2: string = 'silent';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 2: Check if two strings with different lengths are anagrams
  it('2. should return false for two strings with different lengths', () => {
    const str1: string = 'hello';
    const str2: string = 'worlds';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(false);
  });

  // Test case 3: Check if two strings with special characters are anagrams
  it('3. should return true for two anagram strings with special characters', () => {
    const str1: string = 'a gentleman';
    const str2: string = 'elegant man';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 4: Check if two strings with numbers are anagrams
  it('4. should return true for two anagram strings with numbers', () => {
    const str1: string = '12345';
    const str2: string = '54321';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 5: Check if two strings with mixed characters are anagrams
  it('5. should return true for two anagram strings with mixed characters', () => {
    const str1: string = 'a1b2c3';
    const str2: string = '3c2b1a';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 6: Check if two strings with leading spaces are anagrams
  it('6. should return true for two anagram strings with leading spaces', () => {
    const str1: string = '  listen';
    const str2: string = 'silent  ';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 7: Check if two strings with trailing spaces are anagrams
  it('7. should return true for two anagram strings with trailing spaces', () => {
    const str1: string = 'listen  ';
    const str2: string = '  silent';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 8: Check if two strings with both leading and trailing spaces are anagrams
  it('8. should return true for two anagram strings with both leading and trailing spaces', () => {
    const str1: string = '  listen  ';
    const str2: string = '  silent  ';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 9: Check if two strings with newlines are anagrams
  it('9. should return true for two anagram strings with newlines', () => {
    const str1: string = 'listen\n';
    const str2: string = '\nsilent';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 10: Check if two strings with tabs are anagrams
  it('10. should return true for two anagram strings with tabs', () => {
    const str1: string = 'listen\t';
    const str2: string = '\tsilent';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 11: Check if two empty strings are anagrams
  it('11. should return true for two empty strings', () => {
    const str1: string = '';
    const str2: string = '';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 12: Check if two single character strings are anagrams
  it('12. should return true for two single character strings', () => {
    const str1: string = 'a';
    const str2: string = 'a';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 13: Check if two strings with different cases are anagrams
  it('13. should return true for two anagram strings with different cases', () => {
    const str1: string = 'Listen';
    const str2: string = 'Silent';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 14: Check if two strings with punctuation are anagrams
  it('14. should return true for two anagram strings with punctuation', () => {
    const str1: string = 'a.b,c!';
    const str2: string = 'c,b.a!';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(true);
  });

  // Test case 15: Check if two non-anagram strings are not anagrams
  it('15. should return false for two non-anagram strings', () => {
    const str1: string = 'hello';
    const str2: string = 'world';
    const result: boolean = areAnagrams(str1, str2);
    expect(result).toBe(false);
  });
});
