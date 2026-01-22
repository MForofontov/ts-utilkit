import { capitalizeNthLetter } from '../src/capitalizeNthLetter';

/**
 * Unit tests for the capitalizeNthLetter function.
 */
describe('capitalizeNthLetter', () => {
  // Test case 1: Capitalize the nth letter of a simple string
  it('1. should capitalize the nth letter of a simple string', () => {
    const str: string = 'hello world';
    const n: number = 6;
    const expected: string = 'hello World';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 2: Capitalize the nth letter of a string with leading spaces
  it('2. should capitalize the nth letter of a string with leading spaces', () => {
    const str: string = '  hello world';
    const n: number = 2;
    const expected: string = '  Hello world';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 3: Capitalize the nth letter of a string with trailing spaces
  it('3. should capitalize the nth letter of a string with trailing spaces', () => {
    const str: string = 'hello world  ';
    const n: number = 6;
    const expected: string = 'hello World  ';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 4: Capitalize the nth letter of a string with special characters
  it('4. should capitalize the nth letter of a string with special characters', () => {
    const str: string = 'hello @world';
    const n: number = 7;
    const expected: string = 'hello @World';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 5: Capitalize the nth letter of a string with numbers
  it('5. should capitalize the nth letter of a string with numbers', () => {
    const str: string = 'hello 123 world';
    const n: number = 4;
    const expected: string = 'hellO 123 world';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 6: Capitalize the nth letter of a string with mixed characters
  it('6. should capitalize the nth letter of a string with mixed characters', () => {
    const str: string = 'a1@ b2# c3$';
    const n: number = 4;
    const expected: string = 'a1@ B2# c3$';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 7: Capitalize the nth letter of a string with newlines
  it('7. should capitalize the nth letter of a string with newlines', () => {
    const str: string = 'hello\nworld';
    const n: number = 6;
    const expected: string = 'hello\nWorld';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 8: Capitalize the nth letter of a string with tabs
  it('8. should capitalize the nth letter of a string with tabs', () => {
    const str: string = 'hello\tworld';
    const n: number = 6;
    const expected: string = 'hello\tWorld';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 9: Capitalize the nth letter of an empty string
  it('9. should return an empty string when capitalizing the nth letter of an empty string', () => {
    const str: string = '';
    const n: number = 0;
    const expected: string = '';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 10: Capitalize the nth letter of a single character string
  it('10. should capitalize a single character string', () => {
    const str: string = 'a';
    const n: number = 0;
    const expected: string = 'A';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 11: Capitalize the nth letter of a string with multiple spaces between words
  it('11. should capitalize the nth letter of a string with multiple spaces between words', () => {
    const str: string = 'hello   world';
    const n: number = 8;
    const expected: string = 'hello   World';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 12: Capitalize the nth letter of a string with mixed case
  it('12. should capitalize the nth letter of a string with mixed case', () => {
    const str: string = 'hello World';
    const n: number = 6;
    const expected: string = 'hello World';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 13: Capitalize the nth letter of a string with punctuation
  it('13. should capitalize the nth letter of a string with punctuation', () => {
    const str: string = 'hello, world!';
    const n: number = 7;
    const expected: string = 'hello, World!';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 14: Capitalize the nth letter of a string with leading punctuation
  it('14. should capitalize the nth letter of a string with leading punctuation', () => {
    const str: string = '!hello world';
    const n: number = 1;
    const expected: string = '!Hello world';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 15: Capitalize the nth letter of a string with trailing punctuation
  it('15. should capitalize the nth letter of a string with trailing punctuation', () => {
    const str: string = 'hello world!';
    const n: number = 1;
    const expected: string = 'hEllo world!';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 16: Capitalize the nth letter of a string with n out of bounds (negative)
  it('16. should return the original string when n is out of bounds (negative)', () => {
    const str: string = 'hello world';
    const n: number = -1;
    const expected: string = 'hello world';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });

  // Test case 17: Capitalize the nth letter of a string with n out of bounds (greater than length)
  it('17. should return the original string when n is out of bounds (greater than length)', () => {
    const str: string = 'hello world';
    const n: number = 20;
    const expected: string = 'hello world';
    const result: string = capitalizeNthLetter(str, n);
    expect(result).toBe(expected);
  });
});
