import { wordsToSentence } from '../src/wordsToSentence';

/**
 * Unit tests for the wordsToSentence function.
 */
describe('wordsToSentence', () => {
  // Test case 1: Join a simple array of words into a sentence
  it('1. should join a simple array of words into a sentence', () => {
    const words: string[] = ['Hello', 'world!'];
    const expected: string = 'Hello world!';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 2: Join an array of words with leading and trailing spaces
  it('2. should join an array of words with leading and trailing spaces', () => {
    const words: string[] = ['  Hello', 'world!  '];
    const expected: string = 'Hello world!';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 3: Join an array of words with multiple spaces between words
  it('3. should join an array of words with multiple spaces between words', () => {
    const words: string[] = ['Hello', '', 'world!'];
    const expected: string = 'Hello world!';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 4: Join an array of words with special characters
  it('4. should join an array of words with special characters', () => {
    const words: string[] = ['Hello', '@world!'];
    const expected: string = 'Hello @world!';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 5: Join an array of words with numbers
  it('5. should join an array of words with numbers', () => {
    const words: string[] = ['Hello', '123', 'world!'];
    const expected: string = 'Hello 123 world!';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 6: Join an array of words with mixed characters
  it('6. should join an array of words with mixed characters', () => {
    const words: string[] = ['a1@', 'B2#', 'C3$'];
    const expected: string = 'a1@ B2# C3$';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 7: Join an array of words with leading spaces
  it('7. should join an array of words with leading spaces', () => {
    const words: string[] = ['   Hello', 'world'];
    const expected: string = 'Hello world';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 8: Join an array of words with trailing spaces
  it('8. should join an array of words with trailing spaces', () => {
    const words: string[] = ['Hello', 'world   '];
    const expected: string = 'Hello world';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 9: Join an array of words with both leading and trailing spaces
  it('9. should join an array of words with both leading and trailing spaces', () => {
    const words: string[] = ['   Hello', 'world   '];
    const expected: string = 'Hello world';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 10: Join an empty array of words
  it('10. should return an empty string when joining an empty array of words', () => {
    const words: string[] = [];
    const expected: string = '';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 11: Join an array of words with newline characters
  it('11. should join an array of words with newline characters', () => {
    const words: string[] = ['Hello', '\nworld'];
    const expected: string = 'Hello world';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 12: Join an array of words with tab characters
  it('12. should join an array of words with tab characters', () => {
    const words: string[] = ['Hello', '\tworld'];
    const expected: string = 'Hello world';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 13: Join an array of words with mixed whitespace characters
  it('13. should join an array of words with mixed whitespace characters', () => {
    const words: string[] = ['Hello', ' \t\n world'];
    const expected: string = 'Hello world';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 14: Join an array of words with punctuation
  it('14. should join an array of words with punctuation', () => {
    const words: string[] = ['Hello,', 'world!'];
    const expected: string = 'Hello, world!';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });

  // Test case 15: Join an array of words with uppercase and lowercase characters
  it('15. should join an array of words with uppercase and lowercase characters', () => {
    const words: string[] = ['Hello', 'World'];
    const expected: string = 'Hello World';
    const result: string = wordsToSentence(words);
    expect(result).toBe(expected);
  });
});
