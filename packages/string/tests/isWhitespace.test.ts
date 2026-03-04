import { isWhitespace } from '../src/isWhitespace';

/**
 * Unit tests for the isWhitespace function.
 */
describe('isWhitespace', () => {
  // Test case 1: Check if a string with only spaces returns true
  it('1. should return true for a string with only spaces', () => {
    const str: string = '   ';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Check if a string with non-whitespace characters returns false
  it('2. should return false for a string with non-whitespace characters', () => {
    const str: string = 'Hello World';
    const expected: boolean = false;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Check if an empty string returns true
  it('3. should return true for an empty string', () => {
    const str: string = '';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Check if a string with only tabs returns true
  it('4. should return true for a string with only tabs', () => {
    const str: string = '\t\t\t';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Check if a string with only newlines returns true
  it('5. should return true for a string with only newlines', () => {
    const str: string = '\n\n\n';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Check if a string with mixed whitespace characters returns true
  it('6. should return true for a string with mixed whitespace characters', () => {
    const str: string = ' \t\n ';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Check if a string with leading spaces returns false
  it('7. should return false for a string with leading spaces', () => {
    const str: string = '   Hello';
    const expected: boolean = false;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Check if a string with trailing spaces returns false
  it('8. should return false for a string with trailing spaces', () => {
    const str: string = 'Hello   ';
    const expected: boolean = false;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Check if a string with both leading and trailing spaces returns false
  it('9. should return false for a string with both leading and trailing spaces', () => {
    const str: string = '   Hello   ';
    const expected: boolean = false;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Check if a string with mixed whitespace and non-whitespace characters returns false
  it('10. should return false for a string with mixed whitespace and non-whitespace characters', () => {
    const str: string = ' \t\n Hello \t\n ';
    const expected: boolean = false;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Check if a string with only a single space returns true
  it('11. should return true for a string with only a single space', () => {
    const str: string = ' ';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Check if a string with only a single tab returns true
  it('12. should return true for a string with only a single tab', () => {
    const str: string = '\t';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Check if a string with only a single newline returns true
  it('13. should return true for a string with only a single newline', () => {
    const str: string = '\n';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 14: Check if a string with only a single carriage return returns true
  it('14. should return true for a string with only a single carriage return', () => {
    const str: string = '\r';
    const expected: boolean = true;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 15: Check if a string with mixed whitespace characters and a single non-whitespace character returns false
  it('15. should return false for a string with mixed whitespace characters and a single non-whitespace character', () => {
    const str: string = ' \t\n H \t\n ';
    const expected: boolean = false;
    const result: boolean = isWhitespace(str);
    expect(result).toBe(expected);
  });
});
