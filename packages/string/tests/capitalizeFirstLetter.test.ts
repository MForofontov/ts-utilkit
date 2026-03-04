import { capitalizeFirstLetter } from '../src/capitalizeFirstLetter';

/**
 * Unit tests for the capitalizeFirstLetter function.
 */
describe('capitalizeFirstLetter', () => {
  // Test case 1: Capitalize the first letter of a simple string
  it('1. should capitalize the first letter of a simple string', () => {
    const str: string = 'hello world';
    const expected: string = 'Hello world';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Capitalize the first letter of a string with leading spaces
  it('2. should capitalize the first letter of a string with leading spaces', () => {
    const str: string = '  hello world';
    const expected: string = '  hello world';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Capitalize the first letter of a string with trailing spaces
  it('3. should capitalize the first letter of a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const expected: string = 'Hello world  ';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Capitalize the first letter of a string with special characters
  it('4. should capitalize the first letter of a string with special characters', () => {
    const str: string = '@hello world';
    const expected: string = '@hello world';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Capitalize the first letter of a string with numbers
  it('5. should capitalize the first letter of a string with numbers', () => {
    const str: string = '123 hello world';
    const expected: string = '123 hello world';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Capitalize the first letter of a string with mixed characters
  it('6. should capitalize the first letter of a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: string = 'A1@ b2# c3$';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Capitalize the first letter of a string with newlines
  it('7. should capitalize the first letter of a string with newlines', () => {
    const str: string = 'hello\nworld';
    const expected: string = 'Hello\nworld';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Capitalize the first letter of a string with tabs
  it('8. should capitalize the first letter of a string with tabs', () => {
    const str: string = 'hello\tworld';
    const expected: string = 'Hello\tworld';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Capitalize the first letter of an empty string
  it('9. should return an empty string when capitalizing the first letter of an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Capitalize the first letter of a single character string
  it('10. should capitalize a single character string', () => {
    const str: string = 'a';
    const expected: string = 'A';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Capitalize the first letter of a string with multiple spaces between words
  it('11. should capitalize the first letter of a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const expected: string = 'Hello   world';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Capitalize the first letter of a string with mixed case
  it('12. should capitalize the first letter of a string with mixed case', () => {
    const str: string = 'hello World';
    const expected: string = 'Hello World';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Capitalize the first letter of a string with punctuation
  it('13. should capitalize the first letter of a string with punctuation', () => {
    const str: string = 'hello, world!';
    const expected: string = 'Hello, world!';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Capitalize the first letter of a string with leading punctuation
  it('14. should capitalize the first letter of a string with leading punctuation', () => {
    const str: string = '!hello world';
    const expected: string = '!hello world';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Capitalize the first letter of a string with trailing punctuation
  it('15. should capitalize the first letter of a string with trailing punctuation', () => {
    const str: string = 'hello world!';
    const expected: string = 'Hello world!';
    const result: string = capitalizeFirstLetter(str);
    expect(result).toBe(expected);
  });
});
