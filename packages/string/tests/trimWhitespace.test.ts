import { trimWhitespace } from '../src/trimWhitespace';

/**
 * Unit tests for the trimWhitespace function.
 */
describe('trimWhitespace', () => {
  // Test case 1: Trim whitespace from both ends of a simple string
  it('1. should trim whitespace from both ends of a simple string', () => {
    const str: string = '   hello   ';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 2: Trim whitespace from a string with leading spaces
  it('2. should trim whitespace from a string with leading spaces', () => {
    const str: string = '   hello';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 3: Trim whitespace from a string with trailing spaces
  it('3. should trim whitespace from a string with trailing spaces', () => {
    const str: string = 'hello   ';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 4: Trim whitespace from a string with no leading or trailing spaces
  it('4. should return the same string if there are no leading or trailing spaces', () => {
    const str: string = 'hello';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 5: Trim whitespace from an empty string
  it('5. should return an empty string when trimming an empty string', () => {
    const str: string = '';
    const expected: string = '';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 6: Trim whitespace from a string with only spaces
  it('6. should return an empty string when trimming a string with only spaces', () => {
    const str: string = '   ';
    const expected: string = '';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 7: Trim whitespace from a string with mixed whitespace characters
  it('7. should trim whitespace from a string with mixed whitespace characters', () => {
    const str: string = '\t  hello \n ';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 8: Trim whitespace from a string with special characters
  it('8. should trim whitespace from a string with special characters', () => {
    const str: string = '   @hello!   ';
    const expected: string = '@hello!';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 9: Trim whitespace from a string with numbers
  it('9. should trim whitespace from a string with numbers', () => {
    const str: string = '   12345   ';
    const expected: string = '12345';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 10: Trim whitespace from a string with mixed characters
  it('10. should trim whitespace from a string with mixed characters', () => {
    const str: string = '   a1@ B2# C3$   ';
    const expected: string = 'a1@ B2# C3$';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 11: Trim whitespace from a string with newline characters
  it('11. should trim whitespace from a string with newline characters', () => {
    const str: string = '\nhello\n';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 12: Trim whitespace from a string with tab characters
  it('12. should trim whitespace from a string with tab characters', () => {
    const str: string = '\thello\t';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });

  // Test case 13: Trim whitespace from a string with mixed whitespace characters
  it('13. should trim whitespace from a string with mixed whitespace characters', () => {
    const str: string = ' \t\n hello \t\n ';
    const expected: string = 'hello';
    const result: string = trimWhitespace(str);
    expect(result).toBe(expected);
  });
});
