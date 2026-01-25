import { toUpperCase } from '../src/toUpperCase';

/**
 * Unit tests for the toUpperCase function.
 */
describe('toUpperCase', () => {
  // Test case 1: Convert a simple string to uppercase
  it('1. should convert a simple string to uppercase', () => {
    const str: string = 'Hello World';
    const expected: string = 'HELLO WORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Convert a string with mixed case to uppercase
  it('2. should convert a string with mixed case to uppercase', () => {
    const str: string = 'HeLLo WoRLd';
    const expected: string = 'HELLO WORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Convert a string with special characters to uppercase
  it('3. should convert a string with special characters to uppercase', () => {
    const str: string = 'Hello @World!';
    const expected: string = 'HELLO @WORLD!';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Convert a string with numbers to uppercase
  it('4. should convert a string with numbers to uppercase', () => {
    const str: string = 'Hello 123 World';
    const expected: string = 'HELLO 123 WORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Convert a string with mixed characters to uppercase
  it('5. should convert a string with mixed characters to uppercase', () => {
    const str: string = 'a1@ B2# C3$';
    const expected: string = 'A1@ B2# C3$';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Convert a string with leading spaces to uppercase
  it('6. should convert a string with leading spaces to uppercase', () => {
    const str: string = '   Hello World';
    const expected: string = '   HELLO WORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Convert a string with trailing spaces to uppercase
  it('7. should convert a string with trailing spaces to uppercase', () => {
    const str: string = 'Hello World   ';
    const expected: string = 'HELLO WORLD   ';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Convert a string with both leading and trailing spaces to uppercase
  it('8. should convert a string with both leading and trailing spaces to uppercase', () => {
    const str: string = '   Hello World   ';
    const expected: string = '   HELLO WORLD   ';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Convert an empty string to uppercase
  it('9. should return an empty string when converting an empty string to uppercase', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Convert a string with newline characters to uppercase
  it('10. should convert a string with newline characters to uppercase', () => {
    const str: string = 'Hello\nWorld';
    const expected: string = 'HELLO\nWORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Convert a string with tab characters to uppercase
  it('11. should convert a string with tab characters to uppercase', () => {
    const str: string = 'Hello\tWorld';
    const expected: string = 'HELLO\tWORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Convert a string with mixed whitespace characters to uppercase
  it('12. should convert a string with mixed whitespace characters to uppercase', () => {
    const str: string = 'Hello \t\n World';
    const expected: string = 'HELLO \t\n WORLD';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Convert a string with punctuation to uppercase
  it('13. should convert a string with punctuation to uppercase', () => {
    const str: string = 'Hello, World!';
    const expected: string = 'HELLO, WORLD!';
    const result: string = toUpperCase(str);
    expect(result).toBe(expected);
  });
});
