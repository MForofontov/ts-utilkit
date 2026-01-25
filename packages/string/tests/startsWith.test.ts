import { startsWith } from '../src/startsWith';

/**
 * Unit tests for the startsWith function.
 */
describe('startsWith', () => {
  // Test case 1: Check if a string starts with a specified substring
  it('1. should return true if a string starts with a specified substring', () => {
    const str: string = 'hello world';
    const start: string = 'hello';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string does not start with a specified substring
  it('2. should return false if a string does not start with a specified substring', () => {
    const str: string = 'hello world';
    const start: string = 'world';
    const expected: boolean = false;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if an empty string starts with an empty substring
  it('3. should return true if an empty string starts with an empty substring', () => {
    const str: string = '';
    const start: string = '';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a string starts with an empty substring
  it('4. should return true if a string starts with an empty substring', () => {
    const str: string = 'hello world';
    const start: string = '';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if an empty string starts with a non-empty substring
  it('5. should return false if an empty string starts with a non-empty substring', () => {
    const str: string = '';
    const start: string = 'hello';
    const expected: boolean = false;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with special characters starts with a specified substring
  it('6. should return true if a string with special characters starts with a specified substring', () => {
    const str: string = '@hello world!';
    const start: string = '@hello';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with numbers starts with a specified substring
  it('7. should return true if a string with numbers starts with a specified substring', () => {
    const str: string = '12345 hello';
    const start: string = '12345';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with mixed characters starts with a specified substring
  it('8. should return true if a string with mixed characters starts with a specified substring', () => {
    const str: string = 'a1@b2#c3$';
    const start: string = 'a1@';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with leading spaces starts with a specified substring
  it('9. should return false if a string with leading spaces does not start with a specified substring', () => {
    const str: string = '   hello world';
    const start: string = 'hello';
    const expected: boolean = false;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with trailing spaces starts with a specified substring
  it('10. should return true if a string with trailing spaces starts with a specified substring', () => {
    const str: string = 'hello world   ';
    const start: string = 'hello';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with both leading and trailing spaces starts with a specified substring
  it('11. should return false if a string with both leading and trailing spaces does not start with a specified substring', () => {
    const str: string = '   hello world   ';
    const start: string = 'hello';
    const expected: boolean = false;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with mixed case starts with a specified substring
  it('12. should return true if a string with mixed case starts with a specified substring', () => {
    const str: string = 'Hello World';
    const start: string = 'Hello';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with punctuation starts with a specified substring
  it('13. should return true if a string with punctuation starts with a specified substring', () => {
    const str: string = 'hello, world!';
    const start: string = 'hello,';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string starts with a substring that is the entire string
  it('14. should return true if a string starts with a substring that is the entire string', () => {
    const str: string = 'hello';
    const start: string = 'hello';
    const expected: boolean = true;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string starts with a substring that is longer than the string
  it('15. should return false if a string starts with a substring that is longer than the string', () => {
    const str: string = 'hello';
    const start: string = 'hello world';
    const expected: boolean = false;
    const result: boolean = startsWith(str, start);
    expect(result).toBe(expected);
  });
});
