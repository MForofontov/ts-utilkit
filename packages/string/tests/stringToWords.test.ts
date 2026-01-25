import { stringToWords } from '../src/stringToWords';

/**
 * Unit tests for the stringToWords function.
 */
describe('stringToWords', () => {
  // Test case 1: Convert a simple string to an array of words
  it('1. should convert a simple string to an array of words', () => {
    const str: string = 'Hello world!';
    const expected: string[] = ['Hello', 'world!'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 2: Convert a string with multiple spaces to an array of words
  it('2. should convert a string with multiple spaces to an array of words', () => {
    const str: string = 'Hello   world!';
    const expected: string[] = ['Hello', 'world!'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 3: Convert a string with leading and trailing spaces to an array of words
  it('3. should convert a string with leading and trailing spaces to an array of words', () => {
    const str: string = '  Hello world!  ';
    const expected: string[] = ['Hello', 'world!'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 4: Convert a string with special characters to an array of words
  it('4. should convert a string with special characters to an array of words', () => {
    const str: string = 'Hello @world!';
    const expected: string[] = ['Hello', '@world!'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 5: Convert a string with numbers to an array of words
  it('5. should convert a string with numbers to an array of words', () => {
    const str: string = 'Hello 123 world!';
    const expected: string[] = ['Hello', '123', 'world!'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 6: Convert a string with mixed characters to an array of words
  it('6. should convert a string with mixed characters to an array of words', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: string[] = ['a1@', 'b2#', 'c3$'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 7: Convert a string with leading spaces to an array of words
  it('7. should convert a string with leading spaces to an array of words', () => {
    const str: string = '   Hello world';
    const expected: string[] = ['Hello', 'world'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 8: Convert a string with trailing spaces to an array of words
  it('8. should convert a string with trailing spaces to an array of words', () => {
    const str: string = 'Hello world   ';
    const expected: string[] = ['Hello', 'world'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 9: Convert a string with both leading and trailing spaces to an array of words
  it('9. should convert a string with both leading and trailing spaces to an array of words', () => {
    const str: string = '   Hello world   ';
    const expected: string[] = ['Hello', 'world'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 10: Convert a string with mixed case to an array of words
  it('10. should convert a string with mixed case to an array of words', () => {
    const str: string = 'Hello World';
    const expected: string[] = ['Hello', 'World'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 11: Convert a string with punctuation to an array of words
  it('11. should convert a string with punctuation to an array of words', () => {
    const str: string = 'hello, world!';
    const expected: string[] = ['hello,', 'world!'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 12: Convert an empty string to an array of words
  it('12. should return an empty array when converting an empty string to an array of words', () => {
    const str: string = '';
    const expected: string[] = [];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 13: Convert a single word string to an array of words
  it('13. should return an array with the single word when converting a single word string to an array of words', () => {
    const str: string = 'hello';
    const expected: string[] = ['hello'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 14: Convert a string with multiple spaces between words to an array of words
  it('14. should convert a string with multiple spaces between words to an array of words', () => {
    const str: string = 'a  b  c';
    const expected: string[] = ['a', 'b', 'c'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });

  // Test case 15: Convert a string with newline characters to an array of words
  it('15. should convert a string with newline characters to an array of words', () => {
    const str: string = 'hello\nworld';
    const expected: string[] = ['hello', 'world'];
    const result: string[] = stringToWords(str);
    expect(result).toEqual(expected);
  });
});
