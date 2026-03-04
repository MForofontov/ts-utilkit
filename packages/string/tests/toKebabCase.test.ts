import { toKebabCase } from '../src/toKebabCase';

/**
 * Unit tests for the toKebabCase function.
 */
describe('toKebabCase', () => {
  // Test case 1: Convert a simple string to kebab-case
  it('1. should convert a simple string to kebab-case', () => {
    const str: string = 'Hello World';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Convert a string with multiple spaces to kebab-case
  it('2. should convert a string with multiple spaces to kebab-case', () => {
    const str: string = 'Hello   World';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Convert a string with leading and trailing spaces to kebab-case
  it('3. should convert a string with leading and trailing spaces to kebab-case', () => {
    const str: string = '  Hello World  ';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Convert a string with special characters to kebab-case
  it('4. should convert a string with special characters to kebab-case', () => {
    const str: string = 'Hello @World!';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Convert a string with numbers to kebab-case
  it('5. should convert a string with numbers to kebab-case', () => {
    const str: string = 'Hello 123 World';
    const expected: string = 'hello-123-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Convert a string with mixed characters to kebab-case
  it('6. should convert a string with mixed characters to kebab-case', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: string = 'a1-b2-c3';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Convert a string with leading spaces to kebab-case
  it('7. should convert a string with leading spaces to kebab-case', () => {
    const str: string = '   Hello World';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Convert a string with trailing spaces to kebab-case
  it('8. should convert a string with trailing spaces to kebab-case', () => {
    const str: string = 'Hello World   ';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Convert a string with both leading and trailing spaces to kebab-case
  it('9. should convert a string with both leading and trailing spaces to kebab-case', () => {
    const str: string = '   Hello World   ';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Convert a string with mixed case to kebab-case
  it('10. should convert a string with mixed case to kebab-case', () => {
    const str: string = 'Hello World';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Convert a string with punctuation to kebab-case
  it('11. should convert a string with punctuation to kebab-case', () => {
    const str: string = 'hello, world!';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Convert an empty string to kebab-case
  it('12. should return an empty string when converting an empty string to kebab-case', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Convert a single word string to kebab-case
  it('13. should return the same string when converting a single word string to kebab-case', () => {
    const str: string = 'hello';
    const expected: string = 'hello';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Convert a string with multiple spaces between words to kebab-case
  it('14. should convert a string with multiple spaces between words to kebab-case', () => {
    const str: string = 'a  b  c';
    const expected: string = 'a-b-c';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Convert a string with underscores to kebab-case
  it('15. should convert a string with underscores to kebab-case', () => {
    const str: string = 'hello_world';
    const expected: string = 'hello-world';
    const result: string = toKebabCase(str);
    expect(result).toBe(expected);
  });
});
