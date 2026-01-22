import { findLongestWord } from '../src/findLongestWord';

/**
 * Unit tests for the findLongestWord function.
 */
describe('findLongestWord', () => {
  // Test case 1: Find the longest word in a simple string
  it('1. should find the longest word in a simple string', () => {
    const str: string = 'The quick brown fox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Find the longest word in a string with multiple spaces
  it('2. should find the longest word in a string with multiple spaces', () => {
    const str: string = 'The   quick brown   fox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Find the longest word in a string with special characters
  it('3. should find the longest word in a string with special characters', () => {
    const str: string = 'The quick brown @fox jumps over the lazy dog!';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Find the longest word in a string with numbers
  it('4. should find the longest word in a string with numbers', () => {
    const str: string = 'The quick brown fox jumps over the lazy dog 12345';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Find the longest word in a string with mixed characters
  it('5. should find the longest word in a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: string = 'a1@';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Find the longest word in a string with leading spaces
  it('6. should find the longest word in a string with leading spaces', () => {
    const str: string = '  The quick brown fox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Find the longest word in a string with trailing spaces
  it('7. should find the longest word in a string with trailing spaces', () => {
    const str: string = 'The quick brown fox jumps over the lazy dog  ';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Find the longest word in a string with both leading and trailing spaces
  it('8. should find the longest word in a string with both leading and trailing spaces', () => {
    const str: string = '  The quick brown fox jumps over the lazy dog  ';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Find the longest word in a string with newlines
  it('9. should find the longest word in a string with newlines', () => {
    const str: string = 'The quick brown\nfox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Find the longest word in a string with tabs
  it('10. should find the longest word in a string with tabs', () => {
    const str: string = 'The quick brown\tfox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Find the longest word in an empty string
  it('11. should return an empty string when finding the longest word in an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Find the longest word in a single word string
  it('12. should find the longest word in a single word string', () => {
    const str: string = 'hello';
    const expected: string = 'hello';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Find the longest word in a string with multiple spaces between words
  it('13. should find the longest word in a string with multiple spaces between words', () => {
    const str: string = 'The   quick brown   fox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Find the longest word in a string with mixed case
  it('14. should find the longest word in a string with mixed case', () => {
    const str: string = 'The quick Brown fox jumps over the lazy dog';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Find the longest word in a string with punctuation
  it('15. should find the longest word in a string with punctuation', () => {
    const str: string = 'The quick brown, fox jumps over the lazy dog!';
    const expected: string = 'quick';
    const result: string = findLongestWord(str);
    expect(result).toBe(expected);
  });
});
