import { toLowerCase } from '../src/toLowerCase';

/**
 * Unit tests for the toLowerCase function.
 */
describe('toLowerCase', () => {
  // Test case 1: Convert a simple string to lowercase
  it('1. should convert a simple string to lowercase', () => {
    const str: string = 'Hello World';
    const expected: string = 'hello world';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Convert a string with mixed case to lowercase
  it('2. should convert a string with mixed case to lowercase', () => {
    const str: string = 'HeLLo WoRLd';
    const expected: string = 'hello world';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Convert a string with special characters to lowercase
  it('3. should convert a string with special characters to lowercase', () => {
    const str: string = 'Hello @World!';
    const expected: string = 'hello @world!';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Convert a string with numbers to lowercase
  it('4. should convert a string with numbers to lowercase', () => {
    const str: string = 'Hello 123 World';
    const expected: string = 'hello 123 world';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Convert a string with mixed characters to lowercase
  it('5. should convert a string with mixed characters to lowercase', () => {
    const str: string = 'a1@ B2# C3$';
    const expected: string = 'a1@ b2# c3$';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Convert a string with leading spaces to lowercase
  it('6. should convert a string with leading spaces to lowercase', () => {
    const str: string = '   Hello World';
    const expected: string = '   hello world';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Convert a string with trailing spaces to lowercase
  it('7. should convert a string with trailing spaces to lowercase', () => {
    const str: string = 'Hello World   ';
    const expected: string = 'hello world   ';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Convert a string with both leading and trailing spaces to lowercase
  it('8. should convert a string with both leading and trailing spaces to lowercase', () => {
    const str: string = '   Hello World   ';
    const expected: string = '   hello world   ';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Convert an empty string to lowercase
  it('9. should return an empty string when converting an empty string to lowercase', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Convert a string with newline characters to lowercase
  it('10. should convert a string with newline characters to lowercase', () => {
    const str: string = 'Hello\nWorld';
    const expected: string = 'hello\nworld';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Convert a string with tab characters to lowercase
  it('11. should convert a string with tab characters to lowercase', () => {
    const str: string = 'Hello\tWorld';
    const expected: string = 'hello\tworld';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Convert a string with mixed whitespace characters to lowercase
  it('12. should convert a string with mixed whitespace characters to lowercase', () => {
    const str: string = 'Hello \t\n World';
    const expected: string = 'hello \t\n world';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Convert a string with punctuation to lowercase
  it('13. should convert a string with punctuation to lowercase', () => {
    const str: string = 'Hello, World!';
    const expected: string = 'hello, world!';
    const result: string = toLowerCase(str);
    expect(result).toBe(expected);
  });
});
