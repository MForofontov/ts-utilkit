import { slugify } from '../src/slugify';

/**
 * Unit tests for the slugify function.
 */
describe('slugify', () => {
  // Test case 1: Convert a simple string to a slug
  it('1. should convert a simple string to a slug', () => {
    const str: string = 'Hello World';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Convert a string with leading and trailing spaces to a slug
  it('2. should convert a string with leading and trailing spaces to a slug', () => {
    const str: string = '  This is a test.  ';
    const expected: string = 'this-is-a-test';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Convert a string with special characters to a slug
  it('3. should convert a string with special characters to a slug', () => {
    const str: string = 'Hello @World!';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Convert a string with numbers to a slug
  it('4. should convert a string with numbers to a slug', () => {
    const str: string = 'Hello 123 World';
    const expected: string = 'hello-123-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Convert a string with mixed characters to a slug
  it('5. should convert a string with mixed characters to a slug', () => {
    const str: string = 'a1@ b2# c3$';
    const expected: string = 'a1-b2-c3';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Convert a string with leading spaces to a slug
  it('6. should convert a string with leading spaces to a slug', () => {
    const str: string = '   Hello World';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Convert a string with trailing spaces to a slug
  it('7. should convert a string with trailing spaces to a slug', () => {
    const str: string = 'Hello World   ';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Convert a string with both leading and trailing spaces to a slug
  it('8. should convert a string with both leading and trailing spaces to a slug', () => {
    const str: string = '   Hello World   ';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Convert a string with mixed case to a slug
  it('9. should convert a string with mixed case to a slug', () => {
    const str: string = 'Hello World';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Convert a string with punctuation to a slug
  it('10. should convert a string with punctuation to a slug', () => {
    const str: string = 'hello, world!';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Convert an empty string to a slug
  it('11. should return an empty string when converting an empty string to a slug', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Convert a single word string to a slug
  it('12. should return the same string when converting a single word string to a slug', () => {
    const str: string = 'hello';
    const expected: string = 'hello';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Convert a string with multiple spaces between words to a slug
  it('13. should convert a string with multiple spaces between words to a slug', () => {
    const str: string = 'a  b  c';
    const expected: string = 'a-b-c';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Convert a string with newline characters to a slug
  it('14. should convert a string with newline characters to a slug', () => {
    const str: string = 'hello\nworld';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Convert a string with tab characters to a slug
  it('15. should convert a string with tab characters to a slug', () => {
    const str: string = 'hello\tworld';
    const expected: string = 'hello-world';
    const result: string = slugify(str);
    expect(result).toBe(expected);
  });
});
