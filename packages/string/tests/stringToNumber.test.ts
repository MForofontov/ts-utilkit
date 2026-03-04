import { stringToNumber } from '../src/stringToNumber';

/**
 * Unit tests for the stringToNumber function.
 */
describe('stringToNumber', () => {
  // Test case 1: Convert a valid integer string to a number
  it('1. should convert a valid integer string to a number', () => {
    const str: string = '123';
    const expected: number = 123;
    const result: number = stringToNumber(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Convert a valid floating-point string to a number
  it('2. should convert a valid floating-point string to a number', () => {
    const str: string = '123.45';
    const expected: number = 123.45;
    const result: number = stringToNumber(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Convert a string with leading and trailing spaces to a number
  it('3. should convert a string with leading and trailing spaces to a number', () => {
    const str: string = '  123  ';
    const expected: number = 123;
    const result: number = stringToNumber(str.trim());
    expect(result).toBe(expected);
  });

  // Test case 4: Convert a string with leading zeros to a number
  it('4. should convert a string with leading zeros to a number', () => {
    const str: string = '00123';
    const expected: number = 123;
    const result: number = stringToNumber(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Convert a string with a negative number to a number
  it('5. should convert a string with a negative number to a number', () => {
    const str: string = '-123';
    const expected: number = -123;
    const result: number = stringToNumber(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Convert a string with a positive number to a number
  it('6. should convert a string with a positive number to a number', () => {
    const str: string = '+123';
    const expected: number = 123;
    const result: number = stringToNumber(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Convert a string with scientific notation to a number
  it('7. should convert a string with scientific notation to a number', () => {
    const str: string = '1.23e4';
    const expected: number = 12300;
    const result: number = stringToNumber(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Convert a string with invalid characters to NaN
  it('8. should convert a string with invalid characters to NaN', () => {
    const str: string = '123abc';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 9: Convert an empty string to NaN
  it('9. should convert an empty string to NaN', () => {
    const str: string = '';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 10: Convert a string with only whitespace to NaN
  it('10. should convert a string with only whitespace to NaN', () => {
    const str: string = '   ';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 11: Convert a string with a single space to NaN
  it('11. should convert a string with a single space to NaN', () => {
    const str: string = ' ';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 12: Convert a string with a single character to NaN
  it('12. should convert a string with a single character to NaN', () => {
    const str: string = 'a';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 13: Convert a string with a boolean value to NaN
  it('13. should convert a string with a boolean value to NaN', () => {
    const str: string = 'true';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 14: Convert a string with special characters to NaN
  it('14. should convert a string with special characters to NaN', () => {
    const str: string = '@123!';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });

  // Test case 15: Convert a string with mixed characters to NaN
  it('15. should convert a string with mixed characters to NaN', () => {
    const str: string = '123abc456';
    const result: number = stringToNumber(str);
    expect(result).toBeNaN();
  });
});
