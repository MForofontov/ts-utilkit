import { stripHtmlTags } from '../src/stripHtmlTags';

/**
 * Unit tests for the stripHtmlTags function.
 */
describe('stripHtmlTags', () => {
  // Test case 1: Strip HTML tags from a simple string
  it('1. should strip HTML tags from a simple string', () => {
    const str: string = '<p>Hello world</p>';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Strip HTML tags from a string with nested tags
  it('2. should strip HTML tags from a string with nested tags', () => {
    const str: string = '<div><p>Hello <b>world</b></p></div>';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Strip HTML tags from a string with multiple tags
  it('3. should strip HTML tags from a string with multiple tags', () => {
    const str: string = '<p>Hello</p><p>world</p>';
    const expected: string = 'Helloworld';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Strip HTML tags from a string with attributes
  it('4. should strip HTML tags from a string with attributes', () => {
    const str: string = '<p class="greeting">Hello world</p>';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Strip HTML tags from a string with self-closing tags
  it('5. should strip HTML tags from a string with self-closing tags', () => {
    const str: string = '<p>Hello <br/>world</p>';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Strip HTML tags from a string with special characters
  it('6. should strip HTML tags from a string with special characters', () => {
    const str: string = '<p>Hello @world!</p>';
    const expected: string = 'Hello @world!';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Strip HTML tags from a string with numbers
  it('7. should strip HTML tags from a string with numbers', () => {
    const str: string = '<p>Hello 123 world</p>';
    const expected: string = 'Hello 123 world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Strip HTML tags from a string with mixed characters
  it('8. should strip HTML tags from a string with mixed characters', () => {
    const str: string = '<p>a1@ b2# c3$</p>';
    const expected: string = 'a1@ b2# c3$';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Strip HTML tags from a string with leading spaces
  it('9. should strip HTML tags from a string with leading spaces', () => {
    const str: string = '   <p>Hello world</p>';
    const expected: string = '   Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Strip HTML tags from a string with trailing spaces
  it('10. should strip HTML tags from a string with trailing spaces', () => {
    const str: string = '<p>Hello world</p>   ';
    const expected: string = 'Hello world   ';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Strip HTML tags from a string with both leading and trailing spaces
  it('11. should strip HTML tags from a string with both leading and trailing spaces', () => {
    const str: string = '   <p>Hello world</p>   ';
    const expected: string = '   Hello world   ';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Strip HTML tags from a string with mixed case tags
  it('12. should strip HTML tags from a string with mixed case tags', () => {
    const str: string = '<P>Hello world</P>';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Strip HTML tags from an empty string
  it('13. should return an empty string when stripping HTML tags from an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Strip HTML tags from a string with no tags
  it('14. should return the original string when stripping HTML tags from a string with no tags', () => {
    const str: string = 'Hello world';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Strip HTML tags from a string with nested tags and attributes
  it('15. should strip HTML tags from a string with nested tags and attributes', () => {
    const str: string =
      '<div class="container"><p>Hello <b>world</b></p></div>';
    const expected: string = 'Hello world';
    const result: string = stripHtmlTags(str);
    expect(result).toBe(expected);
  });
});
