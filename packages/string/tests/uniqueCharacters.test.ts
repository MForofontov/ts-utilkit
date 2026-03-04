import { uniqueCharacters } from '../src/uniqueCharacters';

/**
 * Unit tests for the uniqueCharacters function.
 */
describe('uniqueCharacters', () => {
  // Test case 1: Find unique characters in a simple string
  it('1. should find unique characters in a simple string', () => {
    const str: string = 'hello';
    const expected: string[] = ['h', 'e', 'l', 'o'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 2: Find unique characters in a string with all unique characters
  it('2. should find unique characters in a string with all unique characters', () => {
    const str: string = 'abcdef';
    const expected: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 3: Find unique characters in a string with repeated characters
  it('3. should find unique characters in a string with repeated characters', () => {
    const str: string = 'aabbcc';
    const expected: string[] = ['a', 'b', 'c'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 4: Find unique characters in an empty string
  it('4. should return an empty array when finding unique characters in an empty string', () => {
    const str: string = '';
    const expected: string[] = [];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 5: Find unique characters in a string with special characters
  it('5. should find unique characters in a string with special characters', () => {
    const str: string = 'a@b#c$d%';
    const expected: string[] = ['a', '@', 'b', '#', 'c', '$', 'd', '%'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 6: Find unique characters in a string with numbers
  it('6. should find unique characters in a string with numbers', () => {
    const str: string = 'a1b2c3';
    const expected: string[] = ['a', '1', 'b', '2', 'c', '3'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 7: Find unique characters in a string with mixed characters
  it('7. should find unique characters in a string with mixed characters', () => {
    const str: string = 'a1@b2#c3$';
    const expected: string[] = ['a', '1', '@', 'b', '2', '#', 'c', '3', '$'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 8: Find unique characters in a string with leading spaces
  it('8. should find unique characters in a string with leading spaces', () => {
    const str: string = '   hello';
    const expected: string[] = [' ', 'h', 'e', 'l', 'o'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 9: Find unique characters in a string with trailing spaces
  it('9. should find unique characters in a string with trailing spaces', () => {
    const str: string = 'hello   ';
    const expected: string[] = ['h', 'e', 'l', 'o', ' '];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 10: Find unique characters in a string with both leading and trailing spaces
  it('10. should find unique characters in a string with both leading and trailing spaces', () => {
    const str: string = '   hello   ';
    const expected: string[] = [' ', 'h', 'e', 'l', 'o'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 11: Find unique characters in a string with newline characters
  it('11. should find unique characters in a string with newline characters', () => {
    const str: string = 'hello\nworld';
    const expected: string[] = ['h', 'e', 'l', 'o', '\n', 'w', 'r', 'd'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 12: Find unique characters in a string with tab characters
  it('12. should find unique characters in a string with tab characters', () => {
    const str: string = 'hello\tworld';
    const expected: string[] = ['h', 'e', 'l', 'o', '\t', 'w', 'r', 'd'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 13: Find unique characters in a string with mixed whitespace characters
  it('13. should find unique characters in a string with mixed whitespace characters', () => {
    const str: string = 'hello \t\n world';
    const expected: string[] = [
      'h',
      'e',
      'l',
      'o',
      ' ',
      '\t',
      '\n',
      'w',
      'r',
      'd',
    ];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 14: Find unique characters in a string with punctuation
  it('14. should find unique characters in a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: string[] = [
      'h',
      'e',
      'l',
      'o',
      ',',
      ' ',
      'w',
      'r',
      'd',
      '!',
    ];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });

  // Test case 15: Find unique characters in a string with uppercase and lowercase characters
  it('15. should find unique characters in a string with uppercase and lowercase characters', () => {
    const str: string = 'Hello World';
    const expected: string[] = ['H', 'e', 'l', 'o', ' ', 'W', 'r', 'd'];
    const result: string[] = uniqueCharacters(str);
    expect(result).toEqual(expected);
  });
});
