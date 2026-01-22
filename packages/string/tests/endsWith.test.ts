import { endsWith } from '../src/endsWith';

/**
 * Unit tests for the endsWith function.
 */
describe('endsWith', () => {
  // Test case 1: Check if a string ends with a given substring
  it('1. should return true if a string ends with a given substring', () => {
    const str: string = 'hello world';
    const suffix: string = 'world';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string does not end with a given substring
  it('2. should return false if a string does not end with a given substring', () => {
    const str: string = 'hello world';
    const suffix: string = 'hello';
    const expected: boolean = false;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if a string ends with a special character substring
  it('3. should return true if a string ends with a special character substring', () => {
    const str: string = 'hello @world!';
    const suffix: string = '@world!';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a string ends with a number substring
  it('4. should return true if a string ends with a number substring', () => {
    const str: string = 'hello 123';
    const suffix: string = '123';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a string ends with a mixed character substring
  it('5. should return true if a string ends with a mixed character substring', () => {
    const str: string = 'a1@ b2# c3$';
    const suffix: string = 'c3$';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with leading spaces ends with a given substring
  it('6. should return true if a string with leading spaces ends with a given substring', () => {
    const str: string = '  hello world';
    const suffix: string = 'world';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with trailing spaces ends with a given substring
  it('7. should return false if a string with trailing spaces ends with a given substring', () => {
    const str: string = 'hello world  ';
    const suffix: string = 'world';
    const expected: boolean = false;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with both leading and trailing spaces ends with a given substring
  it('8. should return false if a string with both leading and trailing spaces ends with a given substring', () => {
    const str: string = '  hello world  ';
    const suffix: string = 'world';
    const expected: boolean = false;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with newlines ends with a given substring
  it('9. should return true if a string with newlines ends with a given substring', () => {
    const str: string = 'hello\nworld';
    const suffix: string = 'world';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with tabs ends with a given substring
  it('10. should return true if a string with tabs ends with a given substring', () => {
    const str: string = 'hello\tworld';
    const suffix: string = 'world';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if an empty string ends with a given substring
  it('11. should return false if an empty string ends with a given substring', () => {
    const str: string = '';
    const suffix: string = 'hello';
    const expected: boolean = false;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a single character string ends with a given substring
  it('12. should return true if a single character string ends with a given substring', () => {
    const str: string = 'a';
    const suffix: string = 'a';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with multiple spaces between words ends with a given substring
  it('13. should return true if a string with multiple spaces between words ends with a given substring', () => {
    const str: string = 'hello   world';
    const suffix: string = 'world';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string with mixed case ends with a given substring
  it('14. should return true if a string with mixed case ends with a given substring', () => {
    const str: string = 'Hello World';
    const suffix: string = 'World';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string with punctuation ends with a given substring
  it('15. should return true if a string with punctuation ends with a given substring', () => {
    const str: string = 'hello, world!';
    const suffix: string = 'world!';
    const expected: boolean = true;
    const result: boolean = endsWith(str, suffix);
    expect(result).toBe(expected);
  });
});
