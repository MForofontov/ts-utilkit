import { splitString } from '../src/splitString';

/**
 * Unit tests for the splitString function.
 */
describe('splitString', () => {
  // Test case 1: Split a simple string with a comma delimiter
  it('1. should split a simple string with a comma delimiter', () => {
    const str: string = 'hello,world';
    const delimiter: string = ',';
    const expected: string[] = ['hello', 'world'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 2: Split a string with multiple delimiters
  it('2. should split a string with multiple delimiters', () => {
    const str: string = 'hello,world,again';
    const delimiter: string = ',';
    const expected: string[] = ['hello', 'world', 'again'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 3: Split a string with leading delimiters
  it('3. should split a string with leading delimiters', () => {
    const str: string = ',hello,world';
    const delimiter: string = ',';
    const expected: string[] = ['', 'hello', 'world'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 4: Split a string with trailing delimiters
  it('4. should split a string with trailing delimiters', () => {
    const str: string = 'hello,world,';
    const delimiter: string = ',';
    const expected: string[] = ['hello', 'world', ''];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 5: Split a string with both leading and trailing delimiters
  it('5. should split a string with both leading and trailing delimiters', () => {
    const str: string = ',hello,world,';
    const delimiter: string = ',';
    const expected: string[] = ['', 'hello', 'world', ''];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 6: Split a string with special characters as delimiters
  it('6. should split a string with special characters as delimiters', () => {
    const str: string = 'hello@world';
    const delimiter: string = '@';
    const expected: string[] = ['hello', 'world'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 7: Split a string with numbers as delimiters
  it('7. should split a string with numbers as delimiters', () => {
    const str: string = 'hello123world';
    const delimiter: string = '123';
    const expected: string[] = ['hello', 'world'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 8: Split a string with mixed characters as delimiters
  it('8. should split a string with mixed characters as delimiters', () => {
    const str: string = 'a1@b2#c3$';
    const delimiter: string = '@';
    const expected: string[] = ['a1', 'b2#c3$'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 9: Split a string with leading spaces as delimiters
  it('9. should split a string with leading spaces as delimiters', () => {
    const str: string = '   hello world';
    const delimiter: string = ' ';
    const expected: string[] = ['', '', '', 'hello', 'world'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 10: Split a string with trailing spaces as delimiters
  it('10. should split a string with trailing spaces as delimiters', () => {
    const str: string = 'hello world   ';
    const delimiter: string = ' ';
    const expected: string[] = ['hello', 'world', '', '', ''];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 11: Split a string with both leading and trailing spaces as delimiters
  it('11. should split a string with both leading and trailing spaces as delimiters', () => {
    const str: string = '   hello world   ';
    const delimiter: string = ' ';
    const expected: string[] = ['', '', '', 'hello', 'world', '', '', ''];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 12: Split a string with mixed case as delimiters
  it('12. should split a string with mixed case as delimiters', () => {
    const str: string = 'HelloWorld';
    const delimiter: string = 'W';
    const expected: string[] = ['Hello', 'orld'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 13: Split a string with punctuation as delimiters
  it('13. should split a string with punctuation as delimiters', () => {
    const str: string = 'hello,world!';
    const delimiter: string = ',';
    const expected: string[] = ['hello', 'world!'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 14: Split an empty string
  it('14. should return an array with an empty string when splitting an empty string', () => {
    const str: string = '';
    const delimiter: string = ',';
    const expected: string[] = [''];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });

  // Test case 15: Split a string with no delimiter present
  it('15. should return an array with the original string when no delimiter is present', () => {
    const str: string = 'hello';
    const delimiter: string = ',';
    const expected: string[] = ['hello'];
    const result: string[] = splitString(str, delimiter);
    expect(result).toEqual(expected);
  });
});
