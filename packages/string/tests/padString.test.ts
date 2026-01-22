import { padString } from '../src/padString';

/**
 * Unit tests for the padString function.
 */
describe('padString', () => {
  // Test case 1: Pad a string to a specified length with default pad character
  it('1. should pad a string to a specified length with default pad character', () => {
    const str: string = 'hello';
    const targetLength: number = 10;
    const expected: string = '  hello   ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 2: Pad a string to a specified length with a given pad character
  it('2. should pad a string to a specified length with a given pad character', () => {
    const str: string = 'hello';
    const targetLength: number = 10;
    const padChar: string = '*';
    const expected: string = '**hello***';
    const result: string = padString(str, targetLength, padChar);
    expect(result).toBe(expected);
  });

  // Test case 3: Pad a string to a specified length with a given pad character when target length is equal to string length
  it('3. should return the original string when target length is equal to string length', () => {
    const str: string = 'hello';
    const targetLength: number = 5;
    const padChar: string = '*';
    const expected: string = 'hello';
    const result: string = padString(str, targetLength, padChar);
    expect(result).toBe(expected);
  });

  // Test case 4: Pad an empty string to a specified length with default pad character
  it('4. should pad an empty string to a specified length with default pad character', () => {
    const str: string = '';
    const targetLength: number = 5;
    const expected: string = '     ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 5: Pad an empty string to a specified length with a given pad character
  it('5. should pad an empty string to a specified length with a given pad character', () => {
    const str: string = '';
    const targetLength: number = 5;
    const padChar: string = '*';
    const expected: string = '*****';
    const result: string = padString(str, targetLength, padChar);
    expect(result).toBe(expected);
  });

  // Test case 6: Pad a string with leading spaces to a specified length with default pad character
  it('6. should pad a string with leading spaces to a specified length with default pad character', () => {
    const str: string = '  hello';
    const targetLength: number = 10;
    const expected: string = '   hello  ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 7: Pad a string with trailing spaces to a specified length with default pad character
  it('7. should pad a string with trailing spaces to a specified length with default pad character', () => {
    const str: string = 'hello  ';
    const targetLength: number = 10;
    const expected: string = ' hello    ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 8: Pad a string with both leading and trailing spaces to a specified length with default pad character
  it('8. should pad a string with both leading and trailing spaces to a specified length with default pad character', () => {
    const str: string = '  hello  ';
    const targetLength: number = 12;
    const expected: string = '   hello    ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 9: Pad a string with special characters to a specified length with default pad character
  it('9. should pad a string with special characters to a specified length with default pad character', () => {
    const str: string = '@hello@';
    const targetLength: number = 10;
    const expected: string = ' @hello@  ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 10: Pad a string with numbers to a specified length with default pad character
  it('10. should pad a string with numbers to a specified length with default pad character', () => {
    const str: string = '12345';
    const targetLength: number = 10;
    const expected: string = '  12345   ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 11: Pad a string with mixed characters to a specified length with default pad character
  it('11. should pad a string with mixed characters to a specified length with default pad character', () => {
    const str: string = 'a1@b2#';
    const targetLength: number = 10;
    const expected: string = '  a1@b2#  ';
    const result: string = padString(str, targetLength);
    expect(result).toBe(expected);
  });

  // Test case 12: Pad a string with mixed characters to a specified length with a given pad character
  it('12. should pad a string with mixed characters to a specified length with a given pad character', () => {
    const str: string = 'a1@b2#';
    const targetLength: number = 10;
    const padChar: string = '*';
    const expected: string = '**a1@b2#**';
    const result: string = padString(str, targetLength, padChar);
    expect(result).toBe(expected);
  });

  // Test case 13: Pad a string with mixed characters to a specified length with a given pad character when target length is equal to string length
  it('13. should return the original string when target length is equal to string length', () => {
    const str: string = 'a1@b2#';
    const targetLength: number = 6;
    const padChar: string = '*';
    const expected: string = 'a1@b2#';
    const result: string = padString(str, targetLength, padChar);
    expect(result).toBe(expected);
  });

  // Error handling test case 1: Target length less than string length
  it('13. should throw an error when target length is less than string length', () => {
    const str: string = 'hello';
    const targetLength: number = 3;
    expect(() => padString(str, targetLength)).toThrow(
      'Target length must be greater than or equal to the string length',
    );
  });

  // Error handling test case 2: Pad character is not a single character
  it('13. should throw an error when pad character is not a single character', () => {
    const str: string = 'hello';
    const targetLength: number = 10;
    const padChar: string = '**';
    expect(() => padString(str, targetLength, padChar)).toThrow(
      'Pad character must be a single character',
    );
  });
});
