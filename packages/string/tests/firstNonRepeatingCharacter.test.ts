import { firstNonRepeatingCharacter } from '../src/firstNonRepeatingCharacter';

/**
 * Unit tests for the firstNonRepeatingCharacter function.
 */
describe('firstNonRepeatingCharacter', () => {
  // Test case 1: Find the first non-repeating character in a simple string
  it('1. should find the first non-repeating character in a simple string', () => {
    const str: string = 'abacabad';
    const expected: string | null = 'c';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Find the first non-repeating character in a string with all repeating characters
  it('2. should return null for a string with all repeating characters', () => {
    const str: string = 'aabbcc';
    const expected: string | null = null;
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Find the first non-repeating character in a string with special characters
  it('3. should find the first non-repeating character in a string with special characters', () => {
    const str: string = 'a@b@c@d@';
    const expected: string | null = 'a';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Find the first non-repeating character in a string with numbers
  it('4. should find the first non-repeating character in a string with numbers', () => {
    const str: string = 'a1b1c1d1';
    const expected: string | null = 'a';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Find the first non-repeating character in a string with mixed characters
  it('5. should find the first non-repeating character in a string with mixed characters', () => {
    const str: string = 'a1@b2#c3$d4%';
    const expected: string | null = 'a';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Find the first non-repeating character in a string with leading spaces
  it('6. should find the first non-repeating character in a string with leading spaces', () => {
    const str: string = '  abacabad';
    const expected: string | null = 'c';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Find the first non-repeating character in a string with trailing spaces
  it('7. should find the first non-repeating character in a string with trailing spaces', () => {
    const str: string = 'abacabad  ';
    const expected: string | null = 'c';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Find the first non-repeating character in a string with both leading and trailing spaces
  it('8. should find the first non-repeating character in a string with both leading and trailing spaces', () => {
    const str: string = '  abacabad  ';
    const expected: string | null = 'c';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Find the first non-repeating character in a string with newlines
  it('9. should find the first non-repeating character in a string with newlines', () => {
    const str: string = 'aba\ncabad';
    const expected: string | null = '\n';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Find the first non-repeating character in a string with tabs
  it('10. should find the first non-repeating character in a string with tabs', () => {
    const str: string = 'aba\tcabad';
    const expected: string | null = '\t';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Find the first non-repeating character in an empty string
  it('11. should return null for an empty string', () => {
    const str: string = '';
    const expected: string | null = null;
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Find the first non-repeating character in a single character string
  it('12. should find the first non-repeating character in a single character string', () => {
    const str: string = 'a';
    const expected: string | null = 'a';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Find the first non-repeating character in a string with multiple spaces between words
  it('13. should find the first non-repeating character in a string with multiple spaces between words', () => {
    const str: string = 'a  b  a  c  a  b  a  d';
    const expected: string | null = 'c';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Find the first non-repeating character in a string with mixed case
  it('14. should find the first non-repeating character in a string with mixed case', () => {
    const str: string = 'aAbBcCdD';
    const expected: string | null = 'a';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Find the first non-repeating character in a string with punctuation
  it('15. should find the first non-repeating character in a string with punctuation', () => {
    const str: string = 'a,b,c,a,b,c,d';
    const expected: string | null = 'd';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });

  // Test case 16: Find the first non-repeating character in a string with one empty space
  it('16. should find the first non-repeating character in a string with one empty space', () => {
    const str: string = ' abc';
    const expected: string | null = ' ';
    const result: string | null = firstNonRepeatingCharacter(str);
    expect(result).toBe(expected);
  });
});
